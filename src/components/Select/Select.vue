<template>
  <div class="w-full flex flex-col items-start">
    <label class="text-input_label font-normal text-lg mb-1" :for="label">{{
      label
    }}</label>
    <select
      v-model="selectVal"
      @change="handleSelectChange"
      class="w-full px-6 py-2 text-lg outline-none rounded-xl bg-gray-200"
      :id="label"
    >
      <option
        v-for="(item, index) in arrOptions"
        :key="index"
        :value="checkArrIsPrimitive(arrOptions) === true ? item : item[value]"
        >{{ checkArrIsPrimitive(arrOptions) ? item : item[show] }}</option
      >
    </select>
  </div>
</template>

<script>
  export default {
    name: "Select",
    data() {
      return {
        selectVal: this.defaultValue,
      };
    },
    props: {
      label: {
        type: String,
        default: "label",
      },
      value: {
        type: String,
        default: "id",
      },
      defaultValue: {
        validator: function (value) {
          return (
            typeof value === "number" ||
            typeof value === "string" ||
            typeof value === "boolean"
          );
        },
        default: "",
      },
      show: {
        type: String,
        default: "name",
      },
      arrOptions: {
        type: Array,
        default: [
          { id: 1, name: "ok" },
          { id: 2, name: "love" },
        ],
      },
    },
    methods: {
      handleSelectChange() {
        this.$emit("select-change", this.selectVal);
      },
      checkArrIsPrimitive(arr = []) {
        for (let i = 0; i < arr.length; i++) {
          if (
            typeof arr[i] !== "string" &&
            typeof arr[i] !== "number" &&
            typeof arr[i] !== "boolean"
          )
            return false;
          return true;
        }
      },
    },
  };
</script>
