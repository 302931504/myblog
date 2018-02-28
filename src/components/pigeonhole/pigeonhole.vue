<template>
  <div class="pigeonholeWrapper">
    <div class="content">
      <div class="main">
        <div class="selectType">
          <a class="all-article" @click="fetchAll">全部文章 ({{allArticle}}) </a>
          <a class="tag-article" @click="showTagList = !showTagList">标签 <span class="icon-circle"></span></a>
          <div class="tagList" v-show="showTagList">
            <span v-for="item in tagsHistory" @click="selectTag(item.tag_text)">{{item.tag_text}}</span>
          </div>
        </div>
        <div class="main-content">
          <transition-group name="river">
            <div class="article" v-for="(item, index) in articleList" :key="index">
              <h3 class="time-count">
                20{{getYear(item.yearMonth)}}年{{getMonth(item.yearMonth)}}月 / {{item.blogs.length}}篇文章
              </h3>
              <ul class="articleList">
                <li class="art-title" v-for="blog in item.blogs" @click="selectArticle(blog.blog_id)"><span class="pub-time">{{blog.mday}} </span>{{blog.blog_title}}</li>
              </ul>
            </div>
          </transition-group>
          <p class="errMess" v-show="!articleList.length">{{errMess}}</p>
        </div>
      </div>
      <nav class="navBar">
        <h3>分类</h3>
        <ul>
          <li v-for="item in classify"><span class="text" @click="getClassifyBlog(item.classify_text)">{{item.classify_text}}</span><span class="count">（{{item.count}}）</span></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
  
<script>
  import {getClassify, getArticleTitle, getClassifyArticle, getTags, getTagArticle} from '../../api/archives';
  import {getCount} from '../../api/blog';

  export default {
    data () {
      return {
        classify: [],
        articleList: [],
        errMess: '',
        allArticle: 0,
        showTagList: false,
        tagsHistory: []
      };
    },
    created () {
      this.getData();
      this.getArchives();
      this.getTagsHistory();
    },
    methods: {
      getData () {
        getClassify().then(res => {
          if (res.status === 0) {
            this.classify = res.data;
          }
        });
        this.getAllCount();
      },
      getYear (time) {
        let arr = time.split('');
        return arr[0] + arr[1];
      },
      getMonth (time) {
        let arr = time.split('');
        return arr[2] + arr[3];
      },
      getTagsHistory () {
        getTags().then(res => {
          if (res.status === 0) {
            this.tagsHistory = res.data;
          }
        });
      },
      selectTag (text) {
        getTagArticle(text).then(res => {
          if (res.status === 0) {
            this.articleList = res.data;
          } else {
            this.articleList = [];
            this.errMess = res.info;
          }
        });
      },
      getClassifyBlog (classify) {
        getClassifyArticle(classify).then(res => {
          if (res.status === 0) {
            this.articleList = res.data;
          } else {
            this.articleList = [];
            this.errMess = res.info;
          }
        });
      },
      fetchAll () {
        getArticleTitle().then(res => {
          if (res.status === 0) {
            this.articleList = res.data;
          } else {
            this.errMess = res.info;
          }
        });
      },
      getAllCount () {
        let isShow = 1;
        getCount(isShow).then(res => {
          if (res.status === 0) {
            this.allArticle = res.data;
          }
        });
      },
      selectArticle (id) {
        this.$router.push({path: `/article/${id}`});
      },
      getArchives () {
        if (this.$route.query.type === 'category') {
          this.getClassifyBlog(this.$route.query.category);
        } else if (this.$route.query.type === 'tag') {
          this.selectTag(this.$route.query.tag);
        } else {
          this.fetchAll();
        }
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .pigeonholeWrapper{
    padding: 10px;
    .content{
      padding: 20px;
      background: #fff;
      min-height: 500px;
      zoom: 1;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
      .main{
        float: left;
        width: 70%;
        .selectType{
          position: relative;
          height: 72px;
          line-height: 72px;
          border-bottom: 1px solid #ddd;
          a{
            cursor: pointer;
          }
          .tag-article{
            margin-left: 50px;
            span{
              display: inline-block;
              margin-left: 10px;
            }
          }
          .tagList{
            position: absolute;
            top: 55px;
            left: 150px;
            width: 450px;
            height: 230px;
            padding: 20px;
            border: 1px solid #bcc1c8;
            background: #fff;
            z-index: 10;
            font-size: 0;
            span{
              background: #888;
              font-size: 15px;
              color: #fff;
              padding: 6px 14px;
              border-radius: 4px;
              margin: 2px;
              transition: all 1s;
              cursor: pointer;
              &:hover{
                background: #444;
              }
            }
            &:before{
              content: '';
              position: absolute;
              top: -11px;
              left: 43px;
              display: inline-block;
              height: 0;
              width: 19px;
              padding-top: 11px;
              text-indent: -9999px;
              overflow: hidden; 
              background: url('./arrow.png') transparent no-repeat center top;
            }
          }
        }
        .main-content{
          position: relative;
          .time-count{
            padding: 29px 0 13px 0;
            font-size: 16px;
            font-weight: normal;
            color: #000;
          }
          .errMess{
            position: absolute;
            top: 30px;
            left: 0;
            transition: all 1s;
          }
          .art-title{
            display: inline-block;
            margin-right: 35px;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            border-bottom: 1px dashed #ddd;
            transition: all .3s ease-out;
            cursor: pointer;
            &:hover{
              color: #000;
              border-bottom: 1px dashed #000;
            }
          }
        }
      }
      .navBar{
        float: right;
        width: 28%;
        height: 100%;
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        padding-left: 32px;
        padding-top: 54px;
        h3{
          font-size: 16px;
          color: #333;
        }
        ul{
          margin-top: 20px;
          li{
            font-size: 14px;
            margin-bottom: 14px;
            transition: all .3s ease-out;
            cursor: pointer;
            zoom: 1;
            span{
              line-height: 20px;
              display: inline-block;
              border-bottom: 1px solid transparent;
            }
            .text{
              color: #7594b3;
              &:hover{
                border-bottom: 1px solid #7594b3;
              }
            }
            .count{
              float: right;
            }
            &:after{
              content: "\0020";
              display: block;
              height: 0;
              clear: both;
            }
          }
        }
      }
      &:after{
        content: "\0020";
        display: block;
        height: 0;
        clear: both;
      }
    }
  }
  .river-enter-active, .river-leave-active{
    transition: all 1s;
    opacity: 1;
  }
  .river-enter, .river-leave-to{
    opacity: 0;
    transform: translate3d(0, -100%, 0); 
  }
</style>