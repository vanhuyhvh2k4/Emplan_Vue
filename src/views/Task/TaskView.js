import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";

export default {
  data() {
    return {
      isShowForm: false,
      isCompleted: false,
      showTask: [],
      selectVal: "all",
      course: {
        allCourse: courseService.getAllCourse(),
      },
      task: {
        allTask: [],
      },
    };
  },
  methods: {
    handleClickNewTask() {
      this.isShowForm = !this.isShowForm;
    },
    handleChangeCompleted() {
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
  },
  created() {
    const taskResponse = taskService.getAllTask();
    this.task.allTask = taskResponse;
    this.filterTasks();
  },
};
