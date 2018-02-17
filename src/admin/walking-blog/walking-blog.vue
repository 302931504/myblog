<template>
  <div class="walkBlogWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <div class="list" v-show="showList">
      <div class="writeBlogBox" v-show="!routeId">
        <div class="content">
          <textarea name="content" placeholder="说点儿什么吧..." v-model="content"></textarea>
          <div class="imgWrapper">
            <span class="icon-camera"></span>
            <input type="file" ref="upload" name="file" class="file" accept="image/*" @change="getImg" />
          </div>
        </div>
        <div class="wirteBottom">
          <div class="left">
            <span class="topic">#</span>
            <input type="text" name="tags" placeholder="输入标签，以‘/’分割" v-model="tags">
          </div>
          <div class="right">
            <p class="range" @mouseover="showRange = true" @mouseout="showRange = false">可见范围：<span class="text">所有人可见</span><i class="icon-circle"></i></p>
            <button type="button" @click.stop="_addWalkingBlog">发布</button>
            <div class="rangeView" v-show="showRange">
              <input type="radio" name="range" value="1">所有人可见<br/>
              <input type="radio" name="range" value="0">仅自己可见
            </div>
          </div>
        </div>
        <div class="media">
          <img ref="imgMedia" src="" alt="">
        </div>  
      </div>
      <div class="walkingListBox">
        <walking-list :blogList="walkingBlogs" 
                      @selectBlog="selectBlog" 
                      @deleteBlog="deleteBlog">
        </walking-list>
      </div>
      <page-btn :pageCount="pageCount" :currentPage="currentPage" @next="next" @pre="pre"></page-btn>
    </div>
  </div>
</template>

<script>
  import WalkingList from '../../base/walking-list/walking-list'; 
  import Attention from '../../base/attention/attention';
  import PageBtn from '../../base/page-btn/page-btn';
  import {initPageMixin, showAttentionMixin, cautionMixin} from '../../common/js/mixin';
  import {addWalkingBlog, getWalkingBlog, deleteWBlog} from '../../api/walking-blog';
  import {mapGetters} from 'vuex';

  export default {
    mixins: [initPageMixin, showAttentionMixin, cautionMixin],
    data () {
      return {
        content: '',
        tags: '',
        walkingBlogs: [],
        walkblogLength: 10,
        showRange: false
      };
    },
    created () {
      this.formData = new FormData();
      this.getByPage();
    },
    computed: {
      routeId () {
        return this.$route.params.id;
      },
      ...mapGetters([
        'showList'
      ])
    },
    methods: {
      getImg () {
        this.formData.append('file', this.$refs.upload.files[0]);
        var file = this.$refs.upload.files[0];
        if (window.FileReader) {  // 将选择的图片显示出来
          var fr = new FileReader();
          fr.onloadend = (e) => {
            this.$refs.imgMedia.src = e.target.result;
          };
          fr.readAsDataURL(file);
        }
      },
      getByPage () {
        this._getWalkingBlog();
      },
      selectBlog (item) {
        this.$router.push({path: `/admin/mylife/${item.id}`});
      },
      deleteBlog (id) {
        deleteWBlog(id).then(res => {
          if (!res.status) {
            this.routerGo();
          } else {
            this.showAttention(res.info, false);
          }
        });
      },
      _addWalkingBlog () {
        if (this.content === '' || this.tags === '') {
          this.showAttention('请输入必填内容', false);
          return;
        }
        this.formData.append('content', this.content);
        this.formData.append('tags', this.tags);
        console.log(this.formData.get('content'));
        /* const blog = {
          content: this.content,
          tags: this.tags
        }; */
        addWalkingBlog(this.formData).then(res => {
          if (res.status === 0) {
            this.routerGo();
          } else {
            this.showAttention(res.info, false);
          }
        }); 
      },
      _getWalkingBlog () {
        const item = {
          page: this.currentPage,
          limit: this.limit
        };
        getWalkingBlog(item).then(res => { 
          if (res.status === 0) {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
              this.walkingBlogs = res.data;                        
            }
            this.initPage(this.walkingBlogs.length);
          }
        });
      }
    },
    watch: {
    },
    components: {
      WalkingList,
      PageBtn,
      Attention
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .walkBlogWrapper{
    position: relative;
    color: #000;
    width: 80%;
    margin: 0 auto;
    .writeBlogBox{
      .content{
        display: flex;
        textarea{
          // width: 600px;
          width: 94%;
          height: 80px;
          resize: none;
          padding: 4px;
          box-sizing: border-box;
          outline: none;
          font-size: 16px;
        }
        .imgWrapper{
          position: relative;
          // width: 50px;
          width: 6%;
          height: 78px;
          line-height: 80px;
          text-align: center;
          font-size: 26px;
          color: rgb(169, 169, 169);
          border: 1px solid rgb(169, 169, 169);
          border-left: none;
        }
      }
      .file{
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 78px;
        opacity: 0;
        outline: none;
        border-top: none;
      }
      .wirteBottom{
        font-size: 0;
        display: flex;
        justify-content: space-between;
        border: 1px solid rgb(169, 169, 169);
        padding: 6px;
        color: #6b6b6b;
        .left{
          .topic{
            display: inline-block;
            font-size: 20px;
            vertical-align: middle;
            margin-right: 16px;
          }
          input{
            width: 250px;
            height: 30px;
            font-size: 12px;
            border-radius: 30px;
            padding: 4px;
            box-sizing: border-box;
            vertical-align: middle;
          }
        }
        .right{
          position: relative;
          font-size: 12px;
          // color: #6b6b6b;
          vertical-align: middle;
          .range{
            display: inline-block;
            padding: 0 16px;
            border-left: 1px solid #666;
            .text{
              display: inline-block;
              margin-right: 16px;
            }
          }
          button{
            display: inline-block;
            width: 80px;
            height: 30px;
            color: #fff;
            background: #1AA094;
            border: 1px solid #1AA094;
            border-left: none;
          }
          .rangeView{
            position: absolute;
            top: 28px;
            left: 60px;
            padding: 10px;
            background: #fff;
            border: 1px solid #ddd;
          }
        }
      }
      .media{
        border: 1px solid rgb(169, 169, 169);
      }  
    }
    .walkingListBox{
      margin-top: 30px;
    }
    .viewWrapper{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
</style>