<template>
  <div class="subscribeWrapper">
    <h1 class="sub-title"><span class="icon-subscribe"></span>订阅我</h1>
    <p class="remind">当有新博文发表时，将会以邮件形式通知您。所填信息不会被公开。</p>
    <div class="entry">
      <input type="text" name="" placeholder="昵称">
      <input type="email" name="" placeholder="常用邮箱">
      <button type="button">订阅</button>
    </div>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .subscribeWrapper{
    text-align: center;
    padding-top: 30px;
    padding-bottom: 45px;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
    border-top: 2px solid #262b2f;
    .sub-title{
      font-size: 20px;
      color: #dbdedf;
    }
    .remind{
      margin: 20px 0;
      color: #aeb0b1;
      font-size: 16px;
      line-height: 1.5;
    }
    .entry{
      input{
        display: block;
        width: 600px;
        height: 40px;
        font-size: 14px;
        margin: 0 auto;
        margin-bottom: 10px;
        background: #dbdedf;
        border-radius: 4px;
        padding-left: 20px;
        outline: none;
      }
      button{
        display: block;
        height: 40px;
        width: 120px;
        background: #27ae60;
        color: #fff;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        margin: 0 auto;
      }
    }
  }
</style>