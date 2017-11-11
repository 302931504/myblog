<template>
  <div class="articalWrapper">
    <div class="head">
      <ul class="nav">
        <li class="allBlog">全部</li>
        <li class="online">已发布</li>
        <li class="local">草稿箱</li>
      </ul>
      <router-link tag="div" class="toEditBlog" to="/admin/mainBackstage/blog/articalEdit">编辑新文章</router-link>
    </div>
    <div class="content">
      <artical-list :blogs="blogs"></artical-list>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import ArticalList from '../../base/artical-list/artical-list';

  export default {
    data () {
      return {
        blogs: [],
        page: 1
      };
    },
    created () {
      this.getAllBlog();
    },
    methods: {
      getAllBlog () {
        this.$http.get('api/adminGetByPage?page=' + this.page).then((res) => {
          let data = res.data;
          if (data.status === 0) {
            this.blogs = data.data;
          }
        }).catch(err => err);
      }
    },
    components: {
      ArticalList
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .articalWrapper{
    width: 80%;
    height: 100%;
    background: #F0F0F0;
    overflow-y: auto;
    .head{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .nav{
        display: flex;
        margin-left: 10px;
        li{
          padding: 10px 10px;
          background: #4F4F4F;
          margin: 0 10px;
          border-radius: 6px;
          &:hover{
            background: #8E8E8E;
          }
          &:active{
            background: #9D9D9D;
          }
        }
      }
      .toEditBlog{
        width: 100px;
        text-align: center;
        line-height: 40px;
        background: #9D9D9D;
        border-radius: 6px;
        margin-right: 20px;
        &:hover{
          background: #01814A;
        }
      }
    }
  }
</style>