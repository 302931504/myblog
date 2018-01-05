<template>
  <transition name="glide" >
  <div class="attentionWrapper" v-show="showFlag" @click.stop="clickAtt">
    <div class="content">
      <div class="icon" :class="isOK === true ? 'icon-ok' : ''"></div>
      <div class="text">
        <p>{{text}}</p>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        showFlag: false
      };
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      isOK: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.showFlag = false;
          }, 3000);
      },
      clickAtt () {
        this.showFlag = false;
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .attentionWrapper{
    position: fixed;
    top: 0;
    left: 50%;
    width: 60%;
    margin-left: -30%;
    border-radius: 0 0 6px 6px;
    background: #4F4F4F;
    z-index: 9998;
    .content{
      display: flex;
      width: 50%;
      margin: 0 auto;
      padding: 20px;
      .icon{
        width: 60px;
        height: 60px;
        background: url('./bg.png');
        background-size: cover;
      }
      .icon-ok{
        background-position: 100%;
      }
      .text{
        color: #fff;
        font-size: 26px;
        line-height: 60px;
        margin-left: 20%;
      }
    }
  }
  .glide-enter-active, .glide-leave-active{
    transition: all .5s;
  }
  .glide-enter, .glide-leave-to{
    transform: translate3d(0, -100%, 0);
  }
</style>