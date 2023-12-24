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
        <h3 class="text-lg font-medium truncate max-w-[150px]">{{ title }}</h3>
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
        v-if="showCheckbox"
        @click.stop
        v-model="checkboxVal"
        @change="handleChangeCheckbox"
        class="w-6 h-6"
        type="checkbox"
        :value="checkboxId"
      />
      <Button
        v-if="!showCheckbox"
        title="Detail"
        :class="$style.custom_button"
        size="sm"
      />
    </section>
  </li>
</template>

<style lang="scss" module>
  .custom_button {
    padding: 6px 12px;
    height: 34px;
  }
</style>

<script>
  import Button from "../Button/Button.vue";

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
      showCheckbox: {
        type: Boolean,
        default: true,
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
    components: { Button },
  };
</script>
