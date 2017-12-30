<template>
  <div class="blogWrapper">
    <search-box :options="options" placeholder="请输入关键字"></search-box>
    <blog-list :blogs="blogs"></blog-list>
    <page-btn :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import PageBtn from '../../base/page-btn/page-btn';
  import {getOnlineBlogByPage} from '../../api/blog';
  import {initPageMixin} from '../../common/js/mixin';
  import {mapGetters} from 'vuex';

  export default {
    mixins: [initPageMixin],
    data () {
      return {
        options: [
          {text: '置顶文章', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ],
        blogs: []
      };
    },
    computed: {
      ...mapGetters([
        'onlineArticleCount'
      ])
    },
    created () {
      this.getByPage();
      this.initPage(this.onlineArticleCount);
    },
    methods: {
      getByPage () {
        getOnlineBlogByPage(this.currentPage).then((res) => {
          this.blogs = res.data;
        }).catch(err => err);
      }
    },
    components: {
      SearchBox,
      BlogList,
      PageBtn
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .blogWrapper{
    color: #000;
  }
</style>