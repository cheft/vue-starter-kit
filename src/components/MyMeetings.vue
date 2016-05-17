<template>
  <div class="page-body">
    <div class="meeting-title">
      <p>我的会议</p>
    </div>
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <div class="list-body" v-bind:style="{minHeight: heg + 'px'}" style="padding-top: 44px; box-sizing: border-box;">
        <div class="tip-info">
          <p>您有{{ items.length }}个会议待开</p>
        </div>
        <div v-for="item in items" class="group-body" v-link="'notice-details/' + item.id">
          <flexbox :gutter="0" class="flex-box">
            <flexbox-item>
              <flexbox :gutter="0" orient="vertical">
                <flexbox-item>
                  <p class="info"><label>会议主题：</label><span>{{ item.title }}</span></p>
                </flexbox-item>
                <flexbox-item>
                  <p class="info"><label>开始时间：</label><em>{{ item.date }}</em></p>
                </flexbox-item>
                <flexbox-item>
                  <p class="info"><label>会议时长：</label><span>{{ item.dates|duration }}点</span></p>
                </flexbox-item>
                <flexbox-item>
                  <p class="info"><label>会议地点：</label><span>{{ item.conferenceName }}</span></p>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import Config from '../config'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Spinner from 'vux/components/spinner/'
  import Icon from 'vux/components/icon/'
  let urlAddress = Config.apiPrefix + 'meeting/myMeeting'
  let phoneNumber = '13418490922'
  export default {
    ready () {
      this.$set('heg', window.outerHeight)
      // this.items = [{title: '【MOA评审】', date: '4月12日 10:00', duration: '2小时', site: '七楼一号会议室'}, {title: '【MOA】', date: '4月12日 10:00', duration: '2小时', site: '七楼一号会议室'}]
      let params = {
        mobile: phoneNumber
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
      Flexbox,
      FlexboxItem,
      Spinner,
      Icon
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        tipInfo: '正在加载中...',
        items: [],
        heg: 0
      }
    },
    filters: {
      duration: function (value) {
        return value.replace(/\-(\d|\,|\-)*\-/, '-')
      }
    }
  }
</script>
<style scoped>
  @import '../../static/css/public.css';
  .info {
    padding: 5px 0;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .info label {
    color: #999;
  }
  
  .info span {
    color: #333;
  }
  
  .info em {
    font-style: normal;
    color: #f43530;
  }
  
  .btn {
    display: block;
    margin: 10px 0;
    padding: 5px;
    font-size: 14px;
    color: #02bb00;
    line-height: 1.5;
    text-align: center;
    border: 1px solid #02bb00;
    border-radius: 3px;
  }
  
  .tip-info {
    padding: 0 10px;
    border-bottom: 1px solid #ececec;
    background: #fff;
  }
  
  .tip-info p {
    padding: 5px 0;
    font-size: 14px;
    color: #02bb00;
    line-height: 1.5;
  }
</style>
