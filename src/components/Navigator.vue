<template>
  <tab :line-width=2 active-color='#fc378c'>
    <tab-item :selected="current === item.name" v-for="item in items"
    @click="current = item.name" v-link="{path: item.path}">{{item.name}}</tab-item>
  </tab>
</template>

<script>
  import { Tab, TabItem, Sticky } from 'vux'

  export default {
    components: {
      Tab,
      TabItem,
      Sticky
    },
    data () {
      return {
        current: '主页',
        items: [
          {name: '主页', path: '/'},
          {name: '资料', path: '/info'},
          {name: '图库', path: '/gallery'},
          {name: '设置', path: '/setting'}
        ]
      }
    }
  }
</script>