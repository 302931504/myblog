<template>
  <div class="firstPage">
    <div class="blogName">
      <img src="../../common/image/logo.png" alt="一个好人的个人博客">
      <p>这个世界的好人很多，如果你找不到，就自己做一个.</p>
    </div>
    <div class="articleList">
      <article-list :blogList="blogList" @selectArticle="selectArticle"></article-list>
    </div>
    <div class="pageBtn" v-show="blogCount > 5">
      <page-btn :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
    </div>
  </div>
</template>

<script>
  import ArticleList from '../articleList/articleList';
  import PageBtn from '../../base/page-btn/page-btn';
  import {getOnlineBlog, getCount} from '../../api/blog'; 
  import {initPageMixin} from '../../common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [initPageMixin],
    data () {
      return {
        blogList: [],
        currentPage: 1,
        limit: 5,
        blogCount: 0
      };
    },
    created () {
      this.getByPage();
      this.getBlogCount();
    },
    methods: {
      getBlogCount () {
        getCount(1).then(res => {
          if (res.status === 0) {
            this.blogCount = res.data;
            this.initPage(this.blogCount);
          }
        });
      },
      getByPage () {
        getOnlineBlog(this.currentPage).then(res => {
          if (res.status === 0) {
            this.blogList = res.data;
          }
        });
      },
      selectArticle (id) {
        this.$router.push({path: `/article/${id}`});
      },
      ...mapMutations({
      })
    },
    components: {
      ArticleList,
      PageBtn
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .firstPage{
    width: 100%;
    zoom: 1;
    box-sizing: border-box;
    padding-bottom: 20px;
    .blogName{
      text-align: center;
      padding-top: 60px;
      padding-bottom: 72px;
      img{
        width: 150px;
      }
      p{
        font-size: 14px;
      }
    }
    .articleList{
      width: 100%;
    }
    .pageBtn{
      width: 853px;
      margin: 0 auto;
    }
  }
</style>