<template>
  <div class="w-full h-full p-8">
    <div class="flex justify-between items-center">
      <section>
        <h2 class="text-2xl font-bold">Today</h2>
        <div class="font-medium">
          <span>{{ formattedDate }}</span>
          <span> | </span>
          <span>{{ formattedTime }}</span>
        </div>
      </section>
      <section>
        <div
          class="flex justify-between items-center gap-12 bg-white px-4 py-2 rounded-xl text-lg font-medium"
        >
          <span>Start Pomodo</span>
          <div
            @click="this.$router.push({ name: 'pomodoro' })"
            class="h-full px-4 py-2 rounded-lg bg-primary"
          >
            <font-awesome-icon :icon="['fas', 'play']" />
          </div>
        </div>
      </section>
    </div>
    <div class="flex justify-evenly mt-8">
      <SmallCard
        class="w-1/4"
        :icon="svgs.incomplete"
        :number="Number.parseInt(task.incompleted)"
        customImg="w-1/2"
        title="Complete Task"
      />
      <SmallCard
        class="w-1/4"
        :icon="svgs.complete"
        :number="Number.parseInt(task.completed)"
        title="Incomplete Task"
      />
      <SmallCard
        class="w-1/4"
        :icon="svgs.cumulative"
        :number="task.cumulative"
        title="Cumulative Time"
      />
    </div>
    <div class="flex w-full gap-8 mt-8">
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Classes - Exams Today"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-5">
            <span>Room</span>
            <span>Start Time</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <Task
            v-for="(item, index) in 2"
            :key="index"
            class="mb-2 max-h-[86px]"
          >
            <div class="flex items-center gap-4">
              <img
                class="w-10 h-10 rounded-full object-contain"
                src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
              <div>
                <h4 class="font-medium">Class</h4>
                <h3 class="font-medium text-lg">Web Technology</h3>
                <h5 class="font-light">Vo Ngoc Dat</h5>
              </div>
            </div>
          </Task>
        </ul>
      </Card>
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Tomorrow"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-5">
            <span>Room</span>
            <span>Start Time</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <Task
            v-for="(item, index) in 2"
            :key="index"
            class="mb-2 max-h-[86px]"
          >
            <div class="flex items-center gap-4">
              <img
                class="w-10 h-10 rounded-full object-contain"
                src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
              <div>
                <h4 class="font-medium">Class</h4>
                <h3 class="font-medium text-lg">Web Technology</h3>
                <h5 class="font-light">Vo Ngoc Dat</h5>
              </div>
            </div>
          </Task>
        </ul>
      </Card>
    </div>
    <div class="flex w-full gap-8 mt-8">
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Due Tasks"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-9">
            <span>Due at</span>
            <span class="mr-6">Detail</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <TaskColor
            v-for="(item, index) in task.due"
            :key="index"
            :showCheckbox="false"
            :class="index > 0 && 'mt-2'"
            :title="item.name"
            :date="formatDate(item.end_date)"
            v-if="task.due.length > 0"
          />
          <p v-if="task.due.length === 0">Not found any task</p>
        </ul>
      </Card>
      <Card
        class="hover:bg-white w-1/2"
        :class="$style.custom_card"
        title="Overdue Tasks"
      >
        <div class="flex justify-between text-gray-500 px-4">
          <span>Information</span>
          <div class="flex gap-9">
            <span>Due at</span>
            <span class="mr-6">Detail</span>
          </div>
        </div>
        <ul class="max-h-[188px] overflow-y-scroll mt-2 custom_scrollbar pr-1">
          <TaskColor
            v-for="(item, index) in task.overdue"
            :key="index"
            :showCheckbox="false"
            :class="index > 0 && 'mt-2'"
            :title="item.name"
            :date="formatDate(item.end_date)"
            v-if="task.overdue.length > 0"
          />
          <p v-if="task.overdue.length === 0">Not found any task</p>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script>
  import SmallCard from "@/components/SmallCard/SmallCard.vue";
  import Card from "@/components/Card/Card.vue";
  import Task from "@/components/Task/Task.vue";
  import DashboardView from "./DashboardView";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";

  export default {
    name: "DashboardView",
    components: {
      SmallCard,
      Card,
      Task,
      TaskColor,
    },
    mixins: [DashboardView],
  };
</script>

<style lang="scss">
  .custom_scrollbar {
    &::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdbdbdcf;
      border-radius: 32px;
    }

    &:hover::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
</style>
<style lang="scss" module>
  .custom_card h4 {
    font-size: 20px;
  }
</style>
