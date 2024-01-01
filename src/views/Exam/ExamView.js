import * as courseService from "@/services/courseService";
import * as examService from "@/services/examService";
import formatDate from "@/utils/formatDate";
import * as taskService from "@/services/taskService";
import formatTime from "@/utils/formatTime";
import distanceDateWithCurrent from "@/utils/distanceDateWithCurrent";

export default {
  data() {
    return {
      formatTime,
      formatDate,
      isLoading: false,
      isShowForm: false,
      isCompleted: false,
      showPopupExam: false,
      showEditForm: false,
      showExams: [],
      selectVal: "all",
      checkboxVal: false,
      arrCheckboxValues: [],
      course: {
        all: [],
      },
      popupExamData: {
        id: null,
        course_id: null,
        course_name: null,
        color_code: null,
        name: null,
        room: null,
        duration: null,
        start_time: null,
        start_date: null,
        completed: null,
        tasks: [],
      },
      editExamData: {
        id: null,
        course_id: null,
        name: null,
        room: null,
        duration: null,
        start_time: null,
        start_date: null,
      },
      newExamData: {
        name: null,
        subject: null,
        room: null,
        date: null,
        start: null,
        duration: 50,
      },
      popupTaskData: {
        id: null,
        name: null,
        description: null,
        end_date: null,
        type: null,
        course_id: null,
        course_name: null,
        color_code: null,
        distance_day: null,
        status: null,
      },
      task: {
        allTask: [],
      },
      exam: {
        all: [],
      },
      showPopupTask: false,
    };
  },
  methods: {
    async getAllExams() {
      const response = await examService.getAllExams();

      if (response.status === 200) {
        this.exam.all = response.data;
        this.filterExams();
      }
    },
    async getExamById(examId) {
      const response = await examService.getExamById(examId);
      if (response.status === 200) {
        return response.data;
      }
    },
    async createNewExam(payload) {
      const response = await examService.createNewExam(payload);

      if (response.status === 201) {
        alert("Created successfull");
      }
    },
    async updateExam(examId, payload) {
      const response = await examService.updateExam(examId, payload);

      if (response.status === 200) {
        console.log("Updated successfully");
      }
    },
    async deleteExamById(examId) {
      const response = await examService.deleteExamById(examId);
      if (response.status === 200) {
        console.log("Deleted successfully");
      }
    },
    async getAllCourse() {
      const response = await courseService.getAllCourse();
      if (response.status === 200) {
        return response.data;
      }
    },

    async getTaskById(taskId) {
      const response = await taskService.getTaskById(taskId);

      if (response.status === 200) {
        return response.data;
      }
    },
    handleClickNewExamButton() {
      this.isShowForm = !this.isShowForm;
    },
    handleChangeCompleted() {
      this.filterExams();
      this.handleClickClearSelection();
    },
    filterExams(
      exams = this.exam.all,
      options = {
        courseId: this.selectVal !== "all" ? this.selectVal : null,
        isCompleted: this.isCompleted,
      },
    ) {
      const currentTime = new Date().getTime();
      let examsFiltered = exams.filter((exam) => {
        const compareTime = new Date(
          `${exam.start_date} ${exam.start_time}`,
        ).getTime();
        if (options.courseId !== null) {
          return (
            exam.course.id === options.courseId &&
            (options.isCompleted
              ? currentTime > compareTime
              : currentTime <= compareTime)
          );
        } else {
          return options.isCompleted
            ? currentTime > compareTime
            : currentTime <= compareTime;
        }
      });
      this.showExams = examsFiltered;
    },
    handleSelectChange() {
      this.filterExams();
    },
    async handleClickNewExam() {
      const newExamData = {
        name: this.newExamData.name,
        room: this.newExamData.room,
        start_date: this.newExamData.date,
        start_time: this.newExamData.start,
        duration: this.newExamData.duration,
        course_id: this.newExamData.subject,
        room: this.newExamData.room,
      };

      await this.createNewExam(newExamData);
      await this.getAllExams();
    },
    handleClickCheckbox(checked, item) {
      if (checked) {
        this.arrCheckboxValues.push(item.id);
      } else {
        this.arrCheckboxValues = this.arrCheckboxValues.filter(
          (examId) => examId !== item.id,
        );
      }
    },
    async handleClickDeleteExam() {
      if (confirm("Are you sure to delete")) {
        await this.deleteExamById(this.popupExamData.id);
        this.getAllExams();
        this.showPopupExam = false;
        alert("Deleted successfully");
      }
    },
    handleClickSelectedDelete() {
      if (confirm("Are you sure to delete")) {
        this.arrCheckboxValues.forEach(async (exam) => {
          await this.deleteExamById(exam);
        });
        this.getAllExams();
        this.handleClickClearSelection();
        alert("Deleted successfully");
      }
    },
    handleClickClearSelection() {
      const checkboxRefs = this.$refs.checkboxExamRefs;
      if (checkboxRefs) {
        this.arrCheckboxValues = [];
        checkboxRefs.forEach((element) => {
          element.checked = false;
        });
      }
    },
    async handleClickExamItem(item) {
      const examApi = await this.getExamById(item.id);
      const exam = examApi.exam;
      for (const key in this.popupExamData) {
        if (key !== "course_name") {
          this.popupExamData[key] = exam[key];
        }
      }
      this.popupExamData.course_name = exam.course.name;
      this.popupExamData.course_id = exam.course.id;
      this.popupExamData.color_code = exam.course.color_code;
      this.popupExamData.tasks = examApi.tasks;
      this.showPopupExam = true;
    },
    handleClickEditTask() {
      for (const key in this.editExamData) {
        this.editExamData[key] = this.popupExamData[key];
      }
      this.showEditForm = true;
    },
    async handleClickSaveEditExam() {
      const editExam = {
        name: this.editExamData.name,
        course_id: this.editExamData.course_id,
        start_date: this.editExamData.start_date,
        start_time: formatTime(this.editExamData.start_time),
        duration: this.editExamData.duration,
        room: this.editExamData.room,
      };
      await this.updateExam(this.editExamData.id, editExam);
      this.getAllExams();
      alert("Updated successfully");
      this.showPopupExam = false;
      this.showEditForm = false;
    },
    async handleClickDetailTask(item) {
      const task = await this.getTaskById(item.id);

      for (const key in this.popupTaskData) {
        this.popupTaskData[key] = task[key];
      }
      this.popupTaskData["distance_day"] = distanceDateWithCurrent(
        this.popupTaskData.end_date,
      );
      this.showPopupTask = true;
      this.showPopupExam = false;
    },
  },
  async created() {
    this.isLoading = true;
    await this.getAllExams();
    this.course.all = await this.getAllCourse();
    this.newExamData.subject = this.course.all[0]?.id;
    this.isLoading = false;
  },
  mounted() {
    document.title = "Exam | Emplanner";
  },
};
