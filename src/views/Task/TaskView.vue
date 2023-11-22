<template>
  <div class="flex w-full h-full p-8 gap-4">
    <div class="w-1/2">
      <div class="flex bg-white rounded-lg p-4 items-center justify-between">
        <div class="flex gap-4">
          <span class="font-medium text-lg">Filter by course</span>
          <select
            class="outline-none border border-gray-400 rounded-sm"
            name=""
            id=""
          >
            <option value="">Web Technology</option>
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
          class="mb-4"
          v-for="(item, index) in showTask"
          :key="index"
        />
      </ul>
    </div>
    <div class="w-1/2">
      <div class="p-4 w-full flex justify-end items-center relative">
        <Button @click="handleClickNewTask" size="sm" title="New Task" />
        <div class="absolute w-full max-w-[80%] top-0 right-0">
          <Form v-show="isShowForm" @click-exit="handleClickNewTask">
            <Input class="mb-2" type="select" label="Subject" />
            <div class="flex gap-4 mb-2">
              <Input type="select" label="Type" />
              <Input type="date" label="Due Date" />
            </div>
            <div class="mb-2 flex gap-6">
              <Input label="Title" class="mb-2" placeholder="Enter the title" />
              <div>
                <label
                  class="text-input_label font-normal text-lg"
                  for="primary_color"
                  >Color</label
                >
                <input class="mt-2" type="color" id="primary_color" />
              </div>
            </div>
            <Input
              type="textarea"
              label="Detail"
              placeholder="Enter the description"
            />
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
