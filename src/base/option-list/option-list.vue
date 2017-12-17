<template>
  <transition name="upglide">
    <div class="optionListWrapper" v-if="show" ref="wrapper">
      <ul>
        <li v-for="item in options" @click="clickItem(item)"><i :class="'icon-' + item.name"></i> {{item.text}}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        default: function () {
          return [];
        }
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickItem (item) {
        this.$emit('clickoption', item);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .optionListWrapper{
    position: relative;
    color: #000;
    width: 100%;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0,0,0,.12);
    border: 1px solid #d2d2d2;
    background-color: #fff;
    z-index: 200;
    border-radius: 2px;
    li{
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      &:hover{
        color: #fff;
        background: #5FB878;
      }
    }
  }
  .upglide-enter-active, .upglide-leave-active{
    opacity: 1;
    transition: all .5s;
  }
  .upglide-enter, .upglide-leave-to{
    opacity: 0;
    transform: translate3d(0, 20px, 0); 
  }
</style>