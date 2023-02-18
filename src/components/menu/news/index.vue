<template>
<div class="new">
  <el-card v-for="(item,index) in uselogin.news" :key="index" class="news" @click="todetailed(item.url)">
  
    <h2>
      {{ item.eventDescription }}
    </h2>
  <div class="news-home">{{ time(item.eventTime) }}</div>
</el-card>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive,onBeforeMount,onMounted} from 'vue'
import { useRouter} from 'vue-router'
import { getnews } from '@/server';
import { useloginStore } from '@/store'
const uselogin = useloginStore()
const router = useRouter()
function todetailed(url:any){
  window.open(url)
}
function tonews(){
  getnews().then((res:any)=>{
    let nes = res.data.data.map((item:any)=>{
      return {
        eventDescription: item.eventDescription,
        eventTime:item.eventTime,
        url: item.eventUrl
      } 
    })
    uselogin.news=nes
    })
}
function time(timestamp:number){
  let date = new Date(timestamp * 1000);
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  let Y = date.getFullYear() + '年';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日 ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '时';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '分';
  return Y + M + D + h + m;
}
onBeforeMount(()=>{
  tonews()
})
</script>

<style lang='less' scoped>
.news{
  margin-top: 5px;
  &-home{
    padding-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
}
.new{
  margin: 15px 5px 0;
}
</style>