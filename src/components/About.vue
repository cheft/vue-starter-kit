<template>
  <div class="page">
  <h1>{{login}} <img :src="avatar_url"></h1>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      avatar_url: '',
      login: ''
    }
  },

  ready: function () {
    this.$http({url: 'https://api.github.com/users/cheft', method: 'GET'}).then(function (response) {
      console.log(response)
      this.$set('avatar_url', response.data.avatar_url)
      this.$set('login', response.data.login)
    }, function (response) {
      console.log(response)
    })
  }
}
</script>

<style scoped>
  .page {
    background: #37495F;
  }

  img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }
</style>

