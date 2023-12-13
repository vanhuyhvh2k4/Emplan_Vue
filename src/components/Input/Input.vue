<template>
  <div class="w-full flex flex-col items-start">
    <label class="text-input_label font-normal text-lg mb-1" :for="label">{{
      label
    }}</label>
    <input
      v-model="inputValue"
      @input="handleOnInput"
      :id="label"
      :placeholder="placeholder"
      class="px-6 py-2 text-lg outline-none w-full rounded-xl bg-gray-200"
      :type="type"
      :required="required"
      v-if="
        type === 'text' ||
        type === 'date' ||
        type === 'time' ||
        type === 'email' ||
        type === 'password' ||
        type === 'color' ||
        type === 'number'
      "
    />
    <textarea
      v-model="inputValue"
      @input="handleOnInput"
      :id="label"
      v-if="type === 'textarea'"
      class="px-6 py-2 text-lg outline-none w-full rounded-xl bg-gray-200"
      :placeholder="placeholder"
    ></textarea>
    <small v-show="message" class="text-sm">{{ message }}</small>
  </div>
</template>

<script>
  import { BaseTransitionPropsValidators } from "vue";

  export default {
    name: "Input",
    data() {
      return {
        inputValue: this.defaultValue,
      };
    },
    props: {
      type: {
        type: String,
        default: "text",
      },
      defaultValue: {
        validator: function (value) {
          return typeof value === "number" || typeof value === "string";
        },
        default: "",
      },
      required: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: "Enter your name here",
      },
      label: {
        type: String,
        default: "Label",
      },
      message: {
        type: String,
        default: "",
      },
    },
    methods: {
      handleOnInput() {
        this.$emit("input-enter", this.inputValue);
      },
      clearInput() {
        this.inputValue = "";
      },
    },
  };
</script>
