<template>
  <div
    class="flex justify-between items-center p-2 w-full bg-white border border-gray-200 rounded-lg overflow-hidden"
    :class="!detail && 'hover:bg-gray-200 cursor-pointer'"
  >
    <section>
      <slot />
    </section>
    <section class="flex gap-5">
      <div class="rounded-md bg-secondary px-4 py-2 w-fit">KA.101</div>
      <div class="rounded-md bg-secondary px-4 py-2 w-fit">13:00</div>
      <div
        v-if="detail"
        :key="detail"
        class="rounded-md bg-black text-white hover:bg-primary cursor-pointer px-4 py-2 w-fit"
        >Detail</div
      >
    </section>
  </div>
</template>

<script>
  import svgs from "@/assets/svg/export.js";
  export default {
    name: "Task",
    data() {
      return {
        svgs,
      };
    },
    props: {
      detail: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
