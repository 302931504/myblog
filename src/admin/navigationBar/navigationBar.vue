<template>
  <div class="navigationBarWrapper">
    <div class="logo">
      <img src="./logo.png" alt="">
    </div>
    <div class="header">
      <div class="img">
        <img src="./rick.png" alt="">
      </div>
      <div class="name">一个好人</div>
    </div>
    <div class="options">
      <ul>
        <router-link tag="li" class="option" to="/admin/mainBackstage/blog">长文章 <i class="icon-pencil2"></i></router-link>
        <router-link tag="li" class="option" to="/admin/mainBackstage/walkingblog">文字 <i class="icon-quill"></i></router-link>
        <router-link tag="li" class="option" to="/admin/mainBackstage/leaveMess">留言 <i class="icon-eyedropper"></i></router-link>
        <router-link tag="li" class="option" to="/admin/mainBackstage/followUser">用户追踪 <i class="icon-users"></i></router-link>
        <router-link tag="li" class="option"></router-link>
      </ul>
    </div>
    <div class="logout">
      <i class="icon-exit"></i> <button type="button" class="logoutBtn">退出</button>
    </div>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .navigationBarWrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    background: #4F4F4F;
    .logo{
      img{
        width: 100%;
      }
    }
    .header{
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #6C6C6C;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 20px;
        margin-bottom: 6px;
      }
    }
    .options{
      text-align: center;
      padding: 40px 0;
      .option{
        padding: 10px 0;
        &:hover{
          background: #8E8E8E;
        }
      }
    }
    .logout{
      position: absolute;
      bottom: 20px;
      left: 20px;
      .logoutBtn{
        width: 80px;
        height: 30px;
      }
    }
  }
</style>