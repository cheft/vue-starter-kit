<template>
  <div class="page-body">
    <search @on-change="getResult" @list-click="itemClick" :results="results" :value.sync="value" class="search-body" placeholder="输入关键词" cancel-text="取消"></search>
    <div v-if="isHistorys" class="personal-list">
      <div class="history-body">
        <div class="box-middel">
          <p class="flex">历史搜索记录</p>
          <p>共{{ items.length }}条记录</p>
        </div>
      </div>
      <div v-for="item in items" class="group-body" v-link="'contacts-details/' + item.id">
        <div class="box-middel flex-box">
          <div class="box-vertical flex">
            <p class="title flex">{{ item.personName }}</p>
            <p class="title flex">{{ item.orgName + '-' + item.positionType }}</p>
          </div>
          <div class="arrow-body"><i class="arrow"></i></div>      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '../config'
  import Search from './MySearch'
  import Spinner from 'vux/components/spinner/'
  import Icon from 'vux/components/icon/'
  let urlAddress = Config.apiPrefix + 'contactsList'
  let phoneNumber = '18617166210'
  let hisLength = 5
  export default {
    ready () {
      // window.localStorage.clear()
      let historys = window.localStorage.getItem('historys')
      if (historys !== null) {
        this.isHistorys = true
        this.items = JSON.parse(historys)
      }
    },
    components: {
      Search,
      Spinner,
      Icon
    },
    methods: {
      getResult: function (val) {
        if (val.replace(/(^\s*)|(\s*$)/g, '') !== '') {
          searchInfo(this, val.replace(/(^\s*)|(\s*$)/g, ''))
        }
      },
      itemClick: function (item) {
        setHistorys(item)
      }
    },
    data () {
      return {
        isHistorys: false,
        isLoading: false,
        items: [],
        results: [],
        value: '',
        tipInfo: '加载中...',
        url: 'static/img/1.png'
      }
    }
  }
  function searchInfo (_this, _val) {
    let params = {
      keyword: _val,
      mobile: phoneNumber
    }
    _this.$http({
      url: urlAddress,
      method: 'POST',
      params: params,
      beforeSend: function () {
        _this.isLoading = true
      }
    }).then(function (response) {
      if (response.data.code === 1000) {
        _this.isLoading = false
        _this.results = response.data.data.items
      } else {
        _this.isLoading = false
        _this.tipInfo = response.data.msg
      }
    }, function (response) {
      _this.isLoading = false
      _this.tipInfo = response.statusText
    })
  }
  function setHistorys (item) {
    if (item) {
      let historys = window.localStorage.getItem('historys')
      let arr = []
      if (historys !== null) {
        arr = JSON.parse(historys)
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === item.id) {
          arr.splice(i, 1)
          break
        }
      }
      if (arr.length === hisLength) {
        arr.pop()
      }
      arr.unshift({
        id: item.id,
        orgName: item.orgName,
        positionType: item.positionType,
        personName: item.personName
      })
      historys = JSON.stringify(arr)
      window.localStorage.setItem('historys', historys)
    }
  }
</script>

<style scoped>
  @import '../../static/css/public.css';
  .title {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
  }
 
  .history-body {
    padding: 0 10px;
    background: #f8f8f8;
  }
  .history-body p {
    padding: 5px 0;
    font-size: 14px;
    color: #999;
    line-height: 1.5;
  }
</style>