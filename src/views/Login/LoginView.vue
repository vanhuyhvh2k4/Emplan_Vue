<template>
  <h2 class="text-2xl font-bold mt-6">Login</h2>
  <form
    class="w-4/5 flex flex-col items-center mt-6"
    @submit.prevent="handleSubmitForm"
  >
    <Input
      @input-enter="handleEmail"
      required
      placeholder="Enter your email"
      label="Email"
      class="mt-4"
      type="email"
      ref="childRef1"
    />
    <Input
      @input-enter="handlePassword"
      required
      placeholder="Enter your password"
      label="Password"
      class="mt-4"
      type="password"
      ref="childRef2"
    />
    <Button class="mt-8" />
  </form>
  <div class="w-4/5 mt-4">
    <span class="text-gray-500">You don't have an account? </span>
    <router-link to="register">
      <span class="text-primary font-bold cursor-pointer">Register Now</span>
    </router-link>
  </div>
  <Loader v-if="isPending" :key="isPending" />
</template>

<script>
  import Input from "@/components/Input/Input.vue";
  import Button from "@/components/Button/Button.vue";
  import LoginView from "./LoginView";
  import Loader from "@/components/Loader/Loader.vue";

  export default {
    name: "RegisterView",
    components: {
      Input,
      Button,
      Loader,
    },
    mixins: [LoginView],
  };
</script>
