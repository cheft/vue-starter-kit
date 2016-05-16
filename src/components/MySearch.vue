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
    <div class="weui_cells weui_cells_access search_show" id="search_show" v-show="isFixed && results.length && value">
      <div v-if="isLoading" class="loading-body">
        <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
      </div>
      <div v-else v-for="item in results" class="group-body" @click="searchListClick(item)" v-link="'contacts-details/' + item.id">
        <div class="box-middel flex-box">
          <div class="box-vertical flex">
            <p class="title flex">{{ item.personName }}</p>
            <p class="title flex">{{ item.orgName + '-' + item.positionType }}</p>
          </div>
          <div class="arrow-body"><i class="arrow"></i></div>      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from 'vux/components/spinner/'
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
      Spinner
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
      searchListClick: function (item) {
        this.$dispatch('list-click', item)
        this.isCancel = true
        this.isFixed = false
      }
    },
    data () {
      return {
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
      }
    }
  }
</script>

<style>
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
  
  .search_show {
    margin-top: 0;
    overflow-y: auto;
    height: 100%;
  }
  
  .vux-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
</style>
<style scoped>
  @import '../../static/css/public.css';
  .title {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
  }
</style>