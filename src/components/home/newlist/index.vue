<template>
<el-card>
  <div class="newlist">
    <a>
      <div>较上日<span>+{{ from.todayinput }}</span></div>
      <div>{{ from.totalinput }}</div>
      <div>境外输入</div>
    </a>
    <a>
      <div>较上日<span>+{{ from.todaystoreConfirm }}</span></div>
      <div>{{ from.extDatanoSymptom  }}</div>
      <div>现有确诊</div>
    </a>
    <a>
      <div>较上日<span>+{{from.todayconfirm }}</span></div>
      <div>{{ from.totalconfirm }}</div>
      <div>累计确诊</div>
    </a>
    <a>
      <div>较上日<span>+{{ from.extDataincrNoSymptom }}</span></div>
      <div>{{ from.extDatanoSymptom }}</div>
      <div>无症状感染者</div>
    </a>
    <a>
      <div>较上日<span>+{{ from.todayheal }}</span></div>
      <div>{{ from.totalheal }}</div>
      <div>累计治愈</div>
    </a>
    <a>
      <div>较上日<span>+{{ from.daydead }}</span></div>
      <div>{{ from.taldead }}</div>
      <div>累计死亡</div>
    </a>
  </div>
</el-card>
</template>

<script setup lang='ts'>
import { ref ,reactive,onMounted} from 'vue'
import { getchinamap } from '@/server';
const from = reactive({
  todayinput:'',
  totalinput:'',
  todaystoreConfirm:'',
  totalstoreConfirm:'',
  todayconfirm:'',
  totalconfirm:'', 
  extDataincrNoSymptom:'',
  extDatanoSymptom:'',
  todayheal:'',
  totalheal:'',
  daydead:'',
  taldead:''
})
// 近期疫情数据
function getfrom(){
  getchinamap().then((re:any)=>{
    let res = re.data.data.data.chinaTotal
    let list = re.data.data.data.chinaDayList
    from.todayinput = res.today.input
    from.totalinput = res.total.input
    from.todaystoreConfirm = res.today.storeConfirm
    from.totalstoreConfirm = list[list.length - 1].total.storeConfirm
    from.todayconfirm = res.today.confirm
    from.totalconfirm = res.total.confirm
    from.extDataincrNoSymptom = res.extData.incrNoSymptom
    from.extDatanoSymptom = res.extData.noSymptom
    from.todayheal = res.today.heal
    from.totalheal = res.total.heal
    from.daydead = res.today.dead
    from.taldead = res.total.dead
  })
}
onMounted(()=>{
  getfrom()
})
</script>

<style lang='less' scoped>
.newlist{
  display: flex;
  justify-content: space-around;
  div{
    text-align: center;
    margin: 4px 0;
    font-size: 14px;
  }
}
</style>