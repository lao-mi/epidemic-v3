<template>
<div class="explorer">
  <menus class="menu"></menus>
  <div class="content"><router-view/></div>
</div>
</template>

<script setup lang='ts'>
import menus from '@/components/menu/menu.vue'
import { ref,reactive} from 'vue'

</script>

<style lang='less' scoped>
.explorer{
  display: flex;
  justify-content: center;
  .content{
    width: 600px;
    height: 83vh;
    border: 1px solid #EFF3F4;
    background-color: #fff;
    overflow: auto;
  }
}
</style>