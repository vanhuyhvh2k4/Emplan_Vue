<template>
  <button
    class="rounded-md flex items-center justify-center"
    :class="[
      size == 'sm' && this.sizes.sm,
      size == 'md' && this.sizes.md,
      buttonType == 'primary' && this.type.primary,
      buttonType == 'outline' && this.type.outline,
    ]"
  >
    <div v-show="icon" class="h-full w-auto mr-3">
      <img class="h-full w-full shrink-0 object-contain" :src="icon" alt="" />
    </div>
    <span :class="[buttonType === 'outline' && 'text-gray-500']">{{
      title
    }}</span>
  </button>
</template>

<script>
  export default {
    name: "Button",
    data() {
      return {
        sizes: {
          sm: "h-10 px-[40px] py-2 text-md font-medium",
          md: "h-12 px-[60px] py-2 text-lg font-bold",
        },
        type: {
          primary: "bg-primary hover:opacity-90 text-white",
          outline:
            "bg-transparent border border-gray-500 hover:bg-gray-200 text-gray-500",
        },
      };
    },
    props: {
      title: {
        type: String,
        default: "Submit",
      },
      size: {
        type: String,
        default: "md",
      },
      icon: {
        type: String,
        default: "",
      },
      buttonType: {
        type: String,
        default: "primary",
      },
    },
  };
</script>
