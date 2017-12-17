<template>
  <div class="lockWrapper">
    <transition name="showslide">
      <div class="content" v-show="showFlag">
        <div class="avatar">
          <img src="./rick.png" alt="">
          <p>一个好人</p>
        </div>
        <div class="entry">
          <input type="password" v-model="pass" placeholder="请输入密码解锁">
          <button type="button" @click="clear">解锁</button>
        </div>
        <p class="text" v-show="showAtt">请输入密码谢谢^_^</p>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pass: '',
        showAtt: false
      };
    },
    props: {
      showFlag: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clear () {
        if (this.pass === '') {
          this.showAtt = true;
        } else {
          this.$emit('clear', this.pass);
          this.pass = '';
          this.showAtt = false;
        }
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .lockWrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    color: #000;
    background: #000;
    opacity: .9;
    z-index: 9999;
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