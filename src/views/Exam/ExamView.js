import * as taskService from "@/services/taskService";
import * as courseService from "@/services/courseService";
import * as examService from "@/services/examService";

export default {
  data() {
    return {
      isShowForm: false,
      isCompleted: false,
      showExams: [],
      selectVal: "all",
      checkboxVal: false,
      arrCheckboxValues: [],
      course: {
        allCourse: courseService.getAllCourse(),
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
    handleClickComplete() {
      alert("complete examId: " + this.arrCheckboxValues);
    },
    handleClickSetIncompleted() {
      alert("set incompleted examId: " + this.arrCheckboxValues);
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
