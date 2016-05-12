<template>
  <div>
    <div style="padding: 10px;">
      <swiper :height="height" v-ref:meetings :list="test">
        <swiper-item class="swiper-item" v-for="m in meetings">
          <div class="title fadeInUp animated">{{m.storey}}楼 {{m.name}} (限 {{m.number}} 人)</div>
          <flexbox>
            <flexbox-item>
              <div class="time-item">
                <div class="item-header">9 - 10 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item v-on:click="call">
              <div class="time-item time-item-reserved">
                <div class="item-header">10 - 11 点</div>
                <div class="item-body">技术中心-陈某某-技术会</div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item">
                <div class="item-header">11 - 12 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <div class="split-text"><i class="iconfont icon-arrowtopo"></i> 上午</div>
          <hr class="split-hr">
          <div class="split-text" style="margin-bottom: 0;"><i class="iconfont icon-arrowdowno"></i> 下午</div>
          <flexbox>
            <flexbox-item>
              <div class="time-item" v-on:click="selectMeet">
                <div class="item-header">14 - 15 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item">
                <div class="item-header">15 - 16 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item">
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
              <div class="time-item">
                <div class="item-header">17 - 18 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item">
                <div class="item-header">18 - 19 点</div>
                <div class="item-body">
                  <i class="iconfont icon-yuding"></i>
                  <div>请选择</div>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="time-item time-item-reserved">
                <div class="item-header">19 - 20 点</div>
                <div class="item-body">技术中心-陈某某-技术会</div>
              </div>
            </flexbox-item>
          </flexbox>
        </swiper-item>
      </swiper>
    </div>

    <!-- <range v-ref:range slot="value" :value.sync="curMeeting" :min="0" :max="meetingsLen" min-HTML="<span style='font-size:12px;'>6楼</span>" max-HTML="<span style='font-size:12px;'>9楼</span>"></range> -->
    <div style="margin: 10px;"><x-button type="primary" v-on:click="reserve">选择进行预定</x-button></div>
    <tabbar v-ref:tabbar>
      <tabbar-item v-for="d in days" :selected="$index == 0" :data-index="$index" v-on:click="tabClick(d)">
        <span slot="icon">{{d.week}}</span>
        <span slot="label">{{d.date}}</span>
      </tabbar-item>
    </tabbar>
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
  import config from '../config'

  let getMeetingUrl = config.apiPrefix + 'meeting/meetingList'
  let getReserveList = config.apiPrefix + 'meeting/reserveList'

  let reserveList = [
    {
      id: '88cf361b-4b48-4c15-b566-a9934346a43d',
      conferenceName: '大培训室',
      conferenceId: '会议室ID',
      storey: '7',
      orgName: 'ERP研发部',
      mobile: '15999999999',
      personName: '张三',
      useDate: '2016-05-10',
      startDate: '10',
      endDate: '12'
    },
    {
      id: '88cf361b-4b48-4c15-b566-a9934346a43d',
      conferenceName: '大培训室',
      conferenceId: '会议室ID',
      storey: '7',
      orgName: 'ERP研发部',
      mobile: '15999999999',
      personName: '李四',
      useDate: '2016-05-10',
      startDate: '15',
      endDate: '18'
    }
  ]

  export default {
    components: {
      XButton,
      Swiper,
      SwiperItem,
      Range,
      Flexbox,
      FlexboxItem,
      Tabbar,
      TabbarItem
    },

    ready () {
      document.title = '预订会议室'
      this.calc()
      this.fetchMeetings()
      var _this = this
      this.$refs.meetings.$watch('current', function (val) {
        _this.$set('curMeeting', val)
      })
    },

    methods: {

      dateAdder: function (date, increment) {
        date.setDate(date.getDate() + increment)
      },

      dayBuilder: function (date) {
        var weekMap = {'1': '周一', '2': '周二', '3': '周三', '4': '周四', '5': '周五'}
        return {week: weekMap[date.getDay()], date: date.getMonth() + 1 + '月' + date.getDate() + '号',
          value: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()}
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
        this.$set('days', days)
      },
      fetchMeetings: function () {
        var _this = this
        this.$http({url: getMeetingUrl, method: 'POST'}).then(function (response) {
          _this.$set('meetings', response.data.data.items)
        }, function (response) {
          console.log(response)
        })
      },

      fetchReserveList: function (date) {
        // var _this = this
        this.$http({url: getReserveList, method: 'POST', params: {storey: 6, date: date}}).then(function (response) {
          console.log(response)
          this.$set('reserveList', reserveList)
        }, function (response) {
          console.log(response)
        })
      },

      tabClick: function (item) {
        console.log(item)
        this.fetchReserveList(item.value)
      },

      selectMeet: function (e) {
        console.log(e.target.parentNode.classList)
        e.target.parentNode.classList.add('time-item-selected')
      },

      /* eslint-disable no-undef */
      call: function () {
        location.href = 'tel:13316463314'
      },

      reserve: function () {
        console.log(this.$router.go)
        this.$router.go('meet-details/123')
      }
    },

    /* eslint-disable no-undef */
    data () {
      return {
        rangeView: 'Range',
        color1: '#FFEF7D',
        colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1'],
        height: $(window).height() - 165 + '',
        curMeeting: 0,
        currentTab: 0,
        days: [],
        test: [],
        meetings: [],
        meetingsLen: 13,
        reserveList: []
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

.title {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
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
  background: #9e9e9e;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 3px;
  margin-top: 10px;
}

.item-body {
  height: 56px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
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
  background-color: #616161;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 16px;
  font-weight: 700;
  line-height: 40px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.time-item-reserved .item-header {
  background-color: #F57C00;
}

.time-item-reserved {
  background: #FF9800;
}

.time-item-selected .item-header {
  background-color: #388E3C;
}

.time-item-selected {
  background: #4CAF50;
}

.split-text {
  font-size: 13px;
  line-height: 13px;
  margin: 10px;
  color: #888;
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
</style>