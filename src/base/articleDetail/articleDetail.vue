<template>
  <transition name="slide">
    <div class="articledetailWrapper">
      <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
      <span class="icon-back" @click.stop="backTo"></span>
      <div class="mainContent">
        <h1 class="title">
          {{editBlog.blog_title}}
        </h1>
        <div class="time">
          <span><i class="icon-clock"></i> &nbsp;{{_initTime(editBlog.blog_pubTime)}}</span>
          <span><i class="icon-update"></i> &nbsp;{{_initTime(editBlog.blog_updateTime)}}</span>
          <span class="classify">{{editBlog.classify_text}}</span>
        </div>
        <div class="markdownContent">
          <div class="article_detail_content" v-html="compiledMarkdown"></div>
        </div>
        <ul class="tags">
          <li v-for="tag in editBlog.blog_tags.split('/')">{{tag}}</li>
        </ul>
        <div class="adjacent">
          <span class="last" @click.stop="lastArticle" v-show="last.blog_title"><< {{last.blog_title}}</span>
          <span class="next" @click.stop="nextArticle" v-show="next.blog_title">{{next.blog_title}} >></span>
        </div>
      </div>
      <div class="likewrapper">
        <div class="likeANDshare">
          <div class="like">
            <div class="likeIcon likeIcon-d">
              <span class="icon-like"></span>
            </div>
            <p class="num">点赞({{editBlog.blog_likeNum}})</p>
          </div>
          <div class="share">
            <div class="shareIcon">
              <span class="icon-share"></span>
            </div>
            <p class="num">分享</p>
          </div>
        </div>
      </div>
      <div class="comment">
        <message-board :bbsList="comments"
                       :floor="commentsLen" 
                       @answer="answer" 
                       @deletebbs="deletebbs"
                       @deleteChild="deleteChild"
                       @quoteto="quoteto"></message-board>
        <comment class="comment" @addBBS="addBBS" 
                 :placeholder="content"></comment>
      </div>
    </div>  
  </transition>
</template>

