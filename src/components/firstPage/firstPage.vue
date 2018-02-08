<template>
  <div class="firstPage">
    <div class="articleList">
      <article-list></article-list>
    </div>
    <div class="aboutNav">
      <about-nav></about-nav>
    </div>
  </div>
</template>

<script>
  import ArticleList from '../articleList/articleList';
  import AboutNav from '../aboutNav/aboutNav';

  export default {
    components: {
      ArticleList,
      AboutNav
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .firstPage{
    padding: 0 20px;
    zoom: 1;
    .articleList{
      float: left;
    }
    .aboutNav{
      float: right;
    }
    &:after{
      content: "\0020";
      display: block;
      height: 0;
      clear: both;
    }
  }
</style>