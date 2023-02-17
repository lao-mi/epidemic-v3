<template>
  <div class="steps">
    <el-result icon="error" title="今日未签到"></el-result>
    <!-- <br/>
    <el-steps :active="active" process-status="error" finish-status="success" align-center>
      <el-step title="填写" />
      <el-step title="确认" />
      <el-step title="完成" />
    </el-steps> -->
    <div class="time">每日打卡时间范围:6:00-22:00</div>
    <button @click="jia">{{ active }}++</button>
  </div>
  <pop v-model:open="open">
    <p class="time">未到打卡时间</p>
  </pop>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
import pop from '@/components/popover/index.vue'
const active = ref<number>(0)
const open = ref(false)
function jia(){
  let d = new Date().getHours()
  if(d>=6 && d<=22){
    active.value = active.value+1
    open.value = true
  }else{
    open.value = true
  }
}
</script>

<style lang='less' scoped>
.steps{
  height: 50px;
  width: 450px;
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.time{
    color: rgb(156, 155, 155);
    text-align: center;
  }
</style>