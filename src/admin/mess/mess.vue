<template>
  <div class="messWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="[]" :readonly="true"></search-box>
    <div class="content">
      <message-board :bbsList="bbs" @answer="answer" @deletebbs="_deleteBBS" @deleteChild="_deleteChildBBS"></message-board>
      <page-btn v-show="bbsCount > 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
      <comment @addBBS="addBBS"></comment>
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
  import {getBBSList, getBBSChildList, comment, addChildBBS, deleteBBS, deleteChildBBS} from '../../api/bbs';
  import {initPageMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
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
      this._getBBSList();
      this.initPage(this.bbsCount);
    },
    computed: {
      ...mapGetters([
        'bbsCount'
      ])
    },
    methods: {
      answer (item) {
        this.showAnswer = true;
        this.answerId = item.id;
      },
      _getBBSList () {
        const item = {
          reply_id: 0,
          page: this.currentPage,
          type: 0
        };
        getBBSList(item).then(res => {
          let arr = res.data;
          if (res.status === 0) {
            for (let i = 0; i < arr.length; i++) {
              this.bbs.push({id: arr[i].bbs_id,
                    reply_id: arr[i].reply_id,
                    email: arr[i].user_email,
                    name: arr[i].user_name,
                    content: arr[i].bbs_content,
                    time: arr[i].bbs_time,
                    type: arr[i].type,
                    child: []});
            }
            this._getBBSChildList();
          }
        });
      },
      _getBBSChildList () {
        getBBSChildList().then(res => {
          let arr2 = res.data;
          if (res.status === 0) {
            for (let i = 0; i < this.bbs.length; i++) {
              for (let j = 0; j < arr2.length; j++) {
                if (this.bbs[i].id === arr2[j].parent_id) {
                  this.bbs[i].child.push({id: arr2[j].bbs_child_id,
                       user_email: arr2[j].user_email,
                       user_name: arr2[j].user_name,
                       content: arr2[j].bbs_child_content,
                       time: arr2[j].bbs_child_time});
                }
              }
            }
          }
        });
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
      margin-top: 10px;
      .answerWrapper{
        position: fixed;
        top: 30%;
        left: 30%;
        background: #fff;
        box-shadow: 8px 8px 6px #888888;
      }
    }
  }
</style>