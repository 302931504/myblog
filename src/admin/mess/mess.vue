<template>
  <div class="messWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="[]" :readonly="true"></search-box>
    <div class="content">
      <message-board :bbsList="bbs" @answer="answer" @deletebbs="_deleteBBS" @deleteChild="_deleteChildBBS"></message-board>
      <page-btn v-show="bbsCount > 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
      <comment class="comment" @addBBS="addBBS"></comment>
      <div class="answerWrapper" v-show="showAnswer">
        <comment @addBBS="_addChildBBS"></comment>
      </div>
    </div>
    <caution :showFlag="showFlag" :text="text" @cancel="cancel" @sure="sure"></caution>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import MessageBoard from '../../base/message-board/message-board';
  import Comment from '../../base/comment/comment';
  import PageBtn from '../../base/page-btn/page-btn';
  import Attention from '../../base/attention/attention';
  import Caution from '../../admin/caution/caution';
  import {comment, addChildBBS, deleteBBS, deleteChildBBS, getComment} from '../../api/bbs';
  import {initPageMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {initBBS} from '../../common/js/util';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    mixins: [initPageMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        bbs: [],
        showAnswer: false,
        answerId: -1
      };
    },
    created () {
      this.getBBSList();
      this.initPage(this.bbsCount);
    },
    computed: {
      ...mapGetters([
        'bbsCount'
      ])
    },
    methods: {
      getBBSList () {
        const item = {
          reply_id: 0,
          type: 0
        };
        getComment(item).then(res => {
          this.bbs = initBBS(res.data);
        });
      },
      answer (item) {
        this.showAnswer = true;
        this.answerId = item.id;
      },
      addBBS (item) {
        item.type = 0;
        item.reply_id = 0;
        comment(item).then(res => {
          if (res.status === 0) {
            this.showAttention(res.info, true);
            this.routerGo();
          }
        });
      },
      _addChildBBS (item) {
        item.parent_id = this.answerId;
        addChildBBS(item).then(res => {
          if (res.status === 0) {
            this.showAnswer = false;
            this.showAttention(res.info, true);
            this.routerGo();
          }
        });
      },
      _deleteBBS (id) {
        this.showFlag = true;
        this.text = '确认删除？';
        this.id = id;
        this.status = 0;
      },
      sure () {
        if (this.status === 0) {
          deleteBBS(this.id).then(res => {
            if (res.status === 0) {
              this.showAttention(res.info, true);
              this.showFlag = false;
            }
          });
        }
        if (this.status === 1) {
          deleteChildBBS(this.id).then(res => {
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
      routerGo () {
        this.setBackPath(this.$route.path);
        this.$router.push('/admin/back');
      },
      _deleteChildBBS (id) {
        this.showFlag = true;
        this.text = '确认删除？';
        this.id = id;
        this.status = 1;
      },
      ...mapMutations({
        setBackPath: 'SET_BACKPATH'
      })
    },
    components: {
      SearchBox,
      PageBtn,
      MessageBoard,
      Comment,
      Attention,
      Caution
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .messWrapper{
    color: #333;
    .content{
      padding: 40px;
      margin-top: 10px;
      .answerWrapper{
        position: fixed;
        top: 30%;
        left: 30%;
        background: #fff;
        box-shadow: 8px 8px 6px #888888;
      }
      .comment{
        margin-top: 80px;
      }
    }
  }
</style>