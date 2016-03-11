<template>
  <navigator v-ref:nav></navigator>
  <router-view transition="fade" transition-mode="out-in"></router-view>
</template>

<script>
  import Navigator from './components/Navigator'

  export default {
    components: {
      Navigator
    }
  }
</script>

<style>
.fade-transition {
  transition: opacity .3s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>