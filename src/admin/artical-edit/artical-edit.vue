<template>
  <div class="detailtWrapper" @click.stop="showList = false">
    <div class="blogEdit">
      <h3 class="title">添加文章</h3>
      <div class="icon" @click="closeEditor"><span class="icon-closeAll"></span></div>
    </div>
    <div class="content">
      <div class="con-item titleBox">
        <div class="label">
          <label>文章标题</label>
        </div>
        <div class="input titleInput">
          <input type="text" name="title" class="title" v-model="title" placeholder="请输入文章标题">
        </div>
      </div>
      <div class="con-item modelBox">
        <div class="default">
          <div class="label">
            <label>文章分类</label>
          </div>
          <div class="input modelInput" @click.stop="chooseModel">
            <input type="text" name="model" class="model" v-model="model" value="javaScript" readonly>
            <span ref="circle" class="icon-circle"></span>
            <div class="optionList" v-show="showList === true">
              <option-list :options="options" :show="showList" @clickoption="clickoption"></option-list>
            </div>
          </div>
        </div>
        <div class="manageLabel">
          <button type="button" @click.stop="showLabelList">管理分类</button>
        </div>
      </div>
      <div class="con-item tagsBox">
        <div class="label">
          <label>标签</label>
        </div>
        <div class="input tagsInput">
          <input type="text" name="tags" class="tags" v-model="tags" placeholder="请输入标签，以‘/’分割">
        </div>
      </div>
      <div class="con-item summaryBox">
        <div class="label">
          <label>内容摘要</label>
        </div>
        <div class="input summaryInput">
          <textarea name="summary" class="summary" v-model="summary" placeholder="请输入文章摘要"></textarea>
        </div>
      </div>
      <div class="con-item showType">
        <div class="postNow">
          <div class="label">
            <label>立即发布</label>
          </div>
          <div class="input radios">
            <input type="radio" name="isShow" value="1" v-model="checked">
          </div>
        </div>
        <div class="saveDraft">
          <div class="label">
            <label>存草稿箱</label>
          </div>
          <div class="input radios">
            <input type="radio" name="isShow" value="0" v-model="checked">
          </div>
        </div>
      </div>
      <div class="con-item editorBox">
        <div class="label">
          <label>文章内容</label>
        </div>
        <div class="input editorInput">
          <mavon-editor v-model="artical" style="width: 100%; min-height: 400px" @save="saveArtical"></mavon-editor>
        </div>
      </div>
    </div>
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <label-list class="labelList" :labelList="options" :showFlag="showFlag" @closeLabelList="closeLabelList" @deleteLabel='deleteLabel' @addLabel="addLabel"></label-list>
  </div>
</template>

<script>
  // import qs from 'qs';
  import Attention from '../../base/attention/attention';
  import LabelList from '../../admin/labelList/labelList';
  import OptionList from '../../base/option-list/option-list';
  import {showAttentionMixin} from '../../common/js/mixin';
  import {saveBlog, getClassify, updateBlog} from '../../api/editor';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    mixins: [showAttentionMixin],
    data () {
      return {
        title: '',
        summary: '',
        tags: '',
        artical: '',
        model: '',
        showList: false,
        options: [],
        checked: 0,
        showFlag: false
      };
    },
    computed: {
      ...mapGetters([
        'editBlog'
      ])
    },
    created () {
      this.initBlog();
      this._getClassify(); 
    },
    methods: {
      saveArtical () {
        if (this.title === '') {
          this.showAttention('请输入文章标题', false);
        } else if (this.tags === '') {
          this.showAttention('请输入文章标签', false);
        } else if (this.summary === '') {
          this.showAttention('请输入文章摘要', false);
        } else if (this.artical === '') {
          this.showAttention('请输入文章内容', false);
        } else if (!this.editBlog) {
          this._saveBlog();
        } else {
          this._updateBlog();
          this.setEditBlog({});
        }
      },
      initBlog () {
        this.title = this.editBlog.blog_title;
        this.artical = this.editBlog.blog_content;
        this.summary = this.editBlog.blog_description;
        this.tags = this.editBlog.blog_tags;
        this.model = this.editBlog.classify_text;
        this.checked = this.editBlog.blog_isShow;
      },
      chooseModel () {
        this.showList = !this.showList;
        if (this.showList) {
          this.$refs.circle.style.transform = 'rotate(180deg)';
        } else {
          this.$refs.circle.style.transform = '';
        }
      },
      clickoption (item) {
        this.model = item.text;
      },
      closeEditor () {
        this.$router.go(-1);
      },
      showLabelList () {
        this.showFlag = true;
      },
      closeLabelList () {
        this.showFlag = false;
      },
      deleteLabel (id) {
        let index = this.options.findIndex((item) => {
          return item.id === id;
        });
        this.options.splice(index, 1);
      },
      addLabel (item) {
        this.options.push(item);
      },
      _saveBlog () {
        const blog = {
          title: this.title,
          classify_text: this.model,
          tags: this.tags,
          description: this.summary,
          content: this.artical,
          isShow: this.checked
        };
        saveBlog(blog).then(res => {
          console.log(res);
        });
      },
      _updateBlog () {
        const blog = {
          id: this.editBlog.blog_id,
          title: this.title,
          classify_text: this.model,
          tags: this.tags,
          description: this.summary,
          content: this.artical,
          isShow: this.checked
        };
        updateBlog(blog).then(res => {
          console.log(res);
        });
      },
      _getClassify () {
        getClassify().then(res => {
          console.log(res);
          let i = 0;
          console.log(res.data.length);
          for (i; i < res.data.length; i++) {
            this.options.push({id: res.data[i].classify_id, text: res.data[i].classify_text});
          };
        });  
      },
      ...mapMutations({
        setEditBlog: 'SET_EDITBLOG'
      })
    },
    components: {
      Attention,
      OptionList,
      LabelList
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
        .default, .postNow, .saveDraft{
          display: flex;
        }
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
        box-sizing: border-box;
      }
     .titleInput{
        width: 90%;
      }
      .tagsInput{
        width: 60%;
      }
      .manageLabel{
        margin-left: 20px;
        button{
          width: 100px;
          height: 38px;
          color: #333;
        }
      }
      .modelInput{
        position: relative;
        .icon-circle{
          position: absolute;
          right: 10px;
          top: 50%;
          margin-top: -8px;
          transition: all .2s;
        }
        .optionList{
          width: 100%;
          position: absolute;
          top: 44px;
          left: 0;
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
      .showType{
        width: 60%;
        .radios{
          input{
            width: 20px;
            height: 20px;
            margin-top: 8px;
          }
        }
      }
    }
    .labelList{
      position: fixed;
      top: 25%;
      left: 30%;
      z-index: 9998;
    }
  }
</style>