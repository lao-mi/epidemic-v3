<template>
<Teleport to="body">
    <div v-if="open" class="modal">
      <slot></slot>
      <br/>
      <button @click="close">关闭</button>
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

</style>