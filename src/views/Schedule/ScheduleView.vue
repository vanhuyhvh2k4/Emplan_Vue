<template>
  <div class="w-full h-full p-8 flex gap-4">
    <div class="w-1/5 p-4 rounded-lg bg-white">
      <ul>
        <li>
          <div class="font-medium text-lg">2023 - 2024</div>
          <div>Nov 16 2023 - May 16 2024</div>
        </li>
      </ul>
    </div>
    <div class="w-4/5 max-w-[800px]">
      <div
        class="w-full rounded-lg bg-white flex items-center justify-between p-4"
      >
        <div class="flex items-center gap-4">
          <Button
            size="sm"
            :class="$style.custom_button"
            title="Manage course"
            @click="() => (showManageCourse = true)"
          />
          <Button
            size="sm"
            :class="$style.custom_button"
            title="Edit 2023-2024"
          />
        </div>
        <Button
          @click="() => (showPopupNewYear = true)"
          size="sm"
          title="New year"
        />
      </div>
      <div class="w-full bg-white mt-4 rounded-lg p-4">
        <div class="flex item-center justify-between">
          <h2 class="text-lg font-medium">Classes list</h2>
          <Button title="New class" size="sm" @click="this.showPopup = true" />
        </div>
        <ul
          class="bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar mt-2"
        >
          <TaskColor
            :title="item.course_name"
            :desc="item.teacher"
            :hex-color="item.color_code !== null ? item.color_code : '#000'"
            class="mb-4"
            v-for="(item, index) in classes.all"
            :key="index"
          />
        </ul>
      </div>
    </div>
    <Popup
      title="Create new class"
      v-show="showPopup"
      @click-overlay="this.showPopup = false"
    >
      <template #header-left>
        <h3>Create new class</h3>
      </template>
      <Select
        :arrOptions="courses.all"
        value="id"
        show="name"
        label="Subject"
        defaultValue="1"
        @select-change="(value) => (newClassData.subject = value)"
      />
      <section class="flex gap-4 mt-2">
        <Input
          @input-enter="
            (value) => {
              newClassData.room = value;
            }
          "
          label="Room"
          placeholder="Enter your room"
        />
        <Input
          @input-enter="(value) => (newClassData.teacher = value)"
          label="Teacher"
          placeholder="Enter your teacher"
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
              @input-enter="(value) => (newClassData.date = value)"
              type="date"
              label="Date"
            />
            <div class="flex gap-4 mt-2">
              <Input
                @input-enter="(value) => (newClassData.start = value)"
                type="time"
                label="Start time"
              />
              <Input
                @input-enter="(value) => (newClassData.end = value)"
                type="time"
                label="End time"
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
              v-show="showAddTimeButton"
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
          @click="this.showPopup = false"
          >Cancel</div
        >
        <div
          @click="handleClickCreateNewClass"
          class="p-2 px-4 rounded-lg border border-primary bg-primary text-white cursor-pointer"
          >Save</div
        >
      </section>
    </Popup>
    <Popup
      v-if="showManageCourse"
      @click-overlay="() => (showManageCourse = false)"
      :class="$style.custom_popup"
    >
      <template #header-left>
        <h3>Manage course</h3>
      </template>
      <template #header-right>
        <font-awesome-icon
          class="cursor-pointer"
          @click="() => (showManageCourse = false)"
          :icon="['fas', 'times']"
        />
      </template>
      <ul class="max-h-[244px] overflow-y-scroll">
        <li
          v-for="(item, index) in courses.all"
          :key="index"
          class="p-4 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
          :class="courses.all.length > 1 && 'border-b-[1px] border-gray-200'"
        >
          <span class="block h-7 aspect-square rounded-full bg-blue-400"></span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <Button
        @click="
          () => {
            showManageCourse = false;
            showAddCourse = true;
          }
        "
        size="sm"
        title="New subject"
        class="ml-auto mt-4"
      />
    </Popup>
    <Popup v-if="showAddCourse">
      <template #header-left>
        <h3>New subject</h3>
      </template>
      <div class="flex items-end gap-4 mb-2"
        ><Input label="Name" placeholder="" />
        <input class="flex-shrink-0" type="color" name="" id="primary_color" />
      </div>
      <div class="flex items-center gap-4 mb-2">
        <Input class="flex-[0.5]" />
        <div class="relative flex-[0.5]">
          <Input />
          <div class="py-4 w-full bg-white shadow-md absolute">
            <strong
              class="relative px-4 py-2 cursor-pointer block hover:bg-gray-200"
              >2023-2024
              <div
                class="hidden absolute shadow-md min-h-[100px] bg-white right-0 bottom-0 w-1/2"
              >
                <small
                  class="border border-gray-200 p-2 cursor-pointer hover:bg-gray-200 w-full block"
                  >Term 1</small
                >
              </div>
            </strong>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4 mb-2">
        <Input type="date" />
        <Input type="date" />
      </div>
      <p>
        <strong class="font-normal">What Are Subjects?</strong> <br />
        <small class="text-gray-700">
          Subjects are also known as courses and enable you to group all of your
          classes, tasks and exams for that course.
        </small>
      </p>
      <div class="flex justify-end mt-4 gap-4">
        <Button
          @click="
            () => {
              showAddCourse = false;
              showManageCourse = true;
            }
          "
          title="Cancel"
          size="sm"
          button-type="outline"
        />
        <Button title="Save" size="sm" />
      </div>
    </Popup>
    <Popup
      @click-overlay="() => (showPopupNewYear = false)"
      v-if="showPopupNewYear"
    >
      <template #header-left>
        <h3>New Academic Year</h3>
      </template>
      <div class="flex items-center gap-4">
        <Input
          @input-enter="(value) => (newYearData.startDate = value)"
          label="Start date"
          type="date"
        />
        <Input
          @input-enter="(value) => (newYearData.endDate = value)"
          label="End date"
          type="date"
        />
      </div>
      <!-- <div class="p-4 border border-gray-200 mt-4">
        <div v-if="showAddTerm" class="mb-4">
          <font-awesome-icon
          @click="() => showAddTerm = false"
            class="float-right text-lg text-gray-400 cursor-pointer hover:text-black"
            :icon="['fas', 'times']"
          />
          <Input />
          <div class="flex items-center gap-4">
            <Input type="date" />
            <Input type="date" />
          </div>
          <Button class="w-full mt-4" size="sm" />
        </div>
        <div
          @click="() => (showAddTerm = true)"
          v-if="!showAddTerm"
          class="m-auto w-fit text-primary cursor-pointer"
          >New term</div
        >
      </div> -->
      <div class="flex justify-end gap-4 mt-4">
        <Button
          @click="() => (showPopupNewYear = false)"
          title="Cancel"
          size="sm"
          button-type="outline"
        />
        <Button @click="handleClickCreateSchoolYear" title="Create" size="sm" />
      </div>
    </Popup>
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Input from "@/components/Input/Input.vue";
  import Popup from "@/components/Popup/Popup.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import DateChoose from "@/components/DateChoose/DateChoose.vue";
  import ScheduleView from "./ScheduleView";
  import Select from "@/components/Select/Select.vue";

  export default {
    name: "ScheduleView",
    components: { Button, TaskColor, Popup, Input, DateChoose, Select },
    mixins: [ScheduleView],
  };
</script>

<style lang="scss" module>
  .custom_button {
    background-color: black;
    &:hover {
      background-color: white;
      color: black;
      border-color: #ccc;
    }
  }

  .custom_popup {
    & > div {
      max-width: 400px;
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
