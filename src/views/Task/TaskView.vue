<template>
  <div class="w-full h-full p-8">
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
  </div>
</template>

<script>
  export default {
    name: "TaskView",
  };
</script>
