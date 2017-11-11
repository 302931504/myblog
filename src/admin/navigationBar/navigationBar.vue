<template>
  <div class="navigationWrapper">
    <div class="avatar">
      <img src="./rick.png" alt="">
      <p>你好！我是一个好人</p>
    </div>
    <div class="navBar">
      <ul>
        <li v-for="item in navList" 
            :class="item.name === currentName ? 'active' : ''" 
            @click="clickNav(item)"><span :class="'icon-' + item.name"></span> {{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          navList: [
            {text: '后台首页', name: 'home'},
            {text: '文章列表', name: 'blog'},
            {text: '留言管理', name: 'message'},
            {text: '用户追踪', name: 'users'}
          ]
        };
      },
      props: {
        currentName: {
          type: String,
          default: 'home'
        }
      },
      methods: {
        clickNav (item) {
          this.$emit('clickNav', item);
        }
      }
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .navigationWrapper{
    /* position: fixed;
    top: 60px;
    left: 0; */
    width: 200px;
    height: 100%;
    overflow-y: hidden;
    background-color: #393D49;
    .avatar{
      width: 200px;
      height: 120px;
      padding-top: 15px;
      padding-bottom: 5px;
      text-align: center;
      img{
        width: 76px;
        border-radius: 50%;
        border: 4px solid #44576b;
        margin-bottom: 15px;
      }
      p{
        font-size: 12px;
      }
    }
    .navBar{
      margin-top: 20px;
      width: 200px;
      overflow: hidden;
      li{
        font-size: 14px;
        line-height: 45px;
        padding-left: 20px;
        &:hover{
          background-color: #7B7B7B;
          border-left: 6px solid #009688;
          transition: all 0.6s;
        }
      }
      .active{
        background-color: #1AA094;
        color: #fff;
      }
    }
  }
</style>