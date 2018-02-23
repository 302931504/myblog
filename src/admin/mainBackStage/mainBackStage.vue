<template>
  <div class="mainBackWrapper">
    <div class="topBarWrapper">
      <top-bar @openNav="toggleNavBar" @lock="lockScreen"></top-bar>
    </div>
    <div class="nav" ref="navBar">
      <navigation-bar @clickNav="clickNav" :currentName="currentName"></navigation-bar>
    </div>
    <div class="content" ref="content" style="marginLeft: 200px">
      <content-bar :navList="navList" @clickNav="clickNav" :currentName="currentName" @closeNav="close"></content-bar>
        <div class="routerViewWrapper" ref="viewScroll">
          <div class="routerView">
            <transition name="upglide">
              <router-view/>
            </transition>
          </div>
        </div>
    </div>
    <div class="author" ref="author" style="left: 200px">
      <author></author>
    </div>
    <lock-screen class="screen" v-show="lock" :showFlag="lock" @clear="clear"></lock-screen>
  </div>
</template>

<script>
  import NavigationBar from '../navigationBar/navigationBar';
  import TopBar from '../topBar/topBar';
  import ContentBar from '../contentBar/contentBar';
  import Author from '../author/author';
  import LockScreen from '../../base/lock-screen/lock-screen';
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  const NAVBAR_WIDTH = 200;

  export default {
    data () {
      return {
        lock: false
      }; 
    },
    computed: {
      ...mapGetters([
        'navList',
        'currentName',
        'manager'
        ])
    },
    created () {
      if (!this.manager.username) {
        this.$router.push({path: '/login'});
      }
    },
    methods: {
      toggleNavBar () {
        const left = this.$refs.navBar.style.left;
        if (left === '') {
          this.$refs.navBar.style.left = `-${NAVBAR_WIDTH}px`;
          this.$refs.content.style.marginLeft = '';
        } else {
          this.$refs.navBar.style.left = '';
          this.$refs.content.style.marginLeft = `${NAVBAR_WIDTH}px`;
        }
      },
      clickNav (item) {
        this.$router.push({path: `/admin/${item.name}`});
        this.pushNav(item);
        this.setCurrentName(item.name);
      },
      close (name) {
        this.deleteNav(name);
        this.setCurrentName(this.navList[this.navList.length - 1].name);
        this.$router.push({path: `/admin/${this.currentName}`});
        // this.$router.go(-1);
      },
      lockScreen () {
        this.lock = true;
      },
      clear (pass) {
        if (pass === '123456') {
          this.lock = false;
        }
      },
      ...mapActions([
        'pushNav',
        'deleteNav'
      ]),
      ...mapMutations({
        setCurrentName: 'SET_CURRENTNAME'
      })
    },
    components: {
      NavigationBar,
      TopBar,
      ContentBar,
      Author,
      LockScreen
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mainBackWrapper{
    position: relative;
    height: 100%;
    color: #fff;
    background: #fff;
    .screen{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
    }
    .topBarWrapper{
      position: fixed;
      top: 0;
      left: 0;
    }
    .nav{
      position: fixed;
      top: 60px;
      left: 0;
      width: 200px;
      height: 100%;
      transition: all .6s;
      z-index: 999;
      border-right: 2px solid #1AA094;
    }
    .content{
      margin-top: 60px;
      height: 100%;
      border-top: 5px solid #1AA094;
      transition: all .6s;
      .routerViewWrapper{
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
        .routerView{
          margin: 10px 10px 0;
        }
      }
    }
  }
  .upglide-enter-active, .upglide-leave-active{
    opacity: 1;
    transition: all .4s linear;
  }
  .upglide-enter, .upglide-leave-to{
    opacity: 0;
    transform: translate3d(0, -100%, 0);  
  }
</style>