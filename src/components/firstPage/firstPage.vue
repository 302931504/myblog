<template>
  <div class="firstPage">
    <div class="blogName">
      <img src="../../common/image/logo.png" alt="一个好人的个人博客">
      <p>这个世界的好人很多，如果你找不到，就自己做一个.</p>
    </div>
    <div class="articleList">
      <article-list :blogList="blogList" @selectArticle="selectArticle"></article-list>
      <no-content :info="noneInfo" style="color: #fff"></no-content>
    </div>
    <div class="pageBtn">
      <page-btn :pageCount="pageCount" :currentPage="routePage" @next="next" @pre="pre"></page-btn>
    </div>
  </div>
</template>

<script>
  import ArticleList from '../articleList/articleList';
  import PageBtn from '../../base/page-btn/page-btn';
  import Subscribe from '../../base/subscribe/subscribe';
  import Bottom from '../bottom/bottom';
  import NoContent from '../../base/no-content/no-content';
  import {getOnlineBlog, getCount, readArticle} from '../../api/blog'; 
  import {initPageMixin} from '../../common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [initPageMixin],
    data () {
      return {
        blogList: [],
        limit: 5,
        blogCount: 0,
        noneInfo: ''
      };
    },
    computed: {
      routePage () {
        let page = 1;
        if (this.$route.query.page) {
          page = parseInt(this.$route.query.page);
        } 
        return page;
      }
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
        let page = 1;
        if (this.$route.query.page) {
          page = this.$route.query.page;
        }
        getOnlineBlog(page).then(res => {
          if (res.status === 0) {
            this.blogList = res.data;
          } else {
            this.noneInfo = res.info;
          }
        });
      },
      next () {
        if (this.routePage < this.pageCount) {
          let page = this.routePage + 1;
          this.$router.push({path: '/', query: {page: page}});
        }
      },
      pre () {
        if (this.routePage > 1) {
          let page = this.routePage - 1;
          this.$router.push({path: '/', query: {page: page}});
        }
      },
      selectArticle (id) {
        readArticle(id).then(res => {
          if (res.status === 0) {
            this.$router.push({path: `/article/${id}`});
          }
        });
      },
      ...mapMutations({
      })
    },
    watch: {
      '$route' (to, from) {
        this.getByPage(to.query.page);
      }
    },
    components: {
      ArticleList,
      PageBtn,
      Subscribe,
      Bottom,
      NoContent
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .firstPage{
    width: 100%;
    zoom: 1;
    box-sizing: border-box;
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
      margin-bottom: 20px;
    }
  }
</style>