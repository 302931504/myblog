<template>
  <div class="blogListWrapper">
    <div class="listwrapper">
      <table class="bloglist">
        <thead>
          <tr>
            <th></th>
            <th style="text-align: left">文章标题</th>
            <th>分类</th>
            <th>标签</th>
            <th>更新时间</th>
            <th>发布时间</th>
            <th>操作</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="item in blogs">
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">{{item.blog_title}}</td>
            <td>{{item.classify_text}}</td>
            <td>{{item.blog_tags}}</td>
            <td>{{_initTime(item.blog_updateTime)}}</td>
            <td>{{_initTime(item.blog_createTime)}}</td>
            <td>
              <button type="button" class="edit" @click="editBlog(item.blog_id)">编辑</button>
              <button v-show="!type" type="button" class="delete" @click="deletBlog(item.blog_id)">删除</button>
              <button v-show="!type" type="button" class="publish" @click="publish(item.blog_id)">发布</button>
              <button v-show="type" type="button" class="delete" @click="moveDraft(item.blog_id)">移稿</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {initTime} from '../../common/js/util';

  export default {
    props: {
      blogs: {
        type: Array,
        default: function () {
          return [];
        }
      },
      type: 0
    },
    methods: {
      editBlog (id) {
        this.$emit('edit', id);
      },
      deletBlog (id) {
        this.$emit('delete', id);
      },
      publish (id) {
        this.$emit('publish', id);
      },
      moveDraft (id) {
        this.$emit('moveDraft', id);
      },
      _initTime (time) {
        return initTime(time);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .blogListWrapper{
    color: #000;
    overflow-y: auto;
    .listwrapper{
      margin-top: 10px;
      table{
        width: 100%;
        thead{
          background-color: #f2f2f2;
        }
        th{
          font-weight: 1000;
        }
        th, td{
          font-size: 14px;
          padding: 9px 15px;
          min-height: 20px;
          line-height: 20px;
          text-align: center;
          border: 1px solid #e2e2e2;
          button{
            color: #fff;
            height: 22px;
            line-height: 22px;
            padding: 0 5px;
            font-size: 12px;
            border: none;
            outline: none;
            opacity: .9;
            &:hover{
              opacity: .7;
            }   
          }
          .checkBlog{
            width: 20px;
            height: 20px;
          }
          .edit{
            background-color: #009688;
          }
          .delete{
            background-color: #FF5722;
          }
          .publish{
            background-color: #006030;
          }
        }
      } 
    }
  }
</style>