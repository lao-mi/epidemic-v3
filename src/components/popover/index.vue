<template>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="head">温馨提示</div>
      <p class="main"><slot></slot></p>
      <br />
      <button @click="close" class="footer">确认</button>
    </div>
  </Teleport>
</template>

<script setup lang='ts'>
import { fa } from 'element-plus/es/locale';
import { ref ,reactive} from 'vue'
type props={
  open:boolean
}
withDefaults(defineProps<props>(),{
  open:false
})
const emit = defineEmits(['update:open'])
function close(){
  emit('update:open',false)
}
</script>

<style lang='less' scoped>
.modal{
  height: 100px;
  width: 300px;
  position: absolute;
  border-radius: 5px;
  background-color: #f1f1f1;
  left: 50%;
  top: 38%;
  transform: translate(-50%,-50%);
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  z-index: 999;
}
.head{
  text-align: center;
  margin: 10px auto;
  color: #75B9FC;
  font-size: 13px;
}
.footer{
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 45px;
  height: 25px;
  border: 1px solid hsl(240, 78%, 7%);
  border-radius: 5px;
}
.footer:hover{
  background-color: #c1dffd;
  box-shadow: 0 0 10px #9addff
}
.main{
  color: rgb(156, 155, 155);
  text-align: center;
}
</style>