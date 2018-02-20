<template>
  <div class="aboutNav" ref="aboutNav">
    <div class="showBtn" @click="toggleAbout">
      <span class="icon-back" ref="circle"></span>
    </div>
    <img src="./head.jpg" alt="">
    <h2>刘帅</h2>
    <p class="introduction">现就读于广东工业大学软件工程专业，16年开始接触前端，喜欢前端“即刻可见”的魅力。</p>
    <div class="summation">
      <div class="data">
        <h3>{{blogCount}}</h3>
        <p>博客</p>
      </div>
      <div class="data">
        <h3>{{boardCount}}</h3>
        <p>留言</p>
      </div>
      <div class="data">
        <h3>{{subCount}}</h3>
        <p>订阅</p>
      </div>
    </div>
    <p class="webo"><a href="https://weibo.com/liuyouxiyoki" title="关注我的微博"><span class="icon-weibo"></span> 一个好人goodoer</a></p>
  </div>
</template>

<script>
  import {getAllCount} from '../../api/blog';

  export default {
    data () {
      return {
        blogCount: 0,
        boardCount: 0,
        subCount: 0
      };
    },
    created () {
      this.getCount();
    },
    methods: {
      toggleAbout () {
        if (this.$refs.aboutNav.style.left === '') {
          this.$refs.aboutNav.style.left = -315 + 'px';
          this.$refs.circle.style.transform = 'rotate(180deg)';
        } else {
          this.$refs.aboutNav.style.left = '';
          this.$refs.circle.style.transform = 'rotate(0)';
        }
      },
      getCount () {
        getAllCount().then(res => {
          this.blogCount = res.data[0].blognum;
          this.boardCount = res.data[0].messnum;
          this.subCount = res.data[0].usernum;
        });
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .aboutNav{
    position: fixed;
    top: 100px;
    left: 0;
    width: 315px;
    background: rgba(38,43,47,.8);
    color: #eee;
    text-align: center;
    padding: 26px 32px 40px;
    box-sizing: border-box;
    transition: all 1s;
    .showBtn{
      position: absolute;
      top: 30px;
      left: 315px;
      width: 30px;
      height: 50px;
      line-height: 50px;
      background: rgba(38,43,47,.9);
      border-radius: 0 8px 8px 0;
      .icon-back{
        display: inline-block;
        transition: all 1s;
      }
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    h2{
      font-size: 16px;
      margin-top: 14px;
    }
    .introduction{
      font-size: 13px;
      line-height: 19px;
      margin: 22px 0 32px;
    }
    .summation{
      display: flex;
      justify-content: center;
      padding: 20px 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      margin-top: 58px;
      .data{
        padding: 0 20px;
        h3{
          font-size: 23px;
          color: #fff;
        }
        p{
          color: #ddd;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
    .webo{
      margin-top: 18px;
      font-size: 14px;
    }
  }
</style>