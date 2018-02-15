<template>
  <div class="bottomWrapper">
    <span><i class="icon-github"></i> <a href="https://github.com/iamgdoer">https://github.com/iamgdoer</a></span>
    <span><i class="icon-qq"></i> QQ: 302931504</span>
    <span @mouseover="showQR = true" @mouseout="showQR = false"><i class="icon-wechat"></i> 公众号
       <img v-show="showQR" class="qr" src="./qrcode.jpg" />
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showQR: false
      };
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .bottomWrapper{
    background: #262b2f;
    padding: 20px 0;
    text-align: center;
    span{
      position: relative;
      display: inline-block;
      margin: 0 20px;
      .qr{
        position: absolute;
        top: -60px;
        left: 80px;
        width: 80px;
      }
      i{
        transition: all 1s;
      }
      &:hover{
        i{
          color: #27ae60;
        }
      }
    }
  }
</style>