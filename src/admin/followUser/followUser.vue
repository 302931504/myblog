<template>
  <div class="followUsersWrapper">
    <search-box :options="options" @clickOption="clickOption"></search-box>
    <div class="content">
      <follow-list :userList="userList" @deleteUser="_deleteUser"></follow-list>
    </div>
    <page-btn></page-btn>
    <follow-edit class="userEdit" v-show="showFlag" :showFlag="showFlag" @close="closeEdit" @addUser="addUser"></follow-edit>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import FollowList from '../followList/followList';
  import PageBtn from '../../base/page-btn/page-btn';
  import FollowEdit from '../../base/followEdit/followEdit';
  import {getUserList, deleteUser} from '../../api/users';

  export default {
    data () {
      return {
        options: [
          {text: '添加用户', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ],
        showFlag: false,
        userList: []
      };
    },
    created () {
      this._getUserList();
    },
    methods: {
      clickOption (name) {
        if (name === 'topBlogBtn') {
          this.showFlag = true;
        }
      },
      closeEdit () {
        this.showFlag = false;
      },
      addUser (item) {
        this.userList.push(item);
      },
      editUser (item) {
        this.user = item;
        this.showChange = true;
      },
      _deleteUser (id) {
        deleteUser(id).then(res => {
          if (res.status === 0) {
            let index = this.userList.findIndex(item => {
              return item.user_id === id;
            });
            this.userList.splice(index, 1);
          }
        }).catch(err => err);
      },
      _getUserList () {
        getUserList().then(res => {
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
      FollowEdit
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