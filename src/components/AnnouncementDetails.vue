<template>
  <article class="article-body">
    <h1 class="title">{{ title }}</h1>
    <flexbox :gutter="0" class="flex-box">
      <flexbox-item :span="4">
        <label class="info">发布人:</label>
        <time class="info">{{ issuer }}</time>
      </flexbox-item>
      <flexbox-item style="text-align: center;">
        <label class="info">发布时间:</label>
        <span class="info">{{ time }}</span>
      </flexbox-item>
      <flexbox-item :span="3" style="text-align: right;">
        <label class="info">阅读:</label>
        <span class="info">{{ reading }}</span>
      </flexbox-item>
    </flexbox>
    <section class="section-body">
        {{{ article }}}
    </section>
    <div class="comment-title">
      <flexbox :gutter="0" class="flex-box">
        <flexbox-item>
          <label class="number">评论:</label>
          <span class="number">{{ number }}</span>
        </flexbox-item>
        <flexbox-item :span="3">
          <a class="discuss" href="javascript:void(0);">我要评论</a>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="comment-body">
      <ul class="discuss_list">
        <li class="discuss_item" v-for="comment in list">
          <div class="discuss_opr">
            <a class="reply" href="javascript:void(0);">回复</a>
          </div>
          <div class="user_info">
            <strong class="nickname">{{ comment.name }}</strong>
            <img class="avatar" :src="comment.avatar">
          </div>
          <div class="discuss_message">
            <span class="discuss_status">{{ comment.status }}</span>
            <div class="discuss_message_content">{{ comment.content }}</div>
          </div>
          <p class="discuss_extra_info">{{ comment.time }}
            <a v-if="comment.is_from_me" class="discuss_del js_del" href="javascript:;" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>
          </p>
          <div class="reply_result" v-if="comment.reply_list && comment.reply_list.length">
            <div class="nickname">作者回复</div>
            <div class="discuss_message">
              <div class="discuss_message_content">{{ comment.reply_list[0].content }}</div>
            </div>
            <p class="discuss_extra_info">{{ comment.reply_list[0].time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  const list = [{
    name: 'Airyland',
    avatar: 'static/demo/comment/1.jpg',
    time: '昨天',
    like_num: 99,
    content: '沙发',
    has_praised: true,
    reply_list: [{
      content: '恭喜~',
      time: '今天早上'
    }]
  }, {
    name: 'Vux',
    avatar: 'static/demo/comment/2.jpg',
    time: '未来时间',
    like_num: 0,
    content: '板凳'
  }, {
    name: 'Secret',
    avatar: 'static/demo/comment/3.jpg',
    time: '未来时间',
    like_num: 99,
    content: '居然没抢到沙发'
  }]
  export default {
    components: {
      Flexbox,
      FlexboxItem
    },
    methods: {
      praise: function (item) {
        if (!item.has_praised) {
          item.like_num++
          item.has_praised = true
          console.log(JSON.stringify(item))
        }
      }
    },
    data () {
      return {
        title: '何时才能见到彩虹？',
        article: '<p>小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成，每栋又分为两座，社区安静舒适双地铁口物业，周边配套有：天虹商场，万佳百货，皇岗公园，红领中学学位，妇幼保健院等，近距离CBD商务中心区和购物公园等。</p><p>小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成小区由两栋小高层组成，每栋又分为两座，社区安静舒适双地铁口物业，周边配套有：天虹商场，万佳百货，皇岗公园，红领中学学位，妇幼保健院等，近距离CBD商务中心区和购物公园等。</p>',
        issuer: '张三了际',
        time: '2016-04-01',
        reading: '8888',
        number: '30',
        list: list
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

.number {
  color: #666;
  line-height: 1.5;
}

.discuss {
  display: block;
  color: #333;
  line-height: 1.5;
  text-align: right;
}

.comment-body {
  border-top: 1px dashed #e5e5e5;
}

.discuss_btn_wrp {
  display: none;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right
}
.btn_discuss {
  padding-left: 1.5em;
  padding-right: 1.5em
}
.discuss_list {
  margin-top: -5px;
  padding-bottom: 20px;
  font-size: 16px
}
.discuss_item {
  position: relative;
  padding-left: 45px;
  margin-top: 15px;
}
.discuss_item:after {
  content: "\200B";
  display: block;
  height: 0;
  clear: both
}
.discuss_item .user_info {
  min-height: 20px;
  overflow: hidden
}
.discuss_item .nickname {
  display: block;
  font-weight: 400;
  font-style: normal;
  color: #727272;
  width: 9em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal
}
.discuss_item .avatar {
  position: absolute;
  top: 0;
  left: 0;
  top: 3px;
  width: 35px;
  height: 35px;
  background-color: #ccc;
  vertical-align: top;
  margin-top: 0;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px
}
.discuss_item .discuss_message {
  color: #3e3e3e;
  line-height: 1.5
}
.discuss_item .discuss_extra_info {
  color: #8c8c8c;
  font-size: 12px
}
.discuss_item .discuss_extra_info a {
  margin-left: .5em
}
.discuss_item .discuss_status {
  color: #ff7a21;
  white-space: nowrap
}
.discuss_item .discuss_status i {
  font-style: normal;
  margin-right: 2px
}
.discuss_item .discuss_opr {
  float: right
}
.discuss_item .discuss_del {
  margin-left: .5em
}
.discuss_icon_tips {
  margin-bottom: 20px
}
.discuss_icon_tips img {
  vertical-align: middle;
  margin-left: 3px;
  margin-top: -4px
}
.discuss_icon_tips .icon_edit {
  width: 12px
}
.discuss_icon_tips .icon_access {
  width: 13px
}
.reply_result {
  position: relative;
  margin-top: .5em;
  padding-top: .5em;
  padding-left: .4em
}
.reply_result:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px dotted #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5)
}
.reply_result .nickname {
  position: relative;
  overflow: visible
}
.reply_result .nickname:before {
  content: " ";
  position: absolute;
  left: -0.4em;
  top: 50%;
  margin-top: -7px;
  width: 3px;
  height: 14px;
  background-color: #02bb00
}
.rich_tips.discuss_title_line {
  margin-top: 50px
}
.reply {
  font-size: .9em;
  color: #666;
}
</style>