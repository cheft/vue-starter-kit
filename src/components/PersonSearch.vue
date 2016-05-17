<template>
  <div class="vux-search-box">
    <div class="weui_search_bar" id="search_bar" :class="{weui_search_focusing: !isCancel}">
      <form onsubmit="return false" class="weui_search_outer">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed"></div>
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="text" class="weui_search_input" id="search_input" placeholder="{{placeholder}}" autocomplete="off" required v-model="value" v-el:input />
          <a href="javascript:" class="weui_icon_clear" id="search_clear" @click="clear"></a>
        </div>
        <label for="search_input" class="weui_search_text" id="search_text">
          <i class="weui_icon_search"></i>
          <span>{{placeholder}}</span>
        </label>
      </form>
      <a href="javascript:" class="weui_search_cancel" id="search_cancel" @click="cancel">{{cancelText}}</a>
    </div>
    <div class="weui_cells search_show" v-show="isFixed && results.length && value">
      <div v-if="isLoading" class="loading-body">
        <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
      </div>
      <scroller v-ref:scroller lock-x scrollbar-y :height="listHeight + 'px'">
        <div class="box2">
          <div v-else v-for="item in results">
            <cell :title="item.orgName + item.name">
              <div slot="value">
                <x-button type="primary" @click="itemAddClick(item, $event)">增加</x-button>
              </div>
            </cell>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item/'
  import Spinner from 'vux/components/spinner/'
  import Cell from 'vux/components/cell/'
  import XButton from 'vux/components/x-button/'
  import Scroller from 'vux/components/scroller/'

  export default {
    props: {
      placeholder: {
        type: String,
        default: 'Search'
      },
      cancelText: {
        type: String,
        default: 'cancel'
      },
      value: {
        type: String,
        twoWay: true,
        default: ''
      },
      results: {
        type: Array,
        default: function () {
          return []
        }
      },
      autoFixed: {
        type: Boolean,
        default: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      Spinner,
      Cell,
      XButton,
      Scroller
    },
    methods: {
      clear: function () {
        this.value = ''
        this.isFocus = true
        this.setFocus()
      },
      cancel: function () {
        this.value = ''
        this.isCancel = true
        this.isFixed = false
      },
      touch: function () {
        this.isCancel = false
        if (this.autoFixed) {
          this.isFixed = true
        }
      },
      setFocus: function () {
        this.$els.input.focus()
      },
      /* eslint-disable no-undef */
      itemAddClick: function (item, e) {
        if ($(e.target).hasClass('weui_btn_primary')) {
          this.$dispatch('item-add-click', item)
        }
        $(e.target).removeClass('weui_btn_primary').addClass('weui_btn_default').text('已增加')
      }
    },
    /* eslint-disable no-undef */
    data () {
      return {
        listHeight: $(window).height() - 44,
        isCancel: true,
        isFocus: false,
        isFixed: false
      }
    },
    watch: {
      isFixed: function (val) {
        if (val === true) {
          this.$el.classList.add('vux-search-fixed')
          this.setFocus()
          this.isFocus = true
        } else {
          this.$el.classList.remove('vux-search-fixed')
        }
      },
      value: function (val) {
        this.$dispatch('on-change', this.value)
        var _this = this
        Vue.nextTick(function () {
          setTimeout(function () {
            _this.$refs.scroller.reset()
          }, 500)
        })
      }
    }
  }
</script>

<style scoped>
  .vux-search-fixed {
    position: fixed;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }

  .vux-search-box {
    width: 100%;
  }

  .vux-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  .weui_btn {
    font-size: 14px;
    border-radius: 0;
  }
</style>
