<template>
  <div class="w-full h-fit bg-white rounded-lg shadow-xl overflow-hidden">
    <div class="flex justify-between px-6 py-5 bg-primary">
      <section class="text-white text-xl font-medium">{{ title }}</section>
      <section v-if="groupButton" class="text-white flex gap-6 text-xl">
        <font-awesome-icon
          class="cursor-pointer"
          :icon="['fas', 'trash-alt']"
        />
        <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen']" />
        <font-awesome-icon
          class="cursor-pointer"
          :icon="['fas', 'times']"
          @click="handleClickExit"
        />
      </section>
    </div>
    <div class="p-6"><slot /></div>
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  export default {
    name: "Form",
    components: { Button },
    props: {
      groupButton: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: "Web Technology",
      },
    },
    methods: {
      handleClickExit() {
        this.$emit("click-exit");
      },
    },
  };
</script>
