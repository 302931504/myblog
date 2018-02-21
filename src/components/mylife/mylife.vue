<template>
  <transition name="slide">
    <div class="mylifeWrapper">
      <div class="listWrapper">
        <div class="head" v-show="!routerId">
          <h1>一个好人</h1>
          <p>这个世界好人很多，如果你找不到，就成为一个。</p>
        </div>
        <no-content :info="noneInfo"></no-content>
        <walking-list :blogList="walkingBlogs"
                      @selectBlog="selectBlog"></walking-list>             
      </div>
      <div class="pageBtn" v-show="!routerId && walkingBlogs.length > 0">
        <page-btn :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
      </div> 
    </div>
  </transition>
</template>

<script>
  import WalkingList from '../../base/walking-list/walking-list';
  import PageBtn from '../../base/page-btn/page-btn';
  import NoContent from '../../base/no-content/no-content';
  import {getWalkingBlog, readWalkingBlog} from '../../api/walking-blog';
  import {initPageMixin} from '../../common/js/mixin';

  export default {
    mixins: [initPageMixin],
    data () {
      return {
        walkingBlogs: [],
        noneInfo: ''
      };
    },
    computed: {
      routerId () {
        return this.$route.params.id;
      }
    },
    created () {
      this._getWalkingBlog();
    },
    methods: {
      selectBlog (id) {
        readWalkingBlog(id).then(res => {
          if (res.status === 0) {
            this.$router.push({path: `/mylife/${id}`});
          }
        });
      },
      _getWalkingBlog () {
        const item = {
          page: this.currentPage,
          limit: this.limit
        };
        getWalkingBlog(item).then(res => { 
          if (res.status === 0) {
            this.walkingBlogs = res.data;
            this.initPage(this.walkingBlogs.length);
          } else {
            this.noneInfo = res.info;
          }
        });
      }
    },
    components: {
      WalkingList,
      PageBtn,
      NoContent
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mylifeWrapper{
    box-sizing: border-box;
    padding-bottom: 20px;
    .listWrapper{
      width: 853px;
      background: #fff;
      margin: 0 auto;
      margin-top: 50px;
      .head{
        text-align: center;
        background: url('./header.jpg') no-repeat;
        background-size: cover;
        height: 380px;
        color: #fff;
        padding-top: 133px;
        box-sizing: border-box;
        h1{
          font-size: 30px;
          font-weight: 200;
        }
        p{
          font-size: 15px;
          margin-top: 25px;
        }
      }
    }
    .pageBtn{
      width: 853px;
      margin: 0 auto;
      margin-top: 26px;
    }
    .detail{
      width: 853px;
      box-sizing: border-box;
      margin: 0 auto;
    }
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.6s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0); 
  }
</style>