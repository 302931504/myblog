<template>
  <div class="followUsersWrapper">
    <search-box :options="options"></search-box>
    <div class="content">
      <follow-list></follow-list>
    </div>
    <page-btn></page-btn>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import FollowList from '../followList/followList';
  import PageBtn from '../../base/page-btn/page-btn';

  export default {
    data () {
      return {
        options: [
          {text: '添加用户', name: 'topBlogBtn'},
          {text: '批量删除', name: 'deleteAllBtn'}
        ]
      };
    },
    components: {
      SearchBox,
      FollowList,
      PageBtn
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .followUsersWrapper{
    color: #000;
    .content{
      margin-top: 10px;
    }
  }
</style>