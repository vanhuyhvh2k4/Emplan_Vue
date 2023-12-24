import * as courseService from "@/services/courseService";
import * as examService from "@/services/examService";
import compareDate from "@/utils/compareDate";
import currentDate from "@/utils/currentDate";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";

export default {
  data() {
    return {
      formatTime,
      formatDate,
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
        name: null,
        room: null,
        duration: null,
        start_time: null,
        start_date: null,
        completed: null,
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
      task: {
        allTask: [],
      },
      exam: {
        all: [],
      },
    };
  },
  methods: {
    async getAllExams() {
      const response = await examService.getAllExams();

      if (response.status === 200) {
        this.showExams = response.data;
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
        this.course.all = response.data;
        this.editExamData.course_id = this.course.all[0].id;
      }
    },
    handleClickNewExamButton() {
      this.isShowForm = !this.isShowForm;
    },
    handleChangeCompleted() {
      // this.filterExams();
      this.handleClickClearSelection();
    },
    filterExams(
      exams = this.exam.all,
      options = {
        courseId: this.selectVal !== "all" ? this.selectVal : null,
        isCompleted: this.isCompleted,
      },
    ) {
      let examsFiltered = exams.filter((exam) => {
        if (options.courseId !== null) {
          return (
            exam.course_id === options.courseId &&
            exam.completed === options.isCompleted
          );
        } else {
          return exam.start_date === options.isCompleted;
        }
      });
      this.showExams = examsFiltered;
    },
    handleSelectChange() {
      // this.filterExams();
    },
    async handleClickNewExam() {
      const newExamData = {
        name: this.newExamData.name,
        room: this.newExamData.room,
        start_date: this.newExamData.date,
        start_time: this.newExamData.start,
        duration: this.newExamData.duration,
        course_id:
          this.newExamData.subject === ""
            ? this.course.allCourse[0].id
            : this.newExamData.subject,
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
      this.arrCheckboxValues = [];
      checkboxRefs.forEach((element) => {
        element.checked = false;
      });
    },
    handleClickExamItem(item) {
      for (const key in this.popupExamData) {
        if (key !== "course_name") {
          this.popupExamData[key] = item[key];
        }
      }
      this.popupExamData.course_name = item.course.name;
      this.popupExamData.course_id = item.course.id;
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
      this.showPopupExam = false;
      this.showEditForm = false;
    },
  },
  created() {
    this.getAllExams();
    this.getAllCourse();
    // this.filterExams();
  },
  mounted() {
    document.title = "Exam | Emplanner";
  },
};
