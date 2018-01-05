<template>
  <transition name="showslide">
    <div class="cautionWrapper" v-show="showFlag">
      <h1>{{text}}</h1>
      <div class="btn">
        <button class="cancel" type="button" @click="cancel">取消</button>
        <button class="sure" type="button" @click="sure">确认</button>
      </div>
    </div> 
  </transition>
</template>

<script>
  export default {
    props: {
      text: '',
      showFlag: false
    },
    methods: {
      cancel () {
        this.$emit('cancel');
      },
      sure () {
        this.$emit('sure');
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .cautionWrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 100px;
    margin-top: -50px;
    margin-left: -150px;
    padding: 20px;
    box-shadow: 8px 8px 5px #888888;
    background-color: #eee;
    box-sizing: border-box;
    color: #000;
    h1{
      text-align: center;
      line-height: 40px;
    }
    .btn{
      text-align: center;
      font-size: 0;
      button{
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        padding: 0 18px;
        color: #FFF;
        border: none;
        outline: none;
        cursor: pointer;
        &:hover{
          opacity: .8;
        }
      }
      .cancel{
        margin-right: 20px;
        background: #8E8E8E;
      }
      .sure{
        background: #006030;
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