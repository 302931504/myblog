<template>
  <div id="app">
    <top-header v-if="!manager.username && currentPath !== '/login'"></top-header>
    <router-view/>
  </div>
</template>

<script>
  import TopHeader from './components/topHeader/topHeader';
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      currentPath () {
        return this.$route.path;
      },
      ...mapGetters([
        'manager'
      ])
    },
    components: {
      TopHeader
    }
  };
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  background: url('./common/image/bg.jpg') no-repeat;
  background-size: cover;
}
</style>
