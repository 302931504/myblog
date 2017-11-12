<template>
  <div class="optionListWrapper">
    <ul>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      options: []
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .optionListWrapper{
    color: #000;
    min-width: 150px;
    padding: 5px 0;
    border: 1px solid #d2d2d2;
    box-shadow: 0 2px 4px rgba(0,0,0,.12);
    border: 1px solid #d2d2d2;
    background-color: #fff;
    z-index: 100;
    border-radius: 2px;
    white-space: nowrap;
    li{
      height: 36px;
      line-height: 36px;
    }
  }
</style>