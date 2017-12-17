<template>
  <div class="homeWrapper">
      <ul class="options">
        <router-link @click.native="click('留言管理', 'mess')" tag="li" class="option" to="/admin/mainBackStage/mess">
          <div class="icon mess-icon"><span class="fonts-icon icon-mess"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>留言管理</p>
          </div>
        </router-link>
        <router-link @click.native="click('新增文章', 'editBlog')" tag="li" class="option" to="/admin/mainBackStage/editBlog">
          <div class="icon newFollow-icon"><span class="fonts-icon icon-editBlog"></span></div>
          <div class="info">
            <p class="number">NEW</p>
            <p>新增文章</p>
          </div>
        </router-link>
        <router-link @click.native="click('用户追踪', 'follower')" tag="li" class="option" to="/admin/mainBackStage/follower">
          <div class="icon follow-icon"><span class="fonts-icon icon-follower"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>用户追踪</p>
          </div>
        </router-link>
        <li class="option">
          <div class="icon img-icon"><span class="fonts-icon icon-images"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>图片</p>
          </div>
        </li>
        <router-link @click.native="click('草稿箱', 'draft')" tag="li" class="option" to="/admin/mainBackStage/draft">
          <div class="icon draft-icon"><span class="fonts-icon icon-draft"></span></div>
          <div class="info">
            <p class="number">{{draftNum}}</p>
            <p>草稿箱</p>
          </div>
        </router-link>
        <router-link @click.native="click('文章列表', 'blog')" tag="li" class="option" to="/admin/mainBackStage/blog">
          <div class="icon blog-icon"><span class="fonts-icon icon-blog"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>线上文章</p>
          </div>
        </router-link>
      </ul>
      <router-view/>
  </div>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex';
  import {getDraftCount} from '../../api/draft';

  export default {
    data () {
      return {
        draftNum: 0
      };
    },
    created () {
      this._getDraftCount();
      console.log('123');
    },
    methods: {
      click (text, name) {
        const item = {text: text, name: name};
        this.pushNav(item);
        this.setCurrentName(name);
      },
      _getDraftCount () {
        getDraftCount().then((res) => {
          if (res.status === 0) {
            this.draftNum = res.data;
          }
        });
      },
      ...mapActions([
        'pushNav'
      ]),
      ...mapMutations({
        setCurrentName: 'SET_CURRENTNAME'
      })
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .homeWrapper{
    color: #333;
    .options{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-left: -10px;
      .option{
        display: flex;
        flex: auto;
        min-width: 210px;
        width: 30%;
        margin-left: 10px;
        margin-bottom: 10px;
        text-align: center;
        background-color: #f2f2f2;
        border-radius: 5px;
        &:hover .fonts-icon{
          transform: rotate(360deg);
        }
        &:hover .info{
          color: #6C6C6C;
        }
        &:last-child{
          margin-right: 0;
        }
        .icon{
          width: 40%;
          font-size: 3em;
          color: #fff;
          padding: 22px 0;
          border-radius: 5px 0 0 5px;
        }
        .fonts-icon{
          display: inline-block;
          transition: all .4s;
        }
        .mess-icon{
          background-color: #54ade8;
        }
        .newFollow-icon{
          background-color: #FF5722;
        }
        .follow-icon{
          background-color: #009688;
        }
        .img-icon{
          background-color: #5FB878;
        }
        .draft-icon{
          background-color: #F7B824;
        }
        .blog-icon{
          background-color: #2F4056;
        }
        .info{
          width: 60%;
          font-size: 16px;
          padding: 22px 0;
          .number{
            font-size: 25px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>