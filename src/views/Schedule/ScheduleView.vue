<template>
  <div class="w-full h-full p-8 flex gap-4">
    <div class="w-1/5 p-4 rounded-lg bg-white">
      <ul>
        <li>
          <div class="font-medium text-lg">2023 - 2024</div>
          <div>Nov 16 2023 - May 16 2024</div>
        </li>
      </ul>
    </div>
    <div class="w-4/5 max-w-[800px]">
      <div
        class="w-full rounded-lg bg-white flex items-center justify-between p-4"
      >
        <div class="flex items-center gap-4">
          <Button
            size="sm"
            :class="$style.custom_button"
            title="Manage course"
          />
          <Button
            size="sm"
            :class="$style.custom_button"
            title="Edit 2023-2024"
          />
        </div>
        <Button size="sm" title="New year" />
      </div>
      <div class="w-full bg-white mt-4 rounded-lg p-4">
        <div class="flex item-center justify-between">
          <h2 class="text-lg font-medium">Classes list</h2>
          <Button title="New class" size="sm" @click="this.showPopup = true" />
        </div>
        <ul
          class="bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar mt-2"
        >
          <TaskColor class="mb-4" v-for="(item, index) in 5" :key="index" />
        </ul>
      </div>
    </div>
    <Popup v-show="showPopup" @click-overlay="this.showPopup = false">
      <section>
        <Input label="Subject" placeholder="Enter your subject" />
      </section>
      <section class="flex gap-4 mt-2">
        <Input label="Room" placeholder="Enter your room" />
        <Input label="Teacher" placeholder="Enter your teacher" />
      </section>
      <section class="mt-4">
        <div class="flex">
          <div
            class="p-2 border border-gray-200 bg-gray-200 rounded-sm cursor-pointer"
            :class="showOneOffButton && 'bg-white border-b-0'"
            @click="this.showOneOffButton = true"
            >One-off</div
          >
          <div
            class="p-2 border border-gray-200 bg-gray-200 rounded-sm cursor-pointer"
            :class="!showOneOffButton && 'bg-white border-b-0'"
            @click="this.showOneOffButton = false"
            >Repeats</div
          >
        </div>
        <div class="p-4 border border-gray-200 mt-[-1px]">
          <div v-show="showOneOffButton">
            <Input type="date" label="Date" />
            <div class="flex gap-4 mt-2">
              <Input type="time" label="Start time" />
              <Input type="time" label="End time" />
            </div>
          </div>
          <div v-show="!showOneOffButton">
            <input type="date" name="" id="" />
          </div>
        </div>
      </section>
      <section class="flex justify-end mt-4 gap-4">
        <div
          class="p-2 rounded-lg border border-gray-400 cursor-pointer"
          @click="this.showPopup = false"
          >Cancel</div
        >
        <div
          class="p-2 px-4 rounded-lg border border-primary bg-primary text-white cursor-pointer"
          >Save</div
        >
      </section>
    </Popup>
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Input from "@/components/Input/Input.vue";
  import Popup from "@/components/Popup/Popup.vue";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  import ScheduleView from "./ScheduleView";

  export default {
    name: "ScheduleView",
    components: { Button, TaskColor, Popup, Input },
    mixins: [ScheduleView],
  };
</script>

<style lang="scss" module>
  .custom_button {
    background-color: black;
  }
</style>
