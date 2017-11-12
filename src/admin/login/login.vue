<template>
  <div class="loginWrapper" v-show="!isLogin">
    <div class="loginBox">
      <div class="logoWrapper">
        <img src="./logo.png" alt="good-doer">
      </div>
      <div class="loginInfo">
        <input type="text" name="username" v-model="username" placeholder="account"><br/>
        <input type="password" name="password" v-model="password" placeholder="password"><br/>
        <button type="button" class="loginBtn" @click="clickLoginBtn">登录</button>
      </div>
    </div>
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
  </div> 
</template>

<script>
  import qs from 'qs';
  import Attention from '../../base/attention/attention';
  import {showAttentionMixin} from '../../common/js/mixin';

  export default {
    mixins: [showAttentionMixin],
    data () {
      return {
        username: '',
        password: '',
        isLogin: false
      };
    },
    methods: {
      clickLoginBtn () {
        if (this.username === '') {
          this.showAttention('请输入账号', false);
        } else if (this.password === '') {
          this.showAttention('请输入密码', false);
        } else {
          this.$http.post('api/login', qs.stringify({
            username: this.username,
            password: this.password
          })).then((res) => {
            const data = res.data;
            if (data.status === 0) {
              console.log(data.info);
              this.isLogin = true;
              this.$router.push({path: '/admin/mainBackStage'});
            } else {
              this.showAttention(data.info, false);
            }
          }).catch(err => err);
        }
      }
    },
    components: {
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .loginWrapper{
    height: 100%;
  }
  .loginBox{
    position: absolute;
    width: 500px;
    height: 350px;
    top: 50%;
    left: 50%;
    margin-top: -175px;
    margin-left: -250px;
    border-radius: 4px;
    background: #3b4348;
    .logoWrapper{
      width: 400px;
      margin: 0 auto;
      padding-top: 10px;
      img{
        width: 400px;
      }
    }
    .loginInfo{
      width: 350px;
      margin: 0 auto;
      margin-top: 50px;
      input{
        width: 340px;
        height: 40px;
        color: #3b4348;
        font-size: 20px;
        padding-left: 10px;
        margin-bottom: 8px;
        background: #ADADAD;
        &:hover{
          background: #E0E0E0;
        }
      }
      .loginBtn{
        display: block;
        width: 80px;
        height: 30px;
        margin: 0 auto;
        margin-top: 10px;
      }
    }
  }
</style>