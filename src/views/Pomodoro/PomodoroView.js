import images from "@/assets/images/export";
import svgs from "@/assets/svg/export";
import * as taskService from "@/services/taskService";
import currentDate from "@/utils/currentDate";
import formatDate from "@/utils/formatDate";

export default {
  data() {
    return {
      formatDate,
      images,
      svgs,
      task: {
        all: [],
        incompleted: [],
      },
      countdown: "00:50:00",
      initialTime: 50 * 60,
      remainingTime: 50 * 60,
      intervalId: null,
      counting: false,
    };
  },
  methods: {
    async getAllTask() {
      const response = await taskService.getAllTask();

      if (response.status === 200) {
        this.task.all = response.data;
        this.task.incompleted = this.task.all.filter(
          (task) => task.status === 0,
        );
      }
    },
    async updateTask(taskId, payload) {
      const response = await taskService.updateTask(taskId, payload);
      if (response.status === 200) {
        console.log("Updated successfully");
      }
    },
    startCountdown() {
      if (this.intervalId === null) {
        this.intervalId = setInterval(this.updateCountdown, 1000);
      }
      this.counting = true;
    },
    stopCountdown() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.counting = false;
    },
    resetCountdown() {
      this.remainingTime = this.initialTime;
      this.countdown = this.formatTime(this.initialTime);
      this.stopCountdown();
    },
    updateCountdown() {
      this.remainingTime--;
      const hours = Math.floor(this.remainingTime / 3600);
      const minutes = Math.floor((this.remainingTime % 3600) / 60);
      const seconds = this.remainingTime % 60;
      const formattedHours = this.formatNumber(hours);
      const formattedMinutes = this.formatNumber(minutes);
      const formattedSeconds = this.formatNumber(seconds);
      this.countdown = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      if (this.remainingTime === 0) {
        clearInterval(this.intervalId);
      }
    },
    handleClickIncreaseTime() {
      this.resetCountdown();
      this.initialTime += 5 * 60;
      this.remainingTime = this.initialTime;
      this.countdown = this.formatTime(this.initialTime);
    },
    handleClickReduceTime() {
      if (this.initialTime / 60 > 10) {
        this.resetCountdown();
        this.initialTime -= 5 * 60;
        this.remainingTime = this.initialTime;
        this.countdown = this.formatTime(this.initialTime);
      }
    },
    async handleCheckboxChange(item) {
      const updatedData = {
        course_id: item.course_id,
        name: item.task_name,
        description: item.description,
        start_date: currentDate(),
        end_date: item.end_date,
        type: item.type,
        status: 1,
      };
      if (confirm("Do you finished this task?")) {
        await this.updateTask(item.id, updatedData);
        this.getAllTask();
        this.reresetCheckbox();
      } else {
        this.reresetCheckbox();
      }
    },
    formatNumber(number) {
      return number.toString().padStart(2, "0");
    },
    formatTime(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const formattedHours = this.formatNumber(hours);
      const formattedMinutes = this.formatNumber(minutes);
      const formattedSeconds = this.formatNumber(seconds);
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },
    reresetCheckbox() {
      for (let i = 0; i < this.task.incompleted.length; i++) {
        this.$refs.taskRefs[i].resetCheckbox();
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  created() {
    this.getAllTask();
  },
  mounted() {
    document.title = "Pomodoro | Emplanner";
  },
};
