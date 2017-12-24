<template>
  <ul class="pageBtn">
    <li @click="pre" v-show="currentPage > 1">上一页</li>
    <li v-for="item in pageCount" 
        :class="currentPage === item.page ? 'active' : ''" 
        @click="clickPage(item.page)">{{item.page}}</li>
    <li @click="next" v-show="currentPage !== pageCount.length">下一页</li>
  </ul>
</template>

<script>
  export default {
    props: {
      pageCount: {
        type: Array,
        default: function () {
          return [];
        }
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
      clickPage (page) {
        this.$emit('clickPage', page);
      },
      pre () {
        this.$emit('pre');
      }
    }
  }; 
</script>

<style scoped lang="less" rel="stylesheet/less">
  .pageBtn{
    display: flex;
    margin: 20px 0 20px 0;
    li{
      color: #000;
      padding: 0 15px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      border: 1px solid #e2e2e2;
      margin-left: -1px;
      cursor: pointer;
      &.active{
        color: #fff;
        background: #009688;
      }
    }
  }
</style>