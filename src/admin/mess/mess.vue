<template>
  <div class="messWrapper">
    <search-box :options="[]" :readonly="true"></search-box>
    <div class="content">
      <message-board :bbsList="bbs"></message-board>
      <div><page-btn></page-btn></div>
      <comment @addBBS="_addBBS"></comment>
    </div>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import MessageBoard from '../../base/message-board/message-board';
  import Comment from '../../base/comment/comment';
  import PageBtn from '../../base/page-btn/page-btn';
  import {getBBSList, getBBSChildList, addBBS} from '../../api/bbs';

  export default {
    data () {
      return {
        bbs: []
      };
    },
    created () {
      this._getBBSList();
    },
    methods: {
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
                       sender_email: arr2[j].sender_email,
                       sender_name: arr2[j].sender_name,
                       receiver_email: arr2[j].receiver_email,
                       receiver_name: arr2[j].receiver_name,
                       content: arr2[j].bbs_child_content,
                       time: arr2[j].bbs_child_time});
                }
              }
            }
          }
        });
      }, 
      _addBBS (item) {
        item.reply_id = 0;
        addBBS(item).then(res => {
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
    }
  }
</style>