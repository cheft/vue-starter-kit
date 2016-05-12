<template>
  <div class="weui_msg">
      <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
      <div class="weui_text_area">
          <h2 class="weui_msg_title">5月12号9-10点的七楼一号会议室已预定</h2>
          <p class="weui_msg_desc">为了能通知到与会人员，请补充以下信息</p>
      </div>
      <div class="weui_opr_area">
          <p class="weui_btn_area">
            <group>
              <x-input placeholder="请输入会议主题"></x-input>
              <x-input placeholder="请选择参会人"></x-input>
            </group>
            <a href="javascript:;" class="weui_btn weui_btn_primary">提交</a>
          </p>
      </div>
      <div class="weui_extra_area">
        <a v-link="'/reserved-meets'">太麻烦，不重要，不填写</a>
    </div>
  </div>
</template>

<script>
import XInput from 'vux/components/x-input/'
import Group from 'vux/components/group/'

export default {
  components: {
    Group,
    XInput
  },

  ready () {
    document.title = '预定成功'
  }
}

</script>

<style scoped>
  .weui_btn {
    margin-top: 20px;
  }
</style>