<template>
  <div class="walkListWrapper">
    <ul>
      <li v-for="item in blogList">
        <div class="time">
          <div class="day">{{getDay(item.time)}}</div>
          <p class="month">{{getMonth(item.time)}}</p>
        </div>
        <div class="main">
          <div class="content" v-html="item.content">
          </div>
          <div class="tags">
            <span v-for="tag in item.tags">● {{tag}}</span>
          </div>
          <div class="about">
            <span>热度({{item.hot}})</span>
            <span>评论({{item.comment_count}})</span>
            <span @click.stop="clickwalkingBlog(item)">全文链接</span>
            <span class="delete" v-show="manager" @click="deleteBlog(item.id)">删除</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      blogList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    computed: {
      ...mapGetters([
        'manager'
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
      },
      clickwalkingBlog (id) {
        this.$emit('selectBlog', id);
      },
      deleteBlog (id) {
        this.$emit('deleteBlog', id);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .walkListWrapper{
    li{
      display: flex;
      width: 640px;
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
        .about{
          font-size: 0;
          color: #828d95;
          margin-top: 20px;
          zoom: 1;
          &:after{
            content: "\0020";
            display: block;
            height: 0;
            clear: both;
          }
          span{
            font-size: 12px;
            margin-right: 25px;
            cursor: pointer;
          }
          .delete{
            display: block;
            float: right;
            color: blue;
          }
        }
      }
    }
  }
</style>