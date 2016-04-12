<template>
  <tab :line-width=2 active-color='#fc378c'>
    <tab-item :selected="path === item.path" v-for="item in items" @click="path = item.path"
    v-link="{path: item.path}">{{item.name}}</tab-item>
  </tab>

</template>

<script>
  import { Tab, TabItem } from 'vux'

  var vm = {
    components: {
      Tab,
      TabItem
    },
    data () {
      var path = this.$route.path
      return {
        path: path,
        items: [
          {name: '工作', path: '/'},
          // {name: '资料', path: '/info'},
          // {name: '图库', path: '/gallery'},
          {name: '设置', path: '/setting'}
        ]
      }
    }
  }

  export default vm
</script>
<style>
@import '~vux/vux.css';
</style>