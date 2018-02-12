<template>
  <div id="app">
    <top-header v-if="!manager.username && currentPath !== '/login'"></top-header>
    <div class="aboutNav">
      <about-nav ref="aboutNav"></about-nav>
    </div>
    <div class="routerView">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import TopHeader from './components/topHeader/topHeader';
  import AboutNav from './components/aboutNav/aboutNav';
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
    created () {
      setTimeout(() => {
        this.showAbout();
      }, 3000);
    },
    methods: {
      showAbout () {
        this.$refs.aboutNav.toggleAbout();
      }
    },
    components: {
      TopHeader,
      AboutNav
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #30373d;
  color: #606669;
  overflow: hidden;
  overflow-y: auto;
  /* .aboutNav{
    position: fixed;
    top: 44px;
    left: 0;
  } */
}
</style>
