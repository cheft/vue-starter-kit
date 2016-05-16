<template>
  <div>
    <div class="weui_msg">
      <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
      <div class="weui_text_area">
          <h2 class="weui_msg_title">5月12号9-10点的七楼一号会议室已预定</h2>
          <p class="weui_msg_desc">为了能通知到参会人员，请补充以下信息</p>
      </div>
      <div class="weui_opr_area">
          <p class="weui_btn_area">
            <group>
              <x-input title="会议主题" :value.sync="title"></x-input>
              <cell title="参与人员" is-link v-on:click="openPopup"  :value = "'已选 ' + personLen + ' 人'"></cell>
            </group>
            <a href="javascript:;" class="weui_btn weui_btn_primary" v-on:click="submit">提交</a>
          </p>
      </div>
      <!-- <div class="weui_extra_area">
        <a v-link="'/reserved-meets'">太麻烦，不重要，不填写</a>
      </div> -->
    </div>
    <popup v-ref:popup :show.sync="popupShow" height="100%">
      <search @item-add-click="itemAddClick" @on-change="getResult" :results="results" :value.sync="value" class="search-body" placeholder="根据部门或者姓名搜索" cancel-text="关闭"></search>
      <scroller v-ref:scroller lock-x scrollbar-y :height="listHeight + 'px'">
        <group class="list-body" :title="'你当前已选择 '  + personLen + ' 人'">
          <cell :title="p.orgName + p.name" v-for="p in selectedPersons">
            <div slot="value">
              <x-button type="warn" :id="p.id" @click="delPerson($index)">删除</x-button>
            </div>
          </cell>
        </group>
      </scroller>
      <div class="footer-btns">
        <flexbox>
          <flexbox-item>
            <x-button v-on:click="closePopup">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" v-on:click="confirmSelected">确定选择</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </popup>
    <toast :show.sync="toastShow" :time=2000 type="cancel">{{toastTitle}}</toast>
    <loading :show="loadingShow" text="加载中..."></loading>
  </div>
</template>

<script>
import XInput from 'vux/components/x-input/'
import XButton from 'vux/components/x-button/'
import Group from 'vux/components/group/'
import Cell from 'vux/components/cell/'
import Popup from 'vux/components/popup/'
import Flexbox from 'vux/components/flexbox/'
import FlexboxItem from 'vux/components/flexbox-item/'
import Scroller from 'vux/components/scroller/'
import Loading from 'vux/components/loading'
import Toast from 'vux/components/toast'

import Search from './PersonSearch'
import config from '../config'

var updateUrl = config.apiPrefix + 'meeting/update'

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    Popup,
    Search,
    Flexbox,
    FlexboxItem,
    Scroller,
    Loading,
    Toast
  },

  ready () {
    console.log('111111111预订成功')
    document.title = '预定成功'
    var _this = this
    console.log(this.$route.params.id)
    this.$refs.popup.$on('on-first-show', function () {
      _this.$refs.scroller.reset()
    })
  },

  /* eslint-disable no-undef */
  data () {
    return {
      listHeight: $(window).height() - 82,
      title: '',
      personLen: 0,
      popupShow: false,
      value: '',
      results: [],
      selectedPersons: [],
      loadingShow: false,
      toastTitle: '',
      toastShow: false
    }
  },

  methods: {
    openPopup: function () {
      this.popupShow = true
    },

    closePopup: function () {
      this.popupShow = false
    },

    confirmSelected: function () {
      this.popupShow = false
    },

    itemAddClick: function (item) {
      this.selectedPersons.push(item)
      this.personLen = this.selectedPersons.length
    },

    delPerson: function (index) {
      this.selectedPersons.splice(index, 1)
      this.personLen = this.selectedPersons.length
    },

    getResult: function () {
      let val = this.value
      let rs = []
      for (let i = 0; i < 15; i++) {
        rs.push({
          orgName: '用户体验中心',
          name: val + i,
          id: i
        })
      }
      this.results = rs
    },

    submit: function () {
      var _this = this
      this.loadingShow = true
      console.log(this.$route)
      var postData = {
        id: this.$route.params.id,
        title: this.title,
        personIds: 'C253B687B77DEBE6E040A8C02B0046F5'
      }
      this.$http({url: updateUrl, method: 'POST', params: postData})
      .then(function (response) {
        if (response.data.code === 1000) {
          _this.$router.go('/reserved-meets')
        } else {
          _this.toastShow = true
          _this.toastTitle = '系统错误'
        }
      }, function (response) {
        _this.toastShow = true
        _this.toastTitle = '系统错误'
      })
    }
  }
}

</script>

<style scoped>
  @import '../../static/css/public.css';
  .picker-dialog {
    background-color: #fff;
  }
  .weui_btn_area {
    text-align: left;
  }

  .list-body {
    margin-top: 44px;
    padding-bottom: 44px;
    background-color: #fff;
  }

  .list-body .weui_btn {
    font-size: 14px;
    border-radius: 0;
  }

  .footer-btns {
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
    background-color: #fff;
    width: 100%;
  }

  .footer-btns .weui_btn {
    margin: 20px 10px 20px 10px;
  }
</style>