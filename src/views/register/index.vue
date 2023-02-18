<template>
<div class="register">
  <el-card class="register-card" shadow="always">
    <div class="cbox">用户注册</div>
    <div class="cinput">
      <div class="input-img"><img src="@/assets/login/log_ic01.png" /></div>
      <input type="text" required="required" class="input" v-model="reguser.username" placeholder=" 用户名" />
    </div>
    <div class="cinput">
      <div class="input-img"><img src="@/assets/login/log_ic02.png" /></div>
      <input type="passwrod" class="input" v-model="reguser.passwrod" placeholder=" 密码" />
    </div>
    <div class="cinput">
      <div class="input-img"><img src="@/assets/login/log_ic02.png" /></div>
      <input type="passwrod" class="input" v-model="reguser.code" placeholder=" 验证码" />
      <img :src="registercodeimg" @click="tocode" />
    </div>
    <br/>
    <div class="d2">
    <el-select class="d1" v-model="reguser.roletype" placeholder="角色类型">
      <el-option label="学生用户" :value="2" />
      <el-option label="教师用户" :value="1" />
      <el-option label="后勤用户" :value="0" />
    </el-select>
    <input class="d1" type="text" v-model="reguser.registercode" placeholder="注册码" />
    <el-select class="d1" v-model="reguser.deptid" placeholder="部门院校">
      <template v-for="(item,index) in deptlist">
        <el-option :label="item.deptName" disabled :value="item.deptId"></el-option>
        <template v-for="child in item.children">
          <el-option :label="child.deptName" :value="child.deptId">{{ "-"+ child.deptName }}</el-option></template>
      </template>
    </el-select>
    <input class="d1" type="text" v-model="reguser.phonenumber" placeholder="电话" />
  </div>
    <div class="button">
      <button @click="getregister">立即注册</button>
    </div>
  </el-card>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive,shallowReactive,onMounted,onBeforeMount} from 'vue'
import { getcode,toregister,getdeptlist } from '@/server';
// 注册表单
type reg = {
  username:string,
  passwrod:string,
  code:string,
  key:string,
  roletype:string,
  registercode:string,
  region:string,
  deptid: string,
  phonenumber: string,
}
const reguser = reactive<reg>({
  username:'',
  passwrod:'',
  code:'',
  roletype:'',
  region:'',
  registercode:'',
  key:'',
  deptid: '',
  phonenumber: '',
})
// 注册
function getregister(){
  let phone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  if(phone.test(reguser.phonenumber)){
    let x = `username=${reguser.username}&password=${reguser.passwrod}&roleType=${reguser.roletype}&registerCode=${reguser.registercode}&deptId=${reguser.deptid}&phoneNumber=${reguser.phonenumber}&code=${reguser.code}&key=${reguser.key}`

    toregister(x).then((res:any)=>{
      if(res.data.code ===200){
        alert('注册成功！')
      }else{
        alert('验证码或注册码错误！')
      }
    })
  }else{
    alert('手机号码格式错误！')
  }
}

// 获取验证码
const registercodeimg = ref('')
function tocode(){
  getcode().then((res:any)=>{
    reguser.key = res.data.data.key,
    registercodeimg.value = res.data.data.base64
    reguser.code = ''
  })
}
// 获取部门院校
let deptlist = shallowReactive([])
function todeptlist(){
  getdeptlist().then((res:any)=>{
    let list = res.data.data[0].children
    list.forEach((item:any)=>deptlist.push(item))
  })
}
onMounted(()=>{
  tocode()
  todeptlist()
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
  .d2{
    display: flex;
    flex-wrap: wrap;
    margin-left: 7%;
  }
  .d1{
    margin-left: 6%;
    margin-bottom: 10px;
    width: 38%;
    height: 28px;
    border: 1px #ccc solid;
    border-radius: 5px;
    &:focus {
      outline: none;
      color: #000;
      border: 1px #68CDFE solid;
      box-shadow: 0 0 10px #9addff;
    }
  }
}
.cbox{
  font-size:15px;
  font-weight: bold;
  margin-bottom: 25px;
}
.cinput{

  margin-top: 18px;
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
  margin-top:18px;
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