<template>
  <div class="w-full h-full p-8 bg-[#F9F9F9]">
    <div class="flex justify-between items-center">
      <section>
        <h2 class="text-2xl font-bold">Today</h2>
        <div class="font-medium">
          <span>Mon 11, 2023</span>
          <span> | </span>
          <span>10:00 AM</span>
        </div>
      </section>
      <section>
        <div
          class="flex justify-between items-center gap-12 bg-white px-4 py-2 rounded-xl text-lg font-medium"
        >
          <span>Start Pomodo</span>
          <div class="h-full px-4 py-2 rounded-lg bg-primary">
            <font-awesome-icon :icon="['fas', 'play']" />
          </div>
        </div>
      </section>
    </div>
    <div class="flex justify-evenly mt-8">
      <SmallCard
        class="w-[25%]"
        :icon="svgs.incomplete"
        className="w-[50%] h-[50%]"
      />
      <SmallCard class="w-[25%]" :icon="svgs.complete" />
      <SmallCard class="w-[25%]" :icon="svgs.cumulative" />
    </div>
  </div>
</template>

<script>
  import SmallCard from "@/components/SmallCard/SmallCard.vue";
  import svgs from "@/assets/svg/export.js";

  export default {
    name: "DashboardView",
    data() {
      return {
        svgs,
      };
    },
    components: { SmallCard },
  };
</script>
