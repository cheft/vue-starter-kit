<template>
  <div class="page-body">
    <div class="weui_search_bar weui_search_focusing search-body" id="search_bar">
      <div class="weui_search_outer">
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="text" class="weui_search_input" placeholder="输入关键词" v-model="value" v-on:keyup="textKeyup(value)" />
          <a href="javascript:" v-if='isNull' @click="clearClick" class="weui_icon_clear" id="search_clear"></a>
        </div>
      </div>
      <a href="javascript:" class="weui_search_cancel" @click="okClick(value)" id="search_ok">搜索</a>
    </div>
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <div v-else class="list-body">
        <scroller lock-x scrollbar-y use-pulldown use-pullup :pulldown-status.sync="pulldownStatus" :pullup-status.sync="pullupStatus" @pulldown:loading="loadDown" @pullup:loading="loadUp" class="scroll-body">
          <div class="box2">
            <div v-for="item in items" class="group-body" v-link="'dispatch-details/' + item.id">
              <div class="box-middel flex-box">
                <div class="box-vertical flex">
                  <h5 class="title flex">{{ item.title }}</h5>
                  <div class="box-middel flex">
                    <p class="info flex">{{ item.head }}</p>
                    <p class="info">{{ item.date }}</p>
                  </div>
                </div>
                <div class="arrow-body"><i class="arrow"></i></div>
              </div>
            </div>
          </div>
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
  import Scroller from 'vux/components/scroller/'
  import Spinner from 'vux/components/spinner/'
  import Icon from 'vux/components/icon/'
  let urlAddress = Config.apiPrefix + 'notice/list'
  let pageIndex = 1
  let pageCount = 1
  let articleType = 'DISPATCH'
  export default {
    ready () {
      Config.setTitle('发文')
      let params = {
        page: pageIndex,
        pageSize: pageCount,
        mobile: Config.mobile,
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
      Scroller,
      Spinner,
      Icon
    },
    methods: {
      textKeyup: function (val) {
        if (val === '') {
          this.isNull = false
        } else {
          this.isNull = true
        }
      },
      clearClick: function () {
        this.value = ''
        this.isNull = false
      },
      okClick: function (val) {
        if (val.replace(/(^\s*)|(\s*$)/g, '') === '') {
          return
        }
        pageIndex = 1
        let params = {
          page: pageIndex,
          pageSize: pageCount,
          mobile: Config.mobile,
          type: articleType,
          keyword: val.replace(/(^\s*)|(\s*$)/g, '')
        }
        this.isLoading = true
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
      loadDown: function (uuid) {
        const _this = this
        let params = {
          page: 1,
          pageSize: pageIndex * pageCount,
          mobile: Config.mobile,
          type: articleType,
          keyword: this.value
        }
        this.$http({
          url: urlAddress,
          method: 'POST',
          params: params
        }).then(function (response) {
          if (response.data.code === 1000) {
            _this.items = response.data.data.items
            _this.$broadcast('pulldown:reset', uuid)
            _this.pulldownStatus = 'default'
          } else {
            _this.$broadcast('pulldown:reset', uuid)
            _this.pulldownStatus = 'default'
          }
        }, function (response) {
          _this.$broadcast('pulldown:reset', uuid)
          _this.pulldownStatus = 'default'
        })
      },
      loadUp: function (uuid) {
        const _this = this
        pageIndex++
        let params = {
          page: pageIndex,
          pageSize: pageCount,
          mobile: Config.mobile,
          type: articleType,
          keyword: this.value
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
              _this.pullupStatus = 'default'
            } else {
              _this.$broadcast('pullup:done', uuid)
              _this.pullupStatus = 'default'
            }
          } else {
            _this.$broadcast('pullup:done', uuid)
            _this.pullupStatus = 'default'
          }
        }, function (response) {
          _this.$broadcast('pullup:done', uuid)
          _this.pullupStatus = 'default'
        })
      }
    },
    data () {
      return {
        isNull: false,
        isLoading: true,
        noneData: true,
        tipInfo: '加载中...',
        items: [],
        value: '',
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
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
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
  }

  .flex20 {
    -webkit-box-flex: 0 0 20px;
    -o-box-flex: 0 0 20px;
    -ms-flex: 0 0 20px;
    -webkit-flex: 0 0 20px;
    flex: 0 0 20px;
  }

  .box2-wrap {
    height: 1750px;
    overflow: hidden;
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