<script>
  import MessageBoard from '../message-board/message-board';
  import Comment from '../../base/comment/comment';
  import Attention from '../../base/attention/attention';
  import {mapGetters, mapMutations} from 'vuex';
  import {comment, getComment, addChildBBS, deleteChildBBS, deleteBBS, quote} from '../../api/bbs';
  import {getAdjacent} from '../../api/blog';
  import {showAttentionMixin, quoteMixin} from '../../common/js/mixin';
  import {initBBS, initTime} from '../../common/js/util';
  import marked from 'marked';
  import highlight from 'highlight.js';
  import '../../common/css/atom-one-light.css';
  marked.setOptions({
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    }
  });

  export default {
    mixins: [showAttentionMixin, quoteMixin],
    data () {
      return {
        comments: [],
        last: {},
        next: {}
      };
    },
    computed: {
      compiledMarkdown () {
        return marked(this.editBlog.blog_content || '', {sanitize: true});
      },
      commentsLen () {
        return this.comments ? this.comments.length : 0;
      },
      ...mapGetters([
        'editBlog'
      ])
    },
    created () {
      this.getBBSList();
      this.getAdjacentArticle();
    },
    methods: {
      backTo () {
        if (this.editBlog.blog_isShow) {
          this.$router.push({path: `/admin/article`});
        } else {
          this.$router.push({path: `/admin/draft`});
        }
      },
      getAdjacentArticle () {
        const item = {
          id: this.editBlog.blog_id,
          show: this.editBlog.blog_isShow
        };
        getAdjacent(item).then(res => {
          if (res.status === 0) {
            for (var index in res.data) {
              if (res.data[index].blog_id > this.editBlog.blog_id) {
                this.last = res.data[index];
              } else {
                this.next = res.data[index];
              }
            }
          } 
        });
      },
      lastArticle () {
        this.$emit('lastArticle', this.last.blog_id);
        this.backTo();
      },
      nextArticle () {
        this.$emit('nextArticle', this.next.blog_id);
        this.backTo();
      },
      getBBSList () {
        const item = {
          reply_id: this.editBlog.blog_id,
          type: 2
        };
        getComment(item).then(res => {
          if (res.status === 0) {
            this.comments = initBBS(res.data);
          }
        });
      },
      addBBS (item) {
        item.type = 2;
        if (!this.answerType && !this.isQuote) {
          item.reply_id = this.editBlog.blog_id;
          comment(item).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.routerGo();
            }
          });
        } else if (this.answerType && !this.isQuote) {
          item.parent_id = this.answerId;
          addChildBBS(item).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.routerGo();
            }
          });
        } else if (this.isQuote) {
          item.reply_id = this.editBlog.blog_id;
          item.to_email = this.quoteObj.email;
          item.to_content = this.quoteObj.content;
          item.old_user = this.quoteObj.name;
          quote(item).then(res => {
            console.log(res);
          });
        }
      },
      deletebbs (id) {
        deleteBBS(id).then(res => {
          if (res.status === 0) {
            this.showAttention(res.info, true);
            this.routerGo();
          }
        });
      },
      deleteChild (id) {
        deleteChildBBS(id).then(res => {
          if (res.status === 0) {
            this.showAttention(res.info, true);
            this.routerGo();
          }
        });
      },
      routerGo () {
        this.setBackPath(this.$route.path);
        this.$router.push('/admin/back');
      },
      _initTime (time) {
        return initTime(time);
      },
      ...mapMutations({
        setBackPath: 'SET_BACKPATH'
      })
    },
    watch: {
      editBlog () {
        this.getAdjacentArticle();
      }
    },
    components: {
      MessageBoard,
      Comment,
      Attention
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .articledetailWrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #000;
    padding: 65px 45px 50px;
    box-sizing: border-box;
    .icon-back{
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .mainContent{
      width: 800px;
      .title{
        font-size: 28px;
        color: #444;
        font-weight: 200;
      }
      .markdownContent{
        margin-top: 57px;
        margin-bottom: 60px;
        width: 800px;
        .article_detail_content {
          text-align: left;
          font-size: 16px;
        }
      }
      .time{
        margin-top: 13px;
        font-size: 12px;
        color: #aaa;
        span{
          margin-right: 20px;
        }
        .classify{
          color: #7594b3;
        }
      }
      .tags{
        width: 800px;
        border-bottom: 1px solid #eee;
        padding-bottom: 60px;
        padding-left: 0;
        li{
          display: inline-block;
          margin-right: 12px;
          font-size: 13px;
          background-color: #f5f5f5;
          padding: 4px 6px;
          color: #555;
        }
      }
      .adjacent{
        padding: 34px 0;
        zoom: 1;
        span{
          display: inline-block;
          color: #999;
          font-size: 14px;
          transition: all 0.2s ease-out;
          cursor: pointer;
          &:hover{
            color: #333;
            border-bottom: 1px solid #333;
          }
        }
        .next{
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
    .likewrapper{
      width: 800px;
      margin: 50px 0;
    }
    .likeANDshare{
      display: flex;
      justify-content: center;
      width: 400px;
      margin: 0 auto;
      .like{
        width: 400px;
        text-align: center;
        .likeIcon{
          width: 60px;
          height: 60px;
          text-align: center;
          border-radius: 50%;
          margin: 0 auto;
        }
        .likeIcon-d{
          border: 2px solid #d0d0d0;
          .icon-like{
            font-size: 30px;
            line-height: 56px;
            color: #d0d0d0;
          }
        }
        .likeIcon-a{
          border: 2px solid #85b7e2;
          background-color: #85b7e2;
          .icon-like{
            font-size: 30px;
            line-height: 56px;
            color: #fff;
          }
        }
      }
      .share{
        width: 400px;
        text-align: center;
        .shareIcon{
          width: 60px;
          height: 60px;
          text-align: center;
          border-radius: 50%;
          border: 2px solid #d0d0d0;
          margin: 0 auto;
          .icon-share{
            font-size: 30px;
            line-height: 56px;
            color: #d0d0d0;
          }
        }
      }
      .num{
        margin-top: 10px;
      }    
    }
    .comment{
      width: 800px;
      .comment{
        margin-top: 80px;
      }
    }
  }
  /* markdown css */
  .markdownContent{
    font-size: 16px;
    line-height: 27px;
    p{
      margin-bottom: 25px;
    }
    ul{
      list-style: disc;
      margin: 16px 0;
      padding-left: 40px;
      li{
        list-style: disc;
      }
    }
    em{
      background: #eee;
      text-shadow: 0 1px #fff;
      padding: 0 0.3em;
      margin: 0 0.3em;
      font-family: inherit;
    }
    strong{
      font-weight: bold;
    }
    table {
        margin: 10px 0 15px 0;
        border-collapse: collapse;
    }
    th {
        text-align: center;
        padding: 5px 10px;  
        border-bottom: 2px solid #ddd;
    }
    td {
      padding: 8px;
      line-height: 1.42857143;
      vertical-align: top;
      border-top: 1px solid #ddd;
    }
    a {
        color: #0069d6;
    }
    a:hover {
        color: #0050a3;
        text-decoration: none;
    }
    a img {
        border: none;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #404040;
        line-height: 36px;
    }
    h1 {
        margin-bottom: 25px;
        padding: 0.3em 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        border-bottom: 1px solid #eee;
    }
    h2 {
        font-size: 17px;
        font-weight: 600;
        line-height: 30px;
        margin-bottom: 25px;
    }
    h3 {
        font-size: 18px;
    }
    h4 {
        font-size: 16px;
    }
    h5 {
        font-size: 14px;
    }
    h6 {
        font-size: 13px;
    }
    hr {
        margin: 0 0 19px;
        border: 0;
        border-bottom: 1px solid #ccc;
    }
    blockquote {
        margin: 20px 0;
        padding: 15px;
        border-left: 3px solid #ccc;
        background-color: #f7f7f7;
        font-family: inherit;
    }
    blockquote p {
        font-size: 16px;
        font-weight: 300;
        line-height: 18px;
        margin-bottom: 0;
    }
    code, pre {
        font-family: Monaco, Andale Mono, Courier New, monospace;
    }
    code {
        background-color: #fee9cc;
        color: rgba(0, 0, 0, 0.75);
        padding: 1px 3px;
        font-size: 12px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    pre {
        margin-bottom: 25px;
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        background-color: #f7f7f7;
        word-wrap: normal;
        border-radius: 3px;
        color: #333;
        font: 13px Consolas, "Liberation Mono", Menlo, Courier, monospace;
        font-family: inherit;
    }
    pre code {
        background: transparent;
        padding: 0
    }
    sup {
        font-size: 0.83em;
        vertical-align: super;
        line-height: 0;
    }
  }
  /****************/
  .slide-enter-active, .slide-leave-active{
    transition: all 0.6s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0); 
  }
</style>