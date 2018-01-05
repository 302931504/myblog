<template>
  <div class="followListWrapper">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userList">
          <td><input type="checkbox" class="checkBlog"></td>
          <td>{{item.user_name}}</td>
          <td>{{item.user_email}}</td>
          <td>
            <button type="button" class="delete" @click.stop="deleteUser(item.user_id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      userList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      deleteUser (id) {
        this.$emit('deleteUser', id);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .followListWrapper{
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
          &.delete{
            background-color: #FF5722;
          }
          &.edit{
            background-color: #009688;
          }
        }
        .checkBlog{
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>