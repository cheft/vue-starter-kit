<template>
  <div style="min-height: 736px;">
    <tab :line-width=1>
      <tab-item :selected="current === item" v-for="item in items" @click="current = item">{{item}}</tab-item>
    </tab>
    这是流程页
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'

  export default {
    components: {
      Tab,
      TabItem
    },
    data () {
      return {
        items: ['未读', '已读'],
        current: '未读'
      }
    }
  }
</script>
