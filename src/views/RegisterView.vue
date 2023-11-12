<template>
    <div
        class="flex justify-center items-center w-full h-full bg-gradient-to-r from-[4.79%] to-[54.4%] from-[#F9ED32] to-[#D9BD32] backdrop-filter backdrop-blur-sm">
        <div class="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-3/5 h-4/5 flex rounded-xl overflow-hidden" :class="$style.color_custom">
            <section class="w-2/5">

            </section>
            <section class="w-3/5 bg-white flex flex-col items-center rounded-2xl py-10">
                <h2 class="text-2xl font-bold mt-6">Create your Free Account</h2>
                <form class="w-4/5 flex flex-col items-center mt-6" @submit.prevent="handleSubmitForm">
                    <Input @input-enter="handleFullName" required label="Full Name"/>
                    <Input @input-enter="handleEmail" required placeholder="Enter your email" label="Email" class="mt-4" type="email"/>
                    <Input @input-enter="handlePassword" required placeholder="Enter your password" label="Password" class="mt-4" type="password"/>
                    <Button class="mt-8"/>
                </form>
                <div class="w-4/5 mt-4">
                    <span class="text-gray-500">Already have a account? </span>
                    <span class="text-primary font-bold cursor-pointer">Log in</span>
                </div>
                <div class="mt-8">
                    <span class="text-gray-500">-OR-</span>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import Input from '@/components/Input/Input.vue';
    import Button from '@/components/Button/Button.vue';
    import * as authService from "../services/authService.js";

    export default {
        name: 'RegisterView',
        data() {
            return {
                fullName: '',
                email: '',
                password: ''
            }
        },
        components: {
            Input,
            Button
        },
        methods: {
            async handleSubmitForm() {
                let payload = {
                    name: this.fullName,
                    email: this.email,
                    password: this.password
                };
                const response = await authService.register(payload);

                console.log(response);
            },
            handleFullName(value) {
                this.fullName = value;
            },
            handleEmail(value) {
                this.email = value;
            },
            handlePassword(value) {
                this.password = value;
            }
        },
    }
</script>

<style module lang="scss">
    .color_custom {
        background-color: rgba(230, 243, 255, 0.75);
    }
</style>