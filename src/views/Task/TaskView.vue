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
            <option value="all">All Task</option>
            <option
              v-for="(item, index) in course.allCourse"
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
        v-show="showTask.length"
        class="mt-6 bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar"
      >
        <TaskColor
          ref="taskRefs"
          @checkbox-change="handleCheckboxChange"
          :checkbox-id="item.id"
          :hexColor="item.color"
          :desc="item.course_name"
          :title="item.task_name"
          :date="item.due_at"
          :isCompleted="item.completed"
          class="mb-4"
          v-for="(item, index) in showTask"
          :key="index"
        />
      </ul>
    </div>
    <div class="w-1/2">
      <div class="p-4 w-full flex justify-end items-center relative">
        <Button @click="this.isShowForm = true" size="sm" title="New Task" />
        <div class="absolute w-full max-w-[80%] top-0 right-0">
          <Form title="Create new task" v-show="isShowForm">
            <div>
              <div class="flex flex-col items-start">
                <label class="text-input_label font-normal text-lg mb-1" for=""
                  >Subject</label
                >
                <select
                  v-model="newTaskData.subject"
                  @change="handleInputSubject"
                  class="h-[46px] px-6 py-2 text-lg outline-none w-full rounded-xl bg-gray-200"
                >
                  <option
                    :value="item.id"
                    v-for="(item, index) in course.allCourse"
                    :key="index"
                    >{{ item.name }}</option
                  >
                </select>
              </div>
              <div class="flex gap-4 mb-2">
                <div class="flex flex-col items-start">
                  <label
                    class="text-input_label font-normal text-lg mb-1"
                    for=""
                    >Type</label
                  >
                  <select
                    v-model="newTaskData.type"
                    class="h-[46px] px-6 py-2 text-lg outline-none w-full rounded-xl bg-gray-200"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="reminder">Reminder</option>
                    <option value="revision">Revision</option>
                  </select>
                </div>
                <Input
                  @input-enter="handleInputDate"
                  type="date"
                  label="Due Date"
                />
              </div>
              <div class="mb-2 flex gap-6">
                <Input
                  @input-enter="handleInputTitle"
                  label="Title"
                  class="mb-2"
                  placeholder="Enter the title"
                />
                <div>
                  <label
                    class="text-input_label font-normal text-lg"
                    for="primary_color"
                    >Color</label
                  >
                  <input
                    @input="handleInputColor"
                    class="mt-2"
                    type="color"
                    id="primary_color"
                  />
                </div>
              </div>
              <Input
                @input-enter="handleInputDetail"
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
                @click="this.isShowForm = false"
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
            <h4 class="text-3xl font-bold">5</h4>
          </section>
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Due is coming</h4>
            <h4 class="text-3xl font-bold">5</h4>
          </section>
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Complete</h4>
            <h4 class="text-3xl font-bold">5</h4>
          </section>
          <section
            class="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center"
          >
            <h4 class="text-lg font-medium">Incomplete</h4>
            <h4 class="text-3xl font-bold">5</h4>
          </section>
        </div>
        <div v-show="checkboxVals.length > 0" class="text-center">
          <small class="text-gray-600 mb-2 block"
            >{{ checkboxVals.length }} tasks selected</small
          >
          <Button
            v-show="isCompleted"
            @click="handleClickSetIncompleted"
            :class="$style.custom_button"
            title="Set incompleted"
            size="sm"
            class="mb-2 mx-auto"
          />
          <Button
            v-show="!isCompleted"
            @click="handleClickComplete"
            :class="$style.custom_button"
            title="Mark as completed"
            size="sm"
            class="mb-2 mx-auto"
          />
          <Button
            @click="handleClickDeleteTask"
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
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Form from "@/components/Form/Form.vue";
  import Input from "@/components/Input/Input.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import TaskView from "./TaskView.js";
  export default {
    name: "TaskView",
    components: { TaskColor, Button, Form, Input },
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
