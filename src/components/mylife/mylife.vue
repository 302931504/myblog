<template>
  <div class="mylifeWrapper">
    <div class="listWrapper">
      <div class="head">
        <h1>一个好人</h1>
        <p>这个世界好人很多，如果你找不到，就成为一个。</p>
      </div>
      <walking-list :blogList="walkingBlogs"
                    @selectBlog="selectBlog"></walking-list>
    </div>
    <div class="pageBtn">
      <page-btn :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
    </div>
  </div>
</template>

<script>
  import WalkingList from '../../base/walking-list/walking-list';
  import PageBtn from '../../base/page-btn/page-btn';
  import {getWalkingBlog} from '../../api/walking-blog';
  import {initPageMixin} from '../../common/js/mixin';

  export default {
    mixins: [initPageMixin],
    data () {
      return {
        walkingBlogs: []
      };
    },
    created () {
      this._getWalkingBlog();
    },
    methods: {
      selectBlog (item) {
        this.$router.push({path: `/mylife/${item.id}`});
      },
      _getWalkingBlog () {
        const item = {
          page: this.currentPage,
          limit: this.limit
        };
        getWalkingBlog(item).then(res => { 
          if (res.status === 0) {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
              this.walkingBlogs.push({id: arr[i].walking_blog_id, 
                                      content: arr[i].walking_blog_content,
                                      hot: arr[i].walking_blog_likeNum,
                                      comment_count: arr[i].comment_count, 
                                      time: arr[i].walking_blog_time,
                                      tags: arr[i].walking_blog_tags.split('/'),
                                      img_url: arr[i].w_img_url});
            }
          }
        });
      }
    },
    components: {
      WalkingList,
      PageBtn
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mylifeWrapper{
    box-sizing: border-box;
    padding-bottom: 20px;
    .listWrapper{
      width: 853px;
      background: #fff;
      margin: 0 auto;
      margin-top: 50px;
      .head{
        text-align: center;
        background: url('./header.jpg') no-repeat;
        background-size: cover;
        height: 380px;
        color: #fff;
        padding-top: 133px;
        box-sizing: border-box;
        h1{
          font-size: 30px;
          font-weight: 200;
        }
        p{
          font-size: 15px;
          margin-top: 25px;
        }
      }
    }
    .pageBtn{
      margin-top: 26px;
    }
  }
</style>