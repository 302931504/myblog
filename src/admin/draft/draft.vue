<template>
  <div class="draftWrapper">
    <search-box :options="options" @clickOption="clickOption"></search-box>
    <blog-list></blog-list>
    <router-view/>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';

  export default {
    data () {
      return {
        options: [
          {text: '新增文章', name: 'editBlog'},
          {text: '现在发布', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ]
      };
    },
    methods: {
      clickOption (name) {
        if (name === 'editBlog') {
          this.$router.push({path: `/admin/mainBackStage/${name}`});
        }
      }
    },
    components: {
      SearchBox,
      BlogList
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>