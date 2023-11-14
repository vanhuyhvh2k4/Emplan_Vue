<template>
    <div class="w-2/12 h-full py-6 pl-6 pr-4">
        <h1 class="text-4xl font-black">
            <span>EMPLANN</span>
            <span class="text-primary">ER.</span>
        </h1>
        <ul class="mt-20">
            <Item class="mb-2" @click="handleClick(index)" :isActive="this.indexActive === index" :title="item.title"
                :icon="this.indexActive === index ? item.icon_active : item.icon" v-for="(item, index) in items"
                :key="index" />
        </ul>
    </div>
</template>

<script>
import Item from '@/components/Item/Item.vue';
import svgs from '@/assets/svg/export.js';
import items from '@/data/sidebar.js';
export default {
    name: 'Sidebar',
    data() {
        return { svgs, items, indexActive: 0 }
    },
    components: {
        Item,
    },
    methods: {
        handleClick(index) {
            this.indexActive = index;
        }
    },
}
</script>