<template>
  <div class="wrapper">
    <div class="content">
      <ul class="parent-mess" @mouseout="currentIndex = -1">
        <li v-for="(item, index) in bbsList" @mouseover="mouseover(index)">
          <div class="an-info">
            <h3>{{item.name}}</h3>
            <div class="action">
              <span class="quote" v-show="index === currentIndex">引用</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="floor">第{{bbsList.length - index}}楼</span>
            </div>
          </div>
          <div class="an-content" v-html="item.content"></div>
          <div class="an-time">
            <span class="time">{{_initTime(item.time)}}</span>
            <span class="answer">回复</span>
            <span class="delete">删除</span>
          </div>
          <div class="child-mess" v-show="item.child.length > 0">
            <ul>
              <li style="border-bottom: none" v-for="child in item.child">
                <div class="child-an-con">
                  <div class="child-an-title">
                    <p>{{child.sender_name}}<span>回复</span>{{child.receiver_name}}:</p>
                    <p class="child-text">{{child.content}}</p>
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
        currentIndex: -1
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
      mouseover (index) {
        this.currentIndex = index;
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .content{
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
            color: #999;
            margin: 0 6px;
          }
          .child-text{
            margin-left: 10px;
          }
        }
        .child-an-time{
          margin-top: 4px;
          font-size: 13px;
          color: #999;
        }
      }
    }
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
    }
  }
</style>