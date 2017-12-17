<template>
  <transition name="show">
    <div class="remindWrapper" v-show="isShow">
      <div class="triangle-bottomright"></div>
      <div class="content">
        <p>{{content}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      content: {
        type: String,
        default: '请输入内容谢谢'
      },
      isShow: false
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .remindWrapper{
    width: 100%;
    .triangle-bottomright{
      margin: 0 auto;
      width: 0;
      height: 0;
      border-bottom: 10px solid #000;
      border-left: 10px solid transparent;
    }
    .content{
      padding: 0 10px;
      background: #000;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .show-enter-active, .show-leave-active{
    width: 100%;
    opacity: 1;
    transition: all .3s;
  }
  .show-enter, .show-leave-to{
    width: 0;
    opacity: 0;
  }
</style>