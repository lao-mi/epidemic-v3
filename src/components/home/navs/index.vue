<template>
  <ul class="nav-list">
    <li class="clist" @click="mation">新闻资讯</li>
    <li class="clist" @click="sign">健康上报</li>
    <li class="clist" @click="apply">请假申请</li>
    <li class="clist" @click="notice">风险地查看</li>
    <li class="clist" @click="more">更多</li>
  </ul>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()

function mation(){
  router.push({path:'/explorer/news'})
}
function sign(){
  router.push({path: '/explorer/sign'})
}
function apply(){
  router.push({path: '/explorer/applys'})
}
function notice(){
  router.push({path: '/explorer/notice'})
}function more(){
  router.push('/explorer/report')
}
</script>

<style lang='less' scoped>
@color:#5DAAF8;
.nav-list{
  margin: 25px 16% 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .clist{
    text-align: center;
    width: 110px;
    line-height: 30px;
    font-size: 15px;
    color: @color;
    border: 1px @color solid;
    border-radius: 25px;
    &:hover{
      color: #fff;
      border: 1px @color solid;
      box-shadow: 0 0 5px @color;
      background-color: @color;
    }
  }
}
</style>