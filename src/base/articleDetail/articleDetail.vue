<template>
  <div class="detailWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <h1 class="title">
      {{editBlog.blog_title}}
    </h1>
    <div class="time">
      <span><i class="icon-clock"></i> &nbsp;{{_initTime(editBlog.blog_pubTime)}}</span>
      <span><i class="icon-update"></i> &nbsp;{{_initTime(editBlog.blog_updateTime)}}</span>
      <span class="classify">{{editBlog.classify_text}}</span>
    </div>
    <div class="content">
      <div class="article_detail_content" v-html="compiledMarkdown"></div>
    </div>
    <ul class="tags">
      <li v-for="tag in editBlog.blog_tags.split('/')">{{tag}}</li>
    </ul>
    <div class="likeANDshare">
      <div class="like">
        <div class="likeIcon">
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
</template>

<script>
  import MessageBoard from '../message-board/message-board';
  import Comment from '../../base/comment/comment';
  import Attention from '../../base/attention/attention';
  import {mapGetters, mapMutations} from 'vuex';
  import {comment, getComment, addChildBBS, deleteChildBBS, deleteBBS, quote} from '../../api/bbs';
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
        comments: []
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
    },
    methods: {
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
    components: {
      MessageBoard,
      Comment,
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .detailWrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #000;
    padding: 65px 45px 50px;
    box-sizing: border-box;
    .title{
      font-size: 28px;
      color: #444;
      font-weight: 200;
    }
    .content{
      margin-top: 57px;
      margin-bottom: 60px;
      width: 800px;
      .article_detail_content {
        text-align: left;
        font-size: 18px;
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
    .likeANDshare{
      display: flex;
      justify-content: center;
      width: 800px;
      margin: 50px 0;
      .like{
        width: 400px;
        text-align: center;
        .likeIcon{
          width: 60px;
          height: 60px;
          text-align: center;
          border-radius: 50%;
          border: 2px solid #85b7e2;
          background-color: #85b7e2;
          margin: 0 auto;
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
</style>