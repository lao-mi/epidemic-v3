<template>
<div class="seacrh">
  <el-input v-model.trim="seacrhs" class="input" />
  <el-button type="primary" @click="submit">搜索</el-button>
</div>
<div class="collapse">
<el-collapse v-model="activeName" accordion>
  <el-collapse-item title="高风险地区" name="1">
    <div v-for="(item,index) in uselogin.notice.high" :key="index">{{ item }}</div>
  </el-collapse-item>
  <el-collapse-item title="中风险地区" name="2">
    <div v-for="(item,index) in uselogin.notice.middle" :key="index">{{ item }}</div>
  </el-collapse-item>
</el-collapse>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive,onBeforeMount} from 'vue'
import {getriskarea} from '@/server'
import { useloginStore } from '@/store';
const uselogin = useloginStore()
const middles = reactive([])
const highs = reactive([])
const seacrhs = ref('')
const activeName = ref('1')
// 获取疫情风险地
function getris(){
  getriskarea().then((res: any) => {
    let middle = res.data.data[1]
    let high = res.data.data[2]
    for (let key in middle) {
      if (middle.hasOwnProperty(key)) {
        middle[key].forEach((item: any) => middles.push(item.province + " " + item.city + " " + item.addr))
      }
    }
    for (let key in high) {
      if (high.hasOwnProperty(key)) {
        high[key].forEach((item: any) => highs.push(item.province + " " + item.city + " " + item.addr))
      }
    }
    if(uselogin.notice.high.length <=0){
    uselogin.changenotice(highs,middles)
    }
  })
}
// 搜索
function submit(){
  const sear= new RegExp(seacrhs.value,'g')
  let middle= middles.filter((item:string)=>{
    if(item.search(sear)>0){
      return item
    }
  })
  let high= highs.filter((item:string)=>{
    if(item.search(sear)>0){
      return item
    }
  })
  uselogin.changenotice(high,middle)
}
onBeforeMount(()=>{
  getris()
})
</script>

<style lang='less' scoped>
.seacrh{
  padding:10px 10px;
  .input{
  width: 70%;
  margin-right: 10px;
}
}
.collapse{
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}
</style>