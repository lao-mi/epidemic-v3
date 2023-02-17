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
import { Share,Message,Menu,Edit } from '@element-plus/icons-vue'
import { ref ,reactive,markRaw,watch,onMounted} from 'vue'
import { useRouter } from 'vue-router';
// 路由数据
const menu = reactive([
  { 
    name: '校园资讯',
    router: 'news',
    action:false,
    icon: markRaw(Menu)
  },
  {
    name: '疫情通知',
    router: 'notice',
    action:false,
    icon: markRaw(Message)
  },
  {
    name: '健康上报',
    router: 'sign',
    action:false,
    icon: markRaw(Edit)
  },
  {
    name: '出入申请',
    router: '',
    action:false,
    icon: markRaw(Share)
  },
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
  width: 250px;
  flex-flow: column;
  &-inside{
    margin-top: 10px;
    width: 135px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
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