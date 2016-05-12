<template>
  <div class="page-body">
    <search @on-change="getResult" :results="results" :value.sync="value" class="search-body" placeholder="输入关键词" cancel-text="取消"></search>
    <div v-if="isHistorys" class="personal-list">
      <div class="history-body">
        <flexbox :gutter="0">
          <flexbox-item>
            <p>历史搜索记录</p>
          </flexbox-item>
          <flexbox-item>
            <p style="text-align: right;">共{{ items.length }}条记录</p>
          </flexbox-item>
        </flexbox>
      </div>
      <div v-for="item in items" class="group-body" v-link="'contacts-details/' + item.id">
        <flexbox :gutter="0" class="flex-box">
          <flexbox-item>
            <flexbox :gutter="0" orient="vertical">
              <flexbox-item>
                <p class="title">{{ item.personName }}</p>
              </flexbox-item>
              <flexbox-item>
                <p class="title">{{ item.orgName + '-' + item.positionType }}</p>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item class="flex20">
            <i class="arrow"></i>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '../config'
  import Search from './MySearch'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Spinner from 'vux/components/spinner/'
  import Icon from 'vux/components/icon/'
  let urlAddress = Config.apiPrefix + 'contactsList'
  let phoneNumber = '18617166210'
  export default {
    ready () {
      let s = '黄亮'
      window.localStorage.setItem('historys', s)
      let historys = window.localStorage.getItem('historys')
      console.log(historys)
    },
    components: {
      Search,
      Flexbox,
      FlexboxItem,
      Spinner,
      Icon
    },
    methods: {
      getResult: function (val) {
        if (val !== '') {
          searchInfo(this, val)
        }
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
        let historys = window.localStorage.getItem('historys')
        historys = response.data.data.items.concat(historys)
        window.localStorage.setItem('historys', historys)
      } else {
        _this.isLoading = false
        _this.tipInfo = response.data.msg
      }
    }, function (response) {
      _this.isLoading = false
      _this.tipInfo = response.statusText
    })
  }
</script>

<style scoped>
  @import '../../static/css/public.css';
  .head-portrait {
    width: 48px;
    height: 48px;
    border: 2px solid #ececec;
    border-radius: 50%;
    box-sizing: border-box;
  }
  
  .head-portrait img {
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  
  .flex20 {
    -webkit-box-flex: 0 0 20px;
    -o-box-flex: 0 0 20px;
    -ms-flex: 0 0 20px;
    -webkit-flex: 0 0 20px;
    flex: 0 0 20px;
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