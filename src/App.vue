<template>
  <router-view transition="fade" transition-mode="out-in"></router-view>
</template>

<script>
  import './transitions/PtPage'
  import Navigator from './components/Navigator'

  export default {
    components: {
      Navigator
    }
  }
</script>

<style>
@import '~vux/vux.css';
/*@import './transitions/pt-page.css';*/

.fade-transition {
  transition: opacity .2s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>