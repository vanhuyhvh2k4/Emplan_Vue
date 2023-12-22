import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";
import * as examService from "@/services/examService";
import formatDate from "@/utils/formatDate";
import currentDate from "@/utils/currentDate";
import compareDate from "@/utils/compareDate";

export default {
  data() {
    const allCourse = courseService.getAllCourse();
    return {
      formatDate,
      currentDate,
      compareDate,
      isShowForm: false,
      showPopupTask: false,
      showEditForm: false,
      popupTaskData: {
        id: "",
        course_id: "",
        course_name: "",
        task_name: "",
        type: "",
        end_date: "",
        distance_day: "",
        status: "",
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
      },
      isCompleted: 0,
      showTask: [],
      selectVal: "all",
      checkboxVals: [],
      course: {
        allCourse,
      },
      task: {
        allTask: [],
      },
      exam: {
        all: [],
      },
      newTaskData: {
        subject: allCourse[0].id,
        examId: null,
        type: "Assignment",
        due: null,
        title: null,
        detail: null,
      },
    };
  },
  methods: {
    async getAllExams() {
      const response = await examService.getAllExams();

      if (response.status === 200) {
        this.exam.all = response.data;
      }
    },
    async getAllTask() {
      const response = await taskService.getAllTask();

      if (response.status === 200) {
        this.task.allTask = response.data;
      }
    },
    async deleteTaskById(taskId) {
      const response = await taskService.deleteTaskById(taskId);
      if (response.status === 200) {
        alert("delete successfully");
      }
    },
    handleClickTask(item) {
      this.showPopupTask = true;
      this.popupTaskData.distance_day = this.distanceDateWithCurrent(
        item.end_date,
      );
      for (const key in this.popupTaskData) {
        if (key !== "distance_day") {
          this.popupTaskData[key] = item[key];
        }
      }
    },
    handleChangeCompleted(checked) {
      if (checked) {
        this.isCompleted = 1;
      } else {
        this.isCompleted = 0;
      }
      console.log(this.isCompleted);
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
            task.status === options.isCompleted
          );
        } else {
          return task.status === options.isCompleted;
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
    async handleClickDeleteTask() {
      if (confirm("Are you sure to delete")) {
        await this.deleteTaskById(this.popupTaskData.id);
        await this.getAllTask();
        this.filterTasks();
      }
    },
    handleClickSetIncompleteTask() {
      alert("set incomplete taskId: " + this.popupTaskData.id);
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
    async handleClickNewTask() {
      this.isShowForm = false;
      const payload = {
        course_id: this.newTaskData.subject,
        name: this.newTaskData.title,
        description: this.newTaskData.detail,
        start_date: "2023-11-26",
        end_date: this.newTaskData.due,
        type: this.newTaskData.type,
        exam_id: this.newTaskData.examId,
      };

      if (payload.type !== "Revision") {
        delete payload.exam_id;
      }

      const response = await taskService.createTask(payload);

      if (response.status === 200) {
        alert("Task created successfully");
        await this.getAllTask();
        this.filterTasks();
      }
    },
    distanceDateWithCurrent(date) {
      let currentDate = new Date();
      let paramsDate = new Date(date);
      let currentMili = currentDate.getTime();
      let dateMili = paramsDate.getTime();
      let distanceMili = dateMili - currentMili;
      let distanceDay = Math.floor(distanceMili / (1000 * 60 * 60 * 24)) + 1;
      return distanceDay;
    },
    handleClickEditTask() {
      this.showEditForm = true;
      for (const key in this.editTaskData) {
        this.editTaskData[key] = this.popupTaskData[key];
      }
    },
    handleClickSaveEditTask() {
      const changedData = {};
      for (const key in this.editTaskData) {
        if (this.editTaskData[key] !== this.popupTaskData[key]) {
          changedData[key] = this.editTaskData[key];
        }
      }

      if (Object.keys(changedData).length !== 0) {
        changedData["id"] = this.editTaskData["id"];
      }
      console.log(changedData);
    },
  },
  async created() {
    await this.getAllTask();
    this.filterTasks();
  },
  mounted() {
    document.title = "Task | Emplanner";
  },
};
