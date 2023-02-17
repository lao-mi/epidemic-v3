<template>
  <el-carousel :interval="4000" type="card" height="380px" arrow="never" class="siwper">
    <el-carousel-item v-for="item in photolist" :key="item.id">
      <img :src="item.url" />
    </el-carousel-item>
  </el-carousel>
  <navs class="navs"></navs>
  <emicstatus class="emicstatus"></emicstatus>
</template>

<script setup lang='ts'>
import emicstatus from '@/components/home/emicstatus/index.vue'
import navs from '@/components/home/navs/index.vue'
import { ref ,reactive} from 'vue'
const photolist = reactive([
        {id: 1,url:'http://n.sinaimg.cn/sc/crawl/117/w550h367/20220624/ee2d-bbf98944e8a21f3d7176538e453d79e6.jpg'},
        {id: 2,url:'http://pic.baike.soso.com/ugc/baikepic2/11373/20170730015359-564392011.jpg/0'},
        {id: 3,url:'http://n.sinaimg.cn/sc/transform/116/w550h366/20180621/upK2-hefphqk7087766.jpg'},
        {id: 4,url:'https://img-u-3.51miz.com/preview/muban/00/00/51/53/M-515385-8689D625.jpg'},
        {id: 5,url:'https://tse1-mm.cn.bing.net/th/id/OIP-C.-LM13yXQF6seRC7DcwjijAHaEy?pid=ImgDet&rs=1'}
      ])

</script>

<style lang='less' scoped>
.siwper{
  width: 95%;
  margin: 50px auto;

}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img{
    width: 100%;
    height: 400px;
  }
.emicstatus{
  margin: 45px auto;
  width: 78%;
}
</style>