<template>
  <transition name="slide">
    <div class="walkingBlogWrapper">
      <div class="blogContent">
        <div class="time">
          <div class="day">{{getDay(editBlog.time)}}</div>
          <p class="month">{{getMonth(editBlog.time)}}</p>
        </div>
        <div class="main">
          <div class="content">
            {{editBlog.content}}
          </div>
          <div class="tags">
            <span v-for="tag in editBlog.tags">● {{tag}}</span>
          </div>
        </div>
      </div>
      <comment></comment>
    </div>
  </transition>
</template>

<script>
  import Comment from '../comment/comment';
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'editBlog'
      ])
    },
    methods: {
      getDay (time) {
        let myDate = new Date(time);
        return myDate.getDate();
      },
      getMonth (time) {
        let myDate = new Date(time);
        return myDate.getMonth() + 1;
      }
    },
    components: {
      Comment
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .walkingBlogWrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    background: #fff;
    .blogContent{
      display: flex;
      .time{
        width: 80px;
        .day{
          width: 70px;
          height: 70px;
          border: 5px solid #828d95;
          border-radius: 50%;
          font-size: 40px;
          font-family: "Rokkitt",arial,serif;
          line-height: 70px;
          text-align: center;
          color: #828d95;
          &:hover{
            color: #4d4d4d;
            border-color: #4d4d4d;
            transition: all .4s linear;
          }
        }
        .month{
          font-size: 24px;
          font-family: "Rokkitt",arial,serif;
          text-align: center;
          color: #c0c0c0;
          margin-top: 10px;
          &:hover{
            color: #4d4d4d;
            border-color: #4d4d4d;
            transition: all .4s linear;
          }
        }
      }
      .main{
        width: 100%;
        margin-left: 20px;
        background: url('./line.png') bottom repeat-x;
        padding:20px 0 48px 0;
        .content{
          font-size: 15px;
          color: #737373;
          line-height: 24px;
        }
        .tags{
          font-size: 0;
          margin-top: 30px;
          span{
            display: inline-block;
            font-size: 12px;
            font-family: "Hiragino Sans GB","Microsoft YaHei";
            color: #FEFEFE;
            padding: 2px 8px;
            margin: 0 12px 10px 0;
            border-radius: 15px;
            white-space: nowrap;
            background: #828d95;
          }
        }
      }
    }
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.6s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0); 
  }
</style>