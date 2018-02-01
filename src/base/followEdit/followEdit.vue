<template>
  <transition name="showslide">
    <div class="content" v-show="showFlag">
      <span class="icon-close" @click.stop="close"></span>
      <h1>欢迎订阅</h1>
      <div class="info">
        <input type="text" name="" placeholder="昵称" v-model="name"><br/>
        <input type="text" name="" placeholder="常用邮箱" v-model="email"><br/>
        <button type="button" @click.stop="follow">订&nbsp;阅</button>
      </div>
      <p class="text">当有新博文发表时，将会以邮件形式通知您。<br/>所填信息不会被公开。</p>
      <p class="errText">*{{errText}}*</p>
    </div>
  </transition>
</template>

<script>
  import {addUsre} from '../../api/users';
  import {checkEmail} from '../../common/js/util';
  export default{
    data () {
      return {
        name: '',
        email: '',
        errText: ''
      };
    },
    props: {
      showFlag: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close () {
        this.$emit('close');
      },
      follow () {
        if (this.name === '') {
          this.errText = '请输入昵称^_^';
        } else if (this.email === '') {
          this.errText = '请输入邮箱^_^';
        } else if (checkEmail(this.email)) {
          const user = {
            name: this.name,
            email: this.email
          };
          addUsre(user).then((res) => {
            if (res.status === 0) {
              this.errText = res.info;
              this.$emit('addUser');
            }
          }).catch(err => err); 
        } else {
          this.errText = '请输入正确的邮箱地址';
        }
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .content{
    position: relative;
    width: 380px;
    padding: 44px;
    box-shadow: 8px 8px 5px #888888;
    background: #fff;
    .icon-close{
      position: absolute;
      top: 6px;
      right: 6px;
      color: #ccc;
    }
    h1{
      text-align: center;
      font-size: 20px;
      margin-bottom: 34px;
    }
    .info{
      input{
        width: 100%;
        padding: 9px 15px;
        box-sizing: border-box;
        border: 1px solid #d7d7d7;
        margin-bottom: 10px;
        outline: none;
      }
      button{
        width: 100%;
        height: 40px;
        text-align: center;
        background: #8db800;
        border: none;
        color: #fff;
        outline: none;
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .text{
      margin-top: 20px;
      font-size: 14px;
      color: #ccc;
    }
    .errText{
      font-size: 14px;
      color: red;
      text-align: center;
    }
  }
  .showslide-enter-active, .showslide-leave-active{
    width: 320px;
    height: 170px;
    opacity: 1;
    transition: all .3s;
  }
  .showslide-enter, .showslide-leave-to{
    width: 0;
    height: 0;
    opacity: 0;
  }
  .changeInfo{
    width: 380px;
    padding: 30px;
    box-shadow: 8px 8px 5px #888888;
  }
</style>