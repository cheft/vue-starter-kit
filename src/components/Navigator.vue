<template>
  <div class="ui menu">
    <a class="active item" v-link="{ path: '/' }">
      <i class="home icon"></i> 主页
    </a>
    <a class="item" v-link="{ path: '/about' }">
      <i class="mail icon"></i> 关于
    </a>
    <div class="right menu">
      <div class="item">
        <div class="ui transparent icon input">
          <input type="text" placeholder="搜索...">
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      msg: 'Hello VUE!'
    }
  }
}
</script>
