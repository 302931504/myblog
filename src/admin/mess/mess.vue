<template>
  <div class="messWrapper" ref="cont">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="[]" :readonly="true"></search-box>
    <div class="content">
      <message-board :bbsList="filterBBS"
                     :floor="bbs.length" 
                     @answer="answer" 
                     @deletebbs="_deleteBBS" 
                     @deleteChild="_deleteChildBBS"
                     @quoteto="quoteto">
      </message-board>
      <div class="pageBtn">
        <page-btn :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
      </div>
      <div ref="comWrap">
        <comment class="comment" @addBBS="addBBS" :placeholder="content"></comment>
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
  import {comment, addChildBBS, deleteBBS, deleteChildBBS, getComment, quote} from '../../api/bbs';
  import {initPageMixin, showAttentionMixin, cautionMixin, quoteMixin} from '../../common/js/mixin';
  import {initBBS} from '../../common/js/util';
  import {limit} from '../../common/js/param';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [initPageMixin, showAttentionMixin, cautionMixin, quoteMixin],
    data () {
      return {
        bbs: [],
        bbsLength: 10
      };
    },
    created () {
      this.getBBSList();
      setTimeout(() => {
        this.initPage(this.bbs.length);
      }, 100);   
    },
    computed: {
      filterBBS () {
        return this.bbs.slice(this.bbsLength - limit, this.bbsLength);
      }
    },
    methods: {
      getByPage () {
        this.bbsLength = this.currentPage * limit;
      },
      getBBSList () {
        const item = {
          reply_id: 0,
          type: 0
        };
        getComment(item).then(res => {
          this.bbs = initBBS(res.data);
          console.log();
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
            console.log(res);
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
      .pageBtn{
        margin-top: 20px;
      }
      .comment{
        margin-top: 80px;
      }
    }
  }
</style>