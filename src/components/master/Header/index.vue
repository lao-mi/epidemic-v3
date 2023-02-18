<template>
  <div class="header">
    <div class="box1">
      <router-link to="/">
        <img v-if="home" src="@/assets/home/homehover.svg"/>
        <img v-else src="@/assets/home/home.svg"/>
      </router-link>
    </div>
    <!-- 登录注册 -->
    <div class="box2" v-if="userstate">
      <router-link to="/elogin">登录</router-link> |
      <router-link to="/register">注册</router-link>
    </div>
    <!-- 头像 -->
    <el-dropdown class="box3" v-else>
      <div><img class="user" :src="userimg" /></div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="user(1)">个人信息</el-dropdown-item>
          <el-dropdown-item @click="user(2)">修改密码</el-dropdown-item>
          <el-dropdown-item @click.once="quit">退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang='ts'>
import { ref ,reactive,watch,onMounted,onUpdated} from 'vue'
import { useRouter } from 'vue-router'
import { useloginStore } from '@/store';
const uselogin = useloginStore()
const userstate = ref<boolean>(true)
const home = ref<boolean>(true)
const userimg= ref('https://www.qqkw.com/d/file/p/2022/04-11/4b121b263798a366baf114e3cc965ca8.jpg')
function isuser(){
  if(localStorage.getItem("token")==''||localStorage.getItem("token")==null){
    userstate.value = true
  }else{
    userstate.value = false
  }
}
// 主页变化
function quit(){
  userstate.value = !userstate.value
  localStorage.removeItem('token')
  localStorage.removeItem('userinfo')
}
function user(x:number){
  if(x===1){
  router.push('/user')
  }else{
    router.push('/change')
  }
}
let router = useRouter()
watch(
  ()=>router.currentRoute.value.path,
  (newvalue,oldvalue)=>{
    if(newvalue === '/'){
      home.value = true
    }else{
      home.value = false
    }
  }
)
onMounted(()=>{
  isuser()
  userimg.value=uselogin.userinfo.avatar ||'https://www.qqkw.com/d/file/p/2022/04-11/4b121b263798a366baf114e3cc965ca8.jpg'
})
onUpdated(()=>{
  userimg.value=uselogin.userinfo.avatar ||'https://www.qqkw.com/d/file/p/2022/04-11/4b121b263798a366baf114e3cc965ca8.jpg'
})
</script>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 70px;
  background-color: #75b9fc;
  .box1 {
    font-weight: bold;
    font-size: x-large;
    float: left;
    padding: 20px 4% 0;

  }
  .box2 {
    float: right;
    line-height: 70px;
    padding-right: 5%;
    font-size: 13px;
  }
  .box3 {
    float: right;
    margin: 17px 6% 0;
  }
}
a{
  color: #000000;
}
a:hover{
  color: #F56C6C;
}
a.router-link-exact-active {
  color: #F56C6C;
}
.user{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #6d6d6d;
  overflow: hidden;
}
</style>