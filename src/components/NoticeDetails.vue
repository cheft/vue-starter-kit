<template>
  <article class="article-body">
    <h1 class="title">{{ title }}</h1>
    <flexbox :gutter="0" class="flex-box">
      <flexbox-item>
        <span class="info">{{ provenance }}</span>
      </flexbox-item>
      <flexbox-item :span="4" style="text-align:right;">
        <label class="info">签发人:</label>
        <time class="info">{{ issuer }}</time>
      </flexbox-item>
    </flexbox>
    <section class="section-body">
        {{{ article }}}
    </section>
    <div class="time-body">
      <time>{{ time }}</time>
    </div>
  </article>
</template>

<script>
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  export default {
    components: {
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        title: 'Q房网集团2016年清明节放假通知',
        article: '<p>小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成，每栋又分为两座，社区安静舒适双地铁口物业，周边配套有：天虹商场，万佳百货，皇岗公园，红领中学学位，妇幼保健院等，近距离CBD商务中心区和购物公园等。</p><p>小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成，每栋又分为两座，社区安静舒适双地铁口物业，周边配套有：天虹商场，万佳百货，皇岗公园，红领中学学位，妇幼保健院等，近距离CBD商务中心区和购物公园等。</p>',
        issuer: '张三了际',
        provenance: 'Q房网【2016】007号',
        time: '2016-03-12'
      }
    }
  }
</script>

<style scoped>
.article-body {
  padding: 15px;
}

.flex-box {
  padding: 10px 0;
  box-sizing: border-box;
}

.title {
  font-size: 1em;
  color: #333;
  line-height: 1.5;
  text-align: center;
}

.info {
  font-size: .8em;
  color: #666;
}

@media only screen and (min-width: 320px) and (max-width: 360px) {
  .info {
    font-size: .7em;
  }
}

.section-body {
  padding: 15px 0;
  border-top: 1px solid #02bb00;
  border-bottom: 1px solid #e5e5e5;
}

.section-body p {
  margin-bottom: 1em;
  color: #333;
  line-height: 1.6;
}

.time-body {
  padding: 10px 0;
  text-align: right;
}

.time-body time {
  color: #666;
  line-height: 1.5;
}
</style>