<template>
  <div class="aboutNav">
    <img src="./head.jpg" alt="">
    <h2>一个好人</h2>
    <p class="introduction">广东工业大学软件工程在读学生。15年开始学习前端，对架构和开发都很感兴趣。
工作时有强迫症。</p>
    <p class="github">
      <span class="icon-github"></span> <a href="https://github.com/iamgdoer" title="我的github">https://github.com/iamgdoer</a>
    </p>
    <button type="button" class="btn">
      <span class="icon-subscribe"></span> 订阅我
    </button>
    <div class="summation">
      <div class="data">
        <h3>10</h3>
        <p>博客</p>
      </div>
      <div class="data">
        <h3>20</h3>
        <p>留言</p>
      </div>
      <div class="data">
        <h3>10000</h3>
        <p>订阅</p>
      </div>
    </div>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .aboutNav{
    width: 315px;
    background: #fff;
    color: #444;
    text-align: center;
    padding: 26px 32px 70px;
    box-sizing: border-box;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    h2{
      font-size: 16px;
      margin-top: 14px;
    }
    .introduction{
      font-size: 13px;
      line-height: 19px;
      margin: 22px 0 32px;
    }
    .github{
      a{
        font-size: 12px;
      }
    }
    .btn{
      width: 170px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      background-color: #373737;
      border-radius: 30px;
      border: none;
      color: #ddd;
      margin-top: 32px;
      .icon-subscribe{
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .summation{
      display: flex;
      justify-content: center;
      padding: 20px 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      margin-top: 58px;
      .data{
        padding: 0 20px;
        h3{
          font-size: 23px;
          color: #373737;
        }
        p{
          color: #ddd;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
</style>