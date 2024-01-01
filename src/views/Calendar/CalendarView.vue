<template>
  <div class="w-full h-full p-8 relative">
    <div>
      <FullCalendar :options="calendarOptions" />
    </div>
    <!-- Popup Detail Class -->
    <Popup v-if="isShowPopup" @clickOverlay="this.isShowPopup = false">
      <template #header-left>
        <h3>{{ popupData.course_name }}</h3>
      </template>
      <template #header-right>
        <font-awesome-icon
          @click="handleClickDeleteClass"
          class="cursor-pointer"
          :icon="['fas', 'trash-alt']"
        />
        <font-awesome-icon
          @click="handleClickEditClass"
          class="cursor-pointer"
          :icon="['fas', 'pen']"
        />
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
          {{ formatTime(popupData.end_time) }} |
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
            @click="handleClickDetailTask(item)"
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
    <!-- Popup Edit Class -->
    <Popup
      title="Create new class"
      v-if="showPopupEditClass"
      @click-overlay="this.showPopupEditClass = false"
    >
      <template #header-left>
        <h3>Edit class</h3>
      </template>
      <section class="flex gap-4 mt-2">
        <Select
          :arrOptions="course.all"
          value="id"
          show="name"
          label="Subject"
          :defaultValue="editClassData.course_id"
          @select-change="(value) => (editClassData.course_id = value)"
        />
        <Input
          @input-enter="
            (value) => {
              editClassData.room = value;
            }
          "
          label="Room"
          placeholder="Enter your room"
          :defaultValue="editClassData.room"
        />
      </section>
      <section class="mt-4">
        <div class="flex">
          <div
            class="p-2 border border-gray-200 bg-gray-200 rounded-sm cursor-pointer"
            :class="showOneOffButton && 'bg-white border-b-0'"
            @click="this.showOneOffButton = true"
            >One-off</div
          >
          <div
            class="p-2 border border-gray-200 bg-gray-200 rounded-sm cursor-pointer"
            :class="!showOneOffButton && 'bg-white border-b-0'"
            @click="this.showOneOffButton = false"
            >Repeats</div
          >
        </div>
        <div class="p-4 border border-gray-200 mt-[-1px]">
          <div v-if="showOneOffButton">
            <Input
              @input-enter="(value) => (editClassData.date = value)"
              type="date"
              label="Date"
              :defaultValue="editClassData.date"
            />
            <div class="flex gap-4 mt-2">
              <Input
                @input-enter="(value) => (editClassData.start_time = value)"
                type="time"
                label="Start time"
                :defaultValue="editClassData.start_time"
              />
              <Input
                @input-enter="(value) => (editClassData.end_time = value)"
                type="time"
                label="End time"
                :defaultValue="editClassData.end_time"
              />
            </div>
          </div>
          <div v-if="!showOneOffButton">
            <div v-if="showFormAddTime">
              <font-awesome-icon
                @click="
                  this.showFormAddTime = false;
                  this.showAddTimeButton = true;
                "
                class="float-right text-lg text-gray-400 cursor-pointer hover:text-black"
                :icon="['fas', 'times']"
              />
              <DateChoose @click-date="handleClickDate" />
              <div class="flex gap-4">
                <Input
                  @input-enter="(value) => (this.newAddTimeData.start = value)"
                  type="time"
                  label="Start time"
                />
                <Input
                  @input-enter="(value) => (this.newAddTimeData.end = value)"
                  type="time"
                  label="End time"
                />
              </div>
              <Button
                @click="handleClickAddTime"
                title="Save"
                size="sm"
                class="w-full mt-4"
              />
            </div>
            <div class="mb-4">
              <div
                v-if="arrRepeatTime.length > 0"
                v-for="(item, index) in arrRepeatTime"
                :key="index"
                class="flex justify-between items-center py-2 mt-2"
                :class="
                  arrRepeatTime.length > 1 && 'border-b-[1px] border-gray-200'
                "
              >
                <section>
                  <h3>{{ `${item.start} - ${item.end}` }}</h3>
                  <h4>{{
                    item.dates.map((element) => element.name).join(", ")
                  }}</h4>
                </section>
                <section>
                  <font-awesome-icon
                    @click="handleClickRemoveTime(item)"
                    class="cursor-pointer hover:text-primary"
                    :icon="['fas', 'trash-alt']"
                  />
                </section>
              </div>
            </div>
            <div
              v-show="showAddTimeButton && arrRepeatTime < 2"
              @click="
                this.showFormAddTime = true;
                this.showAddTimeButton = false;
              "
              class="text-center text-primary cursor-pointer hover:text-black"
              >Add time</div
            >
          </div>
        </div>
      </section>
      <section class="flex justify-end mt-4 gap-4">
        <div
          class="p-2 rounded-lg border border-gray-400 cursor-pointer"
          @click="this.showPopupEditClass = false"
          >Cancel</div
        >
        <div
          @click="handleClickSaveEditClass"
          class="p-2 px-4 rounded-lg border border-primary bg-primary text-white cursor-pointer"
          >Save</div
        >
      </section>
    </Popup>
    <!-- Popup Detail Task -->
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
    <LoaderCircle v-if="isLoading" />
  </div>
</template>

<script>
  import CalendarView from "./CalendarView";
  import FullCalendar from "@fullcalendar/vue3";
  import Popup from "@/components/Popup/Popup.vue";
  import formatTime from "@/utils/formatTime";
  import formatDate from "@/utils/formatDate";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import Select from "@/components/Select/Select.vue";
  import Input from "@/components/Input/Input.vue";
  import DateChoose from "@/components/DateChoose/DateChoose.vue";
  import Button from "@/components/Button/Button.vue";
  import LoaderCircle from "@/components/LoaderCircle/LoaderCircle.vue";

  export default {
    name: "CalendarViews",
    components: {
      FullCalendar,
      Popup,
      TaskColor,
      Select,
      Input,
      DateChoose,
      Button,
      LoaderCircle,
    },
    mixins: [CalendarView],
  };
</script>
