<template>
  <div>
    <blur :blur-amount=30 :url="url" class="bg_div">
      <!-- <div class="iconfont icon-search"></div> -->
      <!-- <div class="iconfont icon-share"></div> -->
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
      <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"
        placeholder="输入名字/手机/工号查看同事名片" cancel-text="关闭"></search>
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
import Search from 'vux/components/search'
import Blur from 'vux/components/blur'
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'

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
  font-size: 17px;
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

@media (max-height: 480px) {
  .center {
    padding-top: 20px;
  }

  .center img {
    width: 80px;
    height: 80px;
  }

  .bg_div {
    height: 150px !important;
  }

  .no_group_title {
    margin-top: 0;
  }

  .weui_cells {
    font-size: 15px;
  }
}
</style>
