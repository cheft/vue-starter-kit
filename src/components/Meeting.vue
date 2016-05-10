<template>
  <div>
    <div style="padding: 10px;">
      <swiper :height="height" v-ref:meetings :list="test">
        <swiper-item class="swiper-item" v-for="m in meetings">
          <h4 class="title fadeInUp animated">{{m.name}} (限 {{m.number}} 人)</h4>
          <flexbox>
            <flexbox-item><div class="time-item">9 ~ 10</div></flexbox-item>
            <flexbox-item v-on:click="call">
              <div class="time-item time-item-reserved">10 ~ 11 技术中心-陈某某-技术会</div>
            </flexbox-item>
            <flexbox-item><div class="time-item time-item-reserved">11 ~ 12</div></flexbox-item>
          </flexbox>
          <div class="split-text">上午</div>
          <hr class="split-hr">
          <div class="split-text">下午</div>
          <flexbox>
            <flexbox-item><div class="time-item">14 ~ 15</div></flexbox-item>
            <flexbox-item><div class="time-item">15 ~ 16</div></flexbox-item>
            <flexbox-item><div class="time-item">16 ~ 17</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">17 ~ 18</div></flexbox-item>
            <flexbox-item><div class="time-item">18 ~ 19</div></flexbox-item>
            <flexbox-item><div class="time-item">19 ~ 20</div></flexbox-item>
          </flexbox>
        </swiper-item>
      </swiper>
    </div>

    <range v-ref:range slot="value" :value.sync="curMeeting" :min="0" :max="meetingsLen" min-HTML="<span style='font-size:12px;'>6楼</span>" max-HTML="<span style='font-size:12px;'>10楼</span>"></range>
    <tabbar>
      <tabbar-item selected>
        <span slot="icon">周二</span>
        <span slot="label">05月10号</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="icon">周三</span>
        <span slot="label">05月11号</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="icon">周四</span>
        <span slot="label">05月12号</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import ColorPicker from 'vux/components/color-picker'
  import Scroller from 'vux/components/scroller'
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
      ColorPicker,
      Scroller,
      Swiper,
      SwiperItem,
      Range,
      Flexbox,
      FlexboxItem,
      Tabbar,
      TabbarItem
    },

    calc () {
      var weeks = [[], ['一', '二', '三'], ['二', '三', '四'], ['三', '四', '五'], ['四', '五', '一'], ['五', '一', '二']]

      var date = new Date()
      var day = date.getDay()
      if (day === 0 || day === 6 || day === 7) {
        day = 1
      }
      var days = weeks[day]
      console.log(days, 2222)
    },

    ready () {
      this.fetchMeetings()
      var _this = this
      this.$refs.meetings.$watch('current', function (val) {
        _this.$set('curMeeting', val)
      })
    },

    methods: {
      fetchMeetings: function () {
        var _this = this
        this.$http({url: getMeetingUrl, method: 'POST'}).then(function (response) {
          _this.$set('meetings', response.data.data.items)
          _this.fetchReserveList()
        }, function (response) {
          console.log(response)
        })
      },

      fetchReserveList: function () {
        // var _this = this
        this.$http({url: getReserveList, method: 'POST', params: {storey: 6, date: '2016-05-10'}}).then(function (response) {
          console.log(response)
          this.$set('reserveList', reserveList)
        }, function (response) {
          console.log(response)
        })
      },

      /* eslint-disable no-undef */
      call: function () {
        location.href = 'tel:13316463314'
      }
    },

    /* eslint-disable no-undef */
    data () {
      return {
        rangeView: 'Range',
        color1: '#FFEF7D',
        colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1'],
        height: $(window).height() - 120 + '',
        curMeeting: 0,
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
  height: 100px;
  line-height: 100px;
  background: #ddd;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
}

.time-item-reserved {
  background: #71D571;
}

.split-text {
  font-size: 13px;
  line-height: 13px;
  margin: 10px;
  color: #888;
}

.split-hr {
  margin: 10px 0;
}

.weui_tabbar_item .weui_tabbar_icon {
  color: #888;
  height: inherit;
}
.weui_bar_item_on .weui_tabbar_icon {
  color: #09bb07;
}
.range-max, .range-min {
  width: 30px;
}

</style>