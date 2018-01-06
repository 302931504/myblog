<template>
  <div class="messBwrapper">
    <div class="bbsContent">
      <ul class="parent-mess" @mouseout="currentIndex = -1">
        <li v-for="(item, index) in bbsList" @mouseover="pmouseover(index)">
          <div class="an-info">
            <h3>{{item.name}}</h3>
            <div class="action">
              <span class="quote" v-show="index === currentIndex">引用</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="floor">第{{bbsList.length - index}}楼</span>
            </div>
          </div>
          <div class="an-content" v-html="item.content"></div>
          <div class="an-time">
            <span class="time">{{_initTime(item.time)}}</span>
            <span class="answer" @click.stop="answer(item)">回复</span>
            <span class="delete" @click.stop="deletebbs(item.id)">删除</span>
          </div>
          <div class="child-mess" v-show="item.child.length > 0">
            <ul @mouseout="currentChildIndex = -1">
              <li style="border-bottom: none" v-for="(child, child_index) in item.child" @mouseover="cmouseover(child_index)">
                <div class="child-an-con">
                  <div class="child-an-title">
                    <p><span>{{child.user_name}}:</span><span class="child-text">{{child.content}}</span>
                    <span class="delete" v-show="child_index === currentChildIndex && index === currentIndex" @click.stop="deleteChild(child.id)">删除</span></p>
                  </div>
                  <div class="child-an-time">{{_initTime(child.time)}}</div>
                </div>
              </li>
            </ul> 
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {initTime} from '../../common/js/util';
  export default {
    data () {
      return {
        currentIndex: -1,
        currentChildIndex: -1
      };
    },
    props: {
      bbsList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      _initTime (time) {
        return initTime(time);
      },
      pmouseover (index) {
        this.currentIndex = index;
      },
      cmouseover (index) {
        this.currentChildIndex = index;
      },
      answer (item) {
        this.$emit('answer', item);
      },
      deletebbs (id) {
        this.$emit('deletebbs', id);
      },
      deleteChild (id) {
        this.$emit('deleteChild', id);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .bbsContent{
    padding: 40px;
    background: #fff;
    .parent-mess li{
      border-top: 1px solid #ccc; 
      padding: 10px 0;
      &:last-child{
        border-bottom: 1px solid #ccc;
      }
      .an-info{
        display: flex;
        justify-content: space-between;
        .floor, .quote{
          font-size: 14px;
          color: #999;
        }
        .quote{
          text-decoration: underline;
        }
      }
      .an-content{
        padding: 10px;
        color: #000;
        blockquote{
          display: block;
          margin-bottom: 5px;
          padding: 10px 14px;
          font-size: 12px;
          border-left: 3px solid #eee;
          background-color: #f8f8f8;
          word-break: break-all;
          word-wrap: break-word;
          white-space: pre-line;
          pre{
            font-weight: bold;
            word-break: break-all;
            word-wrap: break-word;
            white-space: pre-line;
          }
        }
      }
      .an-time{
        font-size: 13px;
        color: #999;
        .answer{
          margin: 0 16px;
        }
      }
    }
    .child-mess{
      margin-top: 10px; 
      padding: 0 30px;
      li{
        border-bottom: none; 
        .child-an-title{
          display: flex;
          span{
            font-size: 14px;
            margin: 0 6px;
          }
          .child-text{
            color: #999;
            margin-left: 10px;
          }
          .delete{
            color: #999;
            font-size: 13px;
          }
        }
        .child-an-time{
          margin-top: 4px;
          font-size: 13px;
          color: #999;
        }
      }
    }
    .quote, .delete, .answer{
      cursor: pointer;
    }
  }
</style>