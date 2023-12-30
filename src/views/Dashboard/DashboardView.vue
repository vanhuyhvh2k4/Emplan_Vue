<template>
  <div class="w-full h-full p-8">
    <div class="flex justify-between items-center">
      <section>
        <h2 class="text-2xl font-bold">Today</h2>
        <div class="font-medium">
          <span>{{ formattedDate }}</span>
          <span> | </span>
          <span>{{ formattedTime }}</span>
        </div>
      </section>
      <section>
        <div
          class="flex justify-between items-center gap-12 bg-white px-4 py-2 rounded-xl text-lg font-medium"
        >
          <span>Start Pomodo</span>
          <div
            @click="this.$router.push({ name: 'pomodoro' })"
            class="h-full px-4 py-2 rounded-lg bg-primary"
          >
            <font-awesome-icon :icon="['fas', 'play']" />
          </div>
        </div>
      </section>
    </div>
    <div class="flex justify-evenly mt-8">
      <SmallCard
        class="w-1/4"
        :icon="svgs.incomplete"
        :number="Number.parseInt(task.incompleted)"
        customImg="w-1/2"
        title="Complete Task"
      />
      <SmallCard
        class="w-1/4"
        :icon="svgs.complete"
        :number="Number.parseInt(task.completed)"
        title="Incomplete Task"
      />
      <SmallCard
        class="w-1/4"
        :icon="svgs.cumulative"
        :number="task.cumulative"
        title="Cumulative Time"
      />
    </div>
    <div class="flex w-full gap-8 mt-8">
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Classes - Exams Today"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-5">
            <span>Room</span>
            <span>Start Time</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <Task
            @click="handleClickClassItem(item)"
            v-if="course.today.length > 0"
            v-for="(item, index) in course.today"
            :key="index"
            class="mb-2 max-h-[86px]"
            :room="item.room"
            :date="formatTime(item.start_time)"
          >
            <div class="flex items-center gap-4">
              <img
                class="w-10 h-10 rounded-full object-contain"
                src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
              <div>
                <h3 class="font-medium text-lg">{{ item.course_name }}</h3>
                <h5 class="font-light">{{ item.teacher }}</h5>
              </div>
            </div>
          </Task>
          <div
            @click="handleClickExamItem(item)"
            v-for="(item, index) in exam.today"
            :class="index !== 0 && 'mt-2'"
            :key="index"
            class="flex justify-between item-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            <section>
              <h3 class="flex">
                <span class="max-w-[20ch] block truncate">{{ item.name }}</span>
                <span> | </span>
                <span>Course: {{ item.course_name }}</span>
              </h3>
              <small>
                <span>Room: {{ item.room }}</span>
                <span> | </span>
                <span>Duration: {{ item.duration }} mins</span>
              </small>
            </section>
            <section class="flex items-center gap-4">
              <div class="font-bold">
                <small>{{ formatTime(item.start_time) }}</small> <br />
                <small>{{ formatDate(item.start_date) }}</small>
              </div>
            </section>
          </div>
          <p v-if="course.today.length === 0">Not found any task</p>
        </ul>
      </Card>
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Tomorrow"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-5">
            <span>Room</span>
            <span>Start Time</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <Task
            @click="handleClickClassItem(item)"
            v-if="course.tomorrow.length > 0"
            v-for="(item, index) in course.tomorrow"
            :key="index"
            class="mb-2 max-h-[86px]"
            :room="item.room"
            :date="formatTime(item.start_time)"
          >
            <div class="flex items-center gap-4">
              <img
                class="w-10 h-10 rounded-full object-contain"
                src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
              <div>
                <h3 class="font-medium text-lg">{{ item.course_name }}</h3>
                <h5 class="font-light">{{ item.teacher }}</h5>
              </div>
            </div>
          </Task>
          <div
            @click="handleClickExamItem(item)"
            v-for="(item, index) in exam.today"
            :class="index !== 0 && 'mt-2'"
            :key="index"
            class="flex justify-between item-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            <section>
              <h3 class="flex">
                <span class="max-w-[20ch] block truncate">{{ item.name }}</span>
                <span> | </span>
                <span>Course: {{ item.course_name }}</span>
              </h3>
              <small>
                <span>Room: {{ item.room }}</span>
                <span> | </span>
                <span>Duration: {{ item.duration }} mins</span>
              </small>
            </section>
            <section class="flex items-center gap-4">
              <div class="font-bold">
                <small>{{ formatTime(item.start_time) }}</small> <br />
                <small>{{ formatDate(item.start_date) }}</small>
              </div>
            </section>
          </div>
          <p v-if="course.tomorrow.length === 0 && exam.tomorrow.length === 0"
            >Not found any task</p
          >
        </ul>
      </Card>
    </div>
    <div class="flex w-full gap-8 mt-8">
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Due Tasks"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-9">
            <span>Due at</span>
            <span class="mr-6">Detail</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <TaskColor
            @click-button="handleClickDetail(item)"
            v-for="(item, index) in task.due"
            :key="index"
            :showCheckbox="false"
            :class="index > 0 && 'mt-2'"
            :title="item.name"
            :date="formatDate(item.end_date)"
            :hex-color="item.color_code || '#FABB18'"
            v-if="task.due.length > 0"
          />
          <p v-if="task.due.length === 0">Not found any task</p>
        </ul>
      </Card>
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Overdue Tasks"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-9">
            <span>Due at</span>
            <span class="mr-6">Detail</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <TaskColor
            @click-button="handleClickDetail(item)"
            v-for="(item, index) in task.overdue"
            :key="index"
            :showCheckbox="false"
            :class="index > 0 && 'mt-2'"
            :title="item.name"
            :date="formatDate(item.end_date)"
            :hex-color="item.color_code || '#FABB18'"
            v-if="task.overdue.length > 0"
          />
          <p v-if="task.overdue.length === 0">Not found any task</p>
        </ul>
      </Card>
    </div>
    <Popup v-if="showPopupTask" @click-overlay="() => (showPopupTask = false)">
      <template #header-left>
        <h3>{{ popupTaskData.name }}</h3>
        <small>Course: {{ popupTaskData.course_name }}</small>
      </template>
      <div>
        <div class="flex gap-4 items-center mb-4">
          <font-awesome-icon :icon="['far', 'calendar-alt']" />
          <div>
            <p>Due at {{ formatDate(popupTaskData.end_date) }}</p>
            <p
              v-show="
                popupTaskData.distance_day > 0 && popupTaskData.status === 0
              "
              class="text-sm text-green-400"
              >{{ popupTaskData.distance_day }} days to complete</p
            >
            <p
              v-show="
                popupTaskData.distance_day < 0 && popupTaskData.status === 0
              "
              class="text-sm text-danger"
              >Overdue by {{ Math.abs(popupTaskData.distance_day) }} days</p
            >
            <p
              v-show="
                popupTaskData.distance_day === 0 && popupTaskData.status == 0
              "
              class="text-sm text-primary"
              >Exprises in today</p
            >
            <p v-show="popupTaskData.status === 1" class="text-sm text-blue-400"
              >Completed</p
            >
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <font-awesome-icon :icon="['fas', 'list']" />
          <p>Type: {{ popupTaskData.type }}</p>
        </div>
        <section class="mt-4">
          <h4
            class="relative after:w-full after:h-[1px] after:bg-blue-300 after:right-0 after:absolute after:top-1/2"
          >
            <span class="bg-white relative z-10 pr-4">Due for class</span>
          </h4>
        </section>
        <section>
          <span class="text-gray-500 font-light"
            >This task is not due on a date when a web technology class
            occurs.</span
          >
        </section>
      </div>
    </Popup>
    <Popup @click-overlay="() => (showPopupExam = false)" v-if="showPopupExam">
      <template #header-left>
        <h3>{{ popupExamData.name }}</h3>
      </template>
      <div>
        <div class="flex gap-4 items-start p-4">
          <font-awesome-icon :icon="['far', 'calendar-alt']" />
          <p
            >{{ formatTime(popupExamData.start_time) }}-{{
              formatDate(popupExamData.start_date)
            }}</p
          >
        </div>
        <div class="flex gap-4 items-start p-4">
          <font-awesome-icon :icon="['fas', 'book']" />
          <p>{{ popupExamData.course_name }}</p>
        </div>
        <div class="flex gap-4 items-start p-4">
          <font-awesome-icon :icon="['far', 'clock']" />
          <p>{{ popupExamData.duration }} minutes</p>
        </div>
        <div class="flex gap-4 items-start p-4">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          <p>{{ popupExamData.room }}</p>
        </div>
        <section class="mt-4">
          <h4
            class="relative after:w-full after:h-[1px] after:bg-blue-300 after:right-0 after:absolute after:top-1/2"
          >
            <span class="bg-white relative z-10 pr-4">Revision task</span>
          </h4>
        </section>
        <section>
          <span class="text-gray-500 font-light"
            >This exam has no incomplete revision tasks.</span
          >
        </section>
      </div>
    </Popup>
    <Popup v-if="showPopupClass" @clickOverlay="showPopupClass = false">
      <template #header-left>
        <h3>{{ popupClassData.class.course_name }}</h3>
      </template>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['far', 'calendar-alt']"
        />
        <span class="text-lg"
          >{{ formatTime(popupClassData.class.start_time) }} -
          {{ formatDate(popupClassData.class.date) }}</span
        >
      </section>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['fas', 'map-marker-alt']"
        />
        <span class="text-lg">{{ popupClassData.class.room }}</span>
      </section>
      <section class="flex items-center mb-6">
        <font-awesome-icon
          class="text-xl mr-4 float-left"
          :icon="['fas', 'chalkboard-teacher']"
        />
        <span class="text-lg">{{ popupClassData.class.teacher }}</span>
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
            v-if="popupClassData.tasks.length > 0"
            v-for="(item, index) in popupClassData.tasks"
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
          v-if="popupClassData.tasks.length === 0"
          class="text-gray-500 font-light"
          >There are no tasks due for this class</span
        >
      </section>
    </Popup>
  </div>
</template>

<script>
  import SmallCard from "@/components/SmallCard/SmallCard.vue";
  import Card from "@/components/Card/Card.vue";
  import Task from "@/components/Task/Task.vue";
  import DashboardView from "./DashboardView";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import Popup from "@/components/Popup/Popup.vue";

  export default {
    name: "DashboardView",
    components: {
      SmallCard,
      Card,
      Task,
      TaskColor,
      Popup,
    },
    mixins: [DashboardView],
  };
</script>

<style lang="scss">
  .custom_scrollbar {
    &::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdbdbdcf;
      border-radius: 32px;
    }

    &:hover::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
</style>
<style lang="scss" module>
  .custom_card h4 {
    font-size: 20px;
  }
</style>
