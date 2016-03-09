<template>
   <div class="ui card">
    <div class="image">
      <img :src="avatar_url">
    </div>
    <div class="content">
      <a class="header">{{login}}</a>
      <div class="meta">
        <span class="date">{{created_at.substr(0, 10)}}加入</span>
      </div>
      <div class="description">
        <span>位置：{{location}}</span>
      </div>
      <div class="description">
        <span>邮箱：{{email}}</span>
      </div>
    </div>
    <div class="extra content">
      <a>
        <i class="user icon"></i>
        {{followers}} 跟随着
      </a>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      avatar_url: '',
      login: '',
      created_at: '',
      followers: '',
      email: '',
      location: ''
    }
  },

  ready: function () {
    this.$http({url: 'https://api.github.com/users/cheft', method: 'GET'}).then(function (response) {
      console.log(response)
      this.$set('avatar_url', response.data.avatar_url)
      this.$set('login', response.data.login)
      this.$set('created_at', response.data.created_at)
      this.$set('followers', response.data.followers)
      this.$set('email', response.data.email)
      this.$set('location', response.data.location)
    }, function (response) {
      console.log(response)
    })
  }
}
</script>

<style scoped>
  .card {
    margin: auto;
  }

  .image img {
    width: 290px !important;
    height: 290px !important;
  }
</style>

