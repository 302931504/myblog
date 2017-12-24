<template>
  <div class="messWrapper">
    <search-box :options="[]" :readonly="true"></search-box>
    <div class="content">
      <message-board :bbsList="bbs" @answer="answer" @deletebbs="_deleteBBS" @deleteChild="_deleteChildBBS"></message-board>
      <page-btn></page-btn>
      <comment @addBBS="_addBBS"></comment>
      <div class="answerWrapper" v-show="showAnswer">
        <comment @addBBS="_addChildBBS"></comment>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import MessageBoard from '../../base/message-board/message-board';
  import Comment from '../../base/comment/comment';
  import PageBtn from '../../base/page-btn/page-btn';
  import {getBBSList, getBBSChildList, addBBS, addChildBBS, deleteBBS, deleteChildBBS} from '../../api/bbs';

  export default {
    data () {
      return {
        bbs: [],
        showAnswer: false,
        answerId: -1
      };
    },
    created () {
      this._getBBSList();
    },
    methods: {
      answer (item) {
        this.showAnswer = true;
        this.answerId = item.id;
      },
      _getBBSList () {
        getBBSList().then(res => {
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
            console.log(this.bbs);
          }
        });
      },
      _getBBSChildList () {
        getBBSChildList().then(res => {
          console.log(res);
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
      _addBBS (item) {
        item.type = 0;
        addBBS(item).then(res => {
          console.log(res);
          this.$router.push({path: '/admin/mainBackStage/mess'});
        });
      },
      _addChildBBS (item) {
        item.parent_id = this.answerId;
        addChildBBS(item).then(res => {
          if (res.status === 0) {
            this.showAnswer = false;
            this.$router.replace({path: '/admin/mainBackStage/mess'});
          }
        });
      },
      _deleteBBS (id) {
        deleteBBS(id).then(res => {
          console.log(res);
        });
      },
      _deleteChildBBS (id) {
        deleteChildBBS(id).then(res => {
          console.log(res);
        });
      }
    },
    components: {
      SearchBox,
      PageBtn,
      MessageBoard,
      Comment
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