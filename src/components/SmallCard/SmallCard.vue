<template>
  <div class="bg-white rounded-xl px-6 py-4 hover:bg-gray-200">
    <section class="flex justify-between items-center">
      <h4 class="text-lg font-medium">Incomplete Card</h4>
      <img class="cursor-pointer" :src="svgs.elipsis" />
    </section>
    <section class="flex justify-between items-center mt-6">
      <h3 class="text-2xl font-bold">8</h3>
      <div
        class="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[rgba(250,187,24,0.10)]"
      >
        <img
          class="w-full h-full flex-shrink-0 object-contain"
          :class="className"
          :src="icon"
          alt=""
        />
      </div>
    </section>
  </div>
</template>

<script>
  import svgs from "@/assets/svg/export.js";
  export default {
    name: "SmallCard",
    data() {
      return {
        svgs,
      };
    },
    props: {
      icon: {
        type: String,
        default: "",
      },
      className: {
        type: String,
        default: "",
      },
    },
  };
</script>
