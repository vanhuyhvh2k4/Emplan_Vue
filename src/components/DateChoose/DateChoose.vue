<template>
  <div class="w-full flex justify-center items-center p-4 select-none">
    <div
      class="px-2 py-1 cursor-pointer hover:bg-gray-200 border flex-1 text-center border-l-0 border-gray-200"
      v-for="(item, index) in dates"
      :class="[
        itemExists(item)
          ? 'bg-primary text-white hover:bg-primary border-primary'
          : '',
        index === 0 && 'border-l-[1px]',
      ]"
      @click="handleClickItem(item)"
      ref="dateRefs"
      :key="index"
      >{{ item.short }}</div
    >
  </div>
</template>

<script>
  import dates from "@/data/dates.js";
  export default {
    name: "DateChoose",
    data() {
      return {
        dates,
        datesChooses: [],
      };
    },
    methods: {
      handleClickItem(item) {
        if (!!this.datesChooses.find((date) => date.id === item.id)) {
          this.datesChooses = this.datesChooses.filter(
            (date) => date.id !== item.id,
          );
        } else {
          this.datesChooses.push({
            id: item.id,
            name: item.short,
          });
        }

        this.$emit("click-date", this.datesChooses);
      },
      itemExists(item) {
        return this.datesChooses.some((date) => date.id === item.id);
      },
    },
  };
</script>
