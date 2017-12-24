<template>
  <div class="walkBlogWrapper">
    <div class="writeBlogBox">
      <div class="content">
        <textarea name="" placeholder="说点儿什么吧..." v-model="content"></textarea>
        <div class="imgWrapper"><span class="icon-camera"></span></div>
      </div>
      <div class="tags">
        <input type="text" name="" placeholder="输入标签，以‘/’分割" v-model="tags">
        <button type="button" @click.stop="_addWalkingBlog">发布</button>
      </div>  
    </div>
    <div class="walkingListBox">
      <walking-list :blogList="walkingBlogs"></walking-list>
    </div>
  </div>
</template>

<script>
  import WalkingList from '../../base/walking-list/walking-list'; 
  import {addWalkingBlog, getWalkingBlog} from '../../api/walking-blog';
  export default {
    data () {
      return {
        content: '',
        tags: '',
        walkingBlogs: []
      };
    },
    created () {
      this._getWalkingBlog();
    },
    methods: {
      _addWalkingBlog () {
        const blog = {
          content: this.content,
          tags: this.tags
        };
        addWalkingBlog(blog).then(res => {
          console.log(res);
        });
      },
      _getWalkingBlog () {
        getWalkingBlog().then(res => {
          if (res.status === 0) {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
              this.walkingBlogs.push({id: arr[i].walking_blog_id, 
                                      content: arr[i].walking_blog_content,
                                      hot: arr[i].walking_blog_likeNum, 
                                      time: arr[i].walking_blog_time,
                                      tags: arr[i].walking_blog_tags.split('/')});
            }
          }
        });
      }
    },
    components: {
      WalkingList
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .walkBlogWrapper{
    color: #000;
    width: 80%;
    margin: 0 auto;
    .writeBlogBox{
      .content{
        display: flex;
        textarea{
          width: 600px;
          height: 80px;
          resize: none;
          padding: 4px;
          box-sizing: border-box;
          outline: none;
          font-size: 16px;
        }
        .imgWrapper{
          width: 50px;
          height: 78px;
          line-height: 80px;
          text-align: center;
          font-size: 26px;
          color: rgb(169, 169, 169);
          border: 1px solid rgb(169, 169, 169);
          border-left: none;
        }
      }
      .tags{
        font-size: 0;
        display: flex;
        input{
          width: 600px;
          font-size: 16px;
          outline: none;
          border: 1px solid rgb(169, 169, 169);
          border-top: none;
          vertical-align: top;
          padding: 4px;
          box-sizing: border-box;
        }
        button{
          display: inline-block;
          width: 50px;
          height: 30px;
          color: #fff;
          background: #1AA094;
          border: 1px solid #1AA094;
          border-left: none;
        }
      }  
    }
    .walkingListBox{
      margin-top: 30px;
    }
  }
</style>