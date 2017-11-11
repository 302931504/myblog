<template>
  <div class="detailtWrapper">
    <div class="blogEdit">
      <h3 class="title">添加文章</h3>
      <div class="icon"><span class="icon-cancel-circle"></span></div>
    </div>
    <div class="content">
      <div class="con-item titleBox">
        <div class="label">
          <label>文章标题</label>
        </div>
        <div class="input titleInput">
          <input type="text" name="title" class="title" placeholder="请输入文章标题">
        </div>
      </div>
      <div class="con-item modelBox">
        <div class="label">
          <label>文章分类</label>
        </div>
        <div class="input modelInput">
          <input type="text" name="model" class="model" value="javaScript" readonly>
          <span class="icon-cog"></span>
        </div>
      </div>
      <div class="con-item tagsBox">
        <div class="label">
          <label>标签</label>
        </div>
        <div class="input tagsInput">
          <input type="text" name="tags" class="tags" placeholder="请输入标签，以‘/’分割">
        </div>
      </div>
      <div class="con-item summaryBox">
        <div class="label">
          <label>内容摘要</label>
        </div>
        <div class="input summaryInput">
          <textarea name="summary" class="summary" placeholder="请输入文章摘要"></textarea>
        </div>
      </div>
      <div class="con-item editorBox">
        <div class="label">
          <label>文章内容</label>
        </div>
        <div class="input editorInput">
          <mavon-editor v-model="artical" style="width: 100%; height: 400px" @save="saveArtical"></mavon-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import qs from 'qs';
  import Attention from '../../base/attention/attention';

  export default {
    data () {
      return {
        title: '',
        summary: '',
        tagVal: '',
        artical: '',
        model: '',
        attText: '',
        attIcon: false
      };
    },
    methods: {
    },
    components: {
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .detailtWrapper{
    color: #333;
    padding-bottom: 20px;
    .blogEdit{
      display: flex;
      justify-content: space-between;
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      background-color: #F8F8F8;
      border-radius: 2px 2px 0 0;
      padding: 0 20px;
      .icon{
        height: 42px;
        line-height: 42px;
        cursor: pointer;
        &:hover{
          color: #ADADAD;
        }
      }
    }
    .content{
      margin: 10px 10px 0;
      .con-item{
        display: flex;
        margin-bottom: 15px;
      }
      .label{
        padding: 9px 15px;
        width: 80px;
        font-weight: 400;
        text-align: right;
      }
      input{
        width: 100%;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
        outline: none;
      }
     .titleInput{
        width: 90%;
      }
      .tagsInput{
        width: 60%;
      }
      .modelInput{
        position: relative;
        .icon-cog{
          position: absolute;
          right: 10px;
          top: 50%;
          margin-top: -8px;
        }
      }
      .summaryInput{
        width: 90%;
        textarea{
          width: 99%;
          height: 100px;
          font-size: 16px;
          padding: 6px 10px;
          border: 1px solid #e6e6e6;
          resize: none;
          outline: none;
        }
      }
    }
  }
</style>