<template>
  <div class="flex">
    <Sidebar v-show="isShowSidebar" />
    <div class="w-full">
      <Navbar @click-bars="handleClickBars" />
      <div class="custom_height bg-background">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar/Navbar.vue";
  import Sidebar from "@/components/Sidebar/Sidebar.vue";

  export default {
    name: "DefaultLayout",
    data() {
      return {
        isShowSidebar: true,
      };
    },
    components: {
      Sidebar,
      Navbar,
    },
    methods: {
      handleClickBars() {
        this.isShowSidebar = !this.isShowSidebar;
      },
    },
  };
</script>

<style lang="css">
  .custom_height {
    height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    overflow-y: overlay;
  }
</style>
