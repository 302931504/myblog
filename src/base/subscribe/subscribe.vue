<template>
  <div class="subscribeWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <h1 class="sub-title"><span class="icon-subscribe"></span> 订阅我</h1>
    <div class="entry">
      <input type="text" name="" placeholder="昵称" v-model="nickname">
      <input type="email" name="" placeholder="常用邮箱" v-model="email">
      <button type="button" @click="subMe">订阅</button>
    </div>
    <p class="remind">当有新博文发表时，将会以邮件形式通知您。所填信息不会被公开。</p>
  </div>
</template>

<script>
  import {addUsre} from '../../api/users';
  import {showAttentionMixin} from '../../common/js/mixin';
  import Attention from '../../base/attention/attention';
  import {checkEmail} from '../../common/js/util';

  export default {
    mixins: [showAttentionMixin],
    data () {
      return {
        nickname: '',
        email: ''
      };
    },
    methods: {
      subMe () {
        const user = {
          name: this.nickname,
          email: this.email
        };
        if (this.nickname === '') {
          this.showAttention('请输入昵称', false);
          return;
        } else if (this.email === '' || !checkEmail(this.email)) {
          this.showAttention('邮箱格式错误', false);
          return;
        } else if (this.nickname.length > 20) {
          this.showAttention('昵称过长', false);
          return;
        }
        addUsre(user).then(res => {
          if (res.status === 0) {
            this.showAttention('订阅成功', true);
            this.nickname = '';
            this.email = '';
          }
        });
      }
    },
    components: {
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .subscribeWrapper{
    text-align: center;
    padding-top: 30px;
    padding-bottom: 45px;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
    border-top: 2px solid #262b2f;
    .sub-title{
      font-size: 20px;
      color: #dbdedf;
      margin-bottom: 30px;
    }
    .remind{
      margin-top: 20px;
      color: #606669;
      font-size: 14px;
      line-height: 1.5;
    }
    .entry{
      input{
        display: block;
        width: 600px;
        height: 40px;
        font-size: 14px;
        margin: 0 auto;
        margin-bottom: 10px;
        background: #dbdedf;
        border-radius: 4px;
        padding-left: 20px;
        outline: none;
      }
      button{
        display: block;
        height: 40px;
        width: 120px;
        background: #27ae60;
        color: #fff;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        margin: 0 auto;
      }
    }
  }
</style>