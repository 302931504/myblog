<template>
  <div class="leaveMessWrapper">
    <div class="old">
      <label>旧密码</label>
      <input type="password" placeholder="请输入旧密码" v-model="oldPass">
    </div>
    <div class="new">
      <label>新密码</label>
      <input type="password" placeholder="请输入新密码" v-model="newPass">
    </div>
    <div class="new">
      <label>确认密码</label>
      <input type="password" placeholder="请确认新密码" v-model="sureNewPass">
    </div>
    <div class="actions">
      <button type="button" class="sureBtn">确认修改</button>
      <button type="button" class="resetBtn" @click="reset">重置</button>
    </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        oldPass: '',
        newPass: '',
        sureNewPass: ''
      };
    },
    methods: {
      reset () {
        this.oldPass = '';
        this.newPass = '';
        this.sureNewPass = '';
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .leaveMessWrapper{
    color: #000;
    margin: 3% 0 0 5%;
    .old, .new{
      margin-bottom: 15px;
    }
    label{
      display: inline-block;
      padding: 9px 15px;
      width: 80px;
      font-weight: 400;
      text-align: right;
    }
    input{
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      padding-left: 10px;
      height: 38px;
      line-height: 38px;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      outline: none;
    }
    .actions{
      margin-left: 115px;
    }
    button{
      display: inline-block;
      height: 38px;
      line-height: 38px;
      padding: 0 18px;
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      opacity: .9;
      outline: none;
      transition: all .5s;
      &.sureBtn{
        background-color: #009688;
        color: #fff; 
        &:hover{
          opacity: .7;
        }   
      }
      &.resetBtn{
        border: 1px solid #C9C9C9;
        background-color: #fff;
        color: #555;
        margin-left: 10px;
        &:hover{
          border: 1px solid #009688;
        }
      }
    }
  }
</style>