<template>
  <div>
    <div class="weui_msg">
      <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
      <div class="weui_text_area">
          <h2 class="weui_msg_title">已预定{{meetInfo.useDate}}时间为{{meetInfo.dates}}的
          <div>{{meetInfo.storey}}楼{{meetInfo.conferenceName}}</div></h2>
          <p class="weui_msg_desc">为了能通知到参会人员，请补充信息</p>
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
          <cell :title="p.orgName + '-' + p.personName" v-for="p in selectedPersons">
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
    <confirm v-ref:confirm :show.sync="confirmShow" :title="confirmTitle" cancel-text="取消" confirm-text="继续"><p style="text-align:center;" ></p></confirm>
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
import Confirm from 'vux/components/confirm'

import Search from './PersonSearch'
import config from '../config'

var updateUrl = config.apiPrefix + 'meeting/update'
var fetchUrl = config.apiPrefix + 'meeting/select'
var contactsUrl = config.apiPrefix + 'contactsList/listByKeyword'

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
    Toast,
    Confirm
  },

  ready () {
    config.setTitle('补充信息')
    var _this = this
    this.$refs.popup.$watch('show', function () {
      _this.$refs.scroller.reset()
    })
    this.$refs.confirm.$on('on-confirm', function () {
      _this.submitHandle()
    })

    this.fetchMeet()
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
      toastShow: false,
      confirmTitle: '',
      confirmShow: false,
      meetInfo: ''
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
      var _this = this
      if (!this.valu) return
      var params = {
        keyword: this.value,
        mobile: config.mobile
      }
      this.$http({url: contactsUrl, method: 'POST', params: params})
      .then(function (response) {
        if (response.data.code === 1000) {
          _this.results = response.data.data.items
        } else {
          _this.toastShow = true
          _this.toastTitle = '系统错误'
        }
      }, function (response) {
        _this.toastShow = true
        _this.toastTitle = '系统错误'
      })
    },

    getPersonIds: function () {
      var tmp = []
      this.selectedPersons.forEach(function (item) {
        tmp.push(item.id)
      })
      return tmp.join(',')
    },

    submitHandle: function () {
      var _this = this
      this.loadingShow = true
      var params = {
        id: this.$route.params.id,
        title: this.title,
        personIds: this.getPersonIds()
      }
      this.$http({url: updateUrl, method: 'POST', params: params})
      .then(function (response) {
        if (response.data.code === 1000) {
          _this.$router.go('/reserved-meets')
        } else {
          _this.toastShow = true
          _this.toastTitle = '系统错误'
          _this.loadingShow = false
        }
      }, function (response) {
        _this.toastShow = true
        _this.toastTitle = '系统错误'
        _this.loadingShow = false
      })
    },

    submit: function () {
      if (!this.title) {
        this.toastTitle = '会议主题不允许为空'
        this.toastShow = true
        return
      }
      if (this.selectedPersons.length === 0) {
        this.confirmTitle = '参会人员没选择，继续提交将不能再补充，是否继续？'
        this.confirmShow = true
        return
      }
      this.submitHandle()
    },
    /* eslint-disable no-useless-escape */
    fetchMeet: function () {
      this.loadingShow = true
      this.$http({url: fetchUrl, method: 'POST', params: {id: this.$route.params.id}})
      .then(function (response) {
        if (response.data.code === 1000) {
          var info = response.data.data
          this.meetInfo = info
          this.meetInfo.dates = this.meetInfo.dates.replace(/\-(\d|\,|\-)*\-/, '-')
        }
        this.loadingShow = false
      }, function (response) {
        this.loadingShow = false
        this.toastShow = true
        this.toastTitle = '系统错误'
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

@media (max-width: 320px) {
  .weui_msg .weui_msg_title {
    font-size: 16px;
  }
}
</style>