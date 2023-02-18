<template>
<div class="shell">
  <div class="top">用户信息</div>
<div class="card">
  <img class="avaimg" :src="avatar"/>
  <div>归属部位:<span>{{ dept.deptName }}</span></div>
  <div>部门电话:<span>{{ dept.phone }}</span></div>
  <div>部门邮箱:<span>{{ dept.email }}</span></div>
  <div>创建时间:<span>{{ dept.createTime }}</span></div>
  <div>修改时间:<span>{{ dept.updateTime }}</span></div>
</div>
<div class="card" v-if="open">
  <div class="updata" @click="isopen"><el-icon color="#75b9fc" size="20"><Setting /></el-icon></div>
  <div>用户昵称:<span>{{ user.nickname }}</span></div>
  <div>所在城市:<span>{{ user.city }}</span></div>
  <div>手机号码:<span>{{ user.phoneNumber }}</span></div>
  <div>备注信息:<span>{{ user.remark }}</span></div>
</div>
<div class="from" v-else>
  <div class="updata" @click="isopen"><el-icon color="#75b9fc" size="20"><Close /></el-icon></div>
  <div class="dv">
  <el-form
    ref="ruleFormRef"
    :model="user"
    :rules="rules"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="user.nickname" />
    </el-form-item>
    <el-form-item label="所在城市">
      <el-input v-model="user.city"/>
    </el-form-item>
    <el-form-item label="手机号码" prop="phoneNumber">
      <el-input v-model="user.phoneNumber" />
    </el-form-item>
    <el-form-item label="备注信息">
      <el-input  v-model="user.remark" type="textarea" />
    </el-form-item>
    <el-button class="button" type="primary" @click="upuser">
        提交
      </el-button>
    </el-form>
  </div>
</div>
</div>
<pop v-model:open="open2">
  <p>{{ hint }}</p>
</pop>
</template>

<script setup lang='ts'>
import pop from '@/components/popover/index.vue'
import { ref ,reactive,onMounted} from 'vue'
import { touser,updatainfo } from '@/server';
import { Close, Setting } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const open = ref(true)
// 提示框
const open2 =ref(false)
const hint = ref('')
const user = reactive({
  id: '',
	nickname: '',
	phoneNumber: '',
	city: '',
	remark: ''

})
const avatar =ref('')
let dept = reactive({})
// 获取用户信息
function getuser(){
  touser().then((res:any)=> {
    let users=res.data.data.user
	  user.id=users.id
    user.nickname= users.nickname
    user.city=users.city
    user.phoneNumber=users.phoneNumber
    user.remark=users.remark
    avatar.value = users.avatar
	  dept = res.data.data.dept
	})
}
// 表单配置
const rules = reactive<FormRules>({
  nickname: [
		{ required: true, message: "用户昵称不能为空", trigger: "blur" }
	],
	phoneNumber: [
		{ required: true, message: "手机号码不能为空", trigger: "blur" },
		{
			pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
			message: "请输入正确的手机号码",
			trigger: "blur"
		}
	]
})
// 切换修改
function isopen(){
  open.value = !open.value
}
// 提交修改用户信息
function upuser(){
  updatainfo(user).then((res:any)=>{
    if(res.data.code===200){
      hint.value = '修改成功！'
      open2.value = true
      getuser
    }else{
      hint.value = '修改失败，请稍后再试！'
      open2.value =true
    }
  })
}
onMounted(()=>{
  getuser()
})
</script>

<style lang='less' scoped>
.shell{
  height: 83vh;
  width: 70%;
  border-left :1px solid #cacaca;
  border-right: 1px solid #cacaca;
  margin-left: 15%;
  .top{
    width: 100%;
    text-align: center;
    font-size: 20px;
    padding: 20px 0px;
    font-weight: bold;
  }
  .card{
    display: flex;
    flex-flow: column;
    width: 50%;
    float: left;
    padding: 20px 5%;
    box-sizing: border-box;
    .avaimg{
      height: 100px;
      width: 100px;
      margin-left: 15%;
      margin-bottom: 15px;
      border: 1px solid #cacaca;
    }
    div{
      font-size: 15px;
      margin: 10px 0;
      font-weight: bold;
      span{
        margin-left: 5%;
        font-weight: lighter;
      }
    }
  }
}
.updata{
  width: 20px;
  height: 20px;
  position: relative;
  left:50%;
  &:hover{
    background-color: #cacaca;
    border: 1px solid #fff;
    border-radius: 50%;
  }
}
.from{
  display: flex;
  flex-flow: column;
  width: 50%;
  float: left;
  .dv{
    width: 65%;
    position: relative;
    top: 50px;
  }
  .button{
    margin-top: 50px;
    // margin-left: 25%;
  }
}
</style>