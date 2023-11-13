<template>
    <div
        class="flex justify-center items-center w-full h-full bg-gradient-to-r from-[4.79%] to-[54.4%] from-[#F9ED32] to-[#D9BD32] backdrop-filter backdrop-blur-sm">
        <div class="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-3/5 h-4/5 flex rounded-xl overflow-hidden"
            :class="$style.color_custom">
            <section class="w-2/5 relative overflow-hidden">
                <div class="absolute z-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="526" height="661" viewBox="0 0 526 661" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M247.031 4.45225C311.888 13.4938 365.692 60.4527 413.925 117.438C465.431 178.291 524.477 243.638 525.969 334.006C527.477 425.385 473.786 499.204 421.23 560.054C372.224 616.793 312.485 649.937 247.031 656.962C174.47 664.749 92.5661 668.06 41.4209 600.816C-9.56762 533.778 1.65127 428.197 1.39477 334.006C1.13686 239.295 -10.7804 133.383 39.9626 65.3046C91.111 -3.31772 173.881 -5.74547 247.031 4.45225Z"
                            fill="#F9ED32" />
                    </svg>
                </div>
                <div class="absolute z-[1]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="530" height="607" viewBox="0 0 530 607" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M243.061 4.70985C344.08 -11.5616 469.016 13.1371 518.064 97.4432C564.291 176.902 462.842 257.032 441.159 345.214C419.587 432.942 480.924 558.045 394.922 598.235C309.015 638.381 231.579 530.417 151.752 480.458C93.4621 443.979 22.1083 417.422 4.45926 353.873C-13.6655 288.611 26.8081 227.115 65.6198 170.319C112.978 101.017 156.485 18.6548 243.061 4.70985Z"
                            fill="#F2D335" />
                    </svg>
                </div>
                <div class="absolute z-[2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="550" height="469" viewBox="0 0 550 469" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M299.963 0.108262C343.049 -1.30402 384.815 11.1816 421.197 32.844C459.469 55.6319 489.605 87.2747 510.043 125.192C533.503 168.718 560.633 217.191 545.742 263.911C530.771 310.879 473.499 329.836 434.422 362.443C389.486 399.939 360.144 468.416 299.963 468.997C239.858 469.576 213.227 396.651 163.477 365.057C111.055 331.766 17.1311 337.391 2.01656 279.786C-13.4351 220.896 63.789 178.035 101.465 128.716C126.448 96.014 149.433 63.4714 184.742 40.5946C219.324 18.189 257.939 1.48575 299.963 0.108262Z"
                            fill="#D9BD32" />
                    </svg>
                </div>
                <div class="absolute z-[4]">
                    <img src="@/assets/images/MainImage.png" alt="">
                </div>
            </section>
            <section class="w-3/5 bg-white flex flex-col items-center rounded-2xl py-10">
                <slot />
                <div class="mt-8">
                    <span class="text-gray-500">-OR-</span>
                </div>
                <div class="flex gap-5 mt-6">
                    <Button :icon="images.Google" buttonType="outline" :class="$style.padding_custom" class="font-normal" title="Login with google"/>
                    <Button :icon="images.Github" buttonType="outline" :class="$style.padding_custom" class="font-normal" title="Login with github"/>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button/Button.vue';
import images from "@/assets/images/export.js";

export default {
    name: "AuthLayout",
    data() {
        return {
            images,
        }
    },
    components: { Button }, 
}
</script>

<style module lang="scss">
    .color_custom {
        background-color: #e5eff8;
    }

    .padding_custom {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>