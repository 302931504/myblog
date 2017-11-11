<template>
  <div class="homeWrapper">
      <ul class="options">
        <li class="option">
          <div class="icon mess-icon"><span class="icon-quill"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>新留言</p>
          </div>
        </li>
        <li class="option">
          <div class="icon newFollow-icon"><span class="icon-user-plus"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>新粉丝</p>
          </div>
        </li>
        <li class="option">
          <div class="icon follow-icon"><span class="icon-users"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>粉丝</p>
          </div>
        </li>
        <li class="option">
          <div class="icon img-icon"><span class="icon-image"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>图片</p>
          </div>
        </li>
        <router-link tag="li" class="option" to="/admin/mainBackStage/draft">
          <div class="icon draft-icon"><span class="icon-files-empty"></span></div>
          <div class="info">
            <p class="number">20</p>
            <p>草稿箱</p>
          </div>
        </router-link>
        <router-link tag="li" class="option" to="/admin/mainBackStage/blog">
          <div class="icon blog-icon"><span class="icon-file-text2"></span></div>
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