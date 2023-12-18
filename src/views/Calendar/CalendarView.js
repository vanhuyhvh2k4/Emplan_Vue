import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import * as classService from "@/services/classService";
import formatTime from "@/utils/formatTime";
import formatDate from "@/utils/formatDate";

export default {
  data() {
    return {
      formatTime,
      formatDate,
      isShowPopup: false,
      class: {
        all: [],
      },
      popupData: {
        course_id: "",
        course_name: "",
        start_time: "",
        end_time: "",
        date: "",
        room: "",
        teacher: "",
        tasks: [],
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
        eventClick: (info) => {
          this.isShowPopup = true;
          this.getDetailClass(info.event.extendedProps.id);
        },
        eventContent: (eventInfo) => {
          return {
            html: `
          <div class="w-full h-full bg-inherit">
            <span>${eventInfo.timeText}</span>
            <br>
            <span>${eventInfo.event.title}</span>
            <br>
            <span>${eventInfo.event.extendedProps.room}</span>
          </div>
        `,
          };
        },
      },
    };
  },
  methods: {
    async getClassList() {
      const response = await classService.getClassList({
        "school-year-id": 1,
      });

      if (response.status === 200) {
        this.calendarOptions.events = response.data.map((obj) => {
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
      }
    },
    async getDetailClass(course_id) {
      const response = await classService.getDetailClass(course_id);
      if (response.status === 200) {
        for (const key in this.popupData) {
          if (key !== "tasks") {
            this.popupData[key] = response.data.class[key];
          }
        }
        this.popupData.tasks = response.data.tasks;
      }

      console.log(this.popupData);
    },
  },
  created() {
    this.getClassList();
  },
  mounted() {
    document.title = "Calendar | Eplanner";
  },
};
