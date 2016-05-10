<template>
  <div class="page-body">
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value" class="search-body" placeholder="输入关键词" cancel-text="取消"></search>
    <div class="personal-list">
      <div v-for="item in items" class="group-body" v-link="'contacts-details/' + item.id">
        <flexbox :gutter="0" class="flex-box">
          <flexbox-item class="flex60">
            <p class="head-portrait"><img :src="url" /></p>
          </flexbox-item>
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
  import Search from 'vux/components/search'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item/'
  let urlAddress = Config.apiPrefix + 'contactsList'
  let phoneNumber = '18617166210'
  export default {
    ready () {
      let params = {
        keyword: '黄亮',
        mobile: phoneNumber
      }
      this.$http({
        url: urlAddress,
        method: 'POST',
        params: params
      }).then(function (response) {
        if (response.data.code === 1000) {
          this.items = response.data.data.items
        } else {
          this.tipInfo = response.data.msg
        }
      }, function (response) {
        this.tipInfo = response.statusText
      })
    },
    components: {
      Config,
      Search,
      Flexbox,
      FlexboxItem
    },
    methods: {
      resultClick: function (item) {
        console.log(1)
      },
      getResult: function (val) {
        console.log(12)
      }
    },
    data () {
      return {
        items: [],
        results: [],
        value: '',
        tipInfo: '加载中...',
        url: 'static/img/cheft.png'
      }
    }
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
  
  .flex60 {
    -webkit-box-flex: 0 0 60px;
    -o-box-flex: 0 0 60px;
    -ms-flex: 0 0 60px;
    -webkit-flex: 0 0 60px;
    flex: 0 0 60px;
  }
  
  .flex20 {
    -webkit-box-flex: 0 0 20px;
    -o-box-flex: 0 0 20px;
    -ms-flex: 0 0 20px;
    -webkit-flex: 0 0 20px;
    flex: 0 0 20px;
  }
</style>