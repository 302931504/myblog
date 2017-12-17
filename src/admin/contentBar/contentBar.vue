<template>
  <div class="contentBarWrapper">
    <ul>
      <li v-for="item in navList" 
          @click="clickNav(item)"
          :class="item.name === currentName ? 'active' : ''">
        <span :class="'icon-' + item.name"></span> {{item.text}} <span v-if="item.name !== 'home'" class="icon-cross" @click.stop="close(item.name)"></span>
      </li>
    </ul>
    <div class="action" @mouseover="optionOver" @mouseout="optionOut">
      <p><i class="icon-point-up"></i> 页面操作 <i ref="circle" class="icon-circle"></i></p>
      <div class="optionList" v-show="showList === true">
        <option-list :options="options" :show="showList"  @clickoption="clickoption"></option-list>
      </div>
    </div>
  </div>
</template>

<script>
  import OptionList from '../../base/option-list/option-list';
  import {mapMutations, mapActions} from 'vuex';
  import {circleMixin} from '../../common/js/mixin';

  export default {
    mixins: [circleMixin],
    data () {
      return {
        options: [
          {text: '关闭其他', name: 'closeOther', router: false},
          {text: '关闭全部', name: 'closeAll', router: false}
        ]
      };
    },
    props: {
      navList: {
        type: Array,
        default: []
      },
      currentName: {
        type: String,
        default: 'home'
      }
    },
    methods: {
      clickNav (item) {
        this.$emit('clickNav', item);
      },
      close (name) {
        this.$emit('closeNav', name);
      },
      clickoption (item) {
        if (item.name === 'closeOther') {
          this.deleteOthers(this.currentName);
        } else if (item.name === 'closeAll') {
          this.deleteAllnav();
          this.$router.push('home');
        }
      },
      ...mapMutations({
        deleteAllnav: 'DELETE_ALL_NAV'
      }),
      ...mapActions([
        'deleteOthers'
      ])
    },
    components: {
      OptionList
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .contentBarWrapper{
    display: flex;
    justify-content: space-between;
    color: #000;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e2e2e2;
    ul{
      li{
        display: inline-block;
        padding: 0 10px;
        min-width: 65px;
        transition: all .2s;
        .icon-cross{
          padding: 4px;
          display: inline-block;
          font-size: 14px;
          &:hover{
            background: #F75000;
          }
        }
      }
      .active{
        background-color: #1AA094;
        color: #fff;
      }
    }
    .action{
      position: relative;
      padding: 0 20px;
      border-left: 1px solid #e2e2e2;
      .icon-circle{
        display: inline-block;
        transition: all .2s;
      }
      .optionList{
        width: 100%;
        position: absolute;
        top: 40px;
        left: 0;
      }
    }
  }
</style>