<template>
  <div class="topHeader">
    <div class="logo">
      <img src="../../common/image/logo.png" alt="">
    </div>
  <div class="list">
    <ul class="nav">
      <router-link tag="li" class="option" to="/">首页</router-link>
      <router-link tag="li" class="option" to="/mylife">行博</router-link>
      <router-link tag="li" class="option" to="/archives">归档</router-link>
      <router-link tag="li" class="option" to="/board">留言板</router-link>
      <router-link tag="li" class="option" to="/about">关于</router-link>
    </ul>
    <div class="searchBar">
      <input type="text" name="" placeholder="搜索标签、文章">
    </div>
  </div>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .topHeader{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    .logo{
      img{
        width: 150px;
        vertical-align: middle;
      }
    }
    .list{
      line-height: 60px;
      zoom: 1;
      .nav{
        float: left;
        padding-right: 23px;
        zoom: 1;
        li{
          float: left;
          padding: 0 23px;
          cursor: pointer;
          transition: all 0.3s ease-out;
          &:hover{
            background: rgba(255, 255, 255, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
        }
        &:after{
          content: "\0020";
          display: block;
          height: 0;
          clear: both;
        }
      }
      .searchBar{
        float: right;
        input{
          width: 226px;
          height: 28px;
          font-size: 12px;
          color: #fff;
          border-radius: 30px;
          border: 1px solid #fff;
          padding-left: 10px;
          outline: none;
          background: transparent;
        }
      }
      &:after{
        content: "\0020";
        display: block;
        height: 0;
        clear: both;
      }
    }
    
  }
</style>