<template>
  <div>
    <div style="padding: 10px;">
      <swiper :height="height" v-ref:meetings :list="test">
        <swiper-item class="swiper-item" v-for="m in meetings" id="{{'swiper-' + $index}}" data-name="{{m.name}}" data-storey="{{m.storey}}">
          <div class="title fadeInUp animated"><span class="highlight">{{m.storey}}楼</span> {{m.name}} (限 {{m.number}} 人)</div>
          <flexbox>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_9-10">
                <div class="item-header">9 - 10 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_10-11">
                <div class="item-header">10 - 11 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_11-12">
                <div class="item-header">11 - 12 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <div class="split-text">
            <div class="pull-left"><i class="iconfont icon-jtup"></i> 上午</div>
            <div class="pull-right"><i class="iconfont icon-jtdown"></i> 下午</div>
            <div class="clearfix"></div>
          </div>
          <!-- <hr class="split-hr"> -->
          <!-- <div class="split-text" style="margin-bottom: 0;"><i class="iconfont icon-arrowdowno"></i> 下午</div> -->
          <flexbox>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_14-15">
                <div class="item-header">14 - 15 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_15-16">
                <div class="item-header">15 - 16 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_16-17">
                <div class="item-header">16 - 17 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_17-18">
                <div class="item-header">17 - 18 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_18-19">
                <div class="item-header">18 - 19 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item" id="{{m.id}}_19-20">
                <div class="item-header">19 - 20 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
        </swiper-item>
      </swiper>
    </div>

    <range v-ref:range slot="value" :value.sync="curMeeting" :min="0" :max="meetingsLen" min-HTML="<span style='font-size:12px;'>6楼</span>" max-HTML="<span style='font-size:12px;'>9楼</span>"></range>
    <div style="margin: 10px;display:none;" id="submitDiv"><x-button type="primary" v-on:click="confirmReserve">选择进行预定</x-button></div>
    <tabbar v-ref:tabbar>
      <tabbar-item v-for="d in days" :selected="$index == 0" :data-index="$index" v-on:click="tabClick(d)">
        <span slot="icon">{{d.week}}</span>
        <span slot="label">{{d.date}}</span>
      </tabbar-item>
    </tabbar>
    <confirm v-ref:confirm :show.sync="confirmShow" :title="confirmTitle" cancel-text="取消" confirm-text="确定"><p style="text-align:center;" ></p></confirm>
    <toast :show.sync="toastShow" :time=1000 type="cancel">{{toastTitle}}</toast>
    <loading :show="loadingShow" text="加载中..."></loading>
  </div>

</template>

