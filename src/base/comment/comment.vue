<template>
  <div class="commentWrapper">
    <div class="content">
      <p>发表评论：</p>
      <textarea v-model="content" @click.stop="clickTextarea" ref="textareaBox">{{placeholder}}</textarea>
    </div>
    <div class="personInfo">
      <p>你的昵称<span class="must">*</span>：</p>
      <input type="text" placeholder="必填" v-model="nickname">
      <p>你的邮箱<span class="must">*</span>：</p>
      <input type="email" name="" placeholder="必填" v-model="email">
      <div class="rememberInfo">
        <label for="remember"><input type="checkbox" name="" value="" id="remember">记住个人信息</label>
      </div>
      <button type="button" class="publishBtn" @click.stop="publish">发表</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: '',
        nickname: '',
        email: ''
      };
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      }
    },
    methods: {
      publish () {
        const item = {
          type: -1,
          parent_id: -1,
          user_email: this.email,
          user_name: this.nickname,
          bbs_content: this.content
        };
        this.$emit('addBBS', item);
      },
      clickTextarea () {
        this.$refs.textareaBox.style.height = '100px';
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .commentWrapper{
    padding: 40px;
    p{
      margin: 12px 0;
    }
    textarea, input, button{
      outline: none;
    }
    input{
      width: 250px;
      padding: 7px 9px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      font-size: 14px;
    }
    .content{
      textarea{
        width: 600px;
        max-width: 600px;
        height: 40px;
        min-height: 40px;
        max-height: 100px;
        padding: 10px;
        transition: all .4s;
      }
    }
    .rememberInfo{
      margin-top: 10px;
      font-size: 14px;
      input{
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 10px;
      }
    }
    .publishBtn{
      width: 100px;
      height: 30px;
      border: none;
      background: #009688;
      color: #fff;
      margin-top: 10px;
    }
    .must{
      color: red;
    }
  }
  
</style>