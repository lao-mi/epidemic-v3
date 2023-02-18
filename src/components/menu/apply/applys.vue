<template>
<div>
  <h1>请假结果</h1>
  <div class="list">
    <div>姓名</div>
    <div>寝室</div>
    <div>请假时间</div>
    <div>审核情况</div>
  </div>
  <div v-for="item in list" :key="item" class="list">
    <div>{{ uselogin.applylist[item-1].nickname }}</div>
    <div>{{ uselogin.applylist[item-1].dormitory }}</div>
    <div>{{ uselogin.applylist[item-1].time }}</div>
    <div v-if="uselogin.applylist[item-1].status==1" style="color: #E6A23C;">待审核</div>
    <div v-else-if="uselogin.applylist[item-1].status==2" style="color: #67C23A;">审核通过</div>
    <div v-else-if="uselogin.applylist[item-1].status == 3" style="color: #F56C6C;">审核不通过</div>
  </div>
  <el-button @click="goapply" style="margin-left:40% ;margin-top: 75px;" type="primary">去请假</el-button>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive,onBeforeMount} from 'vue'
import { useloginStore } from '@/store'
import { getapplylist } from '@/server'
import { useRouter } from 'vue-router';
const router= useRouter()
const uselogin = useloginStore()
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  username: '',
  deptId: undefined,
  leaveType: undefined,
  status: undefined
}) 
const list =ref()

function toapplylist(){
  getapplylist({
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    deptId: queryParams.deptId,
    username: queryParams.username,
    leaveType: queryParams.leaveType,
    status: queryParams.status,
    start:undefined,
    end:undefined
  }).then((res:any)=>{
    uselogin.applylist = res.data.data.records
    if(res.data.data.total>=3){
      list.value = 3
    }else{
      list.value = res.data.data.total
    }
  })
}
function goapply(){
  router.push('apply')
}
onBeforeMount(()=>{
  queryParams.username =uselogin.userinfo.username
  toapplylist()
})
</script>

<style lang='less' scoped>
h1{
  margin: 50px;
  text-align: center;
}
.list{
  font-size: 13px;
  display: flex;
  justify-content: space-around;
  div{
    margin: 8px 0;
  }
}
</style>