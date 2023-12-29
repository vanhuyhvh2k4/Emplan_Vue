<template>
  <div class="w-full h-full p-8 flex gap-4">
    <div class="w-1/5 py-4 rounded-lg bg-white">
      <ul>
        <li
          class="p-2 mb-2 border"
          v-for="(item, index) in schoolYear.all"
          :key="index"
          @click="
            () => {
              schoolYear.currentYearId = item.id;
              getListClasses();
              getSemesterBySchoolYearId(item.id);
            }
          "
        >
          <div
            class="hover:bg-gray-200 cursor-pointer"
            :class="
              schoolYear.currentYearId === item.id &&
              semester.bySchoolYearId.length === 0
                ? 'bg-gray-200'
                : ''
            "
          >
            <p class="font-bold text-lg"
              >{{ item.start_date.split("-")[0] }} -
              {{ item.end_date.split("-")[0] }}</p
            >
            <p>
              {{ formatDate(item.start_date) }} -
              {{ formatDate(item.end_date) }}
            </p>
          </div>
          <ul class="mt-2" v-if="schoolYear.currentYearId === item.id">
            <li
              @click="
                () => {
                  semester.currentSemesterId = item.id;
                  getAllCourse(semester.currentSemesterId);
                }
              "
              class="pl-4 hover:bg-gray-200 cursor-pointer"
              :class="semester.currentSemesterId === item.id && 'bg-gray-200'"
              v-for="(item, index) in semester.bySchoolYearId"
              :key="index"
            >
              <p>{{ item.name }}</p>
              <p>
                <span
                  >{{ formatDate(item.start_date) }} -
                  {{ formatDate(item.end_date) }}</span
                >
              </p>
            </li>
          </ul>
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
            @click="handleClickShowPopupEditSchoolYear"
            size="sm"
            :class="$style.custom_button"
            title="Edit School Year"
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
          <h2 class="text-lg font-medium">Course list</h2>
          <Button title="New class" size="sm" @click="handleClickNewClass" />
        </div>
        <ul
          class="bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar mt-2"
        >
          <TaskColor
            :title="item.name"
            :desc="item.teacher"
            :hex-color="item.color_code !== null ? item.color_code : '#000'"
            class="mb-4"
            :date="
              formatDate(item.start_date) + ' - ' + formatDate(item.end_date)
            "
            v-for="(item, index) in courses.all"
            :key="index"
          />
          <h3 v-if="courses.all.length === 0">Not found any course</h3>
        </ul>
      </div>
    </div>
    <Popup
      title="Create new class"
      v-if="showPopup"
      @click-overlay="this.showPopup = false"
    >
      <template #header-left>
        <h3>Create new class</h3>
      </template>
      <section class="flex gap-4 mt-2">
        <Select
          v-if="newClassData.subject"
          :arrOptions="courses.all"
          value="id"
          show="name"
          label="Subject"
          :defaultValue="newClassData.subject"
          @select-change="(value) => (newClassData.subject = value)"
        />
        <Input
          @input-enter="
            (value) => {
              newClassData.room = value;
            }
          "
          label="Room"
          placeholder="Enter your room"
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
          <span
            class="block h-7 aspect-square rounded-full"
            :style="`background-color: ${item.color_code || '#FABB18'};`"
          ></span>
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
        ><Input
          @input-enter="(value) => (newCourseData.name = value)"
          label="Name"
          placeholder=""
        />
        <input
          v-model="newCourseData.color_code"
          class="flex-shrink-0"
          type="color"
          name=""
          :class="$style.primary_color"
        />
      </div>
      <Input
        @input-enter="(value) => (newCourseData.teacher = value)"
        class="mb-2"
        label="Teacher"
      />
      <div class="flex items-center mb-2">
        <Select
          class="flex-[0.5] mr-4"
          label="School Year"
          show="format"
          value="id"
          @select-change="handleChangeSchoolYear"
          defautValue=""
          :arrOptions="schoolYear.all"
        />
        <Select
          class="flex-[0.5]"
          :key="newCourseData.semester_id"
          v-if="semester.bySchoolYearId.length > 0"
          label="Term"
          :arrOptions="semester.bySchoolYearId"
          @select-change="
            (semesterId) => (newCourseData.semester_id = semesterId)
          "
          show="name"
          value="id"
          :defaultValue="newCourseData.semester_id"
        />
        <small
          class="flex-[0.5] self-end"
          v-if="semester.bySchoolYearId.length === 0 && changeSchoolYear"
          >Not found any term of this school year</small
        >
      </div>
      <div class="flex items-center gap-4 mb-2">
        <Input
          @input-enter="(value) => (newCourseData.start_date = value)"
          label="Start date"
          type="date"
        />
        <Input
          @input-enter="(value) => (newCourseData.end_date = value)"
          label="End date"
          type="date"
        />
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
        <Button @click="handleClickCreateNewCourse" title="Save" size="sm" />
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
      <p class="mt-4">
        <span> What Are Academic Years?</span>
        <br />
        <small
          >An academic year and its terms are used to represent your school year
          and any terms (eg. semesters, trimesters, quarters) that you may
          have.</small
        >
      </p>
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
    <Popup
      v-if="showPopupEditAcademyYear"
      @click-overlay="() => (showPopupEditAcademyYear = false)"
    >
      <template #header-left>
        <h3>Edit Academic Year</h3>
        <select
          @change="
            () => {
              updateEditSchoolYearData();
              getSemesterBySchoolYearId(schoolYear.currentYearId);
            }
          "
          v-model="schoolYear.currentYearId"
          class="bg-primary"
        >
          <option
            :value="item.id"
            v-for="(item, index) in schoolYear.all"
            :key="index"
            value=""
            >{{
              item.start_date.split("-")[0] +
              " - " +
              item.end_date.split("-")[0]
            }}</option
          >
        </select>
      </template>
      <div class="flex items-center gap-4">
        <Input
          :key="editSchoolYearData.start_date"
          @input-enter="(value) => (editSchoolYearData.start_date = value)"
          :defaultValue="editSchoolYearData.start_date"
          label="Start Date"
          type="date"
        />
        <Input
          :key="editSchoolYearData.end_date"
          @input-enter="(value) => (editSchoolYearData.end_date = value)"
          :defaultValue="editSchoolYearData.end_date"
          label="End Date"
          type="date"
        />
      </div>
      <div class="p-4 border border-gray-200 mt-4">
        <div v-if="showAddTerm" class="mb-4">
          <font-awesome-icon
            @click="() => (showAddTerm = false)"
            class="float-right text-lg text-gray-400 cursor-pointer hover:text-black"
            :icon="['fas', 'times']"
          />
          <Input
            @input-enter="(value) => (newTermData.name = value)"
            label="Name"
          />
          <div class="flex items-center gap-4 mt-2">
            <Input
              @input-enter="(value) => (newTermData.start_date = value)"
              label="Start Date"
              type="date"
            />
            <Input
              @input-enter="(value) => (newTermData.end_date = value)"
              label="End Date"
              type="date"
            />
          </div>
          <Button
            @click="handleClickNewTerm"
            title="Save"
            class="w-full mt-4"
            size="sm"
          />
        </div>
        <ul v-if="!showAddTerm && semester.bySchoolYearId.length > 0">
          <li
            v-for="(item, index) in semester.bySchoolYearId"
            :key="index"
            :class="index !== 0 && 'mt-2'"
            class="flex justify-between items-center border border-gray-200 px-4 py-2 hover:bg-gray-200"
          >
            <div>
              <h4>{{ item.name }}</h4>
              <small
                >{{ formatDate(item.start_date) }} -
                {{ formatDate(item.end_date) }}</small
              >
            </div>
            <font-awesome-icon
              @click="handleClickDeleteTerm(item)"
              class="text-gray-400 hover:text-black cursor-pointer"
              :icon="['fas', 'trash-alt']"
            />
          </li>
        </ul>
        <ul v-if="arrNewTerm.length > 0 && !showAddTerm">
          <li
            v-for="(item, index) in arrNewTerm"
            :key="index"
            class="flex justify-between items-center border border-gray-200 px-4 py-2 hover:bg-gray-200"
            :class="index !== 0 && 'mt-2'"
          >
            <div>
              <h4>{{ item.name }}</h4>
              <small
                >{{ formatDate(item.start_date) }} -
                {{ formatDate(item.end_date) }}</small
              >
            </div>
            <font-awesome-icon
              @click="handleClickDeleteTerm(item)"
              class="text-gray-400 hover:text-black cursor-pointer"
              :icon="['fas', 'trash-alt']"
            />
          </li>
        </ul>
        <div
          @click="() => (showAddTerm = true)"
          v-if="!showAddTerm"
          class="m-auto w-fit text-primary cursor-pointer mt-4"
          >New term</div
        >
      </div>
      <div class="flex justify-end gap-4 mt-4">
        <Button
          @click="() => (showPopupEditAcademyYear = false)"
          title="Cancel"
          size="sm"
          button-type="outline"
        />
        <Button @click="handleClickSaveEditSchoolYear" title="Save" size="sm" />
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

  .primary_color {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    -webkit-appearance: none;
  }

  .primary_color::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  .primary_color::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
</style>
