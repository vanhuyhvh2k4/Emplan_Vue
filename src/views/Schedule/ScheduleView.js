import * as courseService from "@/services/courseService";
import * as classService from "@/services/classService";
import * as schoolYearService from "@/services/schoolYearService";
export default {
  data() {
    return {
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
      newCourseData: {},
      arrRepeatTime: [],
      showFormAddTime: false,
      showAddTimeButton: true,
      showManageCourse: false,
      showAddCourse: false,
      showPopupNewYear: false,
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
  },
  created() {
    this.getAllCourse();
    this.getListClasses();
  },
  mounted() {
    document.title = "Schedule | Emplanner";
  },
};
