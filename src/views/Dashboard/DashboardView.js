import svgs from "@/assets/svg/export.js";
import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
export default {
  data() {
    return {
      formatTime,
      formatDate,
      svgs,
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
  created() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.getTodayTaskDetail();
    this.getDueTask();
    this.getOverdueTask();
    this.getClassExam();
  },
  mounted() {
    document.title = "Dashboard | Emplanner";
  },
};
