<template>
<div>
  <el-icon @click="back" size="25" class="detailed"><ArrowLeftBold /></el-icon>
  <span class="head">健康上报</span>
</div>
<div class="main">
  <!-- 提示提示文字 -->
  <div class="prompt">表单会默认填写之前在该设备上输入的内容，请注意核对！</div>
  <!-- 基本信息 -->
  <div class="box">
    <div class="box-top">基本信息</div>
    <div class="box-main">姓名<span>{{ user.nickname }}</span></div>
    <div class="box-main">城市<span>{{ user.city }}</span></div>
    <div class="box-main">手机号<span>{{ user.phoneNumber }}</span></div>
  </div>
  <!-- 情况表单 -->
  <div class="box from">
    <div class="box-top">今日健康信息</div>
    <el-form
    ref="ruleFormRef"
    :model="user"
    :rules="rules"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
    <div>1. 目前的健康状况：</div>
    <div>
      <el-form-item label="." prop="healthType">
        <el-radio-group v-model="sginfrom.healthType">
          <el-radio :label="2">正常</el-radio>
          <el-radio :label="1">有发热咳嗽</el-radio>
          <el-radio :label="0">有其他不正常状况</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
    <div>2. 当前体温：</div>
    <div>
        <el-form-item label="." prop="temperature">
          <el-input class="input" v-model="sginfrom.temperature" placeholder="°C"></el-input>
        </el-form-item>
    </div>
    <div>3. 是否中高风险地区停留或接触中高风险地区人员：</div>
    <div>
      <el-form-item label="." prop="middleHigh">
        <el-radio-group v-model="sginfrom.middleHigh">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
        </el-form-item>
    </div>
    <div>4. 是否接触疑似或者确诊的新冠病毒肺炎患者患者：</div>
    <div>
      <el-form-item label="." prop="diagnosis">
        <el-radio-group v-model="sginfrom.diagnosis">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
    <div>5. 近14日有无与境外（包括港澳台）回国人员接触：</div>
    <div>
      <el-form-item label="." prop="returnInfo">
        <el-radio-group v-model="sginfrom.returnInfo">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
    <div>5. 近14日有无与境外（包括港澳台）回国人员接触：</div>
    <div class="bottom">
      <el-form-item label="." prop="address">
          <el-input class="input" v-model="sginfrom.address"></el-input>
      </el-form-item>
    </div>
    </el-form>
  </div>
  <div class="box1">
    <el-checkbox v-model="checked1" label="我已确认以上内容如实填报，因隐瞒，谎报造成的法律责任全部由本人承担。" size="large" />
    <el-button class="box1-button" @click="submit" :disabled="!checked1">提交</el-button>
  </div>
</div>
</template>

<script setup lang='ts'>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { ref ,reactive, onBeforeMount} from 'vue'
import { useRouter } from 'vue-router';
import { touser,tosgin } from '@/server';
import type { FormInstance, FormRules } from 'element-plus'
import { number } from 'echarts';
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  healthType: [
      { required: true, message: "健康状况不能为空", trigger: "blur" }
  ],
  temperature: [
		{ required: true, message: "温度信息不能为空", trigger: "blur" }
    ],
  middleHigh: [
      { required: true, message: "健康信息不能为空", trigger: "blur" }
  ],
  diagnosis: [
      { required: true, message: "健康信息不能为空", trigger: "blur" }
  ],
  returnInfo: [
      { required: true, message: "健康信息不能为空", trigger: "blur" }
  ],
  address: [
      { required: true, message: "打卡地址不能为空", trigger: "blur" }
  ]
})
const router =useRouter()
// 返回
function back(){
  router.back() 
}
// 用户信息
const user = reactive({
  nickname: '张三',
  city: 12345,
  phoneNumber: 1399064
})
// 获取用户信息
function getuser(){
  touser().then((res:any)=> {
    let users=res.data.data.user
    user.nickname= users.nickname
    user.city=users.city
    user.phoneNumber=users.phoneNumber
    sginfrom.username = users.username
    sginfrom.deptId = users.deptId
    sginfrom.address = users.city
	})
}
// 表单内容
let sginfrom = reactive({
  healthType: number,
  temperature: number,
  middleHigh: number,
  diagnosis: number,
  returnInfo: number,
  address: '',
  username: undefined,
  deptId: ''
})
// 获取默认信息
onBeforeMount(()=>{
  getuser()
  if(localStorage.getItem('sginfrom')){
    sginfrom= reactive(JSON.parse(localStorage.getItem('sginfrom')as string))
  }
})
// 提交打卡信息
const checked1 = ref(false)
function submit(){
  localStorage.setItem("sginfrom",JSON.stringify(sginfrom))
  tosgin(sginfrom).then((res:any)=>{
    if(res.data.code==200){
      alert('打卡成功！')
      router.push('/explorer/sign')
    }else{
      alert('打卡失败，请稍后再试')
    }
    
  })
}
</script>

<style lang='less' scoped>
.detailed{
padding: 10px 8px 0;
z-index: 5;
}
.head{
  display: block;
  text-align: center;
  font-size: 20px;
  position: relative;
  top: -28px;
  font-weight: bold;
}
// 签到内容
 .main {
   position: relative;
   top: -25px;
   background-color: #f1f1f1;
   padding-top: 10px;

   .box {
     display: flex;
     flex-flow: column;
     padding: 15px 7px 2px;
     border-radius: 3px;

     div {
       padding: 0 5px;
       height: 25px;
       line-height: 25px;
       background-color: #ffffff;
       font-size: 13px;
     }

     &-main {
       color: #858585;

       span {
         position: absolute;
         right: 15px;
       }
     }

     &-top {
       height: 10px;
       padding-left: 3px;

     }

     &-top::before {
       content: "|";
       color: #75B9FC;
       font-weight: bold;
     }
     .bottom{
      padding-bottom: 8px;
     }
   }
   .box1{
     display: flex;
     flex-flow: column;
     padding: 15px 5px 10px;
     &-button{
      width: 95%;
      margin: 0 auto;
     }
   }
   .prompt{
    color: rgb(237, 185, 29);
    text-align: center;
    font-size: 15px;
    padding-top: 10px;
   }
 }
 .input{
  width: 45%;
 }
</style>