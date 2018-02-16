<template>
  <transition name="slide">
    <div class="walkingBlogWrapper">
      <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
      <div class="blogContent">
        <div class="time">
          <div class="day">{{getDay(wBlog.walking_blog_time)}}</div>
          <p class="month">{{getMonth(wBlog.walking_blog_time)}}</p>
        </div>
        <div class="mainC">
          <div class="main">
            <div class="content">
              <img :src="url" v-show="wBlog.w_img_url">
              <div class="text" v-html="wBlog.walking_blog_content"></div>
            </div>
            <div class="tags">
              <span v-for="tag in wBlog.walking_blog_tags">● {{tag}}</span>
            </div>
          </div>
          <div class="main">
            <p class="commentName">评论({{commentsCount}})</p>
            <textarea name="" 
                      class="comment" 
                      @click.stop="clickcomment" 
                      ref="commentBox" 
                      v-model="content" 
                      :placeholder="placeholder"></textarea>
            <div class="info" v-show="showInfo && manager">
              <p class="label">你的昵称*:</p>
              <input type="text" name="" placeholder="必填" v-model="name">
              <p class="label">Email*:</p>
              <input type="email" name="" placeholder="必填" v-model="email">
            </div>
            <button type="" class="publish" @click.stop="_comment">发表</button>
            <message-board class="messb" :isBBS="false" :bbsList="comments" @answer="answer" @deletebbs="_deleteBBS"></message-board>
          </div>
        </div>
      </div>
      <caution :text="text" 
               :showFlag="showFlag" 
               @cancel="cancel" 
               @sure="sure"></caution>
    </div>
  </transition>
</template>

<script>
  import MessageBoard from '../message-board/message-board';
  import Attention from '../../base/attention/attention'; 
  import Caution from '../../admin/caution/caution';
  import {mapGetters} from 'vuex';
  import {getComment, comment, addChildBBS, deleteBBS} from '../../api/bbs';
  import {getWalkDetail} from '../../api/walking-blog';
  import {showAttentionMixin, cautionMixin} from '../../common/js/mixin';

  export default {
    mixins: [showAttentionMixin, cautionMixin],
    data () {
      return {
        wBlog: {},
        showInfo: false,
        content: '',
        name: '',
        email: '',
        comments: [],
        answerType: 0,
        commentsCount: 0,
        url: 'http://img5.duitang.com/uploads/item/201411/13/20141113195832_PAxSh.jpeg',
        placeholder: ''
      };
    },
    computed: {
      ...mapGetters([
        'manager'
      ])
    },
    created () {
      this.getDetail();
    },
    methods: {
      getDetail () {
        let id = this.$route.params.id;
        getWalkDetail(id).then(res => {
          if (res.status === 0) {
            this.wBlog = res.data[0];
            this.wBlog.walking_blog_tags = this.wBlog.walking_blog_tags.split('/');
            this.getComments(id);
          }
        });
      },
      getComments (id) {
        const item = {
          reply_id: id,
          type: 1, 
          limit: 10,
          page: 1
        };
        getComment(item).then(res => {
          if (!res.status) {
            this.comments = res.data;
            this.commentsCount = this.comments ? this.comments.length : 0;
          }
        });
      },
      clickcomment () {
        this.$refs.commentBox.style.height = '110px';
        this.showInfo = true;
      },
      getDay (time) {
        let myDate = new Date(time);
        return myDate.getDate();
      },
      getMonth (time) {
        let myDate = new Date(time);
        return myDate.getMonth() + 1;
      },
      answer (item) {
        this.placeholder = '回复 ' + item.name + ':';
        this.id = item.id;
        this.answerType = 1;
      },
      cancel () {
        this.showFlag = false;
      },
      sure () {
        this.showFlag = false;
        deleteBBS(this.id).then(res => {
          if (!res.status) {
            this.showAttention(res.info, true);
            setTimeout(() => {
              this.routerGo();
            }, 3000);
          }
        });
      },
      _comment () {
        if (this.content === '') {
          this.showAttention('请输入内容', false);
          return;
        } else if (!this.manager && (this.email === '' || this.name === '')) {
          this.showAttention('请输入*信息', false);
          return;
        }
        if (!this.answerType) {
          const item = {
            reply_id: this.$route.params.id,
            user_email: this.manager.email ? this.manager.email : this.email,
            user_name: this.manager.email ? this.manager.nickname : this.name,
            bbs_content: this.content,
            type: 1
          };
          comment(item).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              setTimeout(() => {
                this.routerGo();
              }, 3000);
            }
          });
        } else {
          const item = {
            parent_id: this.id,
            user_email: this.email,
            user_name: this.name,
            bbs_content: this.content
          };
          addChildBBS(item).then(res => {
            if (!res.status) {
              this.showAttention(res.info, true);
              setTimeout(() => {
                this.routerGo();
              }, 3000);
            }
          });
        }
      },
      _deleteBBS (id) {
        this.text = '是否删除该评论';
        this.showFlag = true;
        this.id = id;
      }
    },
    components: {
      MessageBoard,
      Attention,
      Caution
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .walkingBlogWrapper{
    width: 100%;
    height: 100%;
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
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
      .mainC{
        width: 100%;
      }
      .main{
        width: 100%;
        margin-left: 20px;
        background: url('./line.png') bottom repeat-x;
        padding:20px 0 48px 0;
        zoom: 1;
        .content{
          font-size: 15px;
          color: #737373;
          line-height: 24px;
          img{
            width: 500px;
          }
        }
        .messb{
          margin-top: 80px;
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
        .commentName{
          margin-top: 20px;
          font-size: 14px;
          color: #939393;
        }
        .comment{
          width: 100%;
          min-height: 70px;
          resize: none;
          border: 1px solid #ccc;
          font-size: 14px;
          padding: 7px 9px;
          margin-top: 10px;
          box-sizing: border-box;
          outline: none;
          transition: all .4s ease-out;
        }
        .publish{
          float: right;
          margin-top: 5px;
          font-size: 12px;
          padding: 4px 30px;
          color: #fff;
          background-color: #777;
          border: 0;
          font-family: inherit;
          cursor: pointer;
        }
        .info{
          transition: all .4s;
          .label{
            font-size: 14px;
            line-height: 30PX;
            color: #828d95;
          }
          input{
            width: 250px;
            outline: none;
            border: 1px solid #ccc;
            font-size: 14px;
            padding: 7px 9px;
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
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.6s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0); 
  }
</style>