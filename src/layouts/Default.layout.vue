<template>
  <div class="flex">
    <Sidebar />
    <div class="w-full">
      <Navbar />
      <slot />
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar/Navbar.vue";
  import Sidebar from "@/components/Sidebar/Sidebar.vue";

  export default {
    name: "DefaultLayout",
    components: {
      Sidebar,
      Navbar,
    },
  };
</script>
