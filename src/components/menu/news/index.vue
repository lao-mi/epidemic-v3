<template>
<div class="new">
  <el-card v-for="item in news" :key="item.id" class="news" @click="todetailed(item.id)">
  <template #header>
    <h2>
      {{ item.header }}
    </h2>
  </template>
  <div class="news-home">{{ item.home }}</div>
</el-card>
</div>
</template>

<script setup lang='ts'>
import { ref ,reactive} from 'vue'
import { useRouter} from 'vue-router'
const news = reactive([
  {
    id:1,
    header:'我是标题',
    home:'我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容'
  },
  {
    id:2,
    header:'我是标题',
    home:'我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容我是内容，我有很多的内容'
  }
])
const router = useRouter()
function todetailed(id:any){
  router.push({
    name: 'deta',
    params: {id: id}
  })
}
</script>

<style lang='less' scoped>
.news{
  margin-top: 5px;
  &-home{
    padding-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
}
.new{
  margin: 15px 5px 0;
}
</style>