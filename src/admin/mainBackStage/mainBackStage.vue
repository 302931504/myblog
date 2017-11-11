<template>
  <div class="mainBackWrapper">
    <div class="topBarWrapper">
      <top-bar @openNav="toggleNavBar"></top-bar>
    </div>
    <div class="nav" ref="navBar">
      <navigation-bar @clickNav="clickNav" :currentName="currentName"></navigation-bar>
    </div>
    <div class="content" ref="content" style="marginLeft: 200px">
      <content-bar :navList="navList" @clickNav="clickNav" :currentName="currentName" @closeNav="close"></content-bar>
      <div class="routerViewWrapper">
        <div class="routerView">
          <router-view/>
        </div>
      </div>
      <author></author>
    </div>
  </div>
</template>

<script>
  import NavigationBar from '../navigationBar/navigationBar';
  import TopBar from '../topBar/topBar';
  import ContentBar from '../contentBar/contentBar';
  import Author from '../author/author';
  import {mapGetters, mapActions} from 'vuex';

  const NAVBAR_WIDTH = 200;

  export default {
    data () {
      return {
        currentName: 'home',
        pastName: []
      };
    },
    computed: {
      ...mapGetters([
        'navList'
        ])
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
        this.$router.push({path: `/admin/mainBackStage/${item.name}`});
        this.pushNav(item);
        this.currentName = item.name;
      },
      close (name) {
        this.deleteNav(name);
        this.$router.go(-1);
        this.currentName = this.navList[this.navList.length - 1].name;
      },
      ...mapActions([
        'pushNav',
        'deleteNav'
      ])
    },
    components: {
      NavigationBar,
      TopBar,
      ContentBar,
      Author
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mainBackWrapper{
    height: 100%;
    .nav{
      position: fixed;
      top: 60px;
      left: 0;
      width: 200px;
      height: 100%;
      transition: all .6s;
    }
    .content{
      height: 100%;
      margin-top: 60px;
      border-left: 2px solid #1AA094;
      border-top: 5px solid #1AA094;
      transition: all .6s;
      .routerViewWrapper{
        height: 500px;
        overflow: auto;
        .routerView{
          margin: 10px 10px 0;
        }
      }
    }
  }
</style>