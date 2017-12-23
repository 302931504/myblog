<template>
  <ul class="pageBtn">
    <li>上一页</li>
    <li>1</li>
    <li class="active">2</li>
    <li>3</li>
    <li>下一页</li>
  </ul>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .pageBtn{
    display: flex;
    margin: 20px 0 20px 0;
    li{
      padding: 0 15px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      border: 1px solid #e2e2e2;
      margin-left: -1px;
      &.active{
        color: #fff;
        background: #009688;
      }
    }
  }
</style>