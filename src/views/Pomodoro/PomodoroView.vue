<template>
  <div class="p-8 w-full h-full flex gap-4">
    <section class="w-1/5">
      <div class="w-full max-w-[300px] bg-white rounded-lg p-4">
        <h2 class="font-medium text-lg">Focus time</h2>
        <div class="flex items-center justify-between mt-4">
          <h2 class="text-3xl font-medium">{{ countdown }}</h2>
          <div>
            <font-awesome-icon
              :icon="['fas', 'play']"
              class="text-xl mr-4 cursor-pointer"
              v-show="!counting"
              @click="startCountdown"
            />
            <font-awesome-icon
              :icon="['fas', 'pause']"
              class="text-xl mr-4 cursor-pointer"
              v-show="counting"
              @click="stopCountdown"
            />
            <font-awesome-icon
              :icon="['fas', 'redo-alt']"
              class="text-xl cursor-pointer"
              @click="resetCountdown"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="w-2/5">
      <div
        class="text-center w-full max-w-[500px] p-4 bg-[#fff8e8] rounded-lg m-auto"
      >
        <h2>Get ready to focus</h2>
        <div class="w-1/2 h-auto m-auto mt-4">
          <img
            class="w-full h-full object-contain flex-shrink-0"
            :src="images.Timer"
            alt=""
          />
        </div>
        <div
          class="w-1/2 m-auto flex justify-between items-center mt-4 select-none"
        >
          <font-awesome-icon
            @click="handleClickReduceTime"
            class="text-xl cursor-pointer hover:text-primary"
            :icon="['fas', 'minus']"
          />
          <span class="text-3xl font-bold">{{ initialTime / 60 }} mins</span>
          <font-awesome-icon
            @click="handleClickIncreaseTime"
            class="text-xl cursor-pointer hover:text-primary"
            :icon="['fas', 'plus']"
          />
        </div>
        <div
          @click="startCountdown"
          class="w-1/2 bg-primary select-none text-white rounded-lg p-3 text-lg cursor-pointer hover:bg-black m-auto mt-4"
          >Start section</div
        >
      </div>
    </section>
    <section class="w-2/5">
      <ul
        class="bg-white rounded-lg p-4 max-h-[500px] overflow-y-scroll custom_scrollbar max-w-[500px]"
      >
        <h3 class="mb-4">Task list</h3>
        <TaskColor
          ref="taskRefs"
          @checkbox-change="handleCheckboxChange(item)"
          :checkbox-id="item.id"
          :title="item.task_name"
          :desc="item.course_name"
          :date="formatDate(item.end_date)"
          class="mb-4"
          v-for="(item, index) in task.incompleted"
          :key="index"
        />
      </ul>
    </section>
  </div>
</template>

<script>
  import SmallCard from "@/components/SmallCard/SmallCard.vue";
  import PomodoroView from "./PomodoroView";
  import TaskColor from "@/components/TaskColor/TaskColor.vue";
  export default {
    name: "PomodoroView",
    mixins: [PomodoroView],
    components: { SmallCard, TaskColor },
  };
</script>
