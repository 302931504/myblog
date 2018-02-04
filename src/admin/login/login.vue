<template>
  <div class="loginWrapper">
    <div class="loading" v-show="showLoad">
      <img src="./loading.gif">
    </div>
    <div class="loginBox">
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
        password: '',
        showLoad: false
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
          this.showLoad = true;
          login(user).then((res) => {
            if (res.status === 0) {
              this.showLoad = false;
              this.setManager(res.user);
              this.$router.push({path: '/admin/home'});
            } else {
              this.showLoad = false;
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
  .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    margin-top: -100px;
    margin-left: -150px;
    z-index: 100;
    img{
      width: 100%;
    }
  }
  .loginBox{
    position: absolute;
    width: 300px;
    height: 150px;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -150px;
    border-radius: 4px;
    background: #d0d0d0;
    text-align: center;
    opacity: .4;
    &:hover{
      opacity: .8;
    }
    .loginInfo{
      margin: 0 auto;
      margin-top: 35px;
      input{
        width: 200px;
        height: 20px;
        color: #3b4348;
        font-size: 14px;
        padding-left: 10px;
        margin-bottom: 8px;
        background: #ADADAD;
        &:hover{
          background: #E0E0E0;
        }
      }
      .loginBtn{
        display: block;
        font-size: 12px;
        width: 50px;
        height: 20px;
        margin: 0 auto;
        margin-top: 10px;
      }
    }
  }
</style>