<template>
  <div class="draftWrapper">
    <search-box :options="options"></search-box>
    <blog-list :blogs="blogs" @edit="editBlog"></blog-list>
    <page-btn :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
  </div>
</template>
 
<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import PageBtn from '../../base/page-btn/page-btn';
  import {initPageMixin} from '../../common/js/mixin';
  import {getDraftByPage, getOneBlog} from '../../api/draft'; 
  import {mapMutations, mapActions, mapGetters} from 'vuex';

  export default {
    mixins: [initPageMixin],
    data () {
      return {
        options: [
          {text: '现在发布', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ],
        blogs: []
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
      PageBtn
    },
    created () {
      this.getByPage();
      this.initPage(this.draftCount);
    },
    methods: {
      editBlog (id) {
        getOneBlog(id).then(res => {
          if (res.status === 0) {
            this.setEditBlog(res.data[0]);
            const nav = {
              text: res.data[0].blog_title,
              name: 'editBlog'
            };
            this.pushNav(nav);
            this.$router.push({path: '/admin/mainBackStage/editBlog'});
          }
        }); 
      },
      getByPage () {
        getDraftByPage(this.currentPage).then((res) => {
          console.log(res);
          if (res.status === 0) {
            this.blogs = res.data;
          }
        }).catch(err => err); 
      },
      ...mapMutations({
        setEditBlog: 'SET_EDITBLOG'
      }),
      ...mapActions([
        'pushNav'
      ])
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>