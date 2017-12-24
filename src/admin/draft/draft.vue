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
  import {getDraftByPage} from '../../api/draft'; 
  import {mapMutations, mapActions, mapGetters} from 'vuex';

  export default {
    data () {
      return {
        options: [
          {text: '现在发布', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ],
        blogs: [],
        limit: 10,
        pages: [],
        currentPage: 1
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
      this._getDraftByPage();
      this.initPage();
    },
    methods: {
      editBlog (item) {
        this.$router.push({path: '/admin/mainBackStage/editBlog'});
        this.setEditBlog(item);
        const nav = {
          text: item.title,
          name: 'editBlog'
        };
        this.pushNav(nav);
      },
      initPage () {
        let pageCount = Math.ceil(this.draftCount / this.limit);
        for (let i = 0; i < pageCount; i++) {
          this.pages.push({page: i + 1});
        }
        console.log(this.pages);
      },
      pre () {
        this.currentPage -= 1;
        this._getDraftByPage();
      },
      next () {
        this.currentPage += 1;
        this._getDraftByPage();
      },
      clickPage (page) {
        this.currentPage = page;
        this._getDraftByPage();
      },
      _getDraftByPage () {
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