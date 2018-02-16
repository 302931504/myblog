<template>
  <div id="app" ref="viewScroll">
    <top-header v-if="!manager.username && currentPath !== '/login'" @subMe="subScroll"></top-header>
    <div class="aboutNav" v-if="!manager.username && currentPath !== '/login'">
      <about-nav ref="aboutNav"></about-nav>
    </div>
    <div class="routerView">
      <router-view/>
    </div>
    <div class="bottom" v-if="!manager.username && currentPath !== '/login'">
      <subscribe></subscribe>
      <bottom></bottom>
    </div>
  </div>
</template>

<script>
  import TopHeader from './components/topHeader/topHeader';
  import AboutNav from './components/aboutNav/aboutNav';
  import Subscribe from './base/subscribe/subscribe';
  import Bottom from './components/bottom/bottom';
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
        if (!this.manager.username && this.currentPath !== '/login') {
          this.$refs.aboutNav.toggleAbout();
        }
      },
      subScroll () {
        this.$refs.viewScroll.scrollTop = this.$refs.viewScroll.scrollHeight;
      }
    },
    components: {
      TopHeader,
      AboutNav,
      Subscribe,
      Bottom
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
