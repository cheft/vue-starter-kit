<template>
  <flexbox>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/12years.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/totoro.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/watchmen.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/happiness.jpg">
      </div>
    </flexbox-item>
  </flexbox>
  <flexbox>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/adaptation.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/sherlock.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/hemingway.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/1942.jpg">
      </div>
    </flexbox-item>
  </flexbox>
    <flexbox>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/12years.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/totoro.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/watchmen.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/happiness.jpg">
      </div>
    </flexbox-item>
  </flexbox>
  <flexbox>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/adaptation.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/sherlock.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/hemingway.jpg">
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <img src="http://www.semantic-ui-cn.com/images/movies/1942.jpg">
      </div>
    </flexbox-item>
  </flexbox>
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux'

  export default {
    components: {
      Flexbox,
      FlexboxItem
    }
  }
</script>

<style>
  .flex-demo {
    margin: 2px;
  }

  .flex-demo img {
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    /*-webkit-background-clip: padding-box;*/
  }
</style>
