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
        <div class="loadMore" v-show="!routerId && walkingBlogs.length > 15" @click="readMore">
          <p>加载更多</p> 
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import WalkingList from '../../base/walking-list/walking-list';
  import NoContent from '../../base/no-content/no-content';
  import {getWalkingBlog, readWalkingBlog, getWCount} from '../../api/walking-blog';

  export default {
    data () {
      return {
        walkingBlogs: [],
        noneInfo: '',
        limit: 15,
        currentPage: 1,
        wBlogLength: 0
      };
    },
    computed: {
      routerId () {
        return this.$route.params.id;
      }
    },
    created () {
      this._getWalkingBlog();
      this.getCount();
    },
    methods: {
      getCount () {
        getWCount().then(res => {
          this.wBlogLength = res.data;
        });
      },
      selectBlog (id) {
        readWalkingBlog(id).then(res => {
          if (res.status === 0) {
            this.$router.push({path: `/mylife/${id}`});
          }
        });
      },
      _getWalkingBlog () {
        getWalkingBlog(this.limit).then(res => { 
          if (res.status === 0) {
            this.walkingBlogs = res.data;
          } else {
            this.noneInfo = res.info;
          }
        });
      },
      readMore () {
        this.currentPage += 1;
        this.limit = this.limit * this.currentPage;
        this._getWalkingBlog();
      }
    },
    components: {
      WalkingList,
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
      padding-bottom: 60px;
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
    .loadMore{
      text-align: center;
      margin-top: 10px;
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