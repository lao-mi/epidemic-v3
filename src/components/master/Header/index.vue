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
      <router-link to="/login">登录</router-link> |
      <router-link to="/register">注册</router-link>
    </div>
    <!-- 头像 -->
    <el-dropdown class="box3" v-else>
      <span><img class="user" src="@/assets/vue.svg" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click.once="quit">退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang='ts'>
import { ref ,reactive,watch} from 'vue'
import { useRouter } from 'vue-router'
const userstate = ref<boolean>(false)
const home = ref<boolean>(true)
// 主页变化
function quit(){
  userstate.value = !userstate.value
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
  widows: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>