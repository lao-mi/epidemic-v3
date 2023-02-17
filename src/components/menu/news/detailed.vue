<template>
<div class="detailed">
  <el-icon size="25" @click="back"><ArrowLeftBold/></el-icon>
</div>
</template>

<script setup lang='ts'>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { ref ,reactive} from 'vue'
import { useRouter } from 'vue-router';
const router =useRouter()
function back(){
  router.back()
}
</script>

<style lang='less' scoped>
.detailed{
padding: 10px 8px 0;
}
</style>