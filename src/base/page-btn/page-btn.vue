<template>
  <ul class="pageBtn">
    <button type="button" @click="pre" v-show="currentPage > 1" class="btn last">上一页</button>
    <p class="pageText">Page {{currentPage}} of {{pageCount}}</p>
    <button type="button" @click="next" v-show="currentPage !== pageCount" class="btn next">下一页</button>
  </ul>
</template>

<script>
  export default {
    props: {
      pageCount: {
        type: Number,
        default: 0
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    methods: {
      next () {
        this.$emit('next');
      },
      pre () {
        this.$emit('pre');
      }
    }
  }; 
</script>

<style scoped lang="less" rel="stylesheet/less">
  .pageBtn{
    zoom: 1;
    position: relative;
    font: bold 14px/1.5 "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
    .btn{
      position: absolute;
      top: -6px;
      background-color: #606669;
      color: #f2f5f7;
      border: none;
      border-radius: 2px;
      width: 100px;
      height: 30px;
      outline: none;
      transition: all .3s;
      &:hover{
        background: #27ae60;
      }
    }
    .last{
      left: 0;
    }
    .next{
      right: 0;
    }
    .pageText{
      text-align: center;
      color: #606669;
    }
  }
</style>