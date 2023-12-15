import svgs from "@/assets/svg/export.js";
import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";
export default {
  data() {
    return {
      svgs,
      currentDate: new Date(),
      task: {
        completed: null,
        incompleted: null,
        cumulative: null,
        due: [],
      },
      course: {
        courseToday: [],
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
    async getCourseToday() {
      const response = await courseService.getCourseToday();

      if (response.status === 200) {
        this.course.courseToday = response.data.classes.data;
      }
    },
    async getDueTask() {
      const response = await taskService.getDueTask();

      if (response.status === 200) {
        this.task.due = response.data;
        console.log(this.task.due);
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
  },
  mounted() {
    document.title = "Dashboard | Emplanner";
  },
};
