<template>
    <transition name="showslide">
      <div class="contentWrap" v-show="showFlag">
        <p class="editBtn" @click.stop="editLabelList">编辑</p>
        <span class="icon-close" @click.stop="closeLabelList"></span>
        <ul class="list">
          <li v-for="item in labelList" :class="showCross ?  'dd' : ''">{{item.text}}
          <span @click.stop="deleteLabel(item.id)" class="icon-closeall" v-show="showCross"></span></li>
        </ul>
        <div class="addNew">
          <input type="text" name="" v-model="newLabel">
          <button type="button" @click.stop="addLabel">添加</button>
        </div>
        <p class="text">{{errMessage}}</p>
        <div class="sureBtn" v-show="showCross">
          <button type="button" @click.stop="sure">确定</button>
        </div>
      </div>
    </transition>
</template>

<script>
  import {deleteClassify, addClassify} from '../../api/editor';
  export default {
    data () {
      return {
        showCross: false,
        newLabel: '',
        errMessage: ''
      };
    },
    props: {
      showFlag: {
        type: Boolean,
        default: false
      },
      labelList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      deleteLabel (id) {
        deleteClassify(id).then((res) => {
          if (res.status === 0) {
            this.$emit('deleteLabel', id);
            this.errMessage = res.info;
          } else {
            this.errMessage = res.info;
          }
        }).catch(err => err);
      },
      addLabel () {
        addClassify(this.newLabel).then((res) => {
          console.log(res);
          if (res.status === 0) {
            const item = {id: res.data, text: this.newLabel};
            this.$emit('addLabel', item);
            this.errMessage = res.info;
          } else {
            this.errMessage = res.info;
          }
        }).catch(err => err);
      },
      editLabelList () {
        this.showCross = true;
      },
      closeLabelList () {
        this.showCross = false;
        this.$emit('closeLabelList');
      },
      sure () {
        this.showCross = false;
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .contentWrap{
    position: relative;
    width: 400px;
    height: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 2px;
    border: 2px solid #ccc;
    box-shadow: 8px 8px 5px #888888;
    overflow-y: auto;
    .editBtn{
      font-size: 14px;
      color: #0000E3;
      text-decoration: underline;
      cursor: pointer;
    }
    .icon-close{
      position: absolute;
      display: block;
      top: 4px;
      right: 4px;
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      li{
        position: relative;
        margin: 6px 10px 0 0;
        padding: 10px 15px;
        max-width: 100px;
        text-align: center;
        color: #000;
        background: #eee;
        list-style: none;
        .icon-closeall{
          position: absolute;
          top: -2px;
          right: -2px;
          cursor: pointer;
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
    .text{
      color: red;
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
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

  .dd{
    animation: shake 1s infinite;
    -o-animation: shake 1s infinite;
    -webkit-animation: shake 1s infinite;
    -moz-animation: shake 1s infinite;
  }
  @keyframes shake {
    0%, 100% {
      -webkit-transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translateX(-2px);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translateX(2px);
    }
  }
  @-o-keyframes shake {
    /* Opera */
    0%, 100% {
      -webkit-transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translateX(-2px);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translateX(2px);
    }
  }
  @-webkit-keyframes shake {
    /* Safari 和 Chrome */
    0%, 100% {
      -webkit-transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translateX(-2px);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translateX(2px);
    }
  }
  @-moz-keyframes shake {
    /* Firefox */
    0%, 100% {
      -moz-transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -moz-transform: translateX(-2px);
    }
    20%,
    40%,
    60%,
    80% {
      -moz-transform: translateX(2px);
    }
  }
</style>