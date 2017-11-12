<template>
  <div class="topBarWrapper">
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
        <li>系统公告</li>
        <li>锁屏</li>
        <li class="info">
          <div class="avatar">
            <img src="./rick.png" alt="">
            <span class="name">一个好人</span>
            <div class="optionList">
              <option-list></option-list>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import OptionList from '../../base/option-list/option-list';

  export default {
    methods: {
      clickOpen () {
        this.$emit('openNav');
      }
    },
    components: {
      OptionList
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .topBarWrapper{
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 1000px;
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
          &:hover{
            border-bottom: 5px solid #000;
            transition: all .3s;
          }
        }
        .info{
          position: relative;
          .avatar{
            img{
              width: 35px;
              height: 35px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 5px;
            }
            .optionList{
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