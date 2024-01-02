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
      isLoading: false,
      showPopup: false,
      courses: {
        all: [],
        bySemesterId: [],
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
        byYearId: null,
        currentYearId: null,
      },
      classes: {
        all: [],
      },
      semester: {
        bySchoolYearId: [],
        currentSemesterId: null,
      },
      newTermData: {
        id: 0,
        school_year_id: null,
        name: null,
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
      editSchoolYearData: {
        start_date: null,
        end_date: null,
        arrSemesterBySchoolYearId: [],
        arrTermDeleted: [],
      },
      editCourseData: {
        id: null,
        semester_id: null,
        schoolYearId: null,
        name: null,
        teacher: null,
        color_code: "#000",
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
      showEditCourse: false,
    };
  },
  methods: {
    async getALlSchoolYear() {
      const response = await schoolYearService.getSchoolYear();
      if (response.status === 200) {
        this.schoolYear.all = response.data;
        this.schoolYear.currentYearId = this.schoolYear.all[0]?.id;
        this.schoolYear.all = this.schoolYear.all.map((year) => {
          return {
            ...year,
            format:
              formatDate(year.start_date) + " - " + formatDate(year.end_date),
          };
        });
      }
    },
    async getSchoolYearById(yearId) {
      const response = await schoolYearService.getSchoolYearById(yearId);
      if (response.status === 200) {
        this.schoolYear.byYearId = response.data;
      }
    },
    async createClass(payload) {
      const response = await classService.createClass(payload);
      if (response.status === 201) {
        console.log("Created successfully");
      }
    },
    async getSemesterBySchoolYearId(schoolYearId) {
      const response =
        await semesterService.getSemesterBySchoolYearId(schoolYearId);
      if (response.status === 200) {
        this.semester.bySchoolYearId = response.data;
        this.editSchoolYearData.arrSemesterBySchoolYearId = response.data;
      }
    },
    async deleteSemester(semesterId) {
      const response = await semesterService.deleteSemester(semesterId);
      if (response.status === 200) {
        console.log("Deleted successfully");
      }
    },
    async createSemester(payload) {
      const response = await semesterService.createSemester(payload);
      if (response.status === 201) {
        console.log("Created successfully");
      }
    },
    async getAllCourse(options) {
      const response = await courseService.getAllCourse({
        params: {
          ...options,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    },
    async createCourse(payload) {
      const response = await courseService.createCourse(payload);
      if (response.status === 201) {
        console.log("Created successfully");
      }
    },
    async updateCourse(courseId, payload) {
      const response = await courseService.updateCourse(courseId, payload);

      if (response.status === 200) {
        console.log("Updated successfully");
      }
    },
    async deleteCourse(courseId) {
      const response = await courseService.deleteCourse(courseId);
      if (response.status === 200) {
        console.log("Deleted successfully");
      }
    },
    async createSchoolYear(payload) {
      const response = await schoolYearService.createSchoolYear(payload);
      if (response.status === 201) {
        alert("Created successfully");
      }
    },
    async updateSchoolYear(yearId, payload) {
      const response = await schoolYearService.updateSchoolYear(
        yearId,
        payload,
      );
      if (response.status === 200) {
        console.log("Updated successfully");
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
          date: this.newClassData.date,
        };

        await this.createClass(newClassData);
        alert("Created successfully");
        this.showPopup = false;
      } else {
        const newClassData = {
          course_id: this.newClassData.subject,
          room: this.newClassData.room,
          start_time: this.arrRepeatTime[0].start,
          end_time: this.arrRepeatTime[0].end,
          day_of_week: this.arrRepeatTime[0].dates
            .map((date) => {
              return date.name;
            })
            .join(","),
        };
        await classService.createClass(newClassData);
        this.showPopup = false;
      }
    },
    async handleClickCreateSchoolYear() {
      const newSchoolYear = {
        start_date: this.newYearData.startDate,
        end_date: this.newYearData.endDate,
      };
      await this.createSchoolYear(newSchoolYear);
      await this.getALlSchoolYear();
      this.showPopupNewYear = false;
    },
    handleClickNewTerm() {
      const newTerm = {
        id: this.newTermData.id,
        school_year_id: this.schoolYear.currentYearId,
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
    handleClickDeleteSemesterOld(item) {
      this.editSchoolYearData.arrTermDeleted.push(item.id);
      this.editSchoolYearData.arrSemesterBySchoolYearId =
        this.editSchoolYearData.arrSemesterBySchoolYearId.filter(
          (semester) => semester.id !== item.id,
        );
    },
    async handleClickSaveEditSchoolYear() {
      console.log(this.editSchoolYearData.arrTermDeleted);
      await this.editSchoolYearData.arrTermDeleted.forEach(async (semester) => {
        await this.deleteSemester(semester);
      });
      delete this.editSchoolYearData.arrTermDeleted;
      await this.updateSchoolYear(
        this.schoolYear.currentYearId,
        this.editSchoolYearData,
      );
      await this.arrNewTerm.forEach(async (term) => {
        delete term.id;
        await semesterService.createSemester(term);
      });
      alert("Edit successfully");
      this.getSemesterBySchoolYearId(this.schoolYear.currentYearId);
      this.showPopupEditAcademyYear = false;
    },
    async handleChangeSchoolYear(yearId) {
      this.changeSchoolYear = true;
      this.schoolYear.currentYearId = yearId;
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
        this.courses.all = await this.getAllCourse();
        this.courses.bySemesterId = await this.getAllCourse(
          this.semester.currentSemesterId,
        );
        this.showManageCourse = true;
      }
    },
    async handleClickNewClass() {
      if (this.courses.bySemesterId.length > 0) {
        this.showPopup = true;
        this.newClassData.subject = this.courses.bySemesterId[0].id;
      } else {
        alert("You must create a course before");
      }
    },
    async handleClickShowPopupEditSchoolYear() {
      this.arrNewTerm = [];
      await this.getSchoolYearById(this.schoolYear.currentYearId);
      for (const key in this.editSchoolYearData) {
        this.editSchoolYearData[key] = this.schoolYear.byYearId[key];
      }
      await this.getSemesterBySchoolYearId(this.schoolYear.currentYearId);
      this.editSchoolYearData.arrTermDeleted = [];
      this.showPopupEditAcademyYear = true;
    },
    handleClickCourseItem(item) {
      for (const key in this.editCourseData) {
        this.editCourseData[key] = item[key];
      }
      this.editCourseData.schoolYearId = item.school_year.id;
      this.showEditCourse = true;
    },
    async handleClickSaveEditCourse() {
      const newCourseData = {
        ...this.editCourseData,
      };

      if (newCourseData.color_code === null) {
        newCourseData.color_code = "#000";
      }
      delete newCourseData.id;
      delete newCourseData.schoolYearId;
      await this.updateCourse(this.editCourseData.id, newCourseData);
      alert("Updated successfully");
      this.courses.bySemesterId = await this.getAllCourse(
        this.semester.currentSemesterId,
      );
      this.showEditCourse = false;
    },
    async handleDeleteCourse() {
      if (confirm("Are you sure to delete?")) {
        await this.deleteCourse(this.editCourseData.id);
        alert("Deleted successfully");
        this.courses.all = await this.getAllCourse();
        this.courses.bySemesterId = await this.getAllCourse(
          this.semester.currentSemesterId,
        );
        this.showEditCourse = false;
      }
    },
  },
  async created() {
    this.isLoading = true;
    await this.getALlSchoolYear();
    if (this.schoolYear.all[0]?.id) {
      await this.getSemesterBySchoolYearId(this.schoolYear.all[0]?.id);
    }
    this.semester.currentSemesterId = this.semester.bySchoolYearId[0]?.id;
    this.courses.bySemesterId = await this.getAllCourse({
      "semester-id": this.semester.currentSemesterId,
    });
    this.isLoading = false;
  },
  mounted() {
    document.title = "Schedule | Emplanner";
  },
};
