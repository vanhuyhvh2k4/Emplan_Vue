<template>
    <div class="w-full flex flex-col items-start">
        <label class="text-input_label font-normal text-xl" :for="label">{{ label }}</label>
        <input v-model="inputValue" @input="handleOnInput" :id="label" :placeholder="placeholder"
            class="px-6 py-2 text-lg outline-none w-full h-12 rounded-xl bg-gray-200" :type="type" :required="required">
        <small v-show="message" class="text-sm">{{ message }}</small>
    </div>
</template>

<script>
    export default {
        name: "Input",
        data() {
            return {
                inputValue: ''
            }
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
            required: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: 'Enter your name here'
            },
            label: {
                type: String,
                default: "Label"
            },
            message: {
                type: String,
                default: ''
            }
        },
        methods: {
            handleOnInput() {
                this.$emit('input-enter', this.inputValue);
            },
            clearInput() {
                this.inputValue = '';
            },
        },
    }
</script>