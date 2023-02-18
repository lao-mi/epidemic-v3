<template>
  <div class="steps">
    <el-result :icon="icons" :title="hint"></el-result>
    <div class="time">请在6:00-22:00之间上传！</div>
    <el-button @click="jia" class="enter" :disabled="isColck">去上传</el-button>
  </div>
  <pop v-model:open="open">
    <p>未到上传时间</p>
  </pop>
</template>

<script setup lang='ts'>
import pop from '@/components/popover/index.vue'
import { ref ,reactive,onBeforeMount} from 'vue'
import { useRouter } from 'vue-router';
import { torep } from '@/server';
const active = ref<number>(0)
const router = useRouter()
const open = ref(false)
const icons = ref<'success'|'error'>('error')
const hint = ref('未上传！')
const isColck= ref(false)
// 判断是否为签到时间
function jia(){
  let d = new Date().getHours()
  if(d>=6 && d<=22){
    active.value = active.value+1
    open.value = false
    router.push({path:'reports'})
  }else{
    open.value = true
  }
}

onBeforeMount(()=>{
  // 检测今日是否打卡
  torep().then((res:any)=>{
    if(res.data.data !== 'allow'){
      icons.value = 'success'
      hint.value ='已上传！'
      isColck.value = true
    }
  })
})
</script>

<style lang='less' scoped>
.steps{
  height: 50px;
  width: 450px;
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  .enter{
    display: block;
    margin: 0 auto;
    margin-top: 60px;
  }
}
.time{
    color: rgb(156, 155, 155);
    text-align: center;
  }
</style>