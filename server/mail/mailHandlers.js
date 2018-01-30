var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({  
  host: "smtp.163.com",
  secureConnection: true,
  port:465, 
  auth: {  
    user: 'yigehaoren_Gdoer@163.com',  
    pass: 'gdoer2018' //授权码,通过QQ获取  
  }  
});

module.exports = {
  new_follow: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: 'iamgdoer@foxmail.com',
      subject: '博客有新订阅',
      html: new_follow_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  },
  bbs_myself: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: 'iamgdoer@foxmail.com',
      subject: '博客有新留言',
      html: bbs_myself_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  },
  walk_comment_myself: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: 'iamgdoer@foxmail.com',
      subject: '博客HANGBLOG有新评论',
      html: walk_comment_myself_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  },
  blog_comment_myself: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: 'iamgdoer@foxmail.com',
      subject: '博客文章有新评论',
      html: blog_comment_myself_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  },
  answer_comment: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: param.to,
      subject: '您的留言有新回复',
      html: answer_comment_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  },
  new_article: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: param.to,
      subject: '一个好人的个人博客',
      html: new_article_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  },
  have_quote: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<yigehaoren_Gdoer@163.com>',
      to: param.to,
      subject: '一个好人的个人博客',
      html: have_quote_content(param)
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  }
}

var my_blog_url = 'http://localhost:8080/#/login';
var mail_head = '<h1 class="title" style="font-size: 20px;padding: 20px;background-color: #24292c;font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal;"><a href="' + my_blog_url + '" title="' + my_blog_url + '" style="color: #fff; text-decoration:none;">一个好人的个人博客</a></h1>';

function new_follow_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新订阅]<a href="{{home_url}}" style="color: #537fd8; margin-left: 5px; text-decoration:none;">您有新订阅，点击查看详情。</a></p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{home_url}}/g, my_blog_url)
        .replace(/{{currentTime}}/g, initTime(param.currentTime));
};

function bbs_myself_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新留言]<a href="{{home_url}}" style="color: #537fd8; margin-left: 5px; text-decoration:none;">您有一条新留言，点击查看详情</a></p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">{{user_name}} 于 {{leave_time}} 发表了新留言：</p><pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>{{bbs_content}}<span style="font-size: 20px;"> ”</span></pre><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{home_url}}/g, my_blog_url)
        .replace(/{{currentTime}}/g, initTime(param.currentTime))
        .replace(/{{user_name}}/g, param.user_name)
        .replace(/{{leave_time}}/g, initTime(param.leave_time))
        .replace(/{{bbs_content}}/g, param.bbs_content);
};

function walk_comment_myself_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新评论] 您的行博有一条新评论！</p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">{{user_name}} 于 {{leave_time}} 发表了新留言：</p><pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>{{content}}<span style="font-size: 20px;"> ”</span></pre><p style="line-height: 30px; color: #333;">行博详情</p><pre style="padding: 15px 20px; background-color: #eee;border: 1px solid #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;">{{walk_blog_content}}</pre><p style="line-height: 30px; color: #333;">您可以点击<a href="{{home_url}}/mood/{{id}}" style="color: #537fd8;">[查看详情]</a>查看完整内容</p><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{currentTime}}/g, initTime(param.currentTime))
        .replace(/{{user_name}}/g, param.user_name)
        .replace(/{{leave_time}}/g, initTime(param.leave_time))
        .replace(/{{content}}/g, param.content)
        .replace(/{{walk_blog_content}}/g, param.walk_blog_content)
        .replace(/{{home_url}}/g, my_blog_url)
        .replace(/{{id}}/g, param.id);
};

function blog_comment_myself_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新评论] 您的文章<a href="http://localhost:8080/#/admin/home" style="color: #537fd8; margin-left: 5px; line-height: 30px; text-decoration:none;">《{{blog_title}}》</a>有一条新评论！</p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">{{user_name}} 于 {{leave_time}} 发表了新留言：</p><pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>{{content}}<span style="font-size: 20px;"> ”</span></pre><p style="line-height: 30px; color: #333;">您可以点击<a href="{{home_url}}/article/{{id}}" style="color: #537fd8;">[查看详情]</a>查看完整内容</p><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{blog_title}}/g, param.blog_title)
        .replace(/{{currentTime}}/g, initTime(param.currentTime))
        .replace(/{{user_name}}/g, param.user_name)
        .replace(/{{leave_time}}/g, initTime(param.leave_time))
        .replace(/{{content}}/g, param.content)
        .replace(/{{home_url}}/g, my_blog_url)
        .replace(/{{id}}/g, param.id);
};

