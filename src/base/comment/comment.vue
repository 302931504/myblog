<template> 
  <div class="commentWrapper">
    <attention ref="attBox" :text="attText" :isOK="attIcon"></attention>
    <div class="content">
      <p>发表评论：</p>
      <textarea v-model="content" @click.stop="clickTextarea" ref="textareaBox" :placeholder="placeholder"></textarea>
    </div>
    <div class="personInfo" v-show="!manager.username">
      <p>你的昵称<span class="must">*</span>：</p>
      <input type="text" placeholder="必填" v-model="nickname">
      <p>你的邮箱<span class="must">*</span>：</p>
      <input type="email" name="" placeholder="必填" v-model="email">
      <div class="rememberInfo">
        <label for="remember"><input type="checkbox" ref="rem" name="" value="1" id="remember">记住个人信息</label>
      </div>
    </div>
    <button type="button" class="publishBtn" @click.stop="publish">发表</button>
  </div>
</template>

<script>
  import bus from '../../common/js/bus';
  import Attention from '../../base/attention/attention';
  import {trim, checkEmail} from '../../common/js/util';
  import {showAttentionMixin} from '../../common/js/mixin';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    mixins: [showAttentionMixin],
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
    computed: {
      ...mapGetters([
        'manager',
        'user'
      ])
    },
    created () {
      bus.$on('quote', item => {
        let tags = item.content.split('</blockquote>');
        if (tags.length > 1) {
          this.content = `<blockquote><pre>引用 ${item.name} 的发言：</pre>${trim(tags[1])}</blockquote>`;
        } else {
          this.content = `<blockquote><pre>引用 ${item.name} 的发言：</pre>${tags[0]}</blockquote>`;  
        }
      });
      this.$nextTick(() => {
        this.initInfo();
      });
    },
    methods: {
      initInfo () {
        if (this.user.username) {
          this.nickname = this.user.username;
          this.email = this.user.email;
          this.$refs.rem.checked = true;
        }
      },
      publish () {
        const item = {
          type: -1,
          parent_id: -1, 
          user_email: this.manager.email ? this.manager.email : this.email,
          user_name: this.manager.nickname ? this.manager.nickname : this.nickname,
          bbs_content: this.content
        };
        if (item.user_email === '' || !checkEmail(item.user_email)) {
          this.showAttention('邮箱格式错误', false);
          return;
        } else if (item.user_name === '') {
          this.showAttention('请输入昵称', false);
          return;
        } else if (item.bbs_content === '') {
          this.showAttention('请输入内容', false);
          return;
        } else if (item.bbs_content.length > 200) {
          this.showAttention('内容超出限制', false);
          return;
        }
        if (this.$refs.rem.checked) {
          if (this.user.username !== this.nickname) {
            const user = {
              username: this.nickname,
              email: this.email
            };
            this.saveCurrentUser(user);
          }
        }
        this.$emit('addBBS', item);
      },
      clickTextarea () {
        this.$refs.textareaBox.style.height = '100px';
      },
      ...mapActions([
        'saveCurrentUser'
      ])
    },
    components: {
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .commentWrapper{
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