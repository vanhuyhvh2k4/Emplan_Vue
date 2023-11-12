<template>
    <Navbar/>
    <slot></slot>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    name: "DefaultLayout",
    components: {
    Navbar
}
}
</script>