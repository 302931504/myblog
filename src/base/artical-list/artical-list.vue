<template>
  <div class="articalListWrapper">
    <div class="content">
      <ul>
        <li class="artical-item" v-for="item in blogs">
          <h1>{{item.title}}</h1>
          <div class="about">
            <span><i class="icon-clock"></i> {{item.time.createTime}}</span>
            <span><i class="icon-loop2"></i> {{item.time.updateTime}}</span>
            <span>{{item.model}}</span>
          </div>
          <p>{{item.summary}}</p>
          <div class="tagsOrlooks">
            <ul>
              <li v-for="tag in item.label.split('/')">{{tag}}</li>
            </ul>
            <div class="views">
              <span>阅读(20)</span>
              <span>评论(50)</span>
              <span>全文链接>></span>
            </div>
          </div>
          <div class="adminUse">
            <span>编辑</span>
            <span @click="deletBlog(item._id)">删除</span>
            <span class="send">发布</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      blogs: {
        type: Array,
        default: []
      }
    },
    methods: {
      deletBlog (id) {
        this.$http.post('api/adminDeletBlog?id=' + id).then((res) => {
          console.log(res);
        }).catch(err => err);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .articalListWrapper{
    color: #3C3C3C;
    margin-top: 20px;
    width: 100%;
    .content{
      width: 80%;
      margin: 0 auto;
      .artical-item{
        padding: 20px;
        margin-bottom: 20px;
        background: #fff;
        h1{
          font-size: 23px;
          margin-bottom: 10px;
        }
        .about{
          font-size: 0;
        }
        span{
          margin-right: 20px;
          font-size: 12px;
          color: #aaa;
        }
        p{
          color: #555;
          margin: 20px 0;
        }
        .tagsOrlooks{
          display: flex;
          justify-content: space-between;
          font-size: 0;
          ul{
            display: flex;
          }
          li, span{
            font-size: 12px;
            color: #aaa;
            margin-left: 10px;
          }
          li:hover{
            color: #5B5B5B;
          }
        }
        .adminUse{
          text-align: right;
          margin-top: 10px;
          span:hover{
            color: #004B97;
          }
          .send{
            display: inline-block;
            padding: 6px 10px;
            background: #6C6C6C;
            color: #fff;
            border-radius: 2px;
            &:hover{
              background: #7B7B7B;
              color: #fff;
            }
          }
        }
      }
    }

  }
</style>