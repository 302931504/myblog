<template>
  <div class="listWrapper">
    <article v-for="item in blogList">
      <h1>{{item.blog_title}}</h1>
      <div class="time">
        <span><i class="icon-clock"></i> {{_initTime(item.blog_pubTime)}}</span>
        <span><i class="icon-update"></i> {{_initTime(item.blog_updateTime)}}</span>
        <span>{{item.classify_text}}</span>
      </div>
      <p>{{item.blog_description}}</p>
      <div class="foot">
        <div class="tags">
          <span v-for="tag in item.blog_tags.split('/')">{{tag}}</span>
        </div>
        <div class="readNum">
          <span>阅读({{item.blog_readNum}})</span>
          <span>评论({{item.comment_count}})</span>
          <span class="articleDetail" @click="selectArticle(item.blog_id)">全文链接 >></span>
        </div>
      </div>
    </article>
    <div class="detail">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {initTime} from '../../common/js/util';

  export default {
    props: {
      blogList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      selectArticle (id) {
        this.$emit('selectArticle', id);
      },
      _initTime (time) {
        return initTime(time);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .listWrapper{
    color: #555;
    width: 853px;
    margin: 0 auto;
    article{
      display: block;
      padding: 40px 45px;
      margin-bottom: 26px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
      h1{
        font-size: 23px;
        color: #555;
        margin-bottom: 13px;
      }
      .time{
        font-size: 0;
        color: #aaa;
        span{
          font-size: 12px;
          margin-right: 19px;
        }
      }
      p{
        margin: 26px 0;
        line-height: 25px;
      }
      .foot{
        font-size: 0;
        span{
          display: inline-block;
          font-size: 12px;
          color: #777;
          margin-right: 21px;
          cursor: pointer;
        }
        .tag{
          float: left;
        }
        .readNum{
          float: right;
          .articleDetail{
            margin-right: 0;
            color: #555;
            text-align: underline;
            transition: all 0.2s ease-out;
            &:hover{
              color: #000;
            }
          }
        }
      }
    }
    .detail{
      margin-top: 50px;
    }
  }
</style>