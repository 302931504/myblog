<template>
  <div class="aboutNav" ref="aboutNav">
    <div class="showBtn" @click="toggleAbout">
      <span class="icon-back" ref="circle"></span>
    </div>
    <img src="./head.jpg" alt="">
    <h2>一个好人</h2>
    <p class="introduction">广东工业大学软件工程在读学生。15年开始学习前端，对架构和开发都很感兴趣。
工作时有强迫症。</p>
    <p class="github">
      <span class="icon-github"></span> <a href="https://github.com/iamgdoer" title="我的github">https://github.com/iamgdoer</a>
    </p>
    <button type="button" class="btn">
      <span class="icon-subscribe"></span> 订阅我
    </button>
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
    <ul class="link">
      <li>我的简介</li>
      <li>算法分析</li>
      <li>公众号</li>
    </ul>
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
    top: 44px;
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
    .github{
      a{
        font-size: 12px;
      }
    }
    .btn{
      width: 170px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      background-color: #373737;
      border-radius: 30px;
      border: none;
      color: #ddd;
      margin-top: 32px;
      .icon-subscribe{
        font-size: 20px;
        vertical-align: middle;
      }
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
    .link{
      margin-top: 30px;
      li{
        display: inline-block;
        margin-right: 24px;
        font-size: 14px;
      }
    }
  }
</style>