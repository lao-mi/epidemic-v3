<template>
<div class="apply">
  <div class="notice" v-show="active==1">
    <h3 style="text-align: center">提醒告知</h3>
    <ul class="info_list">
      <li>1. 离校去往低风险地区的学生，坚持每日健康打卡且健康码为绿色，方可入校。</li>
      <li>2. 途经中高风险地区或与中高风险地区人员有接触的学生返常后，暂不入校。按属地要求进行隔离并接受核酸检测，经相关部门审核、备案后，方可入校。中、高风险地区名单可到国务院网站查询(网址：<a
              href="http://bmfw.www.gov.cn/yqfxdjcx/index.html" target="_blank">http://bmfw.www.gov.cn/yqfxdjcx/index.html</a>)。
      </li>
      <li>3. 请假学生本人及同住家人、密切接触者有国（境）外旅居史的，暂缓入校。按属地要求进行隔离并接受核酸检测，经相关部门审核、备案后，方可入校。</li>
        <li>4. 请假学生本人及同住家人、密切接触者出现身体异常情况（发烧、咳嗽等症状）的，暂缓入校。直至排除新冠肺炎可能后，方可申请入校。</li>
      <li>5. 出行期间，请做好个人防护措施。</li>
    </ul>
    <el-checkbox v-model="checked">我承诺,本人根据有关要求进行了如实登记，如有隐瞒愿意承担相应法律责任。</el-checkbox>
  </div>
  <div v-show="active==2">
    <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
      <el-form-item label="请假类型" prop="leaveType">
        <el-select v-model="form.leaveType" placeholder="请选择请假类型">
          <el-option label="事假" :value="1" />
          <el-option label="病假" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="学生类型" prop="studentType">
        <el-select v-model="form.studentType" placeholder="请选择学生类型">
          <el-option label="本科生" :value="1" />
          <el-option label="专科生" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="请假时间" prop="time">
        <el-date-picker v-model="form.time" value-format="YYYY-MM-DD" type="daterange" style="width: 221px"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="请假天数" prop="day">
        <el-input-number v-model="form.day" style="width: 221px" controls-position="right" :min="1" />
      </el-form-item>
      <el-form-item label="目的地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入目的地址" style="width: 221px" />
      </el-form-item>
      <el-form-item label="交通工具" prop="traffic">
        <el-input v-model="form.traffic" placeholder="请输入交通工具" style="width: 221px" />
      </el-form-item>
      <el-form-item label="宿舍门号" prop="dormitory">
        <el-input v-model="form.dormitory" placeholder="请输入宿舍门号" style="width: 221px" />
      </el-form-item>
      <el-form-item label="联系号码" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" placeholder="请输入联系号码" style="width: 221px" />
      </el-form-item>
      <el-form-item label="课程" prop="clazz">
        <span slot="label">
          <el-tooltip content="请假的期间是否有课程" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>
        <el-select v-model="form.clazz" placeholder="请选择课程类型">
          <el-option :key="1" label="没有" :value="1" />
          <el-option :key="0" label="有" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="考试" prop="exam">
        <span slot="label">
          <el-tooltip content="请假的期间是否有考试" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>
        <el-select v-model="form.exam" placeholder="请选择考试类型">
          <el-option :key="1" label="没有" :value="1" />
          <el-option :key="0" label="有" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="请假原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入请假原因" style="width: 581px" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
  <div class="button">
    <el-button @click="before" v-show="active==2">上一步</el-button>
    <el-button type="primary" :disabled="!checked" @click="after" v-show="active<2">下一步</el-button>
    <el-button type="primary" @click="submit" v-show="active ==2">提交</el-button>
</div>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {toapply} from '@/server'
import { useRouter } from 'vue-router';
const router = useRouter()
const checked = ref(false)
const active = ref(1)
const form = reactive({
  leaveType: undefined,
  studentType: undefined,
  day: 1,
  address: undefined,
  time: [],
  traffic: undefined,
  clazz: undefined,
  exam: undefined,
  dormitory: undefined,
  phoneNumber: undefined,
  reason: undefined
})
const rules = reactive<FormRules>({
  leaveType: [{ required: true, message: "请假类型不能为空", trigger: "blur" }],
  studentType: [{ required: true, message: "学生类型不能为空", trigger: "blur" }],
  time: [{ required: true, message: "请假时间不能为空", trigger: "blur" }],
  day: [{ required: true, message: "请假天数不能为空", trigger: "blur" }],
  address: [{ required: true, message: "目的地址不能为空", trigger: "blur" }],
  traffic: [{ required: true, message: "交通工具不能为空", trigger: "blur" }],
  dormitory: [{ required: true, message: "宿舍门号不能为空", trigger: "blur" }],
  phoneNumber: [{ required: true, message: "联系号码不能为空", trigger: "blur" }],
  clazz: [{ required: true, message: "课程不能为空", trigger: "blur" }],
  exam: [{ required: true, message: "考试不能为空", trigger: "blur" }],
  reason: [{ required: true, message: "请假原因不能为空", trigger: "blur" }],
})
function before(){
  active.value--
}
function after(){
  active.value++
}
function submit(){
  form.time = form.time.join(" 至 ")
  toapply(form).then((res:any)=>{
    if(res.data.code==200){
      alert('提交成功！')
      router.push({path:'applys'})
    }else{
      alert('提交失败！')
    }
  })
}
</script>

<style lang='less' scoped>
.apply{
  padding: 30px 5px;
  overflow: hidden;
}
.notice{
  font-size: 13px;
  .info_list{
    padding: 25px 0px;
    li{
      margin: 5px;
      text-indent: 20px;
      line-height: 20px;
    }
  }
}
.button{
  position: relative;
  left: 38%;
  top: 15px;
}
</style>