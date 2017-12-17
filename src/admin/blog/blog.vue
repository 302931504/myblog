<template>
  <div class="blogWrapper">
    <search-box :options="options" placeholder="请输入关键字"></search-box>
    <blog-list></blog-list>
    <page-btn></page-btn>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import BlogList from '../blogList/blogList';
  import PageBtn from '../../base/page-btn/page-btn';

  export default {
    data () {
      return {
        options: [
          {text: '置顶文章', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ]
      };
    },
    methods: {
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