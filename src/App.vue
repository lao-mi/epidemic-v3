<script setup lang="ts">
import { useStore } from './store';
import Header from './components/master/Header/index.vue';
import Footer from './components/master/Footer/index.vue'
import { reactive } from 'vue';
const user = useStore()
user.test(123)
console.log(user.leth);

</script>

<template>
    <Header></Header>
    <router-view/>
    <Footer></Footer>
</template>

<style scoped>
</style>
