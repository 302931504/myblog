<template>
  <div class="labelWrapper">
    <transition name="showslide">
      <div class="content" v-show="showFlag">
        123456
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      showFlag: {
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .labelWrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    color: #000;
    background: #000;
    opacity: .9;
    z-index: 9998;
    overflow: hidden;
    .content{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 320px;
      height: 170px;
      margin-top: -85px;
      margin-left: -160px;
      padding: 20px;
      background: #fff;
      border-radius: 2px;
      .avatar{
        text-align: center;
        img{
          width: 60px;
          height: 60px;
          border-radius: 100%;
        }
        p{
          margin: 8px 0 15px 0;
        }
      }
      .entry{
        input{
          vertical-align: middle;
          width: 170px;
          height: 38px;
          line-height: 38px;
          margin: 0 10px 0 40px;
          padding-left: 10px;
          box-sizing: border-box;
          border-radius: 2px;
          border: 1px solid #333;
          outline: none;
        }
        button{
          height: 38px;
          line-height: 38px;
          padding: 0 18px;
          color: #FFF;
          background: #8E8E8E;
          border: none;
          outline: none;
          cursor: pointer;
          &:hover{
            opacity: .8;
          }
        }
      }
      .text{
        color: red;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
  .showslide-enter-active, .showslide-leave-active{
    width: 320px;
    height: 170px;
    opacity: 1;
    transition: all .3s;
  }
  .showslide-enter, .showslide-leave-to{
    width: 0;
    height: 0;
    opacity: 0;
  }
</style>