<script>
  import XButton from 'vux/components/x-button'
  import Swiper from 'vux/components/swiper'
  import SwiperItem from 'vux/components/swiper-item'
  import Range from 'vux/components/range'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item'
  import Tabbar from 'vux/components/tabbar'
  import TabbarItem from 'vux/components/tabbar-item'
  import Confirm from 'vux/components/confirm'
  import Toast from 'vux/components/toast'
  import Loading from 'vux/components/loading'

  import config from '../config'

  let getMeetingUrl = config.apiPrefix + 'meeting/meetingList'
  let getReserveList = config.apiPrefix + 'meeting/reserveList'
  let reserveUrl = config.apiPrefix + 'meeting/add'

  export default {
    components: {
      XButton,
      Swiper,
      SwiperItem,
      Range,
      Flexbox,
      FlexboxItem,
      Tabbar,
      TabbarItem,
      Confirm,
      Toast,
      Loading
    },

    ready () {
      config.setTitle('预定会议室')
      this.fetchMeetings()
      var _this = this
      this.$refs.meetings.$watch('current', function (val) {
        _this.$set('curMeeting', val)
        _this.hideSubmitBtn()
        _this.clearSelectedFill()
      })
      this.$refs.confirm.$on('on-confirm', function () {
        _this.reserve()
      })
      this.bindItemEvent()
    },

    methods: {
      dateAdder: function (date, increment) {
        date.setDate(date.getDate() + increment)
      },

      dayBuilder: function (date) {
        var weekMap = {'1': '周一', '2': '周二', '3': '周三', '4': '周四', '5': '周五'}
        var month = date.getMonth() + 1
        if ((month + '').length === 1) month = '0' + month
        return {week: weekMap[date.getDay()], date: date.getMonth() + 1 + '月' + date.getDate() + '号',
          value: date.getFullYear() + '-' + month + '-' + date.getDate()}
      },

      calc: function () {
        var days = []
        var date = new Date()
        var day = date.getDay()
        if (day === 4) {
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 3)
          days.push(this.dayBuilder(date))
        } else if (day === 5) {
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 3)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
        } else if (day === 6) {
          this.dateAdder(date, 3)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
        } else if (day === 7) {
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
        } else {
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
          this.dateAdder(date, 1)
          days.push(this.dayBuilder(date))
        }
        this.fetchReserveList(days[0].value)
        this.useDate = days[0].value
        this.$set('days', days)
      },
      /* eslint-disable no-undef */
      fetchMeetings: function () {
        // this.meetings = [
        //   {id: 1, storey: 6, name: '小会议室'},
        //   {id: 2, storey: 6, name: '中会议室'},
        //   {id: 3, storey: 6, name: '大会议室'}
        // ]
        // console.log(getMeetingUrl)
        $('.vux-range-input-box').hide()
        this.loadingShow = true
        var _this = this
        this.$http({url: getMeetingUrl, method: 'POST'}).then(function (response) {
          _this.calc()
          _this.$set('meetings', response.data.data.items)
          this.loadingShow = false
          $('.vux-range-input-box').show()
        }, function (response) {
          console.log(response)
          this.loadingShow = false
          this.toastTitle = '系统错误'
        })
      },
      /* eslint-disable no-undef */
      disabledExpired: function (date) {
        $('.time-item[id$="_' + date + '"]').addClass('time-item-disabled')
      },

      handleExpired: function (date) {
        var now = new Date()
        var hour = now.getHours()
        var month = now.getMonth() + 1
        if ((month + '').length === 1) month = '0' + month
        var nowDate = now.getFullYear() + '-' + month + '-' + now.getDate()
        if (nowDate !== date) return
        for (var i = 9; i < hour; i++) {
          if (i !== 12 && i !== 13) {
            this.disabledExpired(i + '-' + (i + 1))
          }
        }
      },

      /* eslint-disable no-undef */
      clearReservedFill: function () {
        $('.time-item').removeClass('time-item-reserved')
        $('.item-body').html('<i class="iconfont icon-yuding"></i><div>请选择</div>')
      },

      /* eslint-disable no-undef */
      clearSelectedFill: function () {
        this.selectDates = []
        $('.time-item').removeClass('time-item-selected')
      },

      clearDisabledFill: function () {
        $('.time-item').removeClass('time-item-disabled')
      },

      /* eslint-disable no-undef */
      fillReserveMeet: function (item, date) {
        var $el = $('#' + item.conferenceId + '_' + date)
        $el.addClass('time-item-reserved').data('mobile', item.mobile)
        $el.find('.item-body').html('<div>' + item.orgName + '-' + item.personName + '</div><div>' + (item.title || '无会议主题') + '</div>')
      },

      fetchReserveAll: function (date) {
        this.loadingShow = true
        var _this = this
        this.$http({url: getReserveList, method: 'POST', params: {date: date}}).then(function (response) {
          var list = response.data.data.items
          list.forEach(function (item, i) {
            var dates = item.dates || ''
            var ds = dates.split(',')
            ds.forEach(function (d) {
              _this.fillReserveMeet(item, d)
            })
          })
          this.loadingShow = false
          _this.handleExpired(date)
        }, function (response) {
          this.loadingShow = false
          this.toastShow = true
          this.toastTitle = '系统错误'
          _this.handleExpired(date)
        })
      },

      fetchReserveList: function (date) {
        this.clearReservedFill()
        this.clearSelectedFill()
        this.clearDisabledFill()
        this.hideSubmitBtn()
        this.fetchReserveAll(date)
      },

      tabClick: function (item) {
        this.useDate = item.value
        this.fetchReserveList(item.value)
      },
      /* eslint-disable no-useless-escape */
      /* eslint-disable no-undef */
      confirmReserve: function () {
        var dates = this.selectDates.join(',').replace(/\-(\d|\,|\-)*\-/, '-')
        this.confirmShow = true
        var $el = $('#swiper-' + this.curMeeting)
        this.confirmTitle = '将预定' + this.useDate + '时间为' + dates + '点的' + $el.data('storey') + '楼' + $el.data('name') + '，确定吗?'
      },

      reserve: function () {
        var _this = this
        var postData = {
          id: this.selectCId,
          mobile: config.mobile,
          useDate: this.useDate,
          dates: this.selectDates.join(',')
        }

        this.$http({url: reserveUrl, method: 'POST', params: postData})
        .then(function (response) {
          if (response.data.code === 2001) {
            _this.toastShow = true
            _this.toastTitle = '会议室已被预订'
            setTimeout(function () {
              _this.fetchReserveList(_this.useDate)
            }, 500)
          } else {
            this.$router.go('meet-details/' + response.data.data.id)
          }
        }, function (response) {
          console.log(response)
          this.toastShow = true
          this.toastTitle = '系统错误'
        })
      },
      /* eslint-disable no-undef */
      showSubmitBtn: function () {
        $('.vux-range-input-box').hide()
        $('#submitDiv').show()
      },
      hideSubmitBtn: function () {
        $('.vux-range-input-box').show()
        $('#submitDiv').hide()
      },
      removeDates: function (value) {
        var _this = this
        this.selectDates.forEach(function (item, i) {
          if (value === item) {
            _this.selectDates.splice(i, 1)
          }
        })
      },

      isNear: function (current) {
        if (this.selectDates.length === 0) return 'l'
        var first = this.selectDates[0]
        var last = this.selectDates[this.selectDates.length - 1]
        var f = +first.split('-')[0]
        var l = +last.split('-')[1]

        var cf = +current.split('-')[0]
        var cl = +current.split('-')[1]
        if (cf === l || (l === 12 && cf === 14)) {
          return 'l'
        }
        if (cl === f || (f === 14 && cl === 12)) {
          return 'f'
        }
        return false
      },

      isBorder: function (current) {
        var first = this.selectDates[0]
        var last = this.selectDates[this.selectDates.length - 1]
        if (current === first || current === last) return true
        return false
      },

      /* eslint-disable no-undef */
      bindItemEvent: function () {
        var _this = this
        $(document).off('click.time-item').on('click.time-item', '.time-item', function (e) {
          var $el = $(e.currentTarget)
          var id = $el.attr('id')
          if ($el.hasClass('time-item-reserved')) {
            var mobile = $el.data('mobile')
            var d = $el.hasClass('time-item-disabled')
            if (mobile && !d) location.href = 'tel:' + mobile
          } else if ($el.hasClass('time-item-selected')) {
            var tmp1 = id.split('_')
            var date1 = tmp1[1]
            if (!_this.isBorder(date1)) {
              _this.toastTitle = '不能直接取消中间时间段'
              _this.toastShow = true
              return
            }
            $el.removeClass('time-item-selected')
            _this.removeDates(date1)
            if (_this.selectDates.length === 0) _this.hideSubmitBtn()
          } else if (!$el.hasClass('time-item-disabled')) {
            var tmp2 = id.split('_')
            var date2 = tmp2[1]
            var near = _this.isNear(date2)
            if (!near) {
              _this.toastTitle = '只能选择连续时间段'
              _this.toastShow = true
              return
            }
            $el.addClass('time-item-selected')
            if (_this.selectDates.length === 0) _this.showSubmitBtn()
            _this.selectCId = tmp2[0]
            if (near === 'l') {
              _this.selectDates.push(date2)
            } else {
              _this.selectDates.unshift(date2)
            }
          }
        })
      }
    },

    /* eslint-disable no-undef */
    data () {
      return {
        height: $(window).height() - 165 + '',
        curMeeting: 0,
        currentTab: 0,
        days: [],
        test: [],
        meetings: [],
        meetingsLen: 13,
        reserveList: [],
        confirmShow: false,
        confirmTitle: '',
        toastShow: false,
        toastTitle: '',
        loadingShow: false,
        selectDates: [],
        selectCId: '',
        useDate: ''
        // width: $(window).width() - 20,
        // totalWidth: $(window).width() * 14 - 20
      }
    },

    /* eslint-disable no-undef */
    watch: {
      curMeeting: function (val) {
        this.$refs.meetings.swiper.go(val)
      }
    }
  }
