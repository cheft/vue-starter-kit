<template>
  <div class="announcement-body">
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value" class="search-body"></search>
    <scroller lock-x scrollbar-y use-pulldown use-pullup :pulldown-status.sync="pulldownStatus" :pullup-status.sync="pullupStatus" @pulldown:loading="loadDown" @pullup:loading="loadUp" class="scroll-body">
      <group v-for="item in items" class="group-body" v-link="{path: '/announcement-details'}">
        <flexbox :gutter="0" class="flex-box">
          <flexbox-item>
            <flexbox :gutter="0" orient="vertical">
              <flexbox-item>
                <h5 class="title">{{ item[0] }}</h5>
              </flexbox-item>
              <flexbox-item>
                <flexbox :gutter="0">
                  <flexbox-item>
                    <span class="info">{{ item[1] }}</span>
                    <time class="info">{{ item[2] }}</time>
                  </flexbox-item>
                  <flexbox-item :span="3">
                    <label class="info">阅读:</label>
                    <span class="info">{{ item[3] }}</span>
                  </flexbox-item>
                  <flexbox-item :span="3">
                    <label class="info">评论:</label>
                    <span class="info">{{ item[4] }}</span>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="1">
            <i class="arrow"></i>
          </flexbox-item>
        </flexbox>
      </group>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 40px; top: -50px; text-align: center;">
        <span v-show="pulldownStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pulldownStatus === 'up' || pulldownStatus === 'down'" :class="{'rotate': pulldownStatus === 'down'}">↓</span>
        <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -50px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Search from 'vux/components/search/'
  import Scroller from 'vux/components/scroller/'
  import Spinner from 'vux/components/spinner/'
  import Group from 'vux/components/group/'
  import Flexbox from 'vux/components/flexbox/'
  import FlexboxItem from 'vux/components/flexbox-item/'
  export default {
    components: {
      Search,
      Scroller,
      Spinner,
      Group,
      Flexbox,
      FlexboxItem
    },
    methods: {
      resultClick: function (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult: function (val) {
        this.results = getResult(this.value)
      },
      loadDown: function (uuid) {
        const _this = this
        console.log(_this.pulldownStatus)
        setTimeout(function () {
          _this.$broadcast('pulldown:reset', uuid)
        }, 1000)
      },
      loadUp: function (uuid) {
        const _this = this
        setTimeout(function () {
          _this.$broadcast('pullup:done', uuid)
        }, 1000)
      }
    },
    data () {
      return {
        items: [['今天是愚人节，你们今天有被骗到吗？', '张三了际', '2016-04-01', '254', '8888'], ['整个天空都是黑色的，心情是否有影响呢，何时才能见到彩虹？', '李四', '2016-04-24', '115', '85']],
        results: [],
        value: '',
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  }
  function getResult (val) {
    let rs = []
    for (let i = 0; i < 40; i++) {
      rs.push({
        title: `${val} result: ${i + 1}`,
        other: i
      })
    }
    return rs
  }
</script>

<style scoped>
.announcement-body {
  background-color: #f8f8f8;  
}

.search-body {
  position: fixed;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  z-index: 100;
}

.scroll-body {
  padding-top: 44px;
  box-sizing: border-box;
}

.group-body .weui_cells {
  margin-top: 15px;
}

.flex-box {
  padding: 10px;
  box-sizing: border-box;
}

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

.arrow {
  content: " ";
  display: block;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  height: 10px;
  width: 10px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
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