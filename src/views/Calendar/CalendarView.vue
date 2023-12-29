<template>
  <div class="w-full h-full p-8">
    <div>
      <FullCalendar :options="calendarOptions" />
    </div>
    <Popup v-show="isShowPopup" @clickOverlay="this.isShowPopup = false">
      <template #header-left>
        <h3>{{ popupData.course_name }}</h3>
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
        <span class="text-lg"
          >{{ formatTime(popupData.start_time) }} -
          {{ formatTime(popupData.end_time) }}
          {{ formatDate(popupData.date) }}</span
        >
      </section>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['fas', 'map-marker-alt']"
        />
        <span class="text-lg">{{ popupData.room }}</span>
      </section>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['fas', 'chalkboard-teacher']"
        />
        <span class="text-lg">{{ popupData.teacher }}</span>
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
        <ul class="mt-4 max-h-[200px] overflow-y-scroll">
          <TaskColor
            v-if="popupData.tasks.length > 0"
            v-for="(item, index) in popupData.tasks"
            :key="index"
            :show-checkbox="false"
            class="mb-2"
            :title="item.name"
            :desc="item.course_name"
            :hex-color="item.course.color_code"
            :date="formatDate(item.end_date)"
          />
        </ul>
        <span
          v-if="popupData.tasks.length === 0"
          class="text-gray-500 font-light"
          >There are no tasks due for this class</span
        >
      </section>
    </Popup>
  </div>
</template>

<script>
  import CalendarView from "./CalendarView";
  import FullCalendar from "@fullcalendar/vue3";
  import Popup from "@/components/Popup/Popup.vue";
  import formatTime from "@/utils/formatTime";
  import formatDate from "@/utils/formatDate";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";

  export default {
    name: "CalendarViews",
    components: {
      FullCalendar,
      Popup,
      TaskColor,
    },
    mixins: [CalendarView],
  };
</script>
