import * as courseService from "@/services/courseService";
export default {
  data() {
    return {
      showOneOffButton: true,
      showPopup: false,
      courses: {
        all: [],
      },
    };
  },
  methods: {
    async getAllCourseApi() {
      const response = await courseService.getAllCourse();
      this.courses.all = response;
    },
    handleClickDate(value) {
      console.log(value);
    },
  },
  created() {
    this.getAllCourseApi();
  },
};
