<template>
  <div class="w-full h-20 px-8 py-4 flex justify-between items-center">
    <section class="flex items-center gap-6">
      <font-awesome-icon
        :onclick="handleClickBars"
        class="text-2xl cursor-pointer"
        :icon="['fas', 'bars']"
      />
      <h2 class="text-2xl font-medium">Dashboard</h2>
    </section>
    <section class="w-[30%] h-full">
      <div class="w-full h-full bg-gray-100 rounded-xl flex items-center px-6">
        <input
          class="h-full bg-transparent w-full outline-none text-lg"
          type="text"
          placeholder="Search Task..."
        />
        <font-awesome-icon class="cursor-pointer" :icon="['fas', 'search']" />
      </div>
    </section>
    <section class="h-full flex gap-10 items-center">
      <div class="relative">
        <font-awesome-icon class="text-3xl" :icon="['fas', 'bell']" />
        <div
          class="w-5 h-5 text-sm rounded-full bg-primary grid place-items-center absolute top-[-30%] right-[-12px]"
          >12</div
        >
      </div>
      <div class="h-full flex gap-4 items-center cursor-pointer relative group">
        <div class="text-end">
          <h3 class="text-lg font-medium">Emplanner User</h3>
          <small class="text-gray-500">IT Student</small>
        </div>
        <div class="w-auto h-full">
          <img
            class="w-full h-full flex-shrink-0 object-contain rounded-full"
            src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7"
            alt=""
          />
        </div>
        <div
          class="absolute bg-white rounded-lg shadow-lg py-2 w-full top-[100%] z-40 border border-gray-200 invisible transition group-hover:visible"
        >
          <ul>
            <li class="px-4 py-3 hover:bg-gray-200 cursor-pointer">Profile</li>
            <li
              @click="handleClickLogout"
              class="px-4 py-3 hover:bg-gray-200 cursor-pointer"
              >Logout</li
            >
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    methods: {
      handleClickBars() {
        this.$emit("click-bars");
      },
      handleClickLogout() {
        this.$emit("click-logout");
      },
    },
  };
</script>