function answer_comment_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新回复] 您的留言<pre style="background-color: #FCFCFC;color: #333;font-size: 14px;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;"> ”</span>{{answer_content}}<span style="font-size: 20px;"> ”</span></pre>有一条新回复！</p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">{{user_name}} 于 {{leave_time}} 回复了你的留言：</p><pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>{{content}}<span style="font-size: 20px;"> ”</span></pre><p style="line-height: 30px; color: #333;">您可以点击<a href="{{home_url}}" style="color: #537fd8;text-decoration: none;">[查看详情]</a>查看完整内容</p><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{answer_content}}/g, param.answer_content)
        .replace(/{{currentTime}}/g, initTime(param.currentTime))
        .replace(/{{user_name}}/g, param.user_name)
        .replace(/{{leave_time}}/g, initTime(param.leave_time))
        .replace(/{{content}}/g, param.content)
        .replace(/{{home_url}}/g, my_blog_url);
}

function new_article_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新博文]<a href="{{home_url}}/article/{{id}}" style="color: #537fd8;line-height: 30px; text-decoration:none;margin-left: 5px;">{{title}}</a></p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><h5 style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal;color: #333;">{{user_name}}，您好！</h5><p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">我于{{pub_time}}发表了新博文<a href="http://localhost:8080/#/admin/home" style="color: #537fd8; margin-left: 5px; line-height: 30px; text-decoration:none;">《{{title}}》</a>：</p><div style="padding: 15px 20px; background-color: #eee;border: 1px solid #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0; word-wrap:break-word; box-sizing: border-box;">{{summery}}</div><p style="line-height: 30px; color: #333;">文章分类：{{classify}}</p><p style="line-height: 30px; color: #333;">标签：{{tags}}</p><p style="line-height: 30px; color: #333;">您可以点击<a href="{{home_url}}/article/{{id}}" style="color: #537fd8;">[查看详情]</a>查看文章的完整内容</p><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{home_url}}/g, my_blog_url)
        .replace(/{{id}}/g, param.id)
        .replace(/{{title}}/g, param.title)
        .replace(/{{currentTime}}/g, initTime(param.currentTime))
        .replace(/{{user_name}}/g, param.user_name)
        .replace(/{{pub_time}}/g, initTime(param.pub_time))
        .replace(/{{summery}}/g, param.summery)
        .replace(/{{classify}}/g, param.classify)
        .replace(/{{tags}}/g, param.tags);
}

function have_quote_content (param) {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新消息] 您的留言<pre style="color: #333;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>{{leave_content}}<span style="font-size: 20px;"> ”</span></pre> 有新动态！</p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><h5 style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal;color: #333;">{{old_user}}，您好！</h5><p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">{{user_name}} 于 {{currentTime}} 引用并回复了你的留言：</p><pre style="padding: 15px 20px;;border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>{{content}}<span style="font-size: 20px;"> ”</span></pre><p style="line-height: 30px; color: #333;">您可以点击<a href="{{home_url}}" style="color: #537fd8;">[查看详情]</a>查看完整内容</p><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{leave_content}}/g, param.leave_content)
        .replace(/{{currentTime}}/g, initTime(param.currentTime))
        .replace(/{{old_user}}/g, param.old_user)
        .replace(/{{user_name}}/g, param.user_name)
        .replace(/{{content}}/g, param.content)
        .replace(/{{home_url}}/g, my_blog_url)
}

function initTime (time) {
  let myDate = new Date(time);
  let Year = myDate.getFullYear();
  let Month = myDate.getMonth() + 1;
  let Day = myDate.getDate();
  let Hours = myDate.getHours();
  let Minutes = myDate.getMinutes();
  let Seconds = myDate.getSeconds();
  if (Month < 10) {
    Month = '0' + Month;
  } 
  if (Day < 10) {
    Day = '0' + Day;
  }
  if (Hours < 10) {
    Hours = '0' + Hours;
  }
  if (Minutes < 10) {
    Minutes = '0' + Minutes;
  }
  if (Seconds < 10) {
    Seconds = '0' + Seconds;
  }
  let newtime = Year + '-' + Month + '-' + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
  return newtime;
};