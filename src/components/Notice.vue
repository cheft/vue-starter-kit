<template>
  <div>
    <sticky>
      <tab :line-width=1>
        <tab-item :selected="current === item" v-for="item in items" @click="current = item">{{item}}</tab-item>
      </tab>
    </sticky>
  </div>
</template>

<script>
  import { Sticky, Tab, TabItem } from 'vux'

  export default {
    components: {
      Sticky,
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
