<template>
  <navigator></navigator>
  <router-view></router-view>
</template>

<script>
  import Navigator from './components/Navigator'

  export default {
    components: {
      Navigator
    }
  }
</script>