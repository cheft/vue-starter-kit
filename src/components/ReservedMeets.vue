<template>
  <div class="page-body">
    <div class="meeting-title">
      <p>我的预定</p>
    </div>
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <div class="list-body" v-bind:style="{minHeight: heg + 'px'}" style="padding-top: 44px; box-sizing: border-box;">
        <div v-for="item in items" class="group-body">
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
                  <p class="info"><label>会议时长：</label><span>{{ item.duration }}</span></p>
                </flexbox-item>
                <flexbox-item>
                  <p class="info"><label>会议地点：</label><span>{{ item.site }}</span></p>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
            <flexbox-item :span="3">
              <flexbox :gutter="0" orient="vertical">
                <flexbox-item v-if="!item.title">
                  <a class="btn" href="javascript:void(0);" v-link="'meet-details/' + item.id">补充信息</a>
                </flexbox-item>
                <flexbox-item>
                  <a class="btn" href="javascript:void(0);" @click="outClick(item.id)">退订会议</a>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <toast :show.sync="success">退订成功!</toast>
      <toast :show.sync="failure" type="cancel">退订失败!</toast>
      <toast :show.sync="system" type="warn">系统错误!</toast>
      <confirm :show.sync="show" title="是否要退订会议？" confirm-text="确定" cancel-text="取消" @on-confirm="okClick"></confirm>
    </template>
  </div>
</template>
<script>
  import Config from '../config'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Spinner from 'vux/components/spinner/'
  import Icon from 'vux/components/icon/'
  import Toast from 'vux/components/toast/'
  import Confirm from 'vux/components/confirm/'
  let urlAddress = Config.apiPrefix + 'meeting/myMeeting'
  let outUrlAdderss = Config.apiPrefix + 'meeting/delete'
  let phoneNumber = '13418490922'
  let meetingType = 'YES'
  export default {
    ready () {
      this.$set('heg', window.outerHeight)
      let params = {
        mobile: phoneNumber,
        type: meetingType
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
      Icon,
      Toast,
      Confirm
    },
    methods: {
      outClick: function (id) {
        this.show = true
        this.id = id
      },
      okClick: function () {
        let params = {
          id: this.id
        }
        this.$http({
          url: outUrlAdderss,
          method: 'POST',
          params: params
        }).then(function (response) {
          if (response.data.code === 1000) {
            this.success = true
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].id === this.id) {
                this.items.splice(i, 1)
              }
            }
          } else {
            this.failure = true
          }
        }, function (response) {
          this.system = true
        })
      }
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        tipInfo: '正在加载中...',
        items: [],
        heg: 0,
        id: '',
        success: false,
        failure: false,
        system: false,
        show: false
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
</style>