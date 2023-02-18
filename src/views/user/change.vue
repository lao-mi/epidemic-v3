<template>
<div class="change">
  <div class="change-from">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
    <div class="header">修改密码</div>
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input show-password v-model="ruleForm.oldPassword" placeholder="请输入旧密码" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input show-password v-model="ruleForm.newPassword" placeholder="请输入新密码" />
    </el-form-item>
    <el-form-item label="旧密码" prop="newPassword">
      <el-input show-password v-model="ruleForm.confirmPassword" placeholder="请确认密码" />
    </el-form-item>
    <el-button class="button" type="primary" @click="tochange()">
        提交
      </el-button>
    </el-form>
  </div>
</div>
<pop v-model:open="open">
  <p>{{ hint }}</p>
</pop>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import pop from '@/components/popover/index.vue'
import { uppass } from '@/server'
const hint = ref<string>('')
const open = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  oldPassword: '',
	newPassword: '',
	confirmPassword: '' 
})
const rules = reactive<FormRules>({
  oldPassword: [
		{ required: true, message: "旧密码不能为空", trigger: "blur" }
					],
	newPassword: [
		{ required: true, message: "新密码不能为空", trigger: "blur" },
		{ min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
	]
})

function tochange(){
  if(ruleForm.newPassword === ruleForm.confirmPassword){
    uppass(ruleForm).then((res:any)=>{
      if(res.data.code==200){
        hint.value ='密码修改成功！'
       ruleForm.oldPassword= '',
	     ruleForm.newPassword= '',
	     ruleForm.confirmPassword= '' 
      }else{
        hint.value='密码修改失败，旧密码错误。'
      }
      open.value=true
    })
  }else{
    hint.value = '两次输入的密码不一致！'
    open.value = true
  }
}
</script>

<style lang='less' scoped>
.change{
  height: 83vh;
  width: 70%;
  border-left :1px solid #cacaca;
  border-right: 1px solid #cacaca;
  margin-left: 15%;
  &-from{
    padding: 50px 25% 0px;
    .header{
      text-align: center;
      font-size: 20px;
      color: #75B9FC;
      padding-bottom: 20px;
    }
    .button{
      margin-top: 45px;
      margin-left: 42%;
    }
  }
}
.time{
    color: rgb(156, 155, 155);
    text-align: center;
  }
</style>