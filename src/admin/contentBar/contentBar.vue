<template>
  <div class="contentBarWrapper">
    <ul>
      <li v-for="item in navList" 
          @click="clickNav(item)"
          :class="item.name === currentName ? 'active' : ''">
        <span :class="'icon-' + item.name"></span> {{item.text}} <span v-if="item.name !== 'home'" class="icon-cross" @click.stop="close(item.name)"></span>
      </li>
    </ul>
    <div class="action">
      页面操作
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      navList: {
        type: Array,
        default: []
      },
      currentName: {
        type: String,
        default: 'home'
      }
    },
    methods: {
      clickNav (item) {
        this.$emit('clickNav', item);
      },
      close (name) {
        this.$emit('closeNav', name);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .contentBarWrapper{
    display: flex;
    justify-content: space-between;
    color: #000;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e2e2e2;
    ul{
      li{
        display: inline-block;
        padding: 0 10px;
        min-width: 65px;
        transition: all .2s;
      }
      .active{
        background-color: #1AA094;
        color: #fff;
      }
    }
    .action{
      padding: 0 20px;
      border-left: 1px solid #e2e2e2;
    }
  }
</style>