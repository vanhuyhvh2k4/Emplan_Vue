<template>
  <div class="flex w-full h-full p-8">
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
          <input type="checkbox" />
        </div>
      </div>
      <ul
        class="mt-6 bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar"
      >
        <TaskColor
          hexColor="#fabb18"
          class="mb-4"
          v-for="(item, index) in 5"
          :key="index"
        />
      </ul>
    </div>
    <div class="w-1/2">
      <div class="p-4 w-full flex justify-end items-center">
        <Button size="sm" title="New Task" />
      </div>
      <div class="mt-4 flex justify-center">
        <Form>
          <Input type="select" />
          <div class="flex gap-4">
            <Input type="select" />
            <Input type="date" />
          </div>
          <Input />
          <Input type="textarea" />
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Form from "@/components/Form/Form.vue";
  import Input from "@/components/Input/Input.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  export default {
    name: "TaskView",
    components: { TaskColor, Button, Form, Input },
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
