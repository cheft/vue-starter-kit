<template>
  <div>
    <blur :blur-amount=30 :url="url">
      <div class="iconfont icon-search"></div>
      <div class="iconfont icon-share"></div>
      <p class="center"><img :src="url">
        <br>
        <span>陈海峰</span>
      </p>
    </blur>
    <group>
    <cell title="部门" value="技术中心"></cell>
    <cell title="手机" value="13316463333"></cell>
    <cell title="座机" value="0755-87878787"></cell>
    <cell title="微信" value="HiFsion"></cell>
    <cell title="邮箱" value="m@cheft.cn"></cell>
    </group>
    <div class="weui_tabbar">
      <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"></search>
      <!-- <a href="call:13316463314" class="weui_tabbar_item">
        <div class="iconfont icon-call"><label>打电话</label></div>
      </a>
      <a href="sms:13316463314" class="weui_tabbar_item">
        <div class="iconfont icon-sms"><label>发短信</label></div>
      </a> -->
    </div>
  </div>

</template>

<script>
import { Search, Blur, Group, Cell } from 'vux'

export default {
  components: {
    Search,
    Blur,
    Group,
    Cell
  },
  methods: {
    resultClick: function (item) {
      console.log(item)
    },
    getResult: function (val) {
      this.results = getResult(this.value)
    }
  },
  data () {
    return {
      results: [],
      value: '',
      url: 'static/img/cheft.png'
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 5; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style>
.center {
  text-align: center;
  padding-top: 30px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}

.weui_tabbar_item {
  color: #71D571;
  text-align: center;
  padding: 10px;
}

.iconfont label {
  margin-left: 10px;
}

.icon-search {
  position: absolute;
  top: 10px;
  left: 15px;
  color: #fff;
  font-size: 18px;
}

.icon-share {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #fff;
  font-size: 20px;
}
</style>
