var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({  
  service: 'qq',  
  auth: {  
    user: 'iamgdoer@foxmail.com',  
    pass: 'oiwzkcwnirwzcaii' //授权码,通过QQ获取  
  }  
});

module.exports = {
  new_follow: function () {
    var mailOptions = {
      from: '"一个好人的个人博客"<iamgdoer@foxmail.com>',
      to: 'iamgdoer@foxmail.com',
      subject: '博客有新订阅',
      html: new_follow_content()
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) console.log(err);
    });
  }
}

var my_blog_url = 'http://localhost:8080/#/admin/home';
var mail_head = '<h1 class="title" style="font-size: 20px;padding: 20px;background-color: #24292c;font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal;"><a href="' + my_blog_url + '" title="' + my_blog_url + '" style="color: #fff; text-decoration:none;">一个好人的个人博客</a></h1>';

function new_follow_content () {
  var mail_content = '<div class="mainBox" style="padding: 20px 30px;"><p class="mailTitle" style="font-size: 16px; color: #333;">[新订阅]<a href="www.baidu.com" style="color: #537fd8; margin-left: 5px; text-decoration:none;">您有新订阅，点击查看详情。</a></p><p style="font-size: 13px; color: #555; padding: 10px 0 20px 0; border-bottom: 1px solid #ddd;">邮件发送时间: {{currentTime}}</p><div class="content" style="font-size: 14px; margin-top: 20px;"><p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></div>';
  return mail_head + mail_content
        .replace(/{{currentTime}}/g, initTime(new Date()));
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