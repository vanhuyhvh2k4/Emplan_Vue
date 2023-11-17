<template>
  <div class="w-full h-full p-8">
    <div>
      <FullCalendar :options="calendarOptions" />
    </div>
    <Popup
      v-show="isShowPopup"
      @click-exit="handleClickExit"
      @clickOverlay="handleClickOverlay"
    />
  </div>
</template>

<script>
  import FullCalendar from "@fullcalendar/vue3";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import Popup from "@/components/Popup/Popup.vue";
  import moment from "moment";

  export default {
    name: "CalendarViews",
    components: {
      FullCalendar,
      Popup,
    },
    data() {
      return {
        isShowPopup: false,
        calendarOptions: {
          plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
          initialView: "timeGridWeek",
          headerToolbar: {
            left: "",
            center: "prev today next",
            right: "timeGridWeek,dayGridMonth", // user can switch between the two
          },
          allDaySlot: false,
          contentHeight: "auto",
          events: [
            {
              title: "Web Technology",
              start: moment("2023-11-16 07:00", "YYYY-MM-DD HH:mm").format(
                "YYYY-MM-DDTHH:mm",
              ),
              end: moment("2023-11-16 09:00", "YYYY-MM-DD HH:mm").format(
                "YYYY-MM-DDTHH:mm",
              ),
            },
          ],
          eventClick: (info) => {
            this.isShowPopup = true;
          },
        },
      };
    },
    methods: {
      handleClickExit() {
        this.isShowPopup = false;
      },
      handleClickOverlay() {
        this.isShowPopup = false;
      },
    },
  };
</script>
