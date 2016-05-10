<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown use-pullup :pulldown-status.sync="pulldownStatus" :pullup-status.sync="pullupStatus" @pulldown:loading="loadDown" @pullup:loading="loadUp">
      <div class="box2">
        <group v-for="item in items" class="group-body" v-link="'notice-details/' + item.id">
          <flexbox :gutter="0" class="flex-box">
            <flexbox-item>
              <flexbox :gutter="0" orient="vertical">
                <flexbox-item>
                  <h5 class="title">{{ item.title }}</h5>
                </flexbox-item>
                <flexbox-item>
                  <flexbox :gutter="0">
                    <flexbox-item>
                      <span class="info">{{ item.personName }}</span>
                      <time class="info">{{ item.date }}</time>
                    </flexbox-item>
                    <flexbox-item :span="3">
                      <label class="info">阅读:</label>
                      <span class="info">{{ item.clickCount }}</span>
                    </flexbox-item>
                    <flexbox-item :span="3">
                      <label class="info">评论:</label>
                      <span class="info">{{ item.commentsCount }}</span>
                    </flexbox-item>
                  </flexbox>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
            <flexbox-item class="flex20">
              <i class="arrow"></i>
            </flexbox-item>
          </flexbox>
        </group>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
          <span v-show="pulldownStatus === 'default'"></span>
          <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
          <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
          <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Scroller from 'vux/components/scroller/'
  import Spinner from 'vux/components/spinner/'
  import Group from 'vux/components/group/'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Icon from 'vux/components/icon/'
  
  export default {
    components: {
      Scroller,
      Spinner,
      Group,
      Flexbox,
      FlexboxItem,
      Icon
    },
    methods: {
      loadDown: function (uuid) {
        const _this = this
        setTimeout(function () {
          _this.$broadcast('pulldown:reset', uuid)
        }, 1000)
      },
      loadUp: function (uuid) {
        const _this = this
        setTimeout(function () {
          _this.items = _this.items.concat([{'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}])
          setTimeout(function () {
            _this.$broadcast('pullup:reset', uuid)
            _this.$broadcast('pullup:done', uuid)
          }, 10)
        }, 2000)
      }
    },
    data () {
      return {
        items: [{'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}, {'title': '333'}],
        pullupStatus: 'default'
      }
    }
  }
</script>

<style>
  .weui_cells {
    margin-top: 10px;
  }
</style>

<style scoped>
  @import '../../static/css/public.css';
  
  .title {
    color: #333;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  
  time.info {
    margin-left: .5em;
  }

  .flex20 {
    -webkit-box-flex: 0 0 20px; 
    -o-box-flex: 0 0 20px; 
    -ms-flex: 0 0 20px; 
    -webkit-flex: 0 0 20px; 
    flex: 0 0 20px;
  }
  
  .box2-wrap {
    height: 1750px;
    overflow: hidden;
  }

  .pullup-arrow {
    -webkit-transition: all linear 0.2s;
    -moz-transition: all linear 0.2s;
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
  
  .rotate {
    display: inline-block;
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
</style>