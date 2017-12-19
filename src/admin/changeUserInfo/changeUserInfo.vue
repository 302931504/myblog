<template>
  <div class="wrapper">
    <div class="changeInfo">
      <span class="icon-cross"></span>
      <div class="inputText">
        <input type="text" name="" v-model="info.user_name"><br/>
        <input type="email" name="" v-model="info.user_email">
      </div>
      <button type="button">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: Object,
      default: function () {
        return {};
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .changeInfo{
    position: relative;
    width: 380px;
    padding: 30px;
    background: #fff;
    box-shadow: 8px 8px 5px #888888;
    .icon-cross{
      position: absolute;
      top: 6px;
      right: 6px;
      color: #ccc;
    }
    .inputText{
      input{
        width: 100%;
        padding: 9px 15px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border: 1px solid #d7d7d7;
        outline: none;
      }
    }
    button{
      width: 100%;
      height: 40px;
      text-align: center;
      color: #fff;
      background: #8db800;
      border: none;
      font-size: 16px;
      margin-top: 10px;
    }
  }
</style>