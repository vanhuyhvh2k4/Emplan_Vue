import svgs from "@/assets/svg/export.js";
import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";
import * as classService from "@/services/classService";
import * as examService from "@/services/examService";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import distanceDateWithCurrent from "@/utils/distanceDateWithCurrent";
export default {
  data() {
    return {
      formatTime,
      formatDate,
      svgs,
      isLoading: false,
      currentDate: new Date(),
      task: {
        completed: null,
        incompleted: null,
        cumulative: null,
        due: [],
        overdue: [],
      },
      course: {
        today: [],
        tomorrow: [],
      },
      exam: {
        today: [],
        tomorrow: [],
      },
      popupTaskData: {
        id: null,
        name: null,
        description: null,
        end_date: null,
        type: null,
        course_id: null,
        course_name: null,
        color_code: null,
        distance_day: null,
        status: null,
      },
      popupExamData: {
        id: null,
        course_id: null,
        name: null,
        start_date: null,
        start_time: null,
        duration: null,
        room: null,
        course_name: null,
        teacher: null,
      },
      popupClassData: {
        class: {
          id: null,
          course_id: null,
          room: null,
          date: null,
          day_of_week: null,
          start_time: null,
          course_name: null,
          teacher: null,
        },
        tasks: [],
      },
      showPopupTask: false,
      showPopupExam: false,
      showPopupClass: false,
    };
  },
  methods: {
    async getTodayTaskDetail() {
      const response = await taskService.getTodayTaskDetail();

      if (response.status === 200) {
        this.task.completed = response.data.completed_task;
        this.task.incompleted = response.data.incompleted_task;
        this.task.cumulative = response.data.cumulative_time;
      }
    },
    async getClassExam() {
      const response = await courseService.getClassExam();

      if (response.status === 200) {
        this.course.today = response.data.today.class;
        this.exam.today = response.data.today.exam;
        this.course.tomorrow = response.data.tomorrow.class;
        this.exam.tomorrow = response.data.tomorrow.exam;
      }
    },
    async getDueTask() {
      const response = await taskService.getDueTask();

      if (response.status === 200) {
        this.task.due = response.data;
      }
    },
    async getOverdueTask() {
      const response = await taskService.getOverdueTask();

      if (response.status === 200) {
        this.task.overdue = response.data;
      }
    },
    async getTaskDetail(taskId) {
      const response = await taskService.getTaskById(taskId);

      if (response.status === 200) {
        return response.data;
      }
    },
    async getClassDetail(classId) {
      const response = await classService.getDetailClass(classId);
      if (response.status === 200) {
        return response.data;
      }
    },
    async getExamById(examId) {
      const response = await examService.getExamById(examId);
      if (response.status === 200) {
        return response.data;
      }
    },
    async handleClickDetailTask(item) {
      const task = await this.getTaskDetail(item.id);
      for (const key in this.popupTaskData) {
        this.popupTaskData[key] = task[key];
      }
      this.popupTaskData["distance_day"] = distanceDateWithCurrent(
        this.popupTaskData.end_date,
      );
      this.showPopupClass = false;
      this.showPopupTask = true;
      this.showPopupExam = false;
    },
    async handleClickExamItem(item) {
      const examApi = await this.getExamById(item.id);
      const exam = examApi.exam;
      for (const key in this.popupExamData) {
        this.popupExamData[key] = exam[key];
      }
      this.popupExamData.course_name = exam.course.name;
      this.popupExamData.course_id = exam.course.id;
      this.popupExamData.color_code = exam.course.color_code;
      this.popupExamData.tasks = examApi.tasks;
      this.showPopupExam = true;
    },
    async handleClickClassItem(item) {
      const classDetailApi = await this.getClassDetail(item.id);
      for (const key in this.popupClassData.class) {
        this.popupClassData.class[key] = classDetailApi.class[key];
      }
      this.popupClassData.tasks = classDetailApi.tasks;
      this.showPopupClass = true;
    },
  },
  computed: {
    formattedDate() {
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      return this.currentDate.toLocaleDateString("en-US", options);
    },
    formattedTime() {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        second: "numeric",
      };
      return this.currentDate.toLocaleTimeString("en-US", options);
    },
  },
  async created() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.isLoading = true;
    await this.getTodayTaskDetail();
    await this.getDueTask();
    await this.getOverdueTask();
    await this.getClassExam();
    this.isLoading = false;
  },
  mounted() {
    document.title = "Dashboard | Emplanner";
  },
};
