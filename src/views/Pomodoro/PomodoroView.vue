<template>
  <div class="w-full h-full relative">
    <div class="w-full h-full absolute">
      <img
        class="object-cover"
        src="https://studywithme.io/aesthetic-pomodoro-timer/c629a813b3561cfa40dd.jpg"
        alt=""
      />
    </div>
    <div class="absolute ml-5 mt-5 w-1/5 max-w-[280px]">
      <div class="p-4 w-full bg-[#383032] rounded-2xl text-white">
        <section class="flex justify-between">
          <span>
            <font-awesome-icon :icon="['fas', 'clock']" />
            <span class="ml-2">Personal Timer</span>
          </span>
          <span>
            <font-awesome-icon :icon="['fas', 'pen']" />
          </span>
        </section>
        <section class="flex items-center justify-between mt-4">
          <h1 class="text-3xl font-medium">{{ countdown }}</h1>
          <div>
            <font-awesome-icon
              v-show="counting"
              class="text-lg cursor-pointer"
              :icon="['fas', 'pause']"
              @click="handleClickCounting"
            />
            <font-awesome-icon
              v-show="!counting"
              class="cursor-pointer"
              :icon="['fas', 'play']"
              @click="handleClickCounting"
            />
            <font-awesome-icon
              @click="resetCountdown"
              class="text-lg ml-4"
              :icon="['fas', 'redo-alt']"
            />
          </div>
        </section>
      </div>
      <div class="w-full p-4 mt-4 bg-[#383032] rounded-2xl text-white">
        <section>
          <span>
            <font-awesome-icon :icon="['fas', 'bullseye']" />
            <span class="ml-2">Session goals</span>
          </span>
        </section>
        <section class="mt-4 flex items-center justify-between gap-2">
          <input
            type="text"
            class="outline-none border-2 border-white bg-[#383032] p-2 rounded-lg text-white overflow-hidden"
            placeholder="Type a goal..."
          />
          <div
            class="p-2 bg-white text-black rounded-lg cursor-pointer hover:bg-primary hover:text-white"
            >Add</div
          >
        </section>
        <section
          class="mt-2 flex items-center justify-between bg-black rounded-lg p-4"
        >
          <div class="text-center text-red-300">
            <h2 class="text-xl font-medium">0</h2>
            <small>Incomplete</small>
          </div>
          <div class="text-center text-green-300">
            <h2 class="text-xl font-medium">4</h2>
            <small>Completed</small>
          </div>
        </section>
        <section class="mt-2">
          <ul class="w-full max-h-[250px] overflow-y-scroll custom_scrollbar">
            <li
              v-for="(item, index) in 5"
              :key="index"
              class="py-2 px-4 bg-black rounded-lg mb-2"
            >
              <input type="radio" class="w-4 h-4" />
              <span class="ml-2">test</span>
              <font-awesome-icon
                class="cursor-pointer float-right"
                :icon="['fas', 'times']"
              />
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import PomodoroView from "./PomodoroView";
  export default {
    name: "PomodoroView",
    mixins: [PomodoroView],
  };
</script>
