<template>
    <transition name="showslide">
      <div class="content" v-show="showFlag">
        <span class="icon-cross"></span>
        <div class="list">
          <ul>
            <li v-for="item in labelList">{{item.text}}<span @click.stop="deleteLabel" class="icon-closeAll"></span></li>
          </ul>
        </div>
        <div class="addNew">
          <input type="text" name="">
          <button type="button">添加</button>
        </div>
        <div class="sureBtn">
          <button type="button">确定</button>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    props: {
      showFlag: {
        type: Boolean,
        default: true
      },
      labelList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      deleteLabel () {
        alert('123');
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .content{
    position: relative;
    width: 400px;
    height: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 2px;
    border: 2px solid #ccc;
    box-shadow: 8px 8px 5px #888888;
    overflow-y: auto;
    .icon-cross{
      position: absolute;
      top: 4px;
      right: 4px;
    }
    .list{
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          position: relative;
          margin: 6px 10px 0 0;
          padding: 10px 15px;
          max-width: 100px;
          text-align: center;
          color: #000;
          background: #eee;
          .icon-closeAll{
            position: absolute;
            top: -2px;
            right: -2px;
            cursor: pointer;
          }
        }
      }
    }
    .addNew{
      margin-top: 30px;
      input{
        height: 38px;
        padding-left: 6px;
        border: 1px solid #6C6C6C;
        vertical-align: middle;
      }
      button{
        height: 38px;
        line-height: 38px;
        padding: 0 18px;
        color: #FFF;
        background: #8E8E8E;
        border: none;
        outline: none;
        cursor: pointer;
        &:hover{
          opacity: .8;
        }
      }
    }
    .sureBtn{
      position: absolute;
      bottom: 20px;
      left: 50%;
      margin-left: -40px;
      button{
        width: 80px;
        height: 38px;
        color: #fff;
        background: #006030;
        border: none;
      }
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
</style>