<template>
  <div class="topHeader">
  <div class="list">
    <ul class="nav">
      <router-link tag="li" class="option" to="/"><span>首页</span></router-link>
      <router-link tag="li" class="option" to="/mylife"><span>行博</span></router-link>
      <router-link tag="li" class="option" to="/archives"><span>归档</span></router-link>
      <router-link tag="li" class="option" to="/board"><span>留言板</span></router-link>
      <router-link tag="li" class="option" to="/about"><span class="about">关于</span></router-link>
    </ul>
  </div>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .topHeader{
    width: 100%;
    color: #aeb0b1;
    padding: 0 20px;
    box-sizing: border-box;
    background: #262b2f;
    .list{
      .nav{
        padding-right: 23px;
        zoom: 1;
        li{
          float: left;
          cursor: pointer;
          padding: 15px 0;
          transition: all 0.3s ease-out;
          span{
            display: block;
            padding: 0 15px;
            border-right: 2px solid #30373d;
          }
          .about{
            border-right: none;
          }
          &:hover{
            color: #27ae60;
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
  }
</style>