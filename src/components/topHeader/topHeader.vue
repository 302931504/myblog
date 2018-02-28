<template>
  <div class="topHeader">
    <nav class="navList">
      <div class="list">
        <ul class="nav">
          <router-link tag="li" class="option" to="/?page=1"><span>首页</span></router-link>
          <router-link tag="li" class="option" to="/mylife"><span>行博</span></router-link>
          <router-link tag="li" class="option" to="/archives"><span>归档</span></router-link>
          <router-link tag="li" class="option" to="/board"><span>留言板</span></router-link>
          <router-link tag="li" class="option" to="/about"><span class="about">关于</span></router-link>
        </ul>
      </div>
      <div class="addbtn">
        <span @click="subMe">订阅我</span>
        <span>算法分析</span>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    methods: {
      subMe () {
        this.$emit('subMe');
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .topHeader{
    width: 100%;
    color: #aeb0b1;
    padding: 15px 20px;
    box-sizing: border-box;
    background: #262b2f;
    font-size: 14px;
    .navList{
      zoom: 1;
      max-width: 1000px;
      margin: 0 auto;
      .list{
        float: left;
        .nav{
          // padding-right: 23px;
          zoom: 1;
          li{
            float: left;
            cursor: pointer;
            // padding: 15px 0;
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
      .addbtn{
        float: right;
        span{
          display: inline-block;
          padding: 0 15px;
          cursor: pointer;
          &:hover{
            color: #27ae60;
          }
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