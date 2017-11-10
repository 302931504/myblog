<template>
  <div class="mainBackWrapper">
    <navigation-bar></navigation-bar>
    <blog></blog>
  </div>
</template>

<script>
  import NavigationBar from '../navigationBar/navigationBar';
  import Blog from '../blog/blog';

  export default {
    components: {
      NavigationBar,
      Blog
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mainBackWrapper{
  }
</style>