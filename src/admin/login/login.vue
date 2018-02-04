<template>
  <div class="loginWrapper">
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
  import Attention from '../../base/attention/attention';
  import {showAttentionMixin} from '../../common/js/mixin';
  import {login} from '../../api/login';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [showAttentionMixin],
    data () {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      clickLoginBtn () {
        if (this.username === '') {
          this.showAttention('请输入账号', false);
        } else if (this.password === '') {
          this.showAttention('请输入密码', false);
        } else {
          const user = {
            username: this.username,
            password: this.password
          };
          login(user).then((res) => {
            if (res.status === 0) {
              this.setManager(res.user);
              this.$router.push({path: '/admin/home'});
            } else {
              this.showAttention(res.info, false);
            }
          }).catch(err => err);
        }
      },
      ...mapMutations({
        setManager: 'SET_MANAGER'
      })
    },
    components: {
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .loginWrapper{
    width: 100%;
    height: 100%;
    background: url('./bg.jpg') no-repeat;
    background-size: cover;
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