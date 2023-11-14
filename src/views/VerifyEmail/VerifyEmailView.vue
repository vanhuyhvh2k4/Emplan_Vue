<template>
  <h2 class="text-2xl font-bold mt-6">Verify Email</h2>
  <form
    class="w-4/5 flex flex-col items-center mt-6"
    @submit.prevent="handleSubmitForm"
  >
    <Input
      @input-enter="handleCode"
      required
      label="Code"
      placeholder="Enter the code here"
      type="number"
      ref="childRef"
    />
    <Button class="mt-8" />
  </form>
  <Loader v-if="isPending" :key="isPending" />
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Input from "@/components/Input/Input.vue";
  import VerifyEmail from "./VerifyEmail";
  import Loader from "@/components/Loader/Loader.vue";

  export default {
    name: "VerifyEmailView",
    components: {
      Input,
      Button,
      Loader,
    },
    mixins: [VerifyEmail],
  };
</script>
