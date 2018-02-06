const connection = require('../mysql/connection.js');
const mail = require('../mail/mailHandlers.js');
var checkSession = require('./util.js');

module.exports = {
  /*
  @description: 新增子留言
  @params: 父留言id
  @params: 用户邮箱
  @params: 用户名
  @params: 留言内容
  @return: 状态码
  */
  addChildBBS (req, res) {
    var addSql = `INSERT INTO bbs_child(parent_id, child_email, child_name, bbs_child_content)
                  VALUES (?,?,?,?)`;
    var addSqlParams = [req.body.parent_id, req.body.user_email, req.body.user_name,req.body.bbs_child_content];
    connection.query(addSql, addSqlParams, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      var mailSql = `SELECT user_email, user_name, bbs_content
                     FROM bbs
                     WHERE bbs_id = ${req.body.parent_id}`;
      connection.query(mailSql, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        const param = {
          to: result[0].user_email,
          answer_content: result[0].bbs_content,
          currentTime: Date.now(),
          user_name: req.body.user_name,
          leave_time: Date.now(),
          content: req.body.bbs_child_content,
        };
        mail.answer_comment(param); //收到评论回复发送邮件
      })
      res.json({status: 0, info: '回复成功'});
    })
  },
  /*
  @description: 删除父留言
  @params: 父留言id
  @return: 状态码
  */
  deleteBBS (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var Sql = 'SELECT COUNT(*) AS num FROM bbs_child WHERE parent_id = ?';
      var SqlParam = [req.query.bbs_id];
      connection.query(Sql, SqlParam, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        if (result[0].num > 0) {
          var delSql = 'DELETE FROM bbs_child WHERE parent_id = ?';
          connection.query(delSql, SqlParam, function(err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
          })
        }
        var delSql2 = 'DELETE FROM bbs WHERE bbs_id = ?';            
        connection.query(delSql2, SqlParam, function(err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          res.json({status: 0, info: '删除成功'});
        })
      })
    }
  },
  /*
  @description: 删除某条子留言
  @params: 子留言id
  @return: 状态码
  */
  deleteChildBBS (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var  delSql = `DELETE
                     FROM bbs_child
                     WHERE bbs_child_id = ?`;
      var delSqlParam = [req.query.id];
      connection.query(delSql, delSqlParam, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        res.json({status: 0, info: '删除成功'});
      })
    }
  },
  /*
  @description: 评论
  @params: 对象留言id
  @params: 邮箱
  @params: 名字
  @params: 内容
  @params: 留言类型
  @return: 状态码
  */
  comment (req, res) {
    var addSql = `INSERT 
                  INTO bbs(reply_id, user_email, user_name, bbs_content, type)
                  VALUES (?,?,?,?,?)`;
    var addSqlParams = [req.body.reply_id, req.body.uemail, req.body.uname, req.body.content, req.body.type];
    connection.query(addSql, addSqlParams, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      if(req.body.type == 0) { //博客留言发送邮件
        const param = {
          currentTime: Date.now(),
          user_name: req.body.uname,
          leave_time: Date.now(),
          bbs_content: req.body.content.replace(/<blockquote>[\s\S]*<\/blockquote>/, '')
        };
        mail.bbs_myself(param);
      }
      if(req.body.type == 1) { //评论行博发送邮件
        var wSql = `SELECT walking_blog_content 
                    FROM walking_blog 
                    WHERE walking_blog_id = ${req.body.reply_id}`;
        connection.query(wSql, function(err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          const param = {
            currentTime: Date.now(),
            user_name: req.body.uname,
            leave_time: Date.now(),
            content: req.body.content.replace(/<blockquote>[\s\S]*<\/blockquote>/, ''),
            walk_blog_content: result[0].walking_blog_content,
            id: req.body.reply_id
          }
          mail.walk_comment_myself(param);
        })
      }
      if(req.body.type === 2) { //评论文章发送邮件
        var aSql = `SELECT blog_title 
                    FROM blog
                    WHERE blog_id = ${req.body.reply_id}`;
        connection.query(aSql, function(err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          const param = {
            blog_title: result[0].blog_title,
            currentTime: Date.now(),
            user_name: req.body.uname,
            leave_time: Date.now(),
            content: req.body.content.replace(/<blockquote>[\s\S]*<\/blockquote>/, ''),
            id: req.body.reply_id
          };
          mail.blog_comment_myself(param);
        })
      }
      res.json({status: 0, info: '评论成功'});
    })
  },
  /*
  @description: 获取留言(评论)
  @params: 对象留言id
  @params: 留言类型
  @return: 留言列表
  */
  getComment (req, res) {
    var sql = `SELECT *
               FROM bbs LEFT OUTER JOIN bbs_child ON (bbs_id = parent_id)
               WHERE reply_id = ? AND type = ?
               ORDER BY bbs_time DESC;`
    var sqlParams = [req.query.reply_id, req.query.type];
    connection.query(sql, sqlParams, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    })      
  },
  /*
  @description: 引用留言(评论)
  @params: 对象留言id
  @params: 邮箱
  @params: 名字
  @params: 内容
  @params: 留言类型
  @return: 状态码
  */
  quote (req, res) {
    var addSql = `INSERT
                  INTO bbs(reply_id, user_email, user_name, bbs_content, type)
                  VALUES (?,?,?,?,?)`;
    var addSqlParams = [req.body.reply_id, req.body.uemail, req.body.uname, req.body.content, req.body.type]; 
    connection.query(addSql, addSqlParams, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      const param = {
        to: req.body.to_email,
        leave_content: req.body.to_content,
        currentTime: Date.now(),
        old_user: req.body.old_user,
        user_name: req.body.uname,
        content: req.body.content.replace(/<blockquote>[\s\S]*<\/blockquote>/, ''),
      };
      mail.have_quote(param);
      res.json({status: 0, info: '回复成功'});
    })  
  }
}