</script>
<style>
.x-header-right .weui_btn {
  font-size: 14px;
}

.x-header .x-header-right {
  top: 7px;
  right: 7px;
}

.highlight {
  color: #F57C00;
}
.title {
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  font-weight: 700;
}

.swiper-item {
 /* width: 100px;
  height: 150px;*/
  border-radius: 3px;
  display:inline-block;
  /*margin-left: 20px;*/
  float: left;
  text-align: center;
  line-height: 100px;
  /*background: #Ffffc4;*/
  color: #27222A;
}
.swiper-item:first-child {
  margin-left: 0;
}

.vux-range-input-box {
  margin-right: 50px !important;
  margin-top: 20px;
}

.weui_tabbar_item {
  text-align: center;
  font-size: 12px;
}

.time-item {
  height: 120px;
  line-height: 120px;
  background: #fff;
  text-align: center;
  color: #A6A6A6;
  border: 1px solid #DEDEDE;
  margin-top: 10px;
}

.item-body {
  height: 56px;
  padding: 20px 4px 4px 0;
  line-height: 24px;
  font-size: 14px;
}

.item-body .icon-yuding {
  font-size: 32px;
}

.time-item-reserved .item-body {
  line-height: 20px;
  font-size: 14px;
}

.item-header {
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  line-height: 40px;
  border-bottom: 1px solid #DEDEDE;
  color: #2E2E2E;
}

