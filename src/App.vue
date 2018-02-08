<template>
  <div id="app">
    <top-header v-if="!manager.username && currentPath !== '/login'"></top-header>
    <div class="routerView">
      <router-view/>
    </div>
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

<style scoped lang="less" rel="stylesheet/less">
#app {
  width: 100%;
  height: 100%;
  background-color: #30373d;
  color: #606669;
  overflow: hidden;
  overflow-y: auto;
}
</style>
