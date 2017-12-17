<template>
  <div class="messWrapper">
    <search-box :options="[]" :readonly="true"></search-box>
    <div class="content">
      <table>
        <tbody>
          <tr>
            <td style="text-align: left; line-height: 25px">
              <h3>小王</h3>
              <p>我爱你爱着你就像老鼠爱大米</p>
            </td>
            <td>2017-11-14 12:55</td>
            <td>已回复</td>
            <td>
              <button type="button" class="answer">回复</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
          <tr>
            <td style="text-align: left; line-height: 25px">
              <h3>小王</h3>
              <p>我爱你爱着你就像老鼠爱大米我爱你爱着你就像老鼠爱大米我爱你爱着你就像老鼠爱大米我爱你爱着你就像老鼠爱大米</p>
            </td>
            <td>2017-11-14 12:55</td>
            <td>已回复</td>
            <td>
              <button type="button" class="answer">回复</button>
              <button type="button" class="delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <page-btn></page-btn>
  </div>
</template>

<script>
  import SearchBox from '../searchBox/searchBox';
  import PageBtn from '../../base/page-btn/page-btn';

  export default {
    components: {
      SearchBox,
      PageBtn
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .messWrapper{
    color: #333;
    .content{
      margin-top: 10px;
      table{
        width: 100%;
        border: 1px solid #e2e2e2;
        td{
          font-size: 14px;
          padding: 9px 15px;
          min-height: 20px;
          line-height: 20px;
          text-align: center;
          border-bottom: 1px solid #e2e2e2;
          vertical-align: middle;
          h3{
            font-weight: 400;
          }
          p{
            max-width: 300px;
            word-break: break-all;
            color: #8d8d8d;
          }
          button{
            height: 22px;
            line-height: 22px;
            padding: 0 5px;
            font-size: 12px;
            border: none;
            color: #fff;
            &.answer{
              background: #009688;
            }
            &.delete{
              background: #1E9FFF;
            }
          }
        }
      }
    }
  }
</style>