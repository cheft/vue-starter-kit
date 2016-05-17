<template>
  <router-view transition="fade" transition-mode="out-in"></router-view>
</template>

<style>
@import '~vux/vux.css';
@import 'http://at.alicdn.com/t/font_1463486486_2607765.css';
/*@import './transitions/pt-page.css';*/
.fade-transition {
  transition: opacity .2s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>