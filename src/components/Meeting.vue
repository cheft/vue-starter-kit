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
      <swiper :height="height" v-ref:meetings>
        <swiper-item class="swiper-item" v-for="i in 14">
          <h4 class="title fadeInUp animated">会议室 {{' ' + i + ' '}}</h4>
          <flexbox>
            <flexbox-item><div class="time-item">9</div></flexbox-item>
            <flexbox-item><div class="time-item">14</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">10</div></flexbox-item>
            <flexbox-item><div class="time-item">15</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">11</div></flexbox-item>
            <flexbox-item><div class="time-item">16</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">12</div></flexbox-item>
            <flexbox-item><div class="time-item">17</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">13</div></flexbox-item>
            <flexbox-item><div class="time-item">18</div></flexbox-item>
          </flexbox>
          <flexbox>
            <flexbox-item><div class="time-item">14</div></flexbox-item>
            <flexbox-item><div class="time-item">19</div></flexbox-item>
          </flexbox>
        </swiper-item>
      </swiper>
    </div>
    <range slot="value" :value.sync="meeting" :min="0" :max="13" min-HTML="<span style='font-size:12px;'>楼下</span>" max-HTML="<span style='font-size:12px;'>楼上</span>"></range>
    <div class="weui_tabbar">
      <!-- <color-picker :colors="colors1" :value.sync="color1"></color-picker> -->
      <a href="sms:13316463314" class="weui_tabbar_item">
        <div>星期一</div>
        <div>（4月18号）</div>
      </a>
      <a href="sms:13316463314" class="weui_tabbar_item">
        <div>星期二</div>
        <div>（4月19号）</div>
      </a>
      <a href="sms:13316463314" class="weui_tabbar_item">
        <div>星期三</div>
        <div>（4月20号）</div>
      </a>
    </div>
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

  export default {
    components: {
      ColorPicker,
      Scroller,
      Swiper,
      SwiperItem,
      Range,
      Flexbox,
      FlexboxItem
    },

    ready () {
      var _this = this
      this.$refs.meetings.$watch('current', function (val) {
        _this.$set('meeting', val)
      })
    },

    /* eslint-disable no-undef */
    data () {
      return {
        color1: '#FFEF7D',
        colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1'],
        height: $(window).height() - 150,
        meeting: 0
        // width: $(window).width() - 20,
        // totalWidth: $(window).width() * 14 - 20
      }
    },

    /* eslint-disable no-undef */
    watch: {
      meeting: function (val) {
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
  background-color: #ccc;
  display:inline-block;
  /*margin-left: 20px;*/
  float: left;
  text-align: center;
  line-height: 100px;
  background: #Ffffc4;
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

</style>