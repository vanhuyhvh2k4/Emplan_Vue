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
        <Button @click="handleClickNewExamButton" size="sm" title="New Exam" />
        <div class="absolute w-full max-w-[80%] top-0 right-0">
          <Form
            title="Create new exam"
            v-show="isShowForm"
            @click-exit="handleClickNewExamButton"
          >
            <Select
              class="mb-2"
              label="Subject"
              value="id"
              show="name"
              :defaultValue="course.allCourse[0].id"
              :arrOptions="course.allCourse"
              @select-change="(value) => (newExamData.subject = value)"
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
      <div class="bg-white mt-3 p-4 rounded-lg">
        <div
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
      </div>
    </div>
  </div>
</template>

<script>
  import Select from "@/components/Select/Select.vue";
  import Button from "@/components/Button/Button.vue";
  import Form from "@/components/Form/Form.vue";
  import Input from "@/components/Input/Input.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import ExamView from "./ExamView.js";
  export default {
    name: "TaskView",
    components: { TaskColor, Button, Form, Input, Select },
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
