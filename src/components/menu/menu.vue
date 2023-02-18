<template>
  <div class="menu">
    <div @click="fn1(item.router)" v-for="(item,index) in menu" :key="index" class="menu-inside" :class="{coarse:item.action}">
      <el-icon size="20" :class="{icon:true,action:item.action}">
        <component :is="item.icon"/>
      </el-icon>
      {{item.name}}
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Menu,Edit,ChatRound,MapLocation,Calendar,Printer } from '@element-plus/icons-vue'
import { ref ,reactive,markRaw,watch,onMounted} from 'vue'
import { useRouter } from 'vue-router';
// 路由数据
const menu = reactive([
  { 
    name: '新闻资讯',
    router: 'news',
    action:false,
    icon: markRaw(Menu)
  },
  {
    name: '风险地查看',
    router: 'notice',
    action:false,
    icon: markRaw(MapLocation)
  },
  {
    name: '健康上报',
    router: 'sign',
    action:false,
    icon: markRaw(Edit)
  },
  {
    name: '请假申请',
    router: 'applys',
    action:false,
    icon: markRaw(Calendar)
  },
  {
    name: '二码一报告',
    router: 'report',
    action:false,
    icon: markRaw(ChatRound)
  },
  {
    name: '出入登记',
    router: 'access',
    action:false,
    icon: markRaw(Printer)
  }
])
const router = useRouter()
function fn1(rter:string){
  router.push({path:'/explorer/'+rter})
};
function init(n:string){
  menu.forEach((value)=>{
    if(('/explorer/'+value.router)== n){
        value.action = true
        return
      }else{
        value.action = false
      }
  })
}
//初始化当前路由显示
onMounted(()=>{
  init(router.currentRoute.value.path)
})
// 路由改变时变化
watch(
  ()=>router.currentRoute.value.path,
  (newvalue,oldvalue)=>{
    init(newvalue)
  }
)
</script>

<style lang='less' scoped>
.menu{
  margin-top: 50px;
  display: flex;
  width: 225px;
  flex-flow: column;
  &-inside{
    margin-top: 10px;
    width: 135px;
    line-height: 50px;
    font-size: 18px;
    &:hover{
      border: 1px;
      border-radius: 30px;
      background-color: #F1F1F1;
    }
    .icon{
      margin-right: 5px;
    }
    .action{
      color: #5DAAF8;
    }
  }
  .coarse{
    font-size:19px;
    font-weight: 700;
  }
}
</style>