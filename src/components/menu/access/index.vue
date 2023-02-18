<template>
  <h1>出入登记表</h1>
  <div class="zhu">注：家长或外来人员进入校园前一定要填写此表</div>
  <div class="form">
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" size="default"
    status-icon>
    <el-form-item label="人员姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入姓名" maxlength="30" />
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入联系人电话" />
    </el-form-item>
    <el-form-item label="出入类型" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio :label=1><span style="font-weight: normal">出校</span></el-radio>
        <el-radio :label=0><span style="font-weight: normal">入校</span></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号" prop="card">
      <el-input v-model="form.card" placeholder="请输入身份证号" />
    </el-form-item>
    <el-form-item label="所属部门" prop="dept">
      <el-input v-model="form.dept" placeholder="请输入所属部门" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea" placeholder="请输入备注内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</div>
<pop v-model:open="open">
<a>{{ hint }}</a>
</pop>
</template>

<script lang="ts" setup>
import pop from '@/components/popover/index.vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {getaccess} from '@/server'
const open =ref(false)
const hint = ref('')
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  name: undefined,
  phone: undefined,
  type: 1,
  card: undefined,
  dept: undefined,
  remark: undefined
})
// 表单样式
const checkCard = (rule: any, value: any, callback: any) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "姓名不能为空", trigger: "blur" }
  ],
  type: [
    { required: true, message: "类型不能为空", trigger: "blur" }
  ],
  dept: [
    { required: true, message: "部门不能为空", trigger: "blur" }
  ],
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur"
    }
  ],
  card: [
    { required: true, validator: checkCard, trigger: 'blur' }
  ]
})
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      getaccess(form).then((res:any)=>{
        if(res.data.code==200){
          form.name =undefined
         form.card=undefined
        form.remark =undefined
        form.phone =undefined
        form.dept =undefined
        }
        hint.value= res.data.data
        open.value=true
      })
    } else {
      hint.value = '表单数据格式错误！'
      open.value =true
    }
  })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
h1{
  text-align: center;
  margin: 20px;
}
.zhu{
  opacity: 0.7;
  text-align: center;
  color: #E6A23C;
}
.form{
  width: 70%;
  margin-top: 50px;
  margin-left: 10%;
}
</style>