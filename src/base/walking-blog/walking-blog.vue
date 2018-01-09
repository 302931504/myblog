<template>
  <transition name="slide">
    <div class="walkingBlogWrapper">
      <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
      <div class="blogContent">
        <div class="time">
          <div class="day">{{getDay(editBlog.time)}}</div>
          <p class="month">{{getMonth(editBlog.time)}}</p>
        </div>
        <div class="mainC">
          <div class="main">
            <div class="content">
              {{editBlog.content}}
            </div>
            <div class="tags">
              <span v-for="tag in editBlog.tags">● {{tag}}</span>
            </div>
          </div>
          <div class="main">
            <p class="commentName">评论({{comments.length}})</p>
            <textarea name="" class="comment" @click.stop="clickcomment" ref="commentBox" v-model="content"></textarea>
            <div class="info" v-show="showInfo">
              <p class="label">你的昵称*:</p>
              <input type="text" name="" placeholder="必填" v-model="name">
              <p class="label">Email*:</p>
              <input type="email" name="" placeholder="必填" v-model="email">
            </div>
            <button type="" class="publish" @click.stop="_comment">发表</button>
            <message-board :isBBS="false" :bbsList="comments" @answer="answer" @deletebbs="_deleteBBS"></message-board>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import MessageBoard from '../message-board/message-board';
  import Attention from '../../base/attention/attention';
  import {mapGetters, mapMutations} from 'vuex';
  import {getComment, comment, addChildBBS, deleteBBS} from '../../api/bbs';
  import {showAttentionMixin} from '../../common/js/mixin';
  import {initBBS} from '../../common/js/util';

  export default {
    mixins: [showAttentionMixin],
    data () {
      return {
        showInfo: false,
        content: '',
        name: '',
        email: '',
        comments: [],
        answerType: 0,
        answerId: -1
      };
    },
    computed: {
      ...mapGetters([
        'editBlog'
      ])
    },
    created () {
      this.getComments();
    },
    methods: {
      getComments () {
        const item = {
          reply_id: this.editBlog.id,
          type: 1
        };
        getComment(item).then(res => {
          if (!res.status) {
            this.comments = initBBS(res.data);
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
        this.content = '回复 ' + item.name + ':';
        this.answerId = item.id;
        this.answerType = 1;
      },
      _comment () {
        if (!this.answerType) {
          const item = {
            reply_id: this.editBlog.id,
            user_email: this.email,
            user_name: this.name,
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
            parent_id: this.answerId,
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
        deleteBBS(id).then(res => {
          if (!res.status) {
            this.showAttention(res.info, true);
            setTimeout(() => {
              this.routerGo();
            }, 3000);
          }
        }); 
      },
      routerGo () {
        this.setBackPath(this.$route.path);
        this.$router.push('/admin/back');
      },
      ...mapMutations({
        setBackPath: 'SET_BACKPATH'
      })
    },
    components: {
      MessageBoard,
      Attention
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