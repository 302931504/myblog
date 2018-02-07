<template>
  <div class="walkBlogWrapper">
    <attention :text="attText" :isOK="attIcon" ref="attBox"></attention>
    <div class="list" v-show="showList">
      <div class="writeBlogBox">
        <div class="content">
          <textarea name="content" placeholder="说点儿什么吧..." v-model="content"></textarea>
          <div class="imgWrapper"><span class="icon-camera"></span></div>
        </div>
        <input type="file" ref="upload" capture="camera" name="file" class="file" accept="image/*" @change="getImg" />
        <div class="tags">
          <input type="text" name="tags" placeholder="输入标签，以‘/’分割" v-model="tags">
          <button type="button" @click.stop="_addWalkingBlog">发布</button>
        </div>  
      </div>
      <div class="walkingListBox">
        <walking-list :blogList="filterWalkblogs" 
                      @selectBlog="selectBlog" 
                      @deleteBlog="deleteBlog">
        </walking-list>
      </div>
      <page-btn v-show="walkingBlogs.length > 10 && showBtn" :pageCount="pages" :currentPage="currentPage" @next="next" @clickPage="clickPage" @pre="pre"></page-btn>
    </div>
    <div class="viewWrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import WalkingList from '../../base/walking-list/walking-list'; 
  import Attention from '../../base/attention/attention';
  import PageBtn from '../../base/page-btn/page-btn';
  import {initPageMixin, showAttentionMixin} from '../../common/js/mixin';
  import {addWalkingBlog, getWalkingBlog, deleteWBlog} from '../../api/walking-blog';
  import {mapMutations, mapGetters} from 'vuex';
  import {limit} from '../../common/js/param';

  export default {
    mixins: [initPageMixin, showAttentionMixin],
    data () {
      return {
        content: '',
        tags: '',
        walkingBlogs: [],
        walkblogLength: 10
      };
    },
    created () {
      this.formData = new FormData();
      this.setShowlist(true);
      this._getWalkingBlog();
      setTimeout(() => {
        this.initPage(this.walkingBlogs.length);
      }, 100);
    },
    computed: {
      filterWalkblogs () {
        return this.walkingBlogs.slice(this.walkblogLength - limit, this.walkblogLength);
      },
      currentPath () {
        return this.$route.path;
      },
      ...mapGetters([
        'showList'
      ])
    },
    methods: {
      getImg () {
        this.formData.append('file', this.$refs.upload.files[0]);
      },
      getByPage () {
        this.walkblogLength = this.currentPage * limit;
      },
      selectBlog (item) {
        this.setEditBlog(item);
        this.$router.push({path: `/admin/mylife/${item.id}`});
      },
      deleteBlog (id) {
        deleteWBlog(id).then(res => {
          if (!res.status) {
            this.setBackPath(this.$route.path);
            this.$router.push('/admin/back');
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
            this.setBackPath(this.$route.path);
            this.$router.push('/admin/back');
          } else {
            this.showAttention(res.info, false);
          }
        }); 
      },
      _getWalkingBlog () {
        getWalkingBlog().then(res => { 
          if (res.status === 0) {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
              this.walkingBlogs.push({id: arr[i].walking_blog_id, 
                                      content: arr[i].walking_blog_content,
                                      hot: arr[i].walking_blog_likeNum,
                                      comment_count: arr[i].comment_count, 
                                      time: arr[i].walking_blog_time,
                                      tags: arr[i].walking_blog_tags.split('/'),
                                      img_url: arr[i].w_img_url});
            }
          }
        });
      },
      ...mapMutations({
        setEditBlog: 'SET_EDITBLOG',
        setBackPath: 'SET_BACKPATH',
        setShowlist: 'SET_SHOWLIST'
      })
    },
    watch: {
      currentPath (newPath) {
        if (newPath === '/admin/mylife') {
          this.setShowlist(true);
        }
      }
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
          width: 600px;
          height: 80px;
          resize: none;
          padding: 4px;
          box-sizing: border-box;
          outline: none;
          font-size: 16px;
        }
        .imgWrapper{
          width: 50px;
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
        width: 600px;
        font-size: 16px;
        outline: none;
        border: 1px solid rgb(169, 169, 169);
        border-top: none;
      }
      .tags{
        font-size: 0;
        display: flex;
        input{
          width: 600px;
          font-size: 16px;
          outline: none;
          border: 1px solid rgb(169, 169, 169);
          border-top: none;
          vertical-align: top;
          padding: 4px;
          box-sizing: border-box;
        }
        button{
          display: inline-block;
          width: 50px;
          height: 30px;
          color: #fff;
          background: #1AA094;
          border: 1px solid #1AA094;
          border-left: none;
        }
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