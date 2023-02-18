<template>
  <el-card>
    <div class="status">
      <!-- 全国疫情表 -->
    <v-chart class="chart" :option="option" />
    <!-- 最近疫情情况 -->
    <div class="queryLine">
      <h3>校园周边疫情情况</h3>
      <div class="headline">四川</div>
        <div>总计确诊：<span>{{ scdata.sctotal }}</span></div>
        <div>昨日新增：<span>{{ scdata.sctoday }}</span></div>
      <div class="headline">成都</div>
        <div>总计确诊：<span>{{ scdata.cdtotal }}</span></div>
        <div>昨日新增：<span>{{ scdata.cdtoday }}</span></div>
      <div class="headline">眉山</div>
        <div>总计确诊：<span>{{ scdata.mstotal }}</span></div>
        <div>昨日新增：<span>{{ scdata.mstoday}}</span></div>
    </div>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive,onBeforeUpdate,onMounted } from "vue";
import { getchinamap } from "@/server";
import china from '@/assets/china.json'
import * as echarts from 'echarts'
echarts.registerMap('china',china as any)

// 疫情数据
let data = reactive([])
const scdata =reactive({
  sctoday: '',
  sctotal: '',
  cdtoday: '',
  cdtotal: '',
  mstoday: '',
  mstotal: ''
})
// 图表配置
const option = reactive({
  legend: {
    orient: "vertical",
    left: "left",
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>总计确诊：{c} '
  },
  // toolbox: {
  //   show: false,
  //   orient: 'vertical',
  //   left: 'right',
  //   top: 'center',
  //   feature: {
  //     dataView: { readOnly: false },
  //     restore: {},
  //     saveAsImage: {}
  //   }
  // },
  visualMap: {
    type: "piecewise",
    pieces: [
      {
        min: 10000,
        max: 1000000,
        label: "大于等于10000人",
        color: "#372a28",
      },
      { min: 5000, max: 9999, label: "确诊5000-9999人", color: "#712117" },
      { min: 1000, max: 4999, label: "确诊1000-4999人", color: "#a6473b" },
      { min: 100, max: 999, label: "确诊100-999人", color: "#ee7263" },
      { min: 1, max: 99, label: "确诊1-99人", color: "#f5bba7" },
    ],
    color: ["#E0022B", "#E09107", "#A3E00B"],
  },
  series: [
    {
      type: 'map',
      map: 'china',
      label: {
        show: true
      },
      data: data, //图表的数据
    },
  ],
})
// 获取疫情地图数据
function getmap(){
  getchinamap().then((res:any)=>{
    let chinamap = res.data.data.data.areaTree[2].children
    data = chinamap.map((item:any)=>{
      return{
        name: item.name,
        value: item.total.confirm
      }
    })
    option.series[0].data=data
    scdata.sctoday =chinamap[7].today.confirm
    scdata.sctotal =chinamap[7].total.confirm
    scdata.cdtoday =chinamap[7].children[0].today.confirm
    scdata.cdtotal =chinamap[7].children[0].total.confirm
    scdata.mstoday =chinamap[7].children[13].today.confirm
    scdata.mstotal =chinamap[7].children[13].total.confirm
  })
}
onMounted(()=>{
  getmap()
})
</script>

<style lang='less' scoped>
.status{
  display: flex;
  flex-grow: wrap;
  justify-content: space-around;
  padding: 5px;
  .chart{
    margin-left: 10%;
    height: 375px;
    width: 500px;
  }
  .queryLine{
    margin-top: 15px;
    width: 40%;
  h3{
    text-align: center;
    margin-bottom: 30px;
  }
  div{
    text-align: center;
    font-size: 15px;
    margin: 10px 0;
  }
  .headline{
    margin-top: 10px;
    font-weight: bold;
  }
  }
}
</style>