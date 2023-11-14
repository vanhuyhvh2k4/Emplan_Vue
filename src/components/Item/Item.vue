<template>
    <li class="flex items-center gap-6 px-6 py-4 rounded-2xl cursor-pointer" :class="[(isActive && this.active), (!isActive && 'hover:bg-gray-200')]">
        <img class="" :src="icon" />
        <span class="text-lg font-semibold">{{ title }}</span>
    </li>
</template>

<script>
    export default {
        name: 'Item',
        data() {
            return {
                active: 'bg-black text-white'
            }
        },
        props: {
            title: {
                type: String,
                default: 'Title'
            },
            icon: {
                type: String,
                default: ''
            },
            isActive: {
                type: Boolean,
                default: false
            },
        },
    }
</script>