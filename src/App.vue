<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/master/Header/index.vue';
import Footer from './components/master/Footer/index.vue'
import { reactive } from 'vue';
import { useloginStore } from '@/store'
const uselogin = useloginStore()
onMounted(()=>{
    uselogin.userinfo = JSON.parse(localStorage.getItem('userinfo') as string)
})
</script>

<template>
    <Header></Header>
    <router-view/>
    <Footer></Footer>
</template>

<style scoped>
</style>
