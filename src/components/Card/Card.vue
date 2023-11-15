<template>
  <div class="bg-white rounded-xl px-6 py-4 hover:bg-gray-200">
    <section class="flex justify-between items-center">
      <h4 class="text-lg font-medium">{{ title }}</h4>
      <img class="cursor-pointer" :src="svgs.elipsis" />
    </section>
    <section class="mt-6"><slot /></section>
  </div>
</template>

<script>
  import svgs from "@/assets/svg/export";

  export default {
    name: "Card",
    data() {
      return {
        svgs,
      };
    },
    props: {
      title: {
        type: String,
        default: "Complete Task",
      },
    },
  };
</script>
