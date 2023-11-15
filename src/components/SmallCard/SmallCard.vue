<template>
  <Card :title="title">
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">{{ number }}</h3>
      <div
        class="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-secondary"
      >
        <img
          :class="customImg"
          class="h-full flex-shrink-0 object-contain"
          :src="icon"
          alt=""
        />
      </div>
    </div>
  </Card>
</template>

<script>
  import svgs from "@/assets/svg/export.js";
  import Card from "../Card/Card.vue";
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
        default: svgs.complete,
      },
      customImg: {
        type: String,
        default: "",
      },
      number: {
        type: String,
        default: "8",
      },
      title: {
        type: String,
        default: "Complete Task",
      },
    },
    components: { Card },
  };
</script>
