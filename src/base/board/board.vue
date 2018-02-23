<template>
  <transition name="slide">
    <div class="messWrapper">
      <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
      <div class="content">
        <div class="noContent" v-show="bbs.length === 0">
          <no-content :info="noneInfo"></no-content>
        </div>
        <div class="board" v-show="bbs.length > 0">
          <message-board :bbsList="bbs"
                         :floor="bbsCount" 
                         @answer="answer" 
                         @deletebbs="_deleteBBS" 
                         @deleteChild="_deleteChildBBS"
                         @quoteto="quoteto">
          </message-board>
          <div class="more" v-if="bbs.length < bbsCount">
            <p @click="readMore">加载更多</p>
          </div>
        </div>
        <div class="comWrap">
          <comment @addBBS="addBBS" :placeholder="content"></comment>
        </div>
      </div>
      <caution :showFlag="showFlag" :text="text" @cancel="cancel" @sure="sure"></caution>
    </div>
  </transition>
</template> 

<script>
  import MessageBoard from '../../base/message-board/message-board';
  import Comment from '../../base/comment/comment';
  import Attention from '../../base/attention/attention';
  import Caution from '../../admin/caution/caution';
  import NoContent from '../no-content/no-content';
  import {comment, addChildBBS, deleteBBS, deleteChildBBS, getComment, quote, getCommentCount} from '../../api/bbs';
  import {showAttentionMixin, cautionMixin, quoteMixin} from '../../common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [showAttentionMixin, cautionMixin, quoteMixin],
    data () {
      return {
        bbs: [],
        bbsCount: 0,
        currentPage: 1,
        noneInfo: ''
      };
    },
    created () {
      this.getBBSList(); 
      this.getCommentNum();
    },
    computed: {
    },
    methods: {
      readMore () {
        this.currentPage += 1;
        this.getBBSList();
      },
      getBBSList () {
        const item = {
          reply_id: 0,
          type: 0,
          page: this.currentPage,
          limit: 10
        };
        getComment(item).then(res => {
         if (res.status === 0) {
          this.bbs = res.data;
         } else {
          this.noneInfo = res.info;
         } 
        });
      },
      getCommentNum () {
        const item = {
          reply_id: 0,
          type: 0
        };
        getCommentCount(item).then(res => {
          if (res.status === 0) {
            this.bbsCount = res.data[0].num;
          }
        });
      },
      addBBS (item) {
        item.type = 0;
        item.reply_id = 0;
        if (!this.answerType && !this.isQuote) {
          comment(item).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.routerGo();
            }
          });
        }
        if (this.answerType && !this.isQuote) {
          item.parent_id = this.answerId;
          addChildBBS(item).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.routerGo();
            }
          });
        }
        if (this.isQuote) {
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
      _deleteBBS (id) {
        this.showFlag = true;
        this.text = '确认删除？';
        this.answerId = id;
        this.status = 0;
      },
      sure () {
        if (this.status === 0) {
          deleteBBS(this.answerId).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.showFlag = false;
            }
          });
        }
        if (this.status === 1) {
          deleteChildBBS(this.answerId).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.showFlag = false;
            }
          });
        }
        setTimeout(() => {
          this.routerGo();
        }, 4000);
      },
      _deleteChildBBS (id) {
        this.showFlag = true;
        this.text = '确认删除？';
        this.answerId = id;
        this.status = 1;
      },
      ...mapMutations({
        setBackPath: 'SET_BACKPATH'
      })
    },
    components: {
      MessageBoard,
      Comment,
      Attention,
      Caution,
      NoContent
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .messWrapper{
    color: #333;
    padding-bottom: 20px;
    .content{
      padding: 40px 45px;
      margin: 0 auto;
      margin-top: 50px;
      width: 853px;
      background: #fff;
      .board{
      }
      .answerWrapper{
        position: fixed;
        top: 30%;
        left: 30%;
        background: #fff;
        box-shadow: 8px 8px 6px #888888;
      }
      .more{
        text-align: center;
        margin-top: 20px;
        p{
          cursor: pointer;
        }
      }
      .comWrap{
        margin-top: 80px;
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