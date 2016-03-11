<template>
  <tab :line-width=2 active-color='#fc378c'>
    <tab-item :selected="path === item.path" v-for="item in items" @click="path = item.path"
    v-link="{path: item.path}">{{item.name}}</tab-item>
  </tab>
</template>

<script>
  import { Tab, TabItem, Sticky } from 'vux'

  var vm = {
    components: {
      Tab,
      TabItem,
      Sticky
    },
    data () {
      var path = this.$route.path
      return {
        path: path,
        items: [
          {name: '主页', path: '/'},
          {name: '资料', path: '/info'},
          {name: '图库', path: '/gallery'},
          {name: '设置', path: '/setting'}
        ]
      }
    }
  }

  export default vm
</script>