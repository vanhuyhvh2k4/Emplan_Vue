<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] grid place-items-center"
    @click="handleClickOverlay"
  >
    <div
      class="w-full h-fit max-h-[50%] max-w-[630px] bg-white rounded-lg shadow-xl overflow-hidden"
      @click.stop
    >
      <div class="flex justify-between p-6 bg-blue-500">
        <section class="text-white text-xl font-medium">Web Technology</section>
        <section class="text-white flex gap-6 text-xl">
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
      <div class="p-6">
        <section class="flex items-center mb-6">
          <font-awesome-icon
            class="text-xl mr-4 float-left"
            :icon="['far', 'calendar-alt']"
          />
          <span class="text-lg">9:00 AM - 10:30 AM Today</span>
        </section>
        <section class="flex items-center mb-6">
          <font-awesome-icon
            class="text-xl mr-4 float-left"
            :icon="['fas', 'map-marker-alt']"
          />
          <span class="text-lg">KA.301</span>
        </section>
        <section class="flex items-center mb-6">
          <font-awesome-icon
            class="text-xl mr-4 float-left"
            :icon="['fas', 'chalkboard-teacher']"
          />
          <span class="text-lg">Mr.Dai</span>
        </section>
        <section>
          <h4
            class="relative after:w-full after:h-[1px] after:bg-blue-300 after:right-0 after:absolute after:top-1/2"
          >
            <span class="bg-white relative z-10 pr-4"
              >Task due for this class</span
            >
          </h4>
        </section>
        <section>
          <span class="text-gray-500"
            >There are no tasks due for this class</span
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Popup",
    methods: {
      handleClickExit() {
        this.$emit("click-exit");
      },
      handleClickOverlay() {
        this.$emit("click-overlay");
      },
    },
  };
</script>
