<template>
  <h2 class="text-2xl font-bold mt-6">Create your Free Account</h2>
  <form
    class="w-4/5 flex flex-col items-center mt-6"
    @submit.prevent="handleSubmitForm"
  >
    <Input @input-enter="handleFullName" required label="Full Name" />
    <Input
      @input-enter="handleEmail"
      required
      placeholder="Enter your email"
      label="Email"
      class="mt-4"
      type="email"
    />
    <Input
      @input-enter="handlePassword"
      required
      placeholder="Enter your password"
      label="Password"
      class="mt-4"
      type="password"
    />
    <Button class="mt-8" />
  </form>
  <div class="w-4/5 mt-4">
    <span class="text-gray-500">Already have a account? </span>
    <router-link to="login">
      <span class="text-primary font-bold cursor-pointer">Log in</span>
    </router-link>
  </div>
  <Loader v-if="isPending" :key="isPending" />
</template>

<script>
  import Input from "@/components/Input/Input.vue";
  import Button from "@/components/Button/Button.vue";
  import Loader from "@/components/Loader/Loader.vue";
  import RegisterView from "./RegisterView";

  export default {
    name: "RegisterView",
    components: {
      Input,
      Button,
      Loader,
    },
    mixins: [RegisterView],
  };
</script>
