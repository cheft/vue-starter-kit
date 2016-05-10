<template>
  <div>
    <!--
    <scroller lock-y scrollbar-x :bounce=false style="padding: 10px">
      <div class="box1"  style="width: {{totalWidth}}px;">
        <div class="box1-item" v-for="i in 14" style="width: {{width}}px; height: {{height}}px;" ><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>
    -->
    <div style="padding: 10px;">
      <swiper :height="height" v-ref:meetings :list="list">
        <swiper-item class="swiper-item" v-for="m in meetings">
          <h4 class="title fadeInUp animated">{{m.name}} (限 {{m.number}} 人)</h4>
          <flexbox>
            <flexbox-item><div class="time-item">9~10</div></flexbox-item>
            <flexbox-item><div class="time-item time-item-yes">15~16</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">10~11</div></flexbox-item>
            <flexbox-item><div class="time-item">16~17</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item time-item-yes">11~12</div></flexbox-item>
            <flexbox-item><div class="time-item">17~18</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">12~13</div></flexbox-item>
            <flexbox-item><div class="time-item">18~19</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">13~14</div></flexbox-item>
            <flexbox-item><div class="time-item">19~20</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">14~15</div></flexbox-item>
            <flexbox-item><div class="time-item time-item-yes">20~21</div></flexbox-item>
          </flexbox>
        </swiper-item>
      </swiper>
    </div>
    <range slot="value" :value.sync="curMeeting" :min="0" :max="meetingsLen" min-HTML="<span style='font-size:12px;'>楼下</span>" max-HTML="<span style='font-size:12px;'>楼上</span>"></range>
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
  import Config from '../config'

  let getMeetingUrl = Config.apiPrefix + 'meeting/meetingList'

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
      this.fetch()
      var _this = this
      this.$refs.meetings.$watch('current', function (val) {
        _this.$set('curMeeting', val)
      })
    },

    methods: {
      fetch: function () {
        var _this = this
        this.$http({url: getMeetingUrl, method: 'POST', params: {storey: 6}}).then(function (response) {
          console.log(response)
          _this.$set('meetings', response.data.data.items)
          _this.$set('meetingsLen', response.data.data.items.length)
        }, function (response) {
          console.log(response)
        })
      }
    },

    /* eslint-disable no-undef */
    data () {
      return {
        color1: '#FFEF7D',
        colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1'],
        height: $(window).height() - 120 + '',
        curMeeting: 0,
        list: [],
        meetings: [],
        meetingsLen: 0
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
  height: 68px;
  line-height: 68px;
  background: #71D571;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
}

.time-item-yes {
  background: #ddd;
}

.weui_tabbar_item .weui_tabbar_icon {
  color: #888;
  height: inherit;
}
.weui_bar_item_on .weui_tabbar_icon {
  color: #09bb07;
}

</style>