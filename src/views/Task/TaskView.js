import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";
import * as examService from "@/services/examService";
import formatDate from "@/utils/formatDate";
import currentDate from "@/utils/currentDate";
import compareDate from "@/utils/compareDate";
import distanceDateWithCurrent from "@/utils/distanceDateWithCurrent";

export default {
  data() {
    return {
      formatDate,
      currentDate,
      compareDate,
      isShowForm: false,
      showPopupTask: false,
      showEditForm: false,
      popupTaskData: {
        id: null,
        course_id: null,
        course_name: null,
        task_name: null,
        type: null,
        end_date: null,
        distance_day: null,
        status: null,
        description: null,
        color_code: null,
      },
      editTaskData: {
        id: null,
        course_id: null,
        task_name: null,
        type: null,
        end_date: null,
        description: null,
      },
      isCompleted: 0,
      showTask: [],
      selectVal: "all",
      checkboxVals: [],
      course: {
        all: [],
      },
      task: {
        allTask: [],
        dueIsComing: [],
        completed: [],
        incompleted: [],
      },
      exam: {
        all: [],
        byCourse: [],
      },
      newTaskData: {
        subject: null,
        examId: null,
        type: "Assignment",
        due: null,
        title: null,
        detail: null,
      },
    };
  },
  methods: {
    async getAllCourse() {
      const response = await courseService.getAllCourse();

      if (response.status === 200) {
        this.course.all = response.data;
        this.newTaskData.subject = this.course.all[0].id;
      }
    },
    async getAllExams() {
      const response = await examService.getAllExams();

      if (response.status === 200) {
        this.exam.all = response.data;
      }
    },
    async getExamsByCourseId(courseId) {
      const response = await examService.getExamsByCourseId(courseId);

      if (response.status === 200) {
        // this.exam.byCourse = response.data;
        // this.newTaskData.examId = this.exam.byCourse[0]?.id;
        return response.data;
      }
    },
    async getAllTask() {
      const response = await taskService.getAllTask();

      if (response.status === 200) {
        this.task.allTask = response.data;
        this.filterTasks();

        this.task.dueIsComing = this.task.allTask.filter(
          (task) => task.end_date === currentDate(),
        );
        this.task.completed = this.task.allTask.filter(
          (task) => task.status === 1,
        );
        this.task.incompleted = this.task.allTask.filter(
          (task) => task.status === 0,
        );
      }
    },
    async createTask(payload) {
      const response = await taskService.createTask(payload);

      if (response.status === 201) {
        alert("Task created successfully");
        this.newTaskData.type = "Assignment";
      }
    },
    async updateTask(taskId, payload) {
      const response = await taskService.updateTask(taskId, payload);
      if (response.status === 200) {
        console.log("updated successfully");
      }
    },
    async deleteTaskById(taskId) {
      const response = await taskService.deleteTaskById(taskId);
      if (response.status === 200) {
        console.log("delete successfully");
      }
    },
    handleClickTask(item) {
      this.showPopupTask = true;
      this.popupTaskData.distance_day = distanceDateWithCurrent(item.end_date);
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
      this.handleClickClearSelection();
      this.filterTasks();
    },
    async handleChangeNewType(value) {
      this.newTaskData.type = value;
      if (this.newTaskData.type === "Revision") {
        this.exam.byCourse = await this.getExamsByCourseId(
          this.newTaskData.subject,
        );
        this.newTaskData.examId = this.exam.byCourse[0]?.id;
      }
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
      this.updateStatusTask(1);
    },
    async updateStatusTask(status = 0) {
      const updateTask = {
        course_id: this.popupTaskData.course_id,
        name: this.popupTaskData.task_name,
        description: this.popupTaskData.description,
        start_date: currentDate(),
        end_date: this.popupTaskData.end_date,
        type: this.popupTaskData.type,
        status: status,
      };
      await taskService.updateTask(this.popupTaskData.id, updateTask);
      this.getAllTask();
      this.showPopupTask = false;
    },
    async updateTaskSelected(status = 0) {
      for (let i = 0; i < this.task.allTask.length; i++) {
        for (let j = 0; j < this.checkboxVals.length; j++) {
          if (this.task.allTask[i].id == this.checkboxVals[j]) {
            const updateTask = {
              course_id: this.task.allTask[i].course_id,
              name: this.task.allTask[i].course_name,
              description: this.task.allTask[i].description,
              start_date: currentDate(),
              end_date: this.task.allTask[i].end_date,
              type: this.task.allTask[i].type,
              status: status,
            };
            await taskService.updateTask(this.task.allTask[i].id, updateTask);
          }
        }
      }
      alert("Updated successfully");
      this.handleClickClearSelection();
      this.getAllTask();
    },
    async handleClickDeleteTask() {
      if (confirm("Are you sure to delete")) {
        await this.deleteTaskById(this.popupTaskData.id);
        alert("Deleted successfully");
        this.getAllTask();
        this.showPopupTask = false;
      }
    },
    handleClickSetIncompleteTask() {
      this.updateStatusTask(0);
    },
    handleClickCompleteSelectedTask() {
      this.updateTaskSelected(1);
    },
    handleClickSelectSetIncompleted() {
      this.updateTaskSelected(0);
    },
    handleClickDeleteSelectedTask() {
      if (confirm("Are you sure to delete")) {
        this.checkboxVals.forEach(async (taskId) => {
          await taskService.deleteTaskById(taskId);
        });
        alert("Deleted successfully");
        this.getAllTask();
        this.handleClickClearSelection();
      }
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
        description: this.newTaskData.description,
        start_date: currentDate(),
        end_date: this.newTaskData.due,
        type: this.newTaskData.type,
        exam_id: this.newTaskData.examId,
      };

      if (payload.type !== "Revision") {
        delete payload.exam_id;
      }
      await this.createTask(payload);
      this.getAllTask();
    },
    handleClickEditTask() {
      this.showEditForm = true;
      for (const key in this.editTaskData) {
        this.editTaskData[key] = this.popupTaskData[key];
      }
    },
    async handleClickSaveEditTask() {
      const updateData = {
        course_id: this.editTaskData.course_id,
        name: this.editTaskData.task_name,
        description: this.editTaskData.description,
        start_date: currentDate(),
        end_date: this.editTaskData.end_date,
        type: this.editTaskData.type,
        status: this.popupTaskData.status,
      };

      await this.updateTask(this.editTaskData.id, updateData);
      alert("Updated successfully");
      this.getAllTask();
      this.showEditForm = false;
      this.showPopupTask = false;
    },
  },
  created() {
    this.getAllCourse();
    this.getAllTask();
  },
  mounted() {
    document.title = "Task | Emplanner";
  },
};
