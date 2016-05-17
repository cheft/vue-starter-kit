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
        <div class="box-align portrait-body">
          <div>
            <img :src="url" class="portrait">
            <p>{{ items.personName }}</p>
          </div>
        </div>
        <div class="cell-info">
          <div class="box-middel cell">
            <p class="label">部门</p>
            <p class="content flex">{{ items.orgName + ' - ' + items.positionType }}</p>
          </div>
          <div class="box-middel cell">
            <p class="label">手机</p>
            <p class="content flex"><a :href="'tel:' + items.mobile">{{ items.mobile }}</a></p>
          </div>
          <div class="box-middel cell" v-if="items.cell">
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
        <div class="footer-body box-middel">
          <a class="flex" :href="'tel:' + items.mobile"><i class="tel"></i>打电话</a>
          <a class="flex" :href="'sms:' + items.mobile"><i class="msm"></i>发短信</a>
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
        url: 'static/img/cheft.png'
      }
    }
  }
</script>

<style scoped>
  @import '../../static/css/public.css';
  .portrait-body {
    height: 200px;
    background: -moz-linear-gradient(top, #fbc286 0%, #ff992d 50%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fbc286), color-stop(50%,#ff992d));
    background: -webkit-linear-gradient(top, #fbc286 0%,#ff992d 50%);
    background: linear-gradient(to bottom, #fbc286 0%,#ff992d 50%);
  }
  
  .portrait-body p {
    font-size: 16px;
    color: #fff;
    line-height: 1.5;
    text-align: center;
  }
  
  .portrait {
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
    color: #02bb00;
  }
  
  .footer-body {
    position: fixed;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 800;
  }
  
  .footer-body a {
    display: block;
    padding: 10px 0;
    font-size: 14px;
    color: #fff;
    line-height: 1.5;
    text-align: center;
    background-color: #ff992d;
  }
  
  .footer-body a i {
    display: inline-block;
    width: 2em;
    height: 2em;
    vertical-align: middle;
  }
  
  .footer-body a i.tel {
    background: url(../../static/img/tel.png) 50% 50% no-repeat;
    background-size: 100% auto;
  }
  
  .footer-body a i.msm {
    background: url(../../static/img/msm.png) 50% 50% no-repeat;
    background-size: 100% auto;
  }
</style>