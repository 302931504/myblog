<template>
  <div class="blogWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="options" @searchKeyBlog="searchBlog" placeholder="请输入关键字" @clickOption="clickClassify"></search-box>
    <blog-list v-show="blogs.length > 0" :blogs="blogs" :type="type"  @edit="editBlog" @moveDraft="moveDraft" @select="witchArticle"></blog-list>
    <page-btn v-show="blogCount > 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
    <no-content v-show="blogs.length === 0" :info="noneInfo"></no-content>
    <caution :showFlag="showFlag" :text="text" @cancel="cancel" @sure="sure"></caution>
    <router-view></router-view>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import PageBtn from '../../base/page-btn/page-btn';
  import NoContent from '../../admin/no-content/no-content';
  import Attention from '../../base/attention/attention';
  import Caution from '../../admin/caution/caution';
  import {getBlogByPage, getKeyBlog, getClassifyBlog, draftBlog, getCount} from '../../api/blog';
  import {getOneBlog} from '../../api/draft'; 
  import {initPageMixin, blogMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [initPageMixin, blogMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        blogs: [],
        blogCount: 0,
        type: 1,
        noneInfo: '' 
      };
    },
    computed: {
    },
    created () {
      this.getByPage();
      this._getClassify();
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
      witchArticle (id) {
        getOneBlog(id).then(res => {
          if (!res.status) {
            this.setEditblog(res.data[0]);
            this.$router.push({path: `/admin/article/${id}`});
          }
        });
      },
      getByPage () {
        const item = {
          page: this.currentPage,
          isShow: 1
        };
        getBlogByPage(item).then((res) => {
          if (res.status === 0) {
            this.blogs = res.data;
          } else {
            this.noneInfo = res.info;
          }
        }).catch(err => err);
      },
      searchBlog (keyWord) {
        const item = {
          isShow: 1,
          keyWord: keyWord
        };
        getKeyBlog(item).then(res => {
          if (res.status === 0) {
            this.blogs = res.data;
            this.showBtn = false;
          } else {
            this.noneInfo = res.info;
          }
        });
      },
      moveDraft (id) {
        this.showFlag = true;
        this.text = '是否将此文章移入草稿箱？';
        this.id = id;
      },
      sure () {
        draftBlog(this.id).then(res => {
          if (res.status === 0) {
            this.routerGo();
            this.showAttention(res.info, true);
            this.showFlag = false;
          } else {
            this.showAttention(res.info, false);
          }
        });
      },
      clickClassify (text) {
        const item = {
          text: text,
          isShow: 1
        };
        getClassifyBlog(item).then(res => {
          if (res.status === 0) {
            this.blogs = res.data;
            this.showBtn = false;
          }
        });
      },
      ...mapMutations({
        setEditblog: 'SET_EDITBLOG'
      })
    },
    components: {
      SearchBox,
      BlogList,
      PageBtn,
      NoContent,
      Attention,
      Caution
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .blogWrapper{
    color: #000;
    position: relative;
  }
</style>