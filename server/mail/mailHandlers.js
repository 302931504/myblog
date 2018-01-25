var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({  
  service: 'qq',  
  auth: {  
    user: 'iamgdoer@foxmail.com',  
    pass: 'oiwzkcwnirwzcaii' //授权码,通过QQ获取  
  }  
});

module.exports = {
  new_follow: function (param) {
    var mailOptions = {
      from: '"一个好人的个人博客"<iamgdoer@foxmail.com>',
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
      from: '"一个好人的个人博客"<iamgdoer@foxmail.com>',
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
      from: '"一个好人的个人博客"<iamgdoer@foxmail.com>',
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
      from: '"一个好人的个人博客"<iamgdoer@foxmail.com>',
      to: 'iamgdoer@foxmail.com',
      subject: '博客文章有新评论',
      html: blog_comment_myself_content(param)
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