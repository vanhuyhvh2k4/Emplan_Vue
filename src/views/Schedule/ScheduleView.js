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
        start: null,
        end: null,
      },
      newClassData: {
        subject: null,
        room: null,
        date: null,
        start: null,
        end: null,
      },
      newYearData: {
        startDate: null,
        endDate: null,
      },
      schoolYear: {
        all: [],
      },
      classes: {
        all: [],
      },
      semester: {
        bySchoolYearId: [],
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
      newCourseData: {
        semester_id: null,
        name: null,
        color_code: "#000",
        teacher: null,
        start_date: null,
        end_date: null,
      },
      arrRepeatTime: [],
      showFormAddTime: false,
      showAddTimeButton: true,
      showManageCourse: false,
      showAddCourse: false,
      showPopupNewYear: false,
      showPopupEditAcademyYear: false,
      showAddTerm: false,
      changeSchoolYear: false,
    };
  },
  methods: {
    async getALlSchoolYear() {
      const response = await schoolYearService.getSchoolYear();
      if (response.status === 200) {
        this.schoolYear.all = response.data;
        this.schoolYear.all = this.schoolYear.all.map((year) => {
          return {
            ...year,
            format:
              formatDate(year.start_date) + " - " + formatDate(year.end_date),
          };
        });
      }
    },
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
    async createClass(payload) {
      const response = await classService.createClass(payload);
      if (response.status === 201) {
        alert("Created successfully");
      }
    },
    async getSemesterBySchoolYearId(schoolYearId) {
      const response =
        await semesterService.getSemesterBySchoolYearId(schoolYearId);
      if (response.status === 200) {
        this.semester.bySchoolYearId = response.data;
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
        this.newClassData.subject = this.courses.all[0].id;
      }
    },
    async createCourse(payload) {
      const response = await courseService.createCourse(payload);
      if (response.status === 201) {
        console.log("Created successfully");
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
    async handleClickCreateNewClass() {
      if (this.showOneOffButton) {
        const newClassData = {
          course_id: this.newClassData.subject,
          room: this.newClassData.room,
          start_time: this.newClassData.start,
          end_time: this.newClassData.end,
          day_of_week: this.newClassData.date,
        };

        await classService.createClass(newClassData);
        this.showPopup = false;
      } else {
        const newClassData = {
          subject: this.newClassData.subject,
          room: this.newClassData.room,
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
    async handleChangeSchoolYear(yearId) {
      this.changeSchoolYear = true;
      await this.getSemesterBySchoolYearId(yearId);
      this.newCourseData.semester_id =
        this.semester.bySchoolYearId[0]?.id ?? null;
    },
    async handleClickCreateNewCourse() {
      const newCourse = {
        ...this.newCourseData,
      };
      if (newCourse.semester_id === null || newCourse.semester_id === "") {
        alert("Please create a semester before create a course");
      } else {
        await this.createCourse(newCourse);
        alert("Created successfully");
        this.showAddCourse = false;
        await this.getAllCourse();
        this.showManageCourse = true;
      }
    },
  },
  created() {
    this.getALlSchoolYear();
    this.getAllCourse();
    this.getListClasses();
  },
  mounted() {
    document.title = "Schedule | Emplanner";
  },
};
