<template>
  <div class="w-full h-full p-8">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
  import FullCalendar from "@fullcalendar/vue3";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import moment from "moment";

  export default {
    name: "CalendarViews",
    components: {
      FullCalendar, // make the <FullCalendar> tag available
    },
    data() {
      return {
        calendarOptions: {
          plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
          initialView: "timeGridWeek",
          headerToolbar: {
            left: "prev,next",
            center: "title",
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
        },
      };
    },
  };
</script>
