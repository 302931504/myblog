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
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3、JavaScript、es6</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" class="checkBlog">
            </td>
            <td style="text-align: left">css3用transition实现边框动画效果</td>
            <td>基础知识</td>
            <td>css3</td>
            <td>2017-04-14</td>
            <td>2017-04-14</td>
            <td>
              <button type="button" class="edit">编辑</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="pageBtn">
      <li>上一页</li>
      <li>1</li>
      <li class="active">2</li>
      <li>3</li>
      <li>下一页</li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
    },
    components: {
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
        }
      } 
    }
    .pageBtn{
      display: flex;
      float: right;
      margin: 20px 0 20px 0;
      li{
        padding: 0 15px;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        border: 1px solid #e2e2e2;
        margin-left: -1px;
        &.active{
          color: #fff;
          background: #009688;
        }
      }
    }
  }
</style>