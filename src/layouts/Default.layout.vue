<template>
  <div class="flex">
    <Sidebar v-show="isShowSidebar" />
    <div class="w-full">
      <Navbar @click-bars="handleClickBars" />
      <slot />
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
