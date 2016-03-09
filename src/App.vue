<template>
  <navigator></navigator>
  <router-view></router-view>
</template>

<script>
var Navigator = require('./components/Navigator')

module.exports = {
  components: {
    navigator: Navigator
  }
}

</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
