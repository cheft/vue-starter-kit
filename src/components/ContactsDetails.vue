<template>
  <div class="page-body">
    <div v-if="isLoading" class="loading-body">
      <p class="loading"><spinner type="ios-small"></spinner><span>{{ tipInfo }}</span></p>
    </div>
    <template v-else>
      <div v-if="noneData" class="nonedata-body">
        <p class="none-data"><icon type="warn"></icon><span>{{ tipInfo }}</span></p>
      </div>
      <div v-else class="personal-info">
        <blur :blur-amount=30 :url="url">
          <p class="center">
            <img :src="url">
              <br/>
            <span>{{ items.personName }}</span>
          </p>
        </blur>
        <div class="cell-info">
          <cell title="部门" :value="items.orgName + ' - ' + items.positionType"></cell>
          <cell title="手机" :value="items.mobile"></cell>
          <cell title="座机" :value="items.cell"></cell>
          <cell title="微信" :value="items.wexin"></cell>
          <cell title="邮箱" :value="items.email"></cell>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Config from '../config'
  import Blur from 'vux/components/blur'
  import Group from 'vux/components/group'
  import Cell from 'vux/components/cell'
  import Spinner from 'vux/components/spinner/'
  import Icon from 'vux/components/icon/'
  let urlAddress = Config.apiPrefix + 'contactsList/toPersonDetail'
  export default {
    ready () {
      let params = {
        id: this.$route.params.id
      }
      this.$http({
        url: urlAddress,
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
      Blur,
      Group,
      Cell,
      Spinner,
      Icon
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        items: {},
        tipInfo: '加载中...',
        url: 'static/img/cheft.png'
      }
    }
  }
</script>

<style scoped>
  @import '../../static/css/public.css';
  .center {
    text-align: center;
    padding-top: 30px;
    color: #fff;
    font-size: 16px;
  }
  
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
  
  .cell-info {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    overflow: hidden;
  }
  
  .weui_tabbar_item {
    color: #71D571;
    text-align: center;
    padding: 10px;
  }
  
  .iconfont label {
    margin-left: 10px;
  }
  
  .icon-search {
    position: absolute;
    top: 10px;
    left: 15px;
    color: #fff;
    font-size: 18px;
  }
  
  .icon-share {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #fff;
    font-size: 20px;
  }
  
  @media (max-height: 480px) {
    .center {
      padding-top: 20px;
    }
    .center img {
      width: 80px;
      height: 80px;
    }
    .bg_div {
      height: 150px !important;
    }
    .no_group_title {
      margin-top: 0;
    }
    .weui_cells {
      font-size: 15px;
    }
  }
</style>