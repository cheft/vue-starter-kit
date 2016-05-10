<template>
  <div class="page-body">
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value" class="search-body"></search>
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <div v-else class="list-body">
        <scroller lock-x scrollbar-y use-pulldown use-pullup :pulldown-status.sync="pulldownStatus" :pullup-status.sync="pullupStatus" @pulldown:loading="loadDown" @pullup:loading="loadUp" class="scroll-body">
          <group v-for="item in items" class="group-body" v-link="'dispatch-details/' + item.id">
            <flexbox :gutter="0" class="flex-box">
              <flexbox-item>
                <flexbox :gutter="0" orient="vertical">
                  <flexbox-item>
                    <h5 class="title">{{ item.title }}</h5>
                  </flexbox-item>
                  <flexbox-item>
                    <flexbox :gutter="0">
                      <flexbox-item>
                        <span class="info">{{ item.head }}</span>
                      </flexbox-item>
                      <flexbox-item :span="4">
                        <time class="info">{{ item.date }}</time>
                      </flexbox-item>
                    </flexbox>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
              <flexbox-item class="flex20">
                <i class="arrow"></i>
              </flexbox-item>
            </flexbox>
          </group>
          <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 40px; top: -50px; text-align: center;">
            <span v-show="pulldownStatus === 'default'"></span>
            <span class="pullup-arrow" v-show="pulldownStatus === 'up' || pulldownStatus === 'down'" :class="{'rotate': pulldownStatus === 'down'}">↓</span>
            <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          </div>
          <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -50px; text-align: center;">
            <span v-show="pullupStatus === 'default'"></span>
            <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
            <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          </div>
        </scroller> 
      </div>
    </template>
  </div>
</template>

<script>
  import Config from '../config'
  import Search from 'vux/components/search/'
  import Scroller from 'vux/components/scroller/'
  import Spinner from 'vux/components/spinner/'
  import Group from 'vux/components/group/'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Icon from 'vux/components/icon/'
  let urlAddress = Config.apiPrefix + 'notice/list'
  let pageIndex = 1
  let pageCount = 1
  let phoneNumber = '18617166210'
  let articleType = 'DISPATCH'
  export default {
    ready: function () {
      let params = {
        page: pageIndex,
        pageSize: pageCount,
        mobile: phoneNumber,
        type: articleType
      }
      if (pageIndex !== 1) {
        params.page = 1
        params.pageSize = pageIndex * pageCount
      }
      this.$http({
        url: urlAddress,
        method: 'POST',
        params: params
      }).then(function (response) {
        if (response.data.code === 1000) {
          this.isLoading = false
          this.noneData = false
          this.items = response.data.data.items
        } else {
          this.isLoading = false
          this.noneData = true
          this.tipInfo = response.data.msg
        }
      }, function (response) {
        this.isLoading = false
        this.noneData = true
        this.tipInfo = response.statusText
      })
    },
    components: {
      Config,
      Search,
      Scroller,
      Spinner,
      Group,
      Flexbox,
      FlexboxItem,
      Icon
    },
    methods: {
      resultClick: function (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult: function (val) {
        this.results = getResult(this.value)
      },
      loadDown: function (uuid) {
        const _this = this
        let params = {
          page: 1,
          pageSize: pageIndex * pageCount,
          mobile: phoneNumber,
          type: articleType
        }
        this.$http({
          url: urlAddress,
          method: 'POST',
          params: params
        }).then(function (response) {
          if (response.data.code === 1000) {
            _this.items = response.data.data.items
            _this.$broadcast('pulldown:reset', uuid)
          } else {
            _this.$broadcast('pulldown:reset', uuid)
          }
        }, function (response) {
          _this.$broadcast('pulldown:reset', uuid)
        })
      },
      loadUp: function (uuid) {
        const _this = this
        pageIndex++
        let params = {
          page: pageIndex,
          pageSize: pageCount,
          mobile: phoneNumber,
          type: articleType
        }
        this.$http({
          url: urlAddress,
          method: 'POST',
          params: params
        }).then(function (response) {
          if (response.data.code === 1000) {
            _this.items = _this.items.concat(response.data.data.items)
            if (pageIndex < response.data.data.pageCount) {
              _this.$broadcast('pullup:reset', uuid)
            } else {
              _this.$broadcast('pullup:done', uuid)
            }
          } else {
            _this.$broadcast('pullup:done', uuid)
          }
        }, function (response) {
          _this.$broadcast('pullup:done', uuid)
        })
      }
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        tipInfo: '正在加载中...',
        items: [],
        results: [],
        value: '',
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  }

  function getResult (val) {
    let rs = []
    for (let i = 0; i < 40; i++) {
      rs.push({
        title: `${val} result: ${i + 1}`,
        other: i
      })
    }
    return rs
  }
</script>

<style>
  .weui_cells {
    margin-top: 10px;
  }
</style>

<style scoped>
  @import '../../static/css/public.css';
  
  .title {
    color: #333;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .info {
    font-size: .8em;
    color: #666;
  }
  
  @media only screen and (min-width: 320px) and (max-width: 360px) {
    .info {
      font-size: .7em;
    }
  }
  
  .flex20 {
    -webkit-box-flex: 0 0 20px;
    -o-box-flex: 0 0 20px;
    -ms-flex: 0 0 20px;
    -webkit-flex: 0 0 20px;
    flex: 0 0 20px;
  }
  
  .pullup-arrow {
    -webkit-transition: all linear 0.2s;
    -moz-transition: all linear 0.2s;
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
  
  .rotate {
    display: inline-block;
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
</style>