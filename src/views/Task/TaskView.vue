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
            @change="handleChangeCompleted($event.target.checked)"
            class="w-6 h-6"
            type="checkbox"
          />
        </div>
      </div>
      <ul
        class="mt-6 bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar"
      >
        <div class="flex justify-between mb-4">
          <small class="flex-[0.7]">Task infomation</small>
          <small>Due at</small>
          <small>Select</small>
        </div>
        <TaskColor
          ref="taskRefs"
          @click="handleClickTask(item)"
          @checkbox-change="handleCheckboxChange"
          :checkbox-id="item.id"
          :hexColor="item.color_code !== null ? item.color_code : '#FABB18'"
          :desc="'Course: ' + item.course_name + ' | ' + 'Type: ' + item.type"
          :title="item.task_name"
          :date="formatDate(item.end_date)"
          :isCompleted="item.status === 0 ? false : true"
          class="mb-4"
          v-for="(item, index) in showTask"
          :key="index"
          :class="
            compareDate(currentDate(), item.end_date) === 'greater' &&
            item.status === 0
              ? $style.custom_task_color
              : null
          "
        />
        <h3 v-if="showTask.length === 0">Not found any task</h3>
      </ul>
    </div>
    <div class="w-1/2">
      <div class="p-4 w-full flex justify-end items-center relative">
        <Button @click="this.isShowForm = true" size="sm" title="New Task" />
        <div class="absolute w-full max-w-[80%] top-0 right-0">
          <Form title="Create new task" v-if="isShowForm">
            <div>
              <Select
                v-if="newTaskData.subject"
                class="mb-2"
                label="Subject"
                :arrOptions="course.all"
                value="id"
                show="name"
                :defaultValue="newTaskData.subject"
                @select-change="
                  (value) => {
                    newTaskData.subject = value;
                    newTaskData.type = 'Assignment';
                    newTaskData.examId = null;
                  }
                "
              />
              <div class="flex gap-4 mb-2">
                <Select
                  :key="newTaskData.subject"
                  @select-change="handleChangeNewType"
                  label="Type"
                  :arrOptions="['Assignment', 'Reminder', 'Revision']"
                  :defaultValue="newTaskData.type"
                />
                <Input
                  @input-enter="(value) => (newTaskData.due = value)"
                  type="date"
                  label="Due Date"
                />
              </div>
              <Select
                @select-change="(value) => (newTaskData.examId = value)"
                class="mb-2"
                v-if="newTaskData.type === 'Revision' && newTaskData.examId"
                label="Exams"
                :arrOptions="exam.byCourse"
                show="name"
                value="id"
                :defaultValue="newTaskData.examId"
              />
              <Input
                @input-enter="(value) => (newTaskData.title = value)"
                label="Title"
                class="mb-2"
                placeholder="Enter the title"
              />
              <Input
                @input-enter="(value) => (newTaskData.description = value)"
                type="textarea"
                label="Detail"
                placeholder="Enter the description"
              />
            </div>
            <div class="mt-4 px-6 pb-4 flex justify-center gap-6">
              <Button
                size="sm"
                buttonType="outline"
                title="Cancel"
                @click="
                  () => {
                    this.isShowForm = false;
                    this.newTaskData.type = 'Assignment';
                  }
                "
              />
              <Button @click="handleClickNewTask" size="sm" title="Create" />
            </div>
          </Form>
        </div>
      </div>
      <div class="bg-white mt-3 p-4 rounded-lg">
        <div
          v-show="checkboxVals.length === 0"
          class="grid grid-cols-2 grid-rows-2 justify-items-stretch items-center gap-4"
        >
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Total Task</h4>
            <h4 class="text-3xl font-bold">{{ task.allTask.length }}</h4>
          </section>
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Due is coming</h4>
            <h4 class="text-3xl font-bold">{{ task.dueIsComing.length }}</h4>
          </section>
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Complete</h4>
            <h4 class="text-3xl font-bold">{{ task.completed.length }}</h4>
          </section>
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Incomplete</h4>
            <h4 class="text-3xl font-bold">{{ task.incompleted.length }}</h4>
          </section>
        </div>
        <div v-show="checkboxVals.length > 0" class="text-center">
          <small class="text-gray-600 mb-2 block"
            >{{ checkboxVals.length }} tasks selected</small
          >
          <Button
            v-show="isCompleted"
            @click="handleClickSelectSetIncompleted"
            :class="$style.custom_button"
            title="Set incompleted"
            size="sm"
            class="mb-2 mx-auto"
          />
          <Button
            v-show="!isCompleted"
            @click="handleClickCompleteSelectedTask"
            :class="$style.custom_button"
            title="Mark as completed"
            size="sm"
            class="mb-2 mx-auto"
          />
          <Button
            @click="handleClickDeleteSelectedTask"
            :class="$style.custom_button"
            title="Delete tasks"
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
      :color="
        popupTaskData.color_code !== null ? popupTaskData.color_code : '#FABB18'
      "
      v-if="showPopupTask"
      @click-overlay="
        () => {
          showPopupTask = false;
          showEditForm = false;
        }
      "
    >
      <template #header-left>
        <h3>{{ popupTaskData.task_name }}</h3>
        <small>Course: {{ popupTaskData.course_name }}</small>
      </template>
      <template #header-right>
        <font-awesome-icon
          @click="handleClickDeleteTask"
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
              showPopupTask = false;
              showEditForm = false;
            }
          "
          class="cursor-pointer"
          :icon="['fas', 'times']"
        />
      </template>
      <div v-show="!showEditForm">
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
                popupTaskData.distance_day === 0 && popupTaskData.status === 0
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
        <Button
          v-if="popupTaskData.status === 0"
          @click="handleClickCompleteTask"
          class="mt-4"
          size="sm"
          title="Complete"
        />
        <Button
          v-if="popupTaskData.status === 1"
          @click="handleClickSetIncompleteTask"
          class="mt-4"
          size="sm"
          title="Set incomplete"
        />
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
      <div v-show="showEditForm">
        <div>
          <Select
            class="mb-2"
            label="Subject"
            :arrOptions="course.all"
            value="id"
            show="name"
            :defaultValue="popupTaskData.course_id"
            @select-change="(value) => (editTaskData.course_id = value)"
          />
          <div class="flex gap-4 mb-2">
            <Select
              @select-change="(value) => (editTaskData.type = value)"
              label="Type"
              :arrOptions="['Assignment', 'Reminder', 'Revision']"
              :defaultValue="popupTaskData.type"
            />
            <Input
              @input-enter="(value) => (editTaskData.end_date = value)"
              type="date"
              label="Due Date"
              :defaultValue="popupTaskData.end_date"
            />
          </div>
          <Input
            @input-enter="(value) => (editTaskData.task_name = value)"
            label="Title"
            class="mb-2"
            placeholder="Enter the title"
            :defaultValue="popupTaskData.task_name"
          />
          <Input
            @input-enter="(value) => (editTaskData.description = value)"
            type="textarea"
            label="Detail"
            placeholder="Enter the description"
            :defaultValue="popupTaskData.description"
          />
        </div>
        <div class="mt-4 pb-4 flex justify-end gap-6">
          <Button
            size="sm"
            buttonType="outline"
            title="Cancel"
            @click="() => (showEditForm = false)"
          />
          <Button
            @click="handleClickSaveEditTask"
            size="sm"
            title="Save change"
          />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Form from "@/components/Form/Form.vue";
  import Input from "@/components/Input/Input.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import TaskView from "./TaskView.js";
  import Select from "@/components/Select/Select.vue";
  import Popup from "@/components/Popup/Popup.vue";
  export default {
    name: "TaskView",
    components: { TaskColor, Button, Form, Input, Select, Popup },
    mixins: [TaskView],
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
  .custom_button {
    padding: 12px;
    min-width: 40%;
  }

  .custom_task_color {
    & > section:nth-child(2) > span:first-child {
      color: #c90019;
    }
  }
</style>
