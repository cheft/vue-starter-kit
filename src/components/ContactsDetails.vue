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
        <blur :blur-amount=50 :url="url">
          <p class="center">
            <img :src="url">
              <br/>
            <span>{{ items.personName }}</span>
          </p>
        </blur>
        <div class="cell-info">
          <div class="box-middel cell">
            <p class="label">部门</p>
            <p class="content flex">{{ items.orgName + ' - ' + items.positionType }}</p>
          </div>
          <div class="box-middel cell">
            <p class="label">手机</p>
            <p class="content flex"><a :href="'tel:' + items.mobile">{{ items.mobile }}</a></p>
          </div>
          <div class="box-middel cell">
            <p class="label">座机</p>
            <p class="content flex"><a :href="'tel:' + items.cell">{{ items.cell }}</a></p>
          </div>
          <div class="box-middel cell">
            <p class="label">微信</p>
            <p class="content flex">{{ items.wexin }}</p>
          </div>
          <div class="box-middel cell">
            <p class="label">邮箱</p>
            <p class="content flex">{{ items.email }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Config from '../config'
  import Blur from 'vux/components/blur'
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
      Blur,
      Spinner,
      Icon
    },
    data () {
      return {
        isLoading: true,
        noneData: true,
        items: {},
        tipInfo: '加载中...',
        url: 'static/img/nnn.jpg'
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
  
  .cell {
    margin-left: 10px;
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid #ececec;
  }
  
  .cell:last-child {
    border: none;
  }
  
  .label {
    font-size: 14px;
    color: #999;
    line-height: 1.5;
  }
  
  .content {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    text-align: right;
  }
  
  .content a {
    color: #f60;
  }
</style>