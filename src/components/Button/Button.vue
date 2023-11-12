<template>
    <button class="rounded-md flex items-center gap-3 font-bold" :class="[(size == 'md' && 'h-12 px-[60px] py-2 text-lg'),(buttonType == 'primary' && 'bg-primary hover:opacity-90'), (buttonType == 'outline' && 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-200')]">
        <div class="h-full w-auto">
            <img class="h-full w-full shrink-0 object-contain" v-show="icon" :src="icon" alt="">
        </div>
        <span>{{ title }}</span>
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
            default: ''
        },
        buttonType: {
            type: String,
            default: 'primary'
        }
    }
}
</script>