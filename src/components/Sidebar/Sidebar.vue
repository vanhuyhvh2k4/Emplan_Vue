<template>
  <div class="w-2/12 h-full py-6 pl-6 pr-4 select-none">
    <h1 class="text-3xl font-black">
      <span>EMPLANN</span>
      <span class="text-primary">ER.</span>
    </h1>
    <ul class="mt-20">
      <Item
        class="mb-2"
        @click="handleClick(item)"
        :isActive="this.$route.name === item.view"
        :title="item.title"
        :icon="this.$route.name === item.view ? item.icon_active : item.icon"
        v-for="(item, index) in items"
        :key="index"
      />
    </ul>
  </div>
</template>

<script>
  import Item from "@/components/Item/Item.vue";
  import svgs from "@/assets/svg/export.js";
  import items from "@/data/sidebar.js";
  export default {
    name: "Sidebar",
    data() {
      return { svgs, items };
    },
    components: {
      Item,
    },
    methods: {
      handleClick(item) {
        this.$router.push({ name: item.view });
      },
    },
  };
</script>
