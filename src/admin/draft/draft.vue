<template>
  <div class="draftWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <div class="listWrapper" v-show="!routerId">
      <search-box :options="options" @searchKeyBlog="searchBlog" placeholder="请输入关键字" @clickOption="clickClassify"></search-box>
      <blog-list v-show="blogs.length > 0" :blogs="blogs" :type="type" @edit="editBlog" @publish="publish" @delete="deleteBlog" @select="witchArticle"></blog-list>
      <div class="pageBtnWrapper" v-show="blogs.length > 0">
        <page-btn  :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
      </div>
      <no-content v-show="blogs.length === 0" :info="noneInfo"></no-content>
      <caution :showFlag="showFlag" :text="text" @cancel="cancel" @sure="sure"></caution>
    </div>
    <router-view></router-view> 
  </div>
</template>
 
<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import PageBtn from '../../base/page-btn/page-btn';
  import NoContent from '../../base/no-content/no-content';
  import Attention from '../../base/attention/attention';
  import Caution from '../../admin/caution/caution';
  import {initPageMixin, blogMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {publishBlog, deletBlog} from '../../api/draft'; 
  import {getBlogByPage, getClassifyBlog, getKeyBlog, getCount} from '../../api/blog';

  export default {
    mixins: [initPageMixin, blogMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        blogs: [],
        draftCount: 0,
        type: 0,
        noneInfo: ''
      };
    },
    computed: {
      routerId () {
        return this.$route.params.id;
      }
    },
    components: {
      SearchBox,
      BlogList,
      PageBtn,
      NoContent,
      Attention,
      Caution
    },
    created () {
      this.getByPage();
      this._getClassify();
      this.getDraftCount();
    },
    methods: {
      getDraftCount () {
        getCount(0).then(res => {
          if (res.status === 0) {
            this.draftCount = res.data;
            this.initPage(this.draftCount);
          }
        });
      },
      witchArticle (id) {
        this.$router.push({path: `/admin/draft/${id}`});
      },
      publish (id) {
        this.showFlag = true;
        this.text = '确认发布？';
        this.id = id;
        this.status = 0;
      },
      deleteBlog (id) {
        this.showFlag = true;
        this.text = '确认删除？';
        this.id = id;
        this.status = 1;
      },
      sure () {
        if (this.status === 1) {
          deletBlog(this.id).then(res => {
            if (res.status === 0) {
              this.routerGo();
              this.showAttention(res.info, true);
              this.showFlag = false;
            } else {
              this.showAttention(res.info, false);
            }
          });
        }
        if (this.status === 0) {
          publishBlog(this.id).then(res => {
            if (res.status === 0) {
              this.routerGo();
              this.showAttention(res.info, true);
              this.showFlag = false;
            } else {
              this.showAttention(res.info, false);
            }
          });
        }
      },
      getByPage () {
        const item = {
          page: this.currentPage,
          isShow: 0
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
          isShow: 0,
          keyWord: keyWord
        };
        getKeyBlog(item).then(res => {
          if (res.status === 0) {
            this.blogs = res.data;
            this.initPage(this.blogs.length);
          } else {
            this.blogs = res.data;
            this.noneInfo = res.info;
          }
        });
      },
      clickClassify (text) {
        const item = {
          text: text,
          isShow: 0
        };
        getClassifyBlog(item).then(res => {
          if (res.status === 0) {
            this.blogs = res.data;
            this.initPage(this.blogs.length);
          } else {
            this.blogs = res.data;
            this.noneInfo = res.info;
          }
        });
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .draftWrapper{
    position: relative;
  }
</style>