.time-item-reserved .item-header {
  border-bottom: 1px solid #FFA64E;
  color: #fff;
}

.time-item-reserved {
  background: #FF9940;
  color: #fff;
}

.time-item-reserved.time-item-even .item-header {
  background-color: #E64A19;
}

.time-item-reserved.time-item-even {
  background-color: #FF5722;
}

.time-item-selected .item-header {
  color: #fff;
  border-bottom: 1px solid #69B13D;
}

.time-item-selected {
  color: #C6FFA1;
  background: #56A530;
}

.time-item-disabled {
  background-color: #E6E6E6;
  color: #CCCCCC;
}

.time-item-disabled .item-header {
  border-bottom: 1px solid #DCDCDC;
  color: #CCCCCC;
}

.split-text {
  font-size: 13px;
  line-height: 13px;
  margin: 10px 10px 0 10px;
  color: #888;
}

.split-text .pull-left {
  float: left;
}

.split-text .pull-right {
  float: right;
}

.clearfix {
  *zoom: 1;
}

.clearfix:before, .clearfix:after {
  display: table;
  line-height: 0;
  content: "";
}

.clearfix:after {
  clear: both;
}

.split-hr {
  margin: 15px 0;
  border: 1px dotted #616161;
}

.weui_tabbar_item {
  font-weight: 700;
}

.weui_tabbar_item .weui_tabbar_icon {
  color: #888;
  height: inherit;
  width: inherit;
}

.weui_tabbar_item.weui_bar_item_on {
  background: #FF992D;
  color: #fff;
}

.weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
  color: #fff;
}

.weui_bar_item_on .weui_tabbar_icon {
  color: #fff;
}

.range-max, .range-min {
  width: 30px;
}

.range-max, .range-min {
  color: #DA9F5F;
}

@media (max-height: 736px) {
  .swiper {
    height: 500px !important;
  }
}

@media (max-height: 667px) {
  .swiper {
    height: 480px !important;
  }
}

@media (max-height: 568px) {
  .title {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }

  .swiper {
    height: 370px !important;
  }

  .time-item {
    height: 92px;
    line-height: 92px;
    margin-top: 10px;
  }

  .item-header {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }

  .item-body {
    height: 46px;
    line-height: 16px;
    font-size: 13px;
    padding: 10px 4px 4px 0px;
  }

  .time-item-reserved .item-body {
    line-height: 16px;
    font-size: 13px;
  }

  .item-body .icon-yuding {
    font-size: 20px;
  }

  .split-text {
    font-size: 13px;
    line-height: 13px;
    margin: 10px 10px 0 10px;
    color: #888;
  }
}

@media (max-height: 480px) {
  .title {
    font-size: 16px;
    height: 16px;
    line-height: 16px;
  }

  .swiper {
    height: 330px !important;
  }

  .time-item {
    height: 85px;
    line-height: 85px;
    margin-top: 5px;
  }

  .item-header {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
  }

  .item-body {
    height: 46px;
    line-height: 16px;
    font-size: 13px;
    padding: 10px 4px 4px 0px;
  }

  .time-item-reserved .item-body {
    line-height: 16px;
    font-size: 13px;
  }

  .item-body .icon-yuding {
    font-size: 20px;
  }

  .split-text {
    font-size: 13px;
    line-height: 13px;
    margin: 5px 10px 0 10px;
    color: #888;
  }
}

</style>