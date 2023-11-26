import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";

export default {
  data() {
    return {
      isShowForm: false,
      isCompleted: false,
      showTask: [],
      selectVal: 1,
      course: {
        allCourse: courseService.getAllCourse(),
      },
      task: {
        allTask: [],
        taskCompleted: [],
        taskDontCompleted: [],
      },
    };
  },
  methods: {
    handleClickNewTask() {
      this.isShowForm = !this.isShowForm;
    },
    handleChangeCompleted() {
      if (this.isCompleted) {
        this.showTask = this.task.taskCompleted;
      } else {
        this.showTask = this.task.taskDontCompleted;
      }
    },
    filterTasks(allTask) {
      this.task.taskCompleted = allTask.filter(
        (task) => task.completed === true,
      );
      this.task.taskDontCompleted = allTask.filter(
        (task) => task.completed === false,
      );
    },
    handleSelectChange() {
      console.log(this.selectVal);
    },
  },
  created() {
    const taskResponse = taskService.getAllTask();
    this.filterTasks(taskResponse);
    this.showTask = this.task.taskDontCompleted;
  },
};
