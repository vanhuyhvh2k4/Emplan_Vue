<template>
  <div class="flex w-full h-full p-8 gap-4">
    <div class="w-1/2">
      <div class="flex bg-white rounded-lg p-4 items-center justify-between">
        <div class="flex gap-4">
          <label for="select" class="font-medium text-lg"
            >Filter by course</label
          >
          <select
            class="outline-none border border-gray-400 rounded-sm"
            id="select"
            v-model="selectVal"
            @change="handleSelectChange"
          >
            <option value="all">All Courses</option>
            <option
              v-for="(item, index) in course.all"
              :key="index"
              :value="item.id"
              >{{ item.name }}</option
            >
          </select>
        </div>
        <div class="flex item-center gap-4">
          <span class="font-medium text-lg">Completed</span>
          <input
            @change="handleChangeCompleted"
            v-model="isCompleted"
            class="w-6 h-6"
            type="checkbox"
          />
        </div>
      </div>
      <ul
        v-show="showExams.length"
        class="mt-6 bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar"
      >
        <div class="flex justify-between mb-4">
          <small class="flex-[0.7]">Exam infomation</small>
          <small>Date</small>
          <small>Select</small>
        </div>
        <div
          @click="handleClickExamItem(item)"
          v-for="(item, index) in showExams"
          :key="index"
          class="flex justify-between item-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-200 cursor-pointer"
          :class="index !== showExams.length - 1 ? 'mb-4' : ''"
        >
          <section>
            <h3>
              <span>{{ item.name }}</span>
              <span> | </span>
              <span>{{ item.course.name }}</span>
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
            <span v-show="item.completed">
              <font-awesome-icon
                class="text-green-500 mr-2"
                :icon="['fas', 'check-circle']"
              />
              <span class="text-green-500 font-medium">Finished</span>
            </span>
            <input
              @click.stop="handleClickCheckbox($event.target.checked, item)"
              class="w-6 h-6"
              type="checkbox"
              ref="checkboxExamRefs"
            />
          </section>
        </div>
      </ul>
    </div>
    <div class="w-1/2">
      <div class="p-4 w-full flex justify-end items-center relative">
        <Button @click="handleClickNewExamButton" size="sm" title="New Exam" />
        <div class="absolute w-full max-w-[80%] top-0 right-0">
          <Form
            title="Create new exam"
            v-if="isShowForm"
            @click-exit="handleClickNewExamButton"
          >
            <Select
              class="mb-2"
              label="Subject"
              value="id"
              show="name"
              :defaultValue="course.all[0]?.id"
              :arrOptions="course.all"
              @select-change="(value) => (newExamData.subject = value)"
            />
            <Input
              class="mb-2"
              type="text"
              label="Name"
              @input-enter="
                (value) => {
                  newExamData.name = value;
                }
              "
            />
            <div class="flex gap-4 mb-2">
              <Input
                @input-enter="(value) => (newExamData.room = value)"
                type="text"
                label="Room number"
              />
              <Input
                type="date"
                label="Date"
                @input-enter="(value) => (newExamData.date = value)"
              />
            </div>
            <div class="mb-2 flex gap-6">
              <Input
                @input-enter="(value) => (newExamData.start = value)"
                label="Start"
                type="time"
              />
              <Input
                @input-enter="(value) => (newExamData.duration = value)"
                defaultValue="50"
                label="Duration"
                type="number"
                placeholder=""
              />
            </div>
            <div class="mt-4 px-6 pb-4 flex justify-center gap-6">
              <Button
                size="sm"
                buttonType="outline"
                title="Cancel"
                @click="this.isShowForm = false"
              />
              <Button @click="handleClickNewExam" size="sm" title="Create" />
            </div>
          </Form>
        </div>
      </div>
      <div
        v-show="arrCheckboxValues.length > 0"
        class="bg-white mt-3 p-4 rounded-lg"
      >
        <div v-show="arrCheckboxValues.length > 0" class="text-center">
          <small class="text-gray-600 mb-2 block"
            >{{ arrCheckboxValues.length }} exams selected</small
          >
          <Button
            @click="handleClickSelectedDelete"
            :class="$style.custom_button"
            title="Delete exams"
            size="sm"
            class="mb-2 mx-auto"
          />
          <Button
            @click="handleClickClearSelection"
            :class="$style.custom_button"
            title="Clear selection"
            button-type="outline"
            size="sm"
            class="mb-2 mx-auto"
          />
        </div>
      </div>
    </div>
    <Popup
      v-if="showPopupExam"
      @click-overlay="
        () => {
          showPopupExam = false;
          showEditForm = false;
        }
      "
    >
      <template #header-left>
        <h3>{{ popupExamData.course_name }}</h3>
      </template>
      <template #header-right>
        <font-awesome-icon
          @click="handleClickDeleteExam"
          class="cursor-pointer"
          :icon="['fas', 'trash-alt']"
        />
        <font-awesome-icon
          @click="handleClickEditTask"
          class="cursor-pointer"
          :icon="['fas', 'pen']"
        />
        <font-awesome-icon
          @click="
            () => {
              showPopupExam = false;
            }
          "
          class="cursor-pointer"
          :icon="['fas', 'times']"
        />
      </template>
      <div v-if="!showEditForm">
        <div class="flex gap-4 items-start p-4">
          <font-awesome-icon :icon="['far', 'calendar-alt']" />
          <p
            >{{ formatTime(popupExamData.start_time) }}-{{
              formatDate(popupExamData.start_date)
            }}</p
          >
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
      <div v-if="showEditForm">
        <div class="flex gap-4">
          <Select
            class="mb-2"
            label="Subject"
            value="id"
            show="name"
            :defaultValue="popupExamData.course_id"
            :arrOptions="course.all"
            @select-change="(value) => (editExamData.course_id = value)"
          />
          <Input
            @input-enter="(value) => (editExamData.name = value)"
            label="Name"
            :defaultValue="popupExamData.name"
          />
        </div>
        <div class="flex gap-4 mb-2">
          <Input
            @input-enter="(value) => (editExamData.room = value)"
            type="text"
            label="Room number"
            :defaultValue="popupExamData.room"
          />
          <Input
            type="date"
            label="Date"
            @input-enter="(value) => (editExamData.start_date = value)"
            :defaultValue="popupExamData.start_date"
          />
        </div>
        <div class="mb-2 flex gap-6">
          <Input
            @input-enter="(value) => (editExamData.start_time = value)"
            label="Start"
            type="time"
            :defaultValue="popupExamData.start_time"
          />
          <Input
            @input-enter="(value) => (editExamData.duration = value)"
            :defaultValue="popupExamData.duration"
            label="Duration"
            type="number"
            placeholder=""
          />
        </div>
        <div class="mt-4 flex justify-end gap-6">
          <Button
            size="sm"
            buttonType="outline"
            title="Cancel"
            @click="
              () => {
                this.showEditForm = false;
              }
            "
          />
          <Button @click="handleClickSaveEditExam" size="sm" title="Save" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
  import Select from "@/components/Select/Select.vue";
  import Button from "@/components/Button/Button.vue";
  import Form from "@/components/Form/Form.vue";
  import Input from "@/components/Input/Input.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import ExamView from "./ExamView.js";
  import Popup from "@/components/Popup/Popup.vue";
  export default {
    name: "TaskView",
    components: { TaskColor, Button, Form, Input, Select, Popup },
    mixins: [ExamView],
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

  #primary_color {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    -webkit-appearance: none;
  }

  #primary_color::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  #primary_color::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
</style>

<style lang="scss" module>
  .custom_button {
    padding: 12px;
    min-width: 40%;
  }
</style>
