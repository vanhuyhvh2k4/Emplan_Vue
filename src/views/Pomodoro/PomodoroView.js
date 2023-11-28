export default {
  data() {
    return {
      countdown: "00:60:00",
      initialTime: 60 * 60,
      remainingTime: 60 * 60,
      intervalId: null,
      counting: false,
    };
  },
  methods: {
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
      this.countdown = "00:60:00";
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
    formatNumber(number) {
      return number.toString().padStart(2, "0");
    },
    handleClickCounting() {
      if (this.counting) {
        this.stopCountdown();
      } else {
        this.startCountdown();
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
