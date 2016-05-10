<template>
  <div class="page-body">
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <article v-else class="article-body">
        <h1 class="title">{{ items.title }}</h1>
        <flexbox :gutter="0" class="flex-box-ver">
          <flexbox-item :span="4">
            <label class="info">发布人:</label>
            <time class="info">{{ items.personName }}</time>
          </flexbox-item>
          <flexbox-item style="text-align: center;">
            <label class="info">发布时间:</label>
            <span class="info">{{ items.date }}</span>
          </flexbox-item>
          <flexbox-item :span="3" style="text-align: right;">
            <label class="info">阅读:</label>
            <span class="info">{{ items.clickCount }}</span>
          </flexbox-item>
        </flexbox>
        <section class="section-body">
            {{{ items.content }}}
        </section>
        <div class="comment-body">
          <flexbox :gutter="0" class="flex-box-ver">
            <flexbox-item>
              <label class="number">评论数:</label>
              <span class="number">{{ items.commentsCount }}</span>
            </flexbox-item>
            <flexbox-item :span="3">
              <a class="discuss" href="javascript:void(0);" @click="writeComment">我要评论</a>
            </flexbox-item>
          </flexbox>
          <flexbox v-for="li in list" orient="vertical" class="flex-box-ver list">
            <flexbox-item>
              <flexbox :gutter="0">
                <flexbox-item>
                  <span class="name">{{ li.orgName }}</span>
                  <span class="name">{{ li.personName }}：</span>
                </flexbox-item>
                <flexbox-item :span="3">
                  <a class="discuss" href="javascript:void(0);" @click="reply(li.personName)">回复</a>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
            <flexbox-item>
              <p class="content">{{ li.content }}</p>
            </flexbox-item>
            <flexbox-item>
              <time class="time">{{ li.date }}</time>
            </flexbox-item>
          </flexbox>
          <div class="more" v-if="more">
            <a href="javascript:void(0);" @click="lookMore">查看更多评论</a>
          </div>
        </div>
        <popup :show.sync="show">
          <div class="popup-body">
            <x-textarea :max=200 placeholder="请填写评论内容" @on-change="textChange" :value.sync='textVaule'></x-textarea>
            <div class="flex-box">
              <x-button type="primary" @click="okSubmit" :disabled="disabled">提交</x-button>
            </div>
          </div>
        </popup>
        <toast :show.sync="success">评论成功!</toast>
        <toast :show.sync="failure" type="cancel">评论失败!</toast>
        <toast :show.sync="system" type="warn">系统错误!</toast>
      </article>
    </template>
  </div>
</template>

<script>
  import Config from '../config'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Icon from 'vux/components/icon/'
  import Spinner from 'vux/components/spinner/'
  import Popup from 'vux/components/popup/'
  import XTextarea from 'vux/components/x-textarea/'
  import XButton from 'vux/components/x-button/'
  import Toast from 'vux/components/toast/'
  let phoneNumber = '18617166210'
  let pageIndex = 1
  let pageCount = 10
  export default {
    ready: function () {
      let params = {
        id: this.$route.params.id,
        type: 'NOTICE'
      }
      let params1 = {
        id: this.$route.params.id,
        page: pageIndex,
        pageSize: pageCount
      }
      this.$http({
        url: Config.apiPrefix + 'notice/getParticulars',
        method: 'POST',
        params: params
      }).then(function (response) {
        if (response.data.code === 1000) {
          this.isLoading = false
          this.noneData = false
          this.items = response.data.data
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
      this.$http({
        url: Config.apiPrefix + 'notice/commentList',
        method: 'POST',
        params: params1
      }).then(function (response) {
        if (response.data.code === 1000) {
          this.list = response.data.data.items
          if (pageIndex < response.data.data.pageCount) {
            this.more = true
          } else {
            this.more = false
          }
        } else {
          this.tipInfo = response.data.msg
        }
      }, function (response) {
        this.tipInfo = response.data.msg
      })
    },
    components: {
      Config,
      Flexbox,
      FlexboxItem,
      Icon,
      Spinner,
      Popup,
      XTextarea,
      XButton,
      Toast
    },
    methods: {
      writeComment: function () {
        this.show = true
        this.textReply = ''
      },
      reply: function (name) {
        this.show = true
        this.textReply = '回复' + name + '：'
      },
      textChange: function (txt) {
        if (txt === '') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      },
      okSubmit: function () {
        if (!this.disabled) {
          let params2 = {
            id: this.$route.params.id,
            content: this.textVaule,
            mobile: phoneNumber
          }
          this.$http({
            url: Config.apiPrefix + 'notice/commentAdd',
            method: 'POST',
            params: params2
          }).then(function (response) {
            this.show = false
            if (response.data.code === 1000) {
              let li = response.data.data
              li.content = this.textReply + this.textVaule
              this.success = true
              this.list = [li].concat(this.list)
            } else {
              this.failure = true
            }
            this.textVaule = ''
          }, function (response) {
            this.show = false
            this.textVaule = ''
            this.system = true
          })
        }
      },
      lookMore: function () {
        pageIndex++
        let params1 = {
          id: this.$route.params.id,
          page: pageIndex,
          pageSize: pageCount
        }
        this.$http({
          url: Config.apiPrefix + 'notice/commentList',
          method: 'POST',
          params: params1
        }).then(function (response) {
          if (response.data.code === 1000) {
            this.list = this.list.concat(response.data.data.items)
            if (pageIndex < response.data.data.pageCount) {
              this.more = true
            } else {
              this.more = false
            }
          } else {
            this.tipInfo = response.data.msg
          }
        }, function (response) {
          this.tipInfo = response.data.msg
        })
      }
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        tipInfo: '正在加载中...',
        items: {},
        list: [],
        textVaule: '',
        textReply: '',
        show: false,
        disabled: true,
        success: false,
        failure: false,
        system: false,
        more: false
      }
    }
  }
</script>

<style scoped>
  @import '../../static/css/public.css';
  
  .title {
    font-size: 1em;
    color: #333;
    line-height: 1.5;
    text-align: center;
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
  
  .number {
    color: #666;
    line-height: 1.5;
  }
  
  .name {
    color: #999;
    line-height: 1.5;
  }
  
  .content {
    color: #333;
    line-height: 1.5;
  }
  
  .time {
    font-size: .8em;
    color: #999;
    line-height: 1.5;
  }
  
  .discuss {
    display: block;
    color: #02bb00;
    line-height: 1.5;
    text-align: right;
  }
  
  .list {
    border-top: 1px dashed #e5e5e5;
  }
  
  .more {
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
  
  .more a {
    display: block;
    padding: 8px 0;
    font-size: .8em;
    color: #666;
    line-height: 1.5;
    text-align: center;
  }
</style>