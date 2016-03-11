<template>
  <group>
    <x-input title="姓名" placeholder="请输入姓名" is-type="china_name"></x-input>
  </group>
  <group>
    <x-input title="手机号码" placeholder="请输入手机号码" keyboard="number" is-type="china_mobile"></x-input>
  </group>
  <group>
    <datetime value="请输入生日" @change="change" title="生日"></datetime>
  </group>
  <group>
    <switch title="是否已婚"></switch>
  </group>
  <group>
    <address :title="addressTitle" :value.sync="addressValue" raw-value></address>
  </group>
  <group>
    <textarea :max=200 placeholder="请简单介绍自己"></textarea>
  </group>
  <box gap="10px 10px">
    <x-button type="primary">提交审核</x-button>
  </box>
</template>

<script>
  import { Input as XInput, Group, Datetime, Address, Switch, Box, XButton, Textarea } from 'vux'
  export default {
    components: {
      XInput,
      Group,
      Datetime,
      Address,
      Switch,
      Box,
      XButton,
      Textarea
    },

    data () {
      return {
        addressTitle: '请选择地址',
        addressValue: []
      }
    },

    methods: {
      change: function (val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>
  .weui_cell_ft {
    display: none;
  }
</style>