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
              <x-input title="会议主题"></x-input>
              <cell title="参与人员" is-link v-on:click="openPopup"></cell>
            </group>
            <a href="javascript:;" class="weui_btn weui_btn_primary">提交</a>
          </p>
      </div>
      <div class="weui_extra_area">
        <a v-link="'/reserved-meets'">太麻烦，不重要，不填写</a>
      </div>
    </div>
    <popup v-ref:popup :show.sync="popupShow" height="100%">
      <search @item-add-click="itemAddClick" @on-change="getResult" :results="results" :value.sync="value" class="search-body" placeholder="根据部门或者姓名搜索" cancel-text="取消"></search>
      <scroller v-ref:scroller lock-x scrollbar-y :height="listHeight + 'px'">
        <group class="list-body" title="所选人员：">
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

import Search from './PersonSearch'

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
    Scroller
  },

  ready () {
    document.title = '预定成功'
    var _this = this
    this.$refs.popup.$on('on-first-show', function () {
      _this.$refs.scroller.reset()
    })
  },

  /* eslint-disable no-undef */
  data () {
    return {
      listHeight: $(window).height() - 82,
      popupShow: false,
      value: '',
      results: [],
      selectedPersons: []
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
    },

    delPerson: function (index) {
      this.selectedPersons.splice(index, 1)
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