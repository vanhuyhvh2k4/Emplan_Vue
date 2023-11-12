<template>
    <button class="bg-[#F9ED32] rounded-md flex items-center gap-3" :class="(size == 'md' && 'px-[80px] py-2 text-lg')">
        <span class="font-bold">{{ title }}</span>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        title: {
            type: String,
            default: 'Submit'
        },
        size: {
            type: String,
            default: 'md'
        },
        icon: {
            type: String,
            default: 'Google'
        }
    }
}
</script>