<template>
  <div class="detailtWrapper">
    <div class="header">
      <div class="title-box">
        <input type="text" v-model="title" class="title" placeholder="请填写标题">
        <textarea v-model="summary" class="summary" placeholder="文章概要"></textarea>
      </div>
      <div class="tags">
        <input type="text" class="tag-input tagVal" v-model="tagVal" placeholder="标签,以'/'分割">
        <input type="text" class="tag-input model" v-model="model" placeholder="类型">
      </div>
    </div>
    <div class="editor">
      <mavon-editor v-model="artical" style="height: 100%" @save="saveArtical"></mavon-editor>
    </div>
    <attention ref="attentionBox" :text="attText" :isOK="attIcon"></attention>
  </div>
</template>

<script>
  import qs from 'qs';
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
      addTag () {
        if (this.tagVal === '') {
          return;
        }
        this.tags.push(this.tagVal);
        this.tagVal = '';
      },
      saveArtical (value, render) {
        if (this.title === '') {
          this.showAttBox('请输入标题');
        } else if (this.artical === '') {
          this.showAttBox('请输入内容');
        } else {
          this.$http.post('api/saveBlog', qs.stringify({
            title: this.title,
            content: render,
            summary: this.summary,
            label: this.tagVal,
            model: this.model
          })).then((res) => {
            let data = res.data;
            if (data.status === 0) {
              this.showAttBox(data.info, true);
            }
          }).catch(err => err);
        } 
      },
      showAttBox (text, attIcon) {
        this.attText = text;
        this.attIcon = attIcon;
        this.$refs.attentionBox.show();
      }
    },
    watch: {
      summary (newVal) {
        console.log(newVal);
      }
    },
    components: {
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .detailtWrapper{
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    height: 100%;
    background: #fff;
    .header{
      input{
        outline: none;
      }
      padding: 0 20px;
      .title{
        width: 100%;
        height: 44px;
        font-size: 26px;
        color: #000;
      }
      .summary{
        width: 100%;
        height: 50px;
        color: #ADADAD;
        outline: none;
        resize: none;
        border: none;
      }
      .tags{
        display: flex;
        ul{
          display: flex;
        }
        .tag-input{
          color: #fff;
          margin: 0 4px;
          padding: 2px 8px;
          max-width: 100px;
          border-radius: 4px;
          background: #BEBEBE;
        }
        .tagVal{
          max-width:150px; 
        }
      }
    }
    .editor{
      position: absolute;
      top: 20%;
      right: 0;
      width: 100%;
      height: 80%;
    }
  }
</style>