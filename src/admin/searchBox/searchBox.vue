<template>
  <div class="searchBoxWrapper">
    <input type="text" name="search" placeholder="请输入关键字">
    <button class="searchBtn" type="button">查询</button>
    <button v-for="item in options" :class="item.name" type="button" @click="clickOption(item.name)">{{item.text}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        default: []
      }
    },
    methods: {
      clickOption (name) {
        this.$emit('clickOption', name);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .searchBoxWrapper{
    line-height: 22px;
    background-color: #f2f2f2;
    border-radius: 0 2px 2px 0;
    border-left: 5px solid #009688;
    padding: 10px;
    input{
      vertical-align: middle;
      height: 38px;
      line-height: 38px;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      border-radius: 2px;
      padding-left: 10px;
      outline: none;
    }
    button{
      vertical-align: middle;
      height: 38px;
      line-height: 38px;
      padding: 0 18px;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      border: none;
      border-radius: 2px;
      margin-right: 5px;
      z-index: 100;
      cursor: pointer;
      opacity: .9;
      outline: none;
      &:hover{
        opacity: .7;
      }
    }
    .searchBtn{
      background-color: #009688;
    }
    .newBlogBtn{
      background-color: #1E9FFF;
    }
    .editBlog{
      background-color: #1E9FFF;
    }
    .topBlogBtn{
      background-color: #5FB878;
    }
    .deleteAllBtn{
      background-color: #FF5722;
    }
    .text{
      font-size: 12px;
      color: #999;
      margin-left: 20%;
    }
  }
</style>