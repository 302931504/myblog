<template>
  <div class="followUsersWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <search-box :options="options" @clickOption="clickOption"></search-box>
    <div class="content">
      <follow-list :userList="userList" @deleteUser="_deleteUser"></follow-list>
    </div>
    <page-btn v-show="usersCount > 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
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
  import {getUserList, deleteUser} from '../../api/users';
  import {cautionMixin, showAttentionMixin, initPageMixin} from '../../common/js/mixin';
  import {mapGetters} from 'vuex';

  export default {
    mixins: [cautionMixin, showAttentionMixin, initPageMixin],
    data () {
      return {
        options: [
          {text: '添加用户', name: 'addUser'}
        ],
        showFlag2: false,
        userList: []
      };
    },
    created () {
      this.getByPage();
      this.initPage(this.usersCount);
    },
    computed: {
      ...mapGetters([
        'usersCount'
      ])
    },
    methods: {
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
            let index = this.userList.findIndex(item => {
              return item.user_id === this.id;
            });
            this.userList.splice(index, 1);
            this.showAttention(res.info, true);
            this.showFlag = false;
          }
        }).catch(err => err);
      },
      getByPage () {
        getUserList(this.currentPage).then(res => {
          if (res.status === 0) {
            this.userList = res.data;
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
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .followUsersWrapper{
    color: #000;
    .content{
      margin-top: 10px;
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