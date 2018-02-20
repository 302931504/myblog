<template>
  <div class="aboutWrapper">
    <h1 class="com-title">关于我</h1>
    <p class="information">
    	<span class="sign">刘帅</span>，1996年出生于美丽的<span class="sign">山城重庆</span>，现就读于广东工业大学。<br>
      性格随和，为人低调。<br>
      16年开始接触前端，被前端<span class="sign">“即刻可见”</span>的魅力所吸引，特别喜欢根据自己的想象把一个页面用代码实现。<br>
      有轻微纠结症，会在一个站点的logo选择中不断徘徊，也会在一个页面中使用什么标签有所犹豫。<br>
      在前端学习的道路上我所不知道的还有很多，我能做的也是不断地努力不断地学习来更新自己的知识库。
    </p>
    <div class="experience">
      <h2 class="in-title">大学经历</h2>
      <div class="ex-content">
        <p class="time">2015年9月</p>
        <div class="activity">
          <h5 class="act-title">入读广东工业大学</h5>
          <span class="sum">计算机学院 软件工程 卓越工程师班</span>
        </div>
      </div>
      <div class="ex-content">
        <p class="time">2015年10月</p>
        <div class="activity">
          <h5 class="act-title">加入广工舞俱内建部门</h5>
          <span class="sum">负责社团的物资管理、活动策划和活动宣传</span>
        </div>
      </div>
      <div class="ex-content">
        <p class="time">2016年5月</p>
        <div class="activity">
          <h5 class="act-title">开始学习前端并加入师兄团队</h5>
          <span class="sum">抱着学习的心态通过面试加入师兄组建的一个前端工作室</span>
        </div>
      </div>
      <div class="ex-content">
        <p class="time">期间</p>
        <div class="activity">
          <h5 class="act-title">学习前端的一些框架和理论知识</h5>
          <span class="sum">Bootstrap、Less、JQuery、Node、Vue、fullPage</span>
        </div>
      </div>
      <div class="ex-content">
        <p class="time">2017年5月</p>
        <div class="activity">
          <h5 class="act-title">进入 旗风堂信息科技有限公司 实习</h5>
          <span class="sum">2017年7月正式入职</span>
        </div>
      </div>
      <div class="ex-content">
        <p class="time">期间</p>
        <div class="activity">
          <h5 class="act-title">H5工程师，负责完成移动端页面</h5>
          <span class="sum">期间完成了 vivo公司 616、818、教师节的活动页面，温碧泉宣传页面，小说微信小程序的后期维护等工作</span>
        </div>
      </div>
      <div class="ex-content">
        <p class="time">2017年11月</p>
        <div class="activity">
          <h5 class="act-title">搭建个人博客</h5>
          <span class="sum">通过借鉴大佬的博客开始筹备自己的个人博客系统，独立开发前端页面和后台</span>
        </div>
      </div>
    </div>
    <div class="otherInfo">
      <h2 class="in-title">其他资料</h2>
      <p><span class="ac-title">邮箱</span><a href="javascript:;">yigehaoren_Gdoer@163.com</a></p>
      <p><span class="ac-title">微博</span><a href="https://weibo.com/liuyouxiyoki" title="关注我的微博">一个好人goodoer</a></p>
      <p><span class="ac-title">QQ</span>302931504</p>
      <p><span class="ac-title">GitHub</span><a href="https://github.com/iamgdoer">https://github.com/iamgdoer</a></p>
    </div>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .aboutWrapper{
  	width: 853px;
  	background: #fff;
  	margin: 0 auto;
  	margin-top: 50px;
  	padding: 40px 45px;
    margin-bottom: 20px;
  	.com-title{
  		font-size: 22px;
  		font-weight: 200;
      margin-bottom: 70px;
  	}
    p{
      line-height: 30px;
    }
    .information{
      margin-bottom: 60px;
      .sign{
        color: #000;
      }
    }
    .experience{
      margin-bottom: 60px;
      .ex-content{
        padding: 30px 60px 10px;
        zoom: 1;
        border-bottom: 1px solid #eee;
        .time{
          float: left;
          font-size: 14px;
          width: 100px;
          color: #999;
          text-align: right;
        }
        .activity{
          float: left;
          margin-left: 60px;
          .act-title{
            font-size: 18px;
            color: #666;
            margin-bottom: 10px;
          }
          .sum{
            display: inline-block;
            font-size: 12px;
            color: #999;
            width: 500px;
          }
        }
        &:after{
          content: ".";
          display: block;
          clear: both;
        }
      }
    }
    .in-title{
      margin-bottom: 20px;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 400;
      color: #777;
      border-left: 5px solid #eee;
    }
    .otherInfo{
      font-size: 14px;
      .ac-title{
        display: inline-block;
        width: 150px;
      }
      a{
        color: #2277da;
      }
    }
  }
</style>