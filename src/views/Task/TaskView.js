import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";

export default {
  data() {
    const allCourse = courseService.getAllCourse();
    return {
      isShowForm: false,
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
        type: "assignment",
        due: null,
        title: null,
        color: null,
        detail: null,
      },
    };
  },
  methods: {
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
    handleClickComplete() {
      alert("complete taskId: " + this.checkboxVals);
    },
    handleClickSetIncompleted() {
      alert("set incompleted taskId: " + this.checkboxVals);
    },
    handleClickDeleteTask() {
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
    handleInputDate(value) {
      this.newTaskData.due = value;
    },
    handleInputTitle(value) {
      this.newTaskData.title = value;
    },
    handleInputColor(e) {
      this.newTaskData.color = e.target.value;
    },
    handleInputDetail(value) {
      this.newTaskData.detail = value;
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
