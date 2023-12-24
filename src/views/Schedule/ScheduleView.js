import * as courseService from "@/services/courseService";
import * as classService from "@/services/classService";
import * as schoolYearService from "@/services/schoolYearService";
import * as semesterService from "@/services/semesterService";
import formatDate from "@/utils/formatDate";
export default {
  data() {
    return {
      formatDate,
      showOneOffButton: true,
      showPopup: false,
      courses: {
        all: [],
      },
      newAddTimeData: {
        id: 0,
        dates: [],
        start: "",
        end: "",
      },
      newClassData: {
        subject: "",
        room: "",
        teacher: "",
        date: "",
        start: "",
        end: "",
      },
      newYearData: {
        startDate: "",
        endDate: "",
      },
      classes: {
        all: [],
      },
      newTermData: {
        id: 0,
        school_year_id: 1,
        name: null,
        start_date: null,
        end_date: null,
      },
      editSchoolYear: {
        start_date: null,
        end_date: null,
      },
      arrNewTerm: [],
      newCourseData: {},
      arrRepeatTime: [],
      showFormAddTime: false,
      showAddTimeButton: true,
      showManageCourse: false,
      showAddCourse: false,
      showPopupNewYear: false,
      showPopupEditAcademyYear: false,
      showAddTerm: false,
    };
  },
  methods: {
    async getListClasses() {
      const response = await classService.getListClasses({
        params: {
          "school-year-id": 1,
        },
      });

      if (response.status === 200) {
        this.classes.all = response.data;
      }
    },
    async createSemester(payload) {
      const response = await semesterService.createSemester(payload);
      if (response.status === 201) {
        console.log("Created successfully");
      }
    },
    async getAllCourse() {
      const response = await courseService.getAllCourse();
      if (response.status === 200) {
        this.courses.all = response.data;
      }
    },
    async createSchoolYear(payload) {
      const response = await schoolYearService.createSchoolYear(payload);
      if (response.status === 201) {
        alert("Created successfully");
      }
    },
    handleClickDate(value) {
      this.newAddTimeData.dates = value;
    },
    handleClickAddTime() {
      const newTimeData = {
        id: this.newAddTimeData.id,
        dates: [...this.newAddTimeData.dates],
        start: this.newAddTimeData.start,
        end: this.newAddTimeData.end,
      };
      this.arrRepeatTime.push(newTimeData);
      this.newAddTimeData.id++;
      this.showFormAddTime = false;
      this.showAddTimeButton = true;
    },
    handleClickRemoveTime(item) {
      this.arrRepeatTime = this.arrRepeatTime.filter(
        (time) => time.id !== item.id,
      );
    },
    handleClickCreateNewClass() {
      if (this.showOneOffButton) {
        const newClassData = {
          subject: this.newClassData.subject,
          room: this.newClassData.room,
          teacher: this.newClassData.teacher,
          oneOff: true,
          date: this.newClassData.date,
          start: this.newClassData.start,
          end: this.newClassData.end,
        };

        console.log(newClassData);
      } else {
        const newClassData = {
          subject: this.newClassData.subject,
          room: this.newClassData.room,
          teacher: this.newClassData.teacher,
          oneOff: false,
          date: this.arrRepeatTime,
        };

        console.log(newClassData);
      }
    },
    async handleClickCreateSchoolYear() {
      const newSchoolYear = {
        start_date: this.newYearData.startDate,
        end_date: this.newYearData.endDate,
      };
      await this.createSchoolYear(newSchoolYear);
      this.showPopupNewYear = false;
    },
    handleClickNewTerm() {
      const newTerm = {
        id: this.newTermData.id,
        school_year_id: this.newTermData.school_year_id,
        name: this.newTermData.name,
        start_date: this.newTermData.start_date,
        end_date: this.newTermData.end_date,
      };
      this.newTermData.id++;
      this.arrNewTerm.push(newTerm);
      this.showAddTerm = false;
    },
    handleClickDeleteTerm(item) {
      this.arrNewTerm = this.arrNewTerm.filter((term) => term.id !== item.id);
    },
    handleClickSaveEditSchoolYear() {
      this.arrNewTerm.forEach(async (term) => {
        delete term.id;
        await semesterService.createSemester(term);
      });
      alert("Edit successfully");
      this.showPopupEditAcademyYear = false;
    },
  },
  created() {
    this.getAllCourse();
    this.getListClasses();
  },
  mounted() {
    document.title = "Schedule | Emplanner";
  },
};
