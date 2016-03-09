<template>
  <div class="page">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      msg: 'Home Page!'
    }
  }
}
</script>

<style>
  .page {
    height: 180px;
    line-height: 180px;
    background: #41B883;
    color: #fff;
  }
</style>