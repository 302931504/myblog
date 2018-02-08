<template>
  <div class="listWrapper">
    <article>
      <h1>这是一篇文章</h1>
      <div class="time">
        <span><i class="icon-clock"></i> 2018-01-01</span>
        <span><i class="icon-update"></i> 2018-01-01</span>
        <span>前端知识</span>
      </div>
      <p>本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
      <div class="foot">
        <div class="tags">
          <span>基础知识</span>
          <span>面试总结</span>
          <span>底层机制</span>
        </div>
        <div class="readNum">
          <span>阅读(50)</span>
          <span>评论(20)</span>
          <span class="articleDetail">全文链接 >></span>
        </div>
      </div>
    </article>
    <article>
      <h1>这是一篇文章</h1>
      <div class="time">
        <span><i class="icon-clock"></i> 2018-01-01</span>
        <span><i class="icon-update"></i> 2018-01-01</span>
        <span>前端知识</span>
      </div>
      <p>本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
      <div class="foot">
        <div class="tags">
          <span>基础知识</span>
          <span>面试总结</span>
          <span>底层机制</span>
        </div>
        <div class="readNum">
          <span>阅读(50)</span>
          <span>评论(20)</span>
          <span class="articleDetail">全文链接 >></span>
        </div>
      </div>
    </article>
    <article>
      <h1>这是一篇文章</h1>
      <div class="time">
        <span><i class="icon-clock"></i> 2018-01-01</span>
        <span><i class="icon-update"></i> 2018-01-01</span>
        <span>前端知识</span>
      </div>
      <p>本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
      <div class="foot">
        <div class="tags">
          <span>基础知识</span>
          <span>面试总结</span>
          <span>底层机制</span>
        </div>
        <div class="readNum">
          <span>阅读(50)</span>
          <span>评论(20)</span>
          <span class="articleDetail">全文链接 >></span>
        </div>
      </div>
    </article>
    <article>
      <h1>这是一篇文章</h1>
      <div class="time">
        <span><i class="icon-clock"></i> 2018-01-01</span>
        <span><i class="icon-update"></i> 2018-01-01</span>
        <span>前端知识</span>
      </div>
      <p>本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
      <div class="foot">
        <div class="tags">
          <span>基础知识</span>
          <span>面试总结</span>
          <span>底层机制</span>
        </div>
        <div class="readNum">
          <span>阅读(50)</span>
          <span>评论(20)</span>
          <span class="articleDetail">全文链接 >></span>
        </div>
      </div>
    </article>
    <article>
      <h1>这是一篇文章</h1>
      <div class="time">
        <span><i class="icon-clock"></i> 2018-01-01</span>
        <span><i class="icon-update"></i> 2018-01-01</span>
        <span>前端知识</span>
      </div>
      <p>本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
      <div class="foot">
        <div class="tags">
          <span>基础知识</span>
          <span>面试总结</span>
          <span>底层机制</span>
        </div>
        <div class="readNum">
          <span>阅读(50)</span>
          <span>评论(20)</span>
          <span class="articleDetail">全文链接 >></span>
        </div>
      </div>
    </article>
    <article>
      <h1>这是一篇文章</h1>
      <div class="time">
        <span><i class="icon-clock"></i> 2018-01-01</span>
        <span><i class="icon-update"></i> 2018-01-01</span>
        <span>前端知识</span>
      </div>
      <p>本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
      <div class="foot">
        <div class="tags">
          <span>基础知识</span>
          <span>面试总结</span>
          <span>底层机制</span>
        </div>
        <div class="readNum">
          <span>阅读(50)</span>
          <span>评论(20)</span>
          <span class="articleDetail">全文链接 >></span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
    
</script>

<style scoped lang="less" rel="stylesheet/less">
  .listWrapper{
    color: #555;
    width: 853px;
    article{
      display: block;
      padding: 40px 45px;
      margin-bottom: 26px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
      h1{
        font-size: 23px;
        color: #555;
        margin-bottom: 13px;
      }
      .time{
        font-size: 0;
        color: #aaa;
        span{
          font-size: 12px;
          margin-right: 19px;
        }
      }
      p{
        margin: 26px 0;
        line-height: 25px;
      }
      .foot{
        font-size: 0;
        span{
          display: inline-block;
          font-size: 12px;
          color: #777;
          margin-right: 21px;
          cursor: pointer;
        }
        .tag{
          float: left;
        }
        .readNum{
          float: right;
          .articleDetail{
            margin-right: 0;
            color: #555;
            text-align: underline;
            transition: all 0.2s ease-out;
            &:hover{
              color: #000;
            }
          }
        }
      }
    }
  }
</style>