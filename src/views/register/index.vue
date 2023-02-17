<template>
<div class="register">
    <el-card class="register-card" shadow="always">
      <div class="cbox">用户注册</div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic01.png"/></div>
        <input type="text" class="input" v-model="reguser.id" placeholder=" 用户名"/>
      </div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic02.png"/></div>
        <input type="passwrod" class="input" v-model="reguser.passwrod1" placeholder=" 密码"/>
      </div>
      <div class="cinput">
        <div class="input-img"><img src="@/assets/login/log_ic02.png"/></div>
        <input type="passwrod" class="input" v-model="reguser.passwrod2" placeholder=" 确认密码"/>
      </div>
      <div class="button">
        <button>立即注册</button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
type reg = {
  id:string,
  passwrod1:string,
  passwrod2:string,
}
const reguser = reactive<reg>({
  id:'',
  passwrod1:'',
  passwrod2:'',
})
</script>

<style lang='less' scoped>
@color:#307AB8;
.register{
  padding: 100px 14% 95px 61%;
  background-color: #EBEDEA;
  background-image: url('@/assets/login/register.jpg');
  background-repeat:no-repeat;
  background-position:25% 125px;
  background-size:45% 60%;
}
.register-card{
  width: 100%;
  height: 410px;
  padding: 10px;
}
.cbox{
  font-size:15px;
  font-weight: bold;
  margin-bottom: 35px;
}
.cinput{

  margin-top: 25px;
  margin-left: 13%;

  .input-img{
    width: 10%;
    border: 1px #ccc solid;
    border-right: 0;
    padding: 7px 0 5px 14px;
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
      color: #000;
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
    }
  }
  @media only screen and(max-width: 650px) {
    .register{
      padding: 50px 0;
      background-color: #EBEDEA;
    }
  }
</style>