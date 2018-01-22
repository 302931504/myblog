<template>
  <div class="draftWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="options" @searchKeyBlog="searchBlog" placeholder="请输入关键字" @clickOption="clickClassify"></search-box>
    <blog-list v-show="blogs.length > 0" :blogs="blogs" :type="type" @edit="editBlog" @publish="publish" @delete="deleteBlog" @select="witchArticle"></blog-list>
    <page-btn v-show="draftCount >= 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
    <no-content v-show="blogs.length === 0"></no-content>
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
  import {initPageMixin, blogMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {publishBlog, deletBlog, getOneBlog} from '../../api/draft'; 
  import {getBlogByPage, getClassifyBlog, getKeyBlog} from '../../api/blog';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    mixins: [initPageMixin, blogMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        blogs: [],
        type: 0
      };
    },
    computed: {
      ...mapGetters([
        'draftCount'
      ])
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
      this.initPage(this.draftCount);
      this._getClassify();
    },
    methods: {
      witchArticle (id) {
        getOneBlog(id).then(res => {
          if (!res.status) {
            this.setEditblog(res.data[0]);
            this.$router.push({path: `/admin/draft/${id}`});
          }
        });
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
              this.showAttention(res.info, true);
              this.showFlag = false;
            }
          });
        }
        if (this.status === 0) {
          publishBlog(this.id).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.showFlag = false;
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
          console.log(res);
          if (res.status === 0) {
            this.blogs = res.data;
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
            this.showBtn = false;
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
            this.showBtn = false;
          }
        });
      },
      ...mapMutations({
        setEditblog: 'SET_EDITBLOG'
      })
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .draftWrapper{
    position: relative;
  }
</style>