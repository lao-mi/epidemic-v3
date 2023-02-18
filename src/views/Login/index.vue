<template>
<div class="login">
  <el-card class="login-card" shadow="always">
      <div class="cbox">用户登录</div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic01.png" /></div>
        <input type="text" class="input" v-model="loginuser.username" placeholder=" 用户名" />
      </div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic02.png" /></div>
        <input type="password" class="input" v-model="loginuser.password" placeholder=" 密码" />
      </div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic01.png" /></div>
        <input type="text" class="input c" v-model="loginuser.code" placeholder="验证码" />
        <img :src="codeimg" class="code" @click="tocode" />
      </div>
      <div class="button">
        <button @click="login">登录</button>
      </div>
  </el-card>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive,onMounted,onBeforeMount} from 'vue'
import { useloginStore } from '@/store'
import { getcode,tologin } from '@/server';
import { useRouter } from 'vue-router';
const uselogin = useloginStore()
const router = useRouter()
interface loginuser{
  username:String,
  password:string,
  code:string,
  key:string
}
const loginuser = reactive<loginuser>({
  username:'admin',
  password:'123456',
  code:'',
  key:''
})
// 登录
function login(){
  let a = "username="+loginuser.username+"&password="+loginuser.password+"&code="+loginuser.code+"&key="+loginuser.key
    tologin(a).then((res:any)=>{
      uselogin.getlogin(res)
      if(res.data.code==200){
        uselogin.getlogin(res)
        uselogin.getuser()
        alert('登录成功')
        router.push('/')
      }else{
        alert('验证码或密码错误！')
      }
    }).catch(()=>{
      alert("密码或者验证码错误！")
      })
  
}
// 获取更新验证码
const codeimg = ref<string>('')
function tocode(){
  getcode().then((res:any)=>{
    codeimg.value = res.data.data.base64
    loginuser.key = res.data.data.key
  })
}
onMounted(()=>{
  tocode()
  localStorage.setItem('token', '')
})
</script>

<style lang='less' scoped>
@color:#307AB8;
.login{
  padding: 100px 14% 95px 61%;
  background-color: rgb(237, 254, 233);
  background-image: url('@/assets/login/login.png');
  background-repeat:no-repeat;
  background-position:25% 125px;
  background-size: 42% 60%;
}
.login-card{
  width: 100%;
  height: 100%;
  padding: 10px;
}
.cbox{
  font-size:15px;
  font-weight: bold;
}
.cinput{
  margin-top: 30px;
  margin-left: 13%;
  .input-img{
    width: 10%;
    border: 1px #ccc solid;
    border-right: 0;
    padding: 7px 5px 5px 10px;
    float: left;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    img{
      width: 16px;
      height: 16px;
    }
  }
  .input {
    height: 31px;
    width: 73%;
    border: 1px #ccc solid;
    color: #ccc;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  .code{
    width: 162px; height: 42px;
  }
}
.input:focus {
      outline: none;
      color: black;
      border: 1px #68CDFE solid;
      box-shadow: 0 0 10px #9addff;
    }
.button{
  margin-top:45px;
  margin-left: 20%;
    button{
      background-color: @color;
      color: #fff;
      border-radius: 5px;
      border: @color;
      width: 80%;
      line-height: 28px;
      margin-bottom: 25%;
    }
  }
  @media only screen and(max-width: 650px) {
    .login{
      padding: 50px 0;
      background-color: rgb(237, 254, 233);
    }
  }
</style>