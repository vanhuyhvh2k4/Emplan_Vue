<template>
  <li
    class="flex justify-between items-center border border-gray-200 py-2 px-4 rounded-md hover:bg-gray-200 cursor-pointer"
  >
    <section class="flex items-center gap-4">
      <span
        :style="`background-color: ${hexColor}`"
        class="rounded-full h-9 w-9"
      ></span>
      <div>
        <h3 class="text-lg font-medium">{{ title }}</h3>
        <small>{{ desc }}</small>
      </div>
    </section>
    <section class="flex items-center gap-4">
      <span>{{ date }}</span>
      <span v-show="isCompleted">
        <font-awesome-icon
          class="text-green-500 mr-2"
          :icon="['fas', 'check-circle']"
        />
        <span class="text-green-500 font-medium">Finished</span>
      </span>
      <input
        v-model="checkboxVal"
        @change="handleChangeCheckbox"
        class="w-6 h-6"
        type="checkbox"
        :value="checkboxId"
      />
    </section>
  </li>
</template>

<script>
  export default {
    name: "TaskColor",
    data() {
      return {
        checkboxVal: false,
      };
    },
    props: {
      checkboxId: {
        type: Number,
        default: 0,
      },
      title: {
        type: String,
        default: "Design minimap",
      },
      desc: {
        type: String,
        default: "Computer Achitecture",
      },
      hexColor: {
        type: String,
        default: "#4785ff",
      },
      date: {
        type: String,
        default: "15/11/2023",
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleChangeCheckbox(e) {
        this.$emit("checkbox-change", this.checkboxVal, e.target.value);
      },
      resetCheckbox() {
        this.checkboxVal = false;
      },
    },
  };
</script>
