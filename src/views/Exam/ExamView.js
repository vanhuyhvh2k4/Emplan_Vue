import * as courseService from "@/services/courseService";
import * as examService from "@/services/examService";
import formatDate from "@/utils/formatDate";

export default {
  data() {
    return {
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
        allCourse: courseService.getAllCourse(),
      },
      popupExamData: {
        id: "",
        course_id: "",
        course_name: "",
        teacher: "",
        room: "",
        duration: "",
        start: "",
        date: "",
        completed: "",
      },
      editExamData: {
        id: "",
        course_id: "",
        room: "",
        duration: "",
        start: "",
        date: "",
      },
      newExamData: {
        subject: "",
        room: "",
        date: "",
        start: "",
        duration: "",
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
      let examsFiltered = exams.filter((exam) => {
        if (options.courseId !== null) {
          return (
            exam.course_id === options.courseId &&
            exam.completed === options.isCompleted
          );
        } else {
          return exam.completed === options.isCompleted;
        }
      });
      this.showExams = examsFiltered;
    },
    handleSelectChange() {
      this.filterExams();
    },
    handleClickNewExam() {
      const newExamData = {
        subject:
          this.newExamData.subject === ""
            ? this.course.allCourse[0].id
            : this.newExamData.subject,
        room: this.newExamData.room,
        date: this.newExamData.date,
        start: this.newExamData.start,
        duration: this.newExamData.duration,
      };

      console.log(newExamData);
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
    handleClickDeleteTask() {
      alert("delete examId: " + this.arrCheckboxValues);
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
        this.popupExamData[key] = item[key];
      }
      this.showPopupExam = true;
    },
    handleClickEditTask() {
      for (const key in this.editExamData) {
        this.editExamData[key] = this.popupExamData[key];
      }
      this.showEditForm = true;
    },
    handleClickSaveEditExam() {
      const changedData = {};
      for (const key in this.editExamData) {
        if (this.editExamData[key] !== this.popupExamData[key]) {
          changedData[key] = this.editExamData[key];
        }
      }
      if (Object.keys(changedData).length !== 0) {
        changedData["id"] = this.editExamData["id"];
      }
      console.log(changedData);
    },
  },
  created() {
    const examResponse = examService.getAllExams();
    this.exam.all = examResponse;
    this.filterExams();
  },
  mounted() {
    document.title = "Exam | Emplanner";
  },
};
