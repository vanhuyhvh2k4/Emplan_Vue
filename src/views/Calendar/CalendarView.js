import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import * as classService from "@/services/classService";
import * as courseService from "@/services/courseService";
import * as taskService from "@/services/taskService";
import formatTime from "@/utils/formatTime";
import formatDate from "@/utils/formatDate";
import distanceDateWithCurrent from "@/utils/distanceDateWithCurrent";

export default {
  data() {
    return {
      formatTime,
      formatDate,
      isLoading: false,
      class: {
        all: [],
      },
      course: {
        all: [],
      },
      popupData: {
        id: null,
        course_id: null,
        course_name: null,
        start_time: null,
        end_time: null,
        date: null,
        room: null,
        teacher: null,
        tasks: [],
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
      editClassData: {
        id: null,
        course_id: null,
        room: null,
        date: null,
        start_time: null,
        end_time: null,
      },
      calendarOptions: {
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        headerToolbar: {
          left: "",
          center: "prev today next",
          right: "timeGridWeek,dayGridMonth", // user can switch between the two
        },
        allDaySlot: false,
        nowIndicator: true,
        contentHeight: "auto",
        events: [],
        eventClick: this.handleClickClassDetail,
        eventContent: (eventInfo) => {
          return {
            html: `
          <div class="w-full h-full bg-inherit cursor-pointer">
            <span>Time: ${eventInfo.timeText}</span>
            <br>
            <span>Course: ${eventInfo.event.title}</span>
            <br>
            <span>Room: ${eventInfo.event.extendedProps.room}</span>
          </div>
        `,
          };
        },
      },
      isShowPopup: false,
      showPopupEditClass: false,
      showPopupTask: false,
      showOneOffButton: true,
      showFormAddTime: false,
      showAddTimeButton: true,
      arrRepeatTime: [],
    };
  },
  methods: {
    async getClassList() {
      const response = await classService.getClassList();

      if (response.status === 200) {
        return response.data;
      }
    },
    async getDetailClass(course_id) {
      const response = await classService.getDetailClass(course_id);
      if (response.status === 200) {
        return response.data;
      }
    },
    async updateClass(classId, payload) {
      const response = await classService.updateClass(classId, payload);
      if (response.status === 200) {
        console.log("Updated successfully");
      }
    },
    async deleteClass(classId) {
      const response = await classService.deleteClass(classId);

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
    handleClickClassDetail: async function (info) {
      this.course.all = await this.getAllCourse();
      const classDetailApi = await this.getDetailClass(
        info.event.extendedProps.id,
      );
      for (const key in this.popupData) {
        if (key !== "tasks") {
          this.popupData[key] = classDetailApi.class[key];
        }
      }
      this.popupData.tasks = classDetailApi.tasks;
      this.isShowPopup = true;
    },
    handleClickEditClass() {
      for (const key in this.editClassData) {
        this.editClassData[key] = this.popupData[key];
      }
      this.showPopupEditClass = true;
      this.isShowPopup = false;
    },
    async handleClickSaveEditClass() {
      const editClassData = {
        ...this.editClassData,
        start_time: formatTime(this.editClassData.start_time),
        end_time: formatTime(this.editClassData.end_time),
      };
      delete editClassData.start;
      delete editClassData.end;
      delete editClassData.id;
      await this.updateClass(this.editClassData.id, editClassData);
      alert("Updated successfully");
      this.class.all = await this.getClassList();
      this.showPopupEditClass = false;
    },
    async handleClickDeleteClass() {
      if (confirm("Are you sure to delete?")) {
        await this.deleteClass(this.popupData.id);
        alert("Deleted successfully");
        this.class.all = await this.getClassList();
        this.isShowPopup = false;
      }
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
      this.isShowPopup = false;
    },
  },
  watch: {
    "class.all": {
      handler: function (newVal) {
        this.calendarOptions.events = newVal.map((obj) => {
          return {
            title: obj.course_name,
            start: moment(
              `${obj.date} ${formatTime(obj.start_time)}`,
              "YYYY-MM-DD HH:mm",
            ).format("YYYY-MM-DDTHH:mm"),
            end: moment(
              `${obj.date} ${formatTime(obj.end_time)}`,
              "YYYY-MM-DD HH:mm",
            ).format("YYYY-MM-DDTHH:mm"),
            extendedProps: {
              id: obj.id,
              room: obj.room,
            },
          };
        });
      },
      deep: true,
    },
  },
  async created() {
    this.isLoading = true;
    this.class.all = await this.getClassList();
    this.isLoading = false;
  },
  mounted() {
    document.title = "Calendar | Eplanner";
  },
};
