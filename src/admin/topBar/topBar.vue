<template>
  <div class="topBarWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <div class="left">
      <div class="logo">
        <img src="./logo.png" alt="">
      </div>
      <div class="openNav" @click="clickOpen"><span class="icon-menu"></span></div>
      <div class="searchWrapper">
        <input type="text" class="search" placeholder="关键字搜索">
      </div> 
    </div>
    <div class="right">
      <ul>
        <li class="notice">
          <div><i class="icon-notice"></i> 系统公告</div>
          <div class="remindBox">
            <remind content="系统公告在这里" :isShow="showRemind"></remind>
          </div>
        </li>
        <li @click.stop="lockScreen"><i class="icon-lock"></i> 锁屏</li>
        <li class="info" @mouseover="optionOver" @mouseout="optionOut">
          <div class="avatar">
            <img src="./rick.png" alt="">
            <span class="name">一个好人 <i ref="circle" class="icon-circle"></i></span>
            <div class="optionList" v-show="showList === true">
              <option-list :options="options" :show="showList" ref="optionList" @clickoption="clickoption"></option-list>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
  import OptionList from '../../base/option-list/option-list';
  import Remind from '../../base/remind/remind';
  import Attention from '../../base/attention/attention';
  import {mapActions, mapMutations} from 'vuex';
  import {circleMixin, showAttentionMixin} from '../../common/js/mixin';
  import {logout} from '../../api/login';

  export default {
    mixins: [circleMixin, showAttentionMixin],
    data () {
      return {
        options: [
          {text: '修改资料', name: 'setup', routername: 'setup'},
          {text: '退出', name: 'logout'}
        ],
        showRemind: true
      };
    },
    created () {
      setTimeout(() => {
        this.showRemind = false;
      }, 5000);
    },
    methods: {
      clickOpen () {
        this.$emit('openNav');
      },
      clickoption (item) {
        if (item.name === 'setup') {
          this.$router.push({path: `/admin/${item.name}`});
          this.pushNav(item);
          this.setCurrentName(item.name);
        } if (item.name === 'logout') {
          logout().then(res => {
            if (res.status === 0) {
              this.setManager(res.user);
              this.$router.push({path: `/login`});
            } else {
              this.showAttention(res.info, false);
            }
          });
        }
      },
      lockScreen () {
        this.$emit('lock');
      },
      ...mapActions([
        'pushNav'
      ]),
      ...mapMutations({
        setCurrentName: 'SET_CURRENTNAME',
        setManager: 'SET_MANAGER'
      })
    },
    components: {
      OptionList,
      Remind,
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .topBarWrapper{
    position: relative;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 999;
    background-color: #23262E;
    line-height: 60px;
    .left{
      display: flex;
      height: 100%;
      .logo{
        width: 150px;
        padding: 0 25px;
        img{
          width: 150px;
        }
      }
      .icon-menu{
        width: 20px;
        height: 20px;
        font-size: 17px;
        text-align: center;
        background-color: #1AA094;
        padding: 5px;
        margin-right: 15px;
      }
      .search{
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        padding-left: 10px;
        padding-right: 30px;
        outline: none;
      }
    }
    .right{
      padding-right: 25px;
      ul{
        display: flex;
        font-size: 14px;
        li{
          padding: 0 20px;
          transition: all .3s;
          list-style: none;
          &:hover{
            border-bottom: 5px solid #23262E; 
          }
          &.notice{
            position: relative;
            .remindBox{
              position: absolute;
              top: 50px;
              left: 0;
            }
          }
        }
        .info{
          position: relative;
          .avatar{
            width: 100%;
            img{
              width: 35px;
              height: 35px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 5px;
            }
            .icon-circle{
              display: inline-block;
              transition: all .2s;
            }
            .optionList{
              width: 100%;
              position: absolute;
              top: 65px;
              left: 0;
            }
          }
        }
      }
    }
  }
</style>