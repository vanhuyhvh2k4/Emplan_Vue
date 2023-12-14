<template>
  <div class="w-full h-full p-8">
    <div>
      <FullCalendar :options="calendarOptions" />
    </div>
    <Popup v-show="isShowPopup" @clickOverlay="this.isShowPopup = false">
      <template #header-left>
        <h3>Web Technology</h3>
      </template>
      <template #header-right>
        <font-awesome-icon
          class="cursor-pointer"
          :icon="['fas', 'trash-alt']"
        />
        <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen']" />
        <font-awesome-icon
          class="cursor-pointer"
          :icon="['fas', 'times']"
          @click="this.isShowPopup = false"
        />
      </template>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['far', 'calendar-alt']"
        />
        <span class="text-lg">9:00 AM - 10:30 AM Today</span>
      </section>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['fas', 'map-marker-alt']"
        />
        <span class="text-lg">KA.301</span>
      </section>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['fas', 'chalkboard-teacher']"
        />
        <span class="text-lg">Mr.Dai</span>
      </section>
      <section>
        <h4
          class="relative after:w-full after:h-[1px] after:bg-blue-300 after:right-0 after:absolute after:top-1/2"
        >
          <span class="bg-white relative z-10 pr-4"
            >Task due for this class</span
          >
        </h4>
      </section>
      <section>
        <span class="text-gray-500 font-light"
          >There are no tasks due for this class</span
        >
      </section>
    </Popup>
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
          nowIndicator: true,
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
              extendedProps: {
                room: "KA.301",
              },
            },
          ],
          eventClick: (info) => {
            this.isShowPopup = true;
          },
          eventContent: (eventInfo) => {
            return {
              html: `
          <div class="bg-blue-500 w-full">
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
    methods: {},
    mounted() {
      document.title = "Calendar | Eplanner";
    },
  };
</script>
