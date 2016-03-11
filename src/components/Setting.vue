<template>
<div>
  <div class="center">
    <img :src="avatar_url"></h1>
    <p class="vux-notice"><i class="weui_icon weui_icon_circle"></i> {{location}} {{login}} </p>
  </div>
  <group>
    <cell title="接收新消息通知" value="已启用"></cell>
  </group>
  <tip>如果你要关闭或开启微信的新消息通知，请在iPhone的"设置"-"通知"功能中，找到应用程序"微信"更改。</tip>

  <group>
    <switch title="通知显示消息详情" :value=true></switch>
  </group>
  <tip>关闭后，当收到微信消息时，通知提示将不再显示发信人和内容摘要。</tip>

  <group>
    <switch title="声音" :value=false></switch>
    <switch title="振动" :value=true></switch>
  </group>
  <tip>当微信在运行时，你可以设置是否需要声音或者振动。</tip>

  <group>
    <switch title="朋友圈照片更新" :value=true></switch>
  </group>
  <tip>关闭后，有朋友更新照片时，界面下面的"发现"切换按钮上不再出现红点提示。</tip>
  </div>
</template>

<script>
import { Tip, DevTip, Number, Selector, Group, Btn, Switch, GroupTitle, Radio, Checklist, Textarea, Cell, Input as Xinput } from 'vux'

export default {
  ready: function () {
    this.$http({url: 'https://api.github.com/users/cheft', method: 'GET'}).then(function (response) {
      console.log(response)
      this.$set('avatar_url', response.data.avatar_url)
      this.$set('location', response.data.location)
      this.$set('login', response.data.login)
    }, function (response) {
      console.log(response)
    })
  },
  components: {
    Number,
    Selector,
    Group,
    Btn,
    Tip,
    Switch,
    GroupTitle,
    Radio,
    DevTip,
    Checklist,
    Textarea,
    Cell,
    Xinput
  },
  data: function () {
    return {
      avatar_url: '',
      login: '',
      location: ''
    }
  },
  methods: {
    change: function (value) {
      console.log('change:', value)
    }
  }
}
</script>

<style>
.center {
  margin-top: 15px;
  text-align: center;
}
.center img {
  width: 55px;
  height: 55px;
}
.vux-notice {
  color: #666;
  line-height: 40px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 75px;
  border-radius: 50%;
}
</style>