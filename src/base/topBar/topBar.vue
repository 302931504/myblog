<template>
  <div class="topBarWrapper">
    <div class="logo">
      <img src="./logo.png" alt="">
    </div>
    <div class="nav">
      <ul>
        <router-link tag="li">首页</router-link>
        <router-link tag="li">行博</router-link>
        <router-link tag="li">我的书单</router-link>
        <router-link tag="li">归档</router-link>
        <router-link tag="li">留言板</router-link>
        <router-link tag="li">关于</router-link>
      </ul>
    </div>
  </div>
</template>
  
<script>
  export default {

  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .topBarWrapper{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    padding: 6px 2px;
    background: #3b4348;
    .logo{
      img{
        width: 250px;
      }
    }
  }
</style>