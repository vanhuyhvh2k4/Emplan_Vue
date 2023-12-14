import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";

export default {
  data() {
    const allCourse = courseService.getAllCourse();
    return {
      isShowForm: false,
      showPopupTask: false,
      showEditForm: false,
      popupTaskData: {
        id: "",
        course_id: "",
        course_name: "",
        task_name: "",
        type: "",
        due_at: "",
        distance_day: "",
        completed: "",
        detail: "",
        color: "",
      },
      editTaskData: {
        id: "",
        course_id: "",
        task_name: "",
        type: "",
        due_at: "",
        detail: "",
        color: "",
      },
      isCompleted: false,
      showTask: [],
      selectVal: "all",
      checkboxVals: [],
      course: {
        allCourse,
      },
      task: {
        allTask: [],
      },
      newTaskData: {
        subject: allCourse[0].id,
        type: "Assignment",
        due: null,
        title: null,
        color: null,
        detail: null,
      },
    };
  },
  methods: {
    handleClickTask(item) {
      this.showPopupTask = true;
      this.popupTaskData.distance_day = this.distanceDateWithCurrent(
        item.due_at,
      );
      for (const key in this.popupTaskData) {
        if (key !== "distance_day") {
          this.popupTaskData[key] = item[key];
        }
      }
    },
    handleChangeCompleted() {
      this.handleClickClearSelection();
      this.filterTasks();
    },
    filterTasks(
      tasks = this.task.allTask,
      options = {
        courseId: this.selectVal !== "all" ? this.selectVal : null,
        isCompleted: this.isCompleted,
      },
    ) {
      let tasksFiltered = tasks.filter((task) => {
        if (options.courseId !== null) {
          return (
            task.course_id === options.courseId &&
            task.completed === options.isCompleted
          );
        } else {
          return task.completed === options.isCompleted;
        }
      });
      this.showTask = tasksFiltered;
    },
    handleSelectChange() {
      this.filterTasks();
    },
    handleCheckboxChange(checked, value) {
      if (checked) {
        this.checkboxVals.push(value);
      } else {
        this.checkboxVals = this.checkboxVals.filter((item) => item !== value);
      }
    },
    handleClickCompleteTask() {
      alert("complete taskId: " + this.popupTaskData.id);
    },
    handleClickDeleteTask() {
      alert("delete taskId: " + this.popupTaskData.id);
    },
    handleClickCompleteSelectedTask() {
      alert("complete taskId: " + this.checkboxVals);
    },
    handleClickSelectSetIncompleted() {
      alert("set incompleted taskId: " + this.checkboxVals);
    },
    handleClickDeleteSelectedTask() {
      alert("delete taskId: " + this.checkboxVals);
    },
    handleClickClearSelection() {
      this.checkboxVals = [];
      for (let i = 0; i < this.showTask.length; i++) {
        this.$refs.taskRefs[i].resetCheckbox();
      }
    },
    handleClickNewTask() {
      this.isShowForm = false;
      alert("create task");
      console.log(this.newTaskData);
    },
    distanceDateWithCurrent(date) {
      var dayMonthYear = date.split("/");
      var formatDate =
        dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + dayMonthYear[0];
      let currentDate = new Date();
      let paramsDate = new Date(formatDate);
      let currentMili = currentDate.getTime();
      let dateMili = paramsDate.getTime();
      let distanceMili = dateMili - currentMili;
      let distanceDay = Math.floor(distanceMili / (1000 * 60 * 60 * 24)) + 1;
      return distanceDay;
    },
    formatDate(date) {
      var dayMonthYear = date.split("/");
      var formatDate =
        dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + dayMonthYear[0];
      return formatDate;
    },
    handleClickEditTask() {
      this.showEditForm = true;
      for (const key in this.editTaskData) {
        this.editTaskData[key] = this.popupTaskData[key];
      }
    },
    handleClickSaveEditTask() {
      const changedData = {
        id: this.editTaskData["id"],
      };
      for (const key in this.editTaskData) {
        if (this.editTaskData[key] !== this.popupTaskData[key]) {
          changedData[key] = this.editTaskData[key];
        }
      }
      console.log(changedData);
    },
  },
  created() {
    const taskResponse = taskService.getAllTask();
    this.task.allTask = taskResponse;
    this.filterTasks();
  },
  mounted() {
    document.title = "Task | Emplanner";
  },
};
