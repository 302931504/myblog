<template>
  <div class="detailWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <h1 class="title">
      {{editBlog.blog_title}}
    </h1>
    <div class="time">
      <span><i class="icon-camera"></i> &nbsp;2018-01-07 05:22</span>
      <span><i class="icon-camera"></i> &nbsp;2018-01-07 05:22</span>
      <span class="classify">{{editBlog.classify_text}}</span>
    </div>
    <div class="content">
      <mavon-editor style="width: 800px; box-shadow: none" v-model="editBlog.blog_content" :toolbarsFlag="false" :subfield="false" default_open="preview"></mavon-editor>
    </div>
    <ul class="tags">
      <li v-for="tag in editBlog.blog_tags.split('/')">{{tag}}</li>
    </ul>
    <div class="like">
      <span class="icon-point-up"></span>
      <p class="num">点赞(10)</p>
    </div>
    <div class="comment">
      <message-board :bbsList="comments"></message-board>
      <comment @addBBS="addBBS"></comment>
    </div>
  </div>
</template>

<script>
  import MessageBoard from '../message-board/message-board';
  import Comment from '../../base/comment/comment';
  import Attention from '../../base/attention/attention';
  import {mapGetters, mapMutations} from 'vuex';
  import {comment, getBBSList} from '../../api/bbs';
  import {showAttentionMixin} from '../../common/js/mixin';

  export default {
    mixins: [showAttentionMixin],
    data () {
      return {
        comments: []
      };
    },
    computed: {
      ...mapGetters([
        'editBlog'
      ])
    },
    created () {
      this._getBBSList();
    },
    methods: {
      _getBBSList () {
        const item = {
          reply_id: this.editBlog.blog_id,
          page: 1,
          type: 2
        };
        getBBSList(item).then(res => {
          let arr = res.data;
          if (res.status === 0) {
            for (let i = 0; i < arr.length; i++) {
              this.comments.push({id: arr[i].bbs_id,
                    reply_id: arr[i].reply_id,
                    email: arr[i].user_email,
                    name: arr[i].user_name,
                    content: arr[i].bbs_content,
                    time: arr[i].bbs_time,
                    type: arr[i].type
                  });
            }
          }
        });
      },
      addBBS (item) {
        item.type = 2;
        item.reply_id = this.editBlog.blog_id;
        comment(item).then(res => {
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
      li{
        display: inline-block;
        margin-right: 12px;
        font-size: 13px;
        background-color: #f5f5f5;
        padding: 4px 6px;
        color: #555;
      }
    }
    .like{
      width: 800px;
      text-align: center;
      margin: 50px 0;
      .num{
        margin-top: 10px;
      }
    }
  }
</style>