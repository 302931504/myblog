<template>
  <h1 class="text">{{info}}</h1>
</template>

<script>
  export default {
    props: {
      info: {
        type: String,
        default: '相关文章为空'
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .text{
    text-align: center;
    line-height: 200px;
    color: #000;
  }
</style>