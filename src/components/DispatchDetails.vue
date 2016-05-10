<template>
  <div class="page-body">
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <article v-else class="article-body">
        <h1 class="title">{{ items.title }}</h1>
        <flexbox :gutter="0" class="flex-box-ver">
          <flexbox-item>
            <span class="info">{{ items.head }}</span>
          </flexbox-item>
          <flexbox-item :span="4" style="text-align:right;">
            <label class="info">签发人:</label>
            <time class="info">{{ items.personName }}</time>
          </flexbox-item>
        </flexbox>
        <section class="section-body">
            {{{ items.content }}}
        </section>
        <div class="time-body">
          <time>{{ items.date }}</time>
        </div>
      </article>
    </template>
  </div>
</template>

<script>
  import Config from '../config'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Icon from 'vux/components/icon/'
  import Spinner from 'vux/components/spinner/'
  export default {
    ready () {
      let params = {
        id: this.$route.params.id,
        type: 'DISPATCH'
      }
      this.$http({
        url: Config.apiPrefix + 'notice/getParticulars',
        method: 'POST',
        params: params
      }).then(function (response) {
        if (response.data.code === 1000) {
          this.isLoading = false
          this.noneData = false
          this.items = response.data.data
        } else {
          this.isLoading = false
          this.noneData = true
          this.tipInfo = response.data.msg
        }
      }, function (response) {
        this.isLoading = false
        this.noneData = true
        this.tipInfo = response.statusText
      })
    },
    components: {
      Config,
      Flexbox,
      FlexboxItem,
      Icon,
      Spinner
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        tipInfo: '正在加载中...',
        items: {}
      }
    }
  }
</script>

<style scoped>
  @import '../../static/css/public.css';
  .title {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: center;
  }
  
  .info {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
  }
  
  .time-body {
    padding: 10px 0;
    text-align: right;
  }
  
  .time-body time {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
  }
</style>