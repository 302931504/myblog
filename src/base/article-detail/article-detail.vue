<template>
  <transition name="slide">
    <div class="blogDetailWrapper" v-show="article">
      <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
      <article class="detail">
        <h1 class="article-title">{{article.blog_title}}</h1>
        <div class="time">
          <span><i class="icon-clock"></i> &nbsp;{{_initTime(article.blog_pubTime)}}</span>
          <span><i class="icon-update"></i> &nbsp;{{_initTime(article.blog_updateTime)}}</span>
          <span class="classify">{{article.classify_text}}</span>
        </div>
        <div class="markdownContent">
          <div class="content" v-html="compiledMarkdown"></div>
        </div>
        <footer class="detail-footer">
          <p>Tags: <span class="tag">{{article.blog_tags}}</span></p>
          <p class="share">Share this: </p>
        </footer>
        <div class="adjacent">
          <span class="last" @click.stop="clickNear('last')" v-show="last.blog_title"><< {{last.blog_title}}</span>
          <span class="next" @click.stop="clickNear('next')" v-show="next.blog_title">{{next.blog_title}} >></span>
        </div>
      </article>
      <div class="likeBtn">
        <span class="icon-like" @click="like(article.blog_id)" ref="likeIcon"></span>
        <p class="num" ref="num">点赞({{article.blog_likeNum}})</p>
      </div>
      <div class="boardWrapper">
        <message-board :bbsList="bbsList" 
                       :floor="commentsLen"
                       @answer="answer" 
                       @deletebbs="deletebbs"
                       @deleteChild="deleteChild"
                       @quoteto="quoteto">
        </message-board>
        <div class="comment">
          <comment @addBBS="addBBS" 
                   :placeholder="content"></comment>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {getOneBlog} from '../../api/draft';
  import {getAdjacent, clickLike} from '../../api/blog';
  import {comment, getComment, addChildBBS, deleteChildBBS, deleteBBS, quote} from '../../api/bbs';
  import {initTime} from '../../common/js/util';
  import {quoteMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {mapGetters, mapActions} from 'vuex';
  import MessageBoard from '../message-board/message-board';
  import Attention from '../../base/attention/attention';
  import Comment from '../comment/comment';
  import marked from 'marked';
  import highlight from 'highlight.js';
  import '../../common/css/atom-one-light.css';
  marked.setOptions({
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    }
  });

  export default {
    mixins: [quoteMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        article: {},
        bbsList: [],
        last: {},
        next: {},
        clickTag: 0
      };
    },
    computed: {
      compiledMarkdown () {
        return marked(this.article.blog_content || '', {sanitize: true});
      },
      commentsLen () {
        return this.bbsList ? this.bbsList.length : 0;
      },
      ...mapGetters([
        'manager',
        'likeBlogs'
      ])
    },
    created () {
      this.getBlogDetail();
    },
    methods: {
      getBlogDetail () {
        let id = this.$route.params.id;
        getOneBlog(id).then(res => {
          if (res.status === 0) {
            this.article = res.data[0];
            this.getArticleBBS(this.article.blog_id);
            this.initLikeStyle(this.article.blog_id);
            this.getAdjacentArticle();
          } else {
            this.article = {
              blog_title: res.info
            };
            // this.article.blog_title = res.info;
          }
        });
      },
      like (id) {
        if (!this.article.blog_id) {
          this.showAttention('文章不存在', false);
          return;
        }
        let index = this.likeBlogs.findIndex(blogId => {
          return blogId === id;
        });
        if (index < 0) { 
          if (this.clickTag === 0) { // 防止快速点击
            clickLike(id).then(res => {
              this.clickTag = 1;
              if (res.status === 0) {
                this.activeLikeStyle();
                this.article.blog_likeNum += 1;
                this.pushLikeBlogs(id);
              }
            });
            setTimeout(() => {
              this.click = 1;
            }, 5000);
          }
        }
      },
      initLikeStyle (id) {
        let index = this.likeBlogs.findIndex(blogId => {
          return blogId === id;
        });
        if (index >= 0) {
          this.activeLikeStyle();
        }
      },
      activeLikeStyle () {
        this.$refs.likeIcon.style.background = '#85b7e2';
        this.$refs.likeIcon.style.border = '2px solid #85b7e2';
        this.$refs.likeIcon.style.color = '#fff';
        this.$refs.num.style.color = '#85b7e2';
      },
      getArticleBBS (id) {
        const item = {
          reply_id: id,
          type: 2,
          limit: 10,
          page: 1
        };
        getComment(item).then(res => {
          if (res.status === 0) {
            this.bbsList = res.data;
          }
        });
      },
      getAdjacentArticle () {
        const item = {
          id: this.article.blog_id,
          show: this.article.blog_isShow
        };
        getAdjacent(item).then(res => {
          if (res.status === 0) {
            for (var index in res.data) {
              if (res.data[index].blog_id > this.article.blog_id) {
                this.last = res.data[index];
              } else {
                this.next = res.data[index];
              }
            }
          } 
        });
      },
      clickNear (type) {
        if (type === 'last') {
          if (this.manager.username && this.article.blog_isShow) {
            this.$router.push({path: `/admin/article/${this.last.blog_id}`});
          } else if (this.manager.username && !this.article.blog_isShow) {
            this.$router.push({path: `/admin/draft/${this.last.blog_id}`});
          } else if (!this.manager.username && this.article.blog_isShow) {
            this.$router.push({path: `/article/${this.last.blog_id}`});
          }
        }
        if (type === 'next') {
          if (this.manager.username && this.article.blog_isShow) {
            this.$router.push({path: `/admin/article/${this.next.blog_id}`});
          } else if (this.manager.username && !this.article.blog_isShow) {
            this.$router.push({path: `/admin/draft/${this.next.blog_id}`});
          } else if (!this.manager.username && this.article.blog_isShow) {
            this.$router.push({path: `/article/${this.next.blog_id}`});
          }
        }
      },
      addBBS (item) {
        if (!this.article.blog_id) {
          this.showAttention('文章不存在', false);
          return;
        }
        item.type = 2;
        if (!this.answerType && !this.isQuote) {
          item.reply_id = this.article.blog_id;
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
          item.reply_id = this.article.blog_id;
          item.to_email = this.quoteObj.email;
          item.to_content = this.quoteObj.content;
          item.old_user = this.quoteObj.name;
          quote(item).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.routerGo();
            }
          });
        }
      },
      deletebbs (id) {
        deleteBBS(id).then(res => {
          if (res.status === 0) {
            this.showAttention(res.info, true);
            // this.routerGo();
          }
        });
      },
      deleteChild (id) {
        deleteChildBBS(id).then(res => {
          if (res.status === 0) {
            this.showAttention(res.info, true);
            // this.routerGo();
          }
        });
      },
      _initTime (time) {
        return initTime(time);
      },
      ...mapActions([
        'pushLikeBlogs'
      ])
    },
    watch: {
      '$route' (to, from) {
        this.getBlogDetail(to.params.id);
      }
    },
    components: {
      MessageBoard,
      Comment,
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .blogDetailWrapper{
    padding-bottom: 100px;
    background: transparent;
    .detail{
      background: #fff;
      padding: 40px 45px;
      .article-title{
        text-align: center;
        font-size: 38px;
        margin-bottom: 12px;
        color: #555;
      }
      .time{
        text-align: center;
        color: #aeb0b1;
        font-size: 14px;
        span{
          display: inline-block;
          margin-right: 10px;
        }
      }
      .content{
        margin-top: 24px;
      }
      .detail-footer{
        margin: 24px 0;
        font-size: 14px;
        p{
          color: #aeb0b1;
        }
        .tag{
          color: #27ae60;
          font-size: 14px;
        }
        .share{
          margin-top: 24px;
        }
      }
      .adjacent{
        padding: 34px 0;
        zoom: 1;
        border-top: 1px solid #eee;
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
    .likeBtn{
      text-align: center;
      padding: 40px 0;
      color: #555;
      .icon-like{
        display: inline-block;
        border: 2px solid #555;
        padding: 15px;
        font-size: 30px;
        border-radius: 50%;
      }
      .num{
        // color: #555;
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .boardWrapper{
      background: #fff;
      padding: 40px 45px;
      .comment{
        margin-top: 50px;
      }
    }
  }
  /* markdown css */
  .markdownContent{
    font-size: 16px;
    line-height: 27px;
    color: #555;
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
    img{
      max-width: 300px;
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
  .slide-enter-active, .slide-leave-active{
    transition: all 0.6s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0); 
  }
</style>