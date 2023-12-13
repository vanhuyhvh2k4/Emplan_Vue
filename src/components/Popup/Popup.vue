<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] grid place-items-center"
    @click="handleClickOverlay"
  >
    <div
      class="w-full h-fit max-w-[630px] bg-white rounded-lg shadow-xl overflow-hidden"
      @click.stop
    >
      <div class="flex justify-between p-6 bg-primary">
        <section class="text-white text-xl font-normal">{{ title }}</section>
        <section class="text-white flex gap-6 text-xl">
          <slot name="header-right" />
        </section>
      </div>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Popup",
    props: {
      title: {
        type: String,
        default: "Web technology",
      },
    },
    methods: {
      handleClickOverlay() {
        this.$emit("click-overlay");
      },
    },
  };
</script>
