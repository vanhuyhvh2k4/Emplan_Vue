<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { DEFAULT_LAYOUT } from "./constants/index.js";
  export default {
    setup() {
      const route = useRoute();
      return {
        layout: computed(() => route.meta.layout || DEFAULT_LAYOUT),
      };
    },
  };
</script>
