<template>
  <div class="draftWrapper">
    <search-box :options="options"></search-box>
    <blog-list :blogs="blogs" @edit="editBlog"></blog-list>
  </div>
</template>
 
<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import {getDraftByPage} from '../../api/draft';
  import {mapMutations, mapActions} from 'vuex';

  export default {
    data () {
      return {
        options: [
          {text: '现在发布', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ],
        blogs: []
      };
    },
    components: {
      SearchBox,
      BlogList
    },
    created () {
      this._getDraftByPage();
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
      _getDraftByPage () {
        getDraftByPage().then((res) => {
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