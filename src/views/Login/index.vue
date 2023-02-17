<template>
<div class="login">
  <el-card class="login-card" shadow="always">
    <form>
      <div class="cbox">用户登录</div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic01.png" /></div>
        <input type="text" class="input" v-model="loginuser.id" placeholder=" 用户名" />
      </div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic02.png" /></div>
        <input type="password" class="input" v-model="loginuser.password" placeholder=" 密码" />
      </div>
      <div class="button">
        <a href="#">忘记密码？</a>
        <button>登录</button>
      </div>
    </form>
  </el-card>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
interface loginuser{
  id:String,
  password:string
}
const loginuser = reactive<loginuser>({
  id:'',
  password:''
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

  margin-top: 35px;
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
  a{
    margin-right: 22%;
    margin-bottom: 10px;
    float: right;
    font-size: 13px;
    color: @color;
  }
    button{
      background-color: @color;
      color: #fff;
      border-radius: 5px;
      border: @color;
      width: 80%;
      line-height: 28px;
      margin-bottom: 42%;
    }
  }
  @media only screen and(max-width: 650px) {
    .login{
      padding: 50px 0;
      background-color: rgb(237, 254, 233);
    }
  }
</style>