<template>
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
</template>

<script>
  export default {
    name: "Exam",
    methods: {},
  };
</script>
