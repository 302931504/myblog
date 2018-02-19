<template>
  <div class="followUsersWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="options" @clickOption="clickOption"></search-box>
    <no-content v-show="userList.length === 0" :info="noneInfo"></no-content>
    <div class="content" v-show="userList.length > 0">
      <follow-list :userList="userList" @deleteUser="_deleteUser"></follow-list>
      <page-btn class="pageBtn" :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
    </div>
    <follow-edit class="userEdit" v-show="showFlag2" :showFlag="showFlag2" @close="closeEdit" @addUser="addUser"></follow-edit>
    <caution :showFlag="showFlag" :text="text" @cancel="cancel" @sure="sure"></caution>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import FollowList from '../followList/followList';
  import PageBtn from '../../base/page-btn/page-btn';
  import FollowEdit from '../../base/followEdit/followEdit';
  import Caution from '../../admin/caution/caution';
  import Attention from '../../base/attention/attention';
  import NoContent from '../../base/no-content/no-content';
  import {getUserList, deleteUser, getCount} from '../../api/users';
  import {cautionMixin, showAttentionMixin, initPageMixin} from '../../common/js/mixin';

  export default {
    mixins: [cautionMixin, showAttentionMixin, initPageMixin],
    data () {
      return {
        options: [
          {text: '添加用户', name: 'addUser'}
        ],
        showFlag2: false,
        userList: [],
        usersCount: 0,
        noneInfo: ''
      };
    },
    created () {
      this.getByPage();
      this.getUserCount();
    },
    computed: {
    },
    methods: {
      getUserCount () {
        getCount().then(res => {
          if (res.status === 0) {
            this.usersCount = res.data;
            this.initPage(this.usersCount);
          }
        });
      },
      clickOption (text) {
        if (text === '添加用户') {
          this.showFlag2 = true; 
        }
      },
      closeEdit () {
        this.showFlag2 = false;
      },
      addUser (item) {
        this.showFlag2 = false;
        this.routerGo();
      },
      _deleteUser (id) {
        this.showFlag = true;
        this.text = '确认删除此用户吗？';
        this.id = id; 
      },
      sure () {
        deleteUser(this.id).then(res => {
          if (res.status === 0) {
            this.routerGo();
            this.showAttention(res.info, true);
            this.showFlag = false;
          }
        }).catch(err => err);
      },
      getByPage () {
        getUserList(this.currentPage).then(res => {
          if (res.status === 0) {
            this.userList = res.data;
          } else {
            this.noneInfo = res.info;
          }
        }).catch(err => err);
      } 
    },
    components: {
      SearchBox,
      FollowList,
      PageBtn,
      FollowEdit,
      Caution,
      Attention,
      NoContent
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .followUsersWrapper{
    color: #000;
    .content{
      margin-top: 10px;
      .pageBtn{
        margin-top: 20px;
      }
    }
    .userEdit{
      position: fixed;
      top: 30%;
      left: 30%;
    }
    .change{
      position: fixed;
      top: 30%;
      left: 30%;
    }
  }
</style>