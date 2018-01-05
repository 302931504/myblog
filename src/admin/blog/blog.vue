<template>
  <div class="blogWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="options" @searchKeyBlog="searchBlog" placeholder="请输入关键字" @clickOption="clickClassify"></search-box>
    <blog-list v-show="blogs.length > 0" :blogs="blogs" :type="type"  @edit="editBlog" @moveDraft="moveDraft"></blog-list>
    <page-btn v-show="onlineArticleCount >= 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
    <no-content v-show="blogs.length === 0"></no-content>
    <caution :showFlag="showFlag" :text="text" @cancel="cancel" @sure="sure"></caution>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import PageBtn from '../../base/page-btn/page-btn';
  import NoContent from '../../admin/no-content/no-content';
  import Attention from '../../base/attention/attention';
  import Caution from '../../admin/caution/caution';
  import {getOnlineBlogByPage, getKeyBlog, getClassifyBlog, draftBlog} from '../../api/blog';
  import {initPageMixin, blogMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {mapGetters} from 'vuex';

  export default {
    mixins: [initPageMixin, blogMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        blogs: [],
        type: 1 
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
      this._getClassify();
    },
    methods: {
      getByPage () {
        getOnlineBlogByPage(this.currentPage).then((res) => {
          this.blogs = res.data;
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
            this.showAttention(res.info, true);
            this.showFlag = false;
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
      }
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
  }
</style>