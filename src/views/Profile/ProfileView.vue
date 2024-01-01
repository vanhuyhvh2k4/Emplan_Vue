<template>
  <div class="w-full h-full p-8 relative">
    <form @submit.prevent class="w-1/2 m-auto">
      <section class="w-[150px] h-[150px] relative m-auto">
        <img
          class="w-full h-full object-cover flex-shrink-0 rounded-full z-[0]"
          :src="
            editProfileData.avatar !== null
              ? `http://localhost:8000/storage/${editProfileData.avatar}`
              : 'https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7'
          "
          ref="imgRef"
          accept="image/*"
        />
        <input
          class="w-full h-full absolute bg-red-200 top-0 left-0 opacity-0 z-[2] cursor-pointer"
          type="file"
          @change="handleChangeAvatar($event)"
        />
        <div
          class="absolute bottom-[10px] right-[10px] bg-white w-8 h-8 rounded-full border border-gray-200 grid place-items-center z-[1]"
        >
          <font-awesome-icon :icon="['fas', 'camera']" />
        </div>
      </section>
      <section class="mb-2">
        <Input
          @input-enter="(value) => (editProfileData.name = value)"
          :defaultValue="editProfileData.name"
          label="Full name"
        />
      </section>
      <section class="mb-2">
        <Input
          :defaultValue="editProfileData.email"
          label="Email"
          placeholder="Enter your email"
          disabled
        />
      </section>
      <section>
        <Input
          @input-enter="(value) => (editProfileData.job = value)"
          :defaultValue="editProfileData.job"
          label="I am"
          placeholder="Student"
        />
      </section>
      <Button
        title="Change Profile"
        @click="handleClickSaveEditProfile"
        size="sm"
        class="m-auto mt-4"
      />
    </form>
    <LoaderCircle v-if="isLoading" />
  </div>
</template>

<script>
  import Button from "@/components/Button/Button.vue";
  import Input from "@/components/Input/Input.vue";
  import ProfileView from "./ProfileView";
  import LoaderCircle from "@/components/LoaderCircle/LoaderCircle.vue";
  export default {
    name: "ProfileView",
    components: { Input, Button, LoaderCircle },
    mixins: [ProfileView],
  };
</script>
