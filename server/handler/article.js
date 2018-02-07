const connection = require('../mysql/connection.js');
const mail = require('../mail/mailHandlers.js');
var checkSession = require('./util.js');
var _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

var defaultDir = './server/public';
var blogDir = defaultDir + '/blog';
fs.existsSync(defaultDir) || fs.mkdirSync(defaultDir);
fs.existsSync(blogDir) || fs.mkdirSync(blogDir);
fs.existsSync('./server/public/image') || fs.mkdirSync('./server/public/image');

module.exports = {
  /*
  @description: 保存文章
  @params: 文章的一些信息
  @return: 状态码
  */
  saveBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else{
      var text = req.body.classify_text;
      var sql = `SELECT classify_id FROM classify WHERE classify_text = ?`;
      var sqlParam = [text];
      connection.query(sql,sqlParam,function (err, result) {
        if (err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        var addSql = `INSERT INTO blog(blog_title,classify_id,blog_tags,blog_description,blog_content,blog_isShow) 
                      VALUES (?,?,?,?,?,?)`;
        var classify_id = result[0].classify_id;
        var addSqlParams = [req.body.title,classify_id,req.body.tags,req.body.description,req.body.content,req.body.isShow];
        connection.query(addSql,addSqlParams,function (err, result) {
          if(err){
            console.log('[ADD ERROR] - ',err.message);
            return;
          }
          if (req.body.isShow == 1) {
            const param = {
              to: '',
              user_name: '',
              summery: req.body.description,
              classify: req.body.classify_text,
              tags: req.body.tags,
              id: result.insertId,
              title: req.body.title,
              currentTime: Date.now(),
              pub_time: Date.now()
            };
            var mailSql = `SELECT user_email, user_name
                            FROM users`;
            connection.query(mailSql, function(err, result) {
              if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
              }
              var i = 0;
              var interval = 400; //每封邮件发送的间隔时间
              _.map(result, function(user) {
                setTimeout(() => {
                  param.to = user.user_email;
                  param.user_name = user.user_name;
                  mail.new_article(param);
                }, interval * i++);
              })
            })
          }
          res.json({status: 0, info: '保存成功'});  
        }) 
      });   
    }
  },
  /*
  @description: 获取某一篇文章
  @params: 文章id
  @return: 文章详情
  */
  getOneBlog (req, res) {
    var sql = `SELECT *
             FROM blog b, classify c
             WHERE b.classify_id = c.classify_id AND blog_id = ${req.query.id}`;
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    })
  },
  /*
  @description: 更新文章
  @params: 文章的信息
  @return: 状态码
  */
  updateBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var sql = `SELECT classify_id FROM classify WHERE classify_text = ?`;
      var sqlParam = [req.body.classify_text];
      connection.query(sql, sqlParam, function(err, result) {
        if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        var upSql = `UPDATE blog
                     SET blog_title = ?,
                         classify_id = ${result[0].classify_id},
                         blog_tags = ?,
                         blog_updateTime = NOW(),
                         blog_description = ?,
                         blog_content = ?,
                         blog_isShow = ?
                     WHERE blog_id = ${req.body.id}`;
        var upSqlParams = [req.body.title, req.body.tags, req.body.description, req.body.content, req.body.isShow];
        connection.query(upSql, upSqlParams, function (err, result) {
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          res.json({status: 0, info: '更新成功'});
        })
      })
    }
  },
  /*
  @description: 获取文章列表
  @params: 页码
  @params: 文章状态
  @return: 文章列表
  */
  getBlogList (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      const limit = 10;
      let offset = (req.query.page - 1) * limit;
      var sql = ``;
      if (req.query.isShow == 0) {
        sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime, blog_pubTime 
               FROM blog b, classify c 
               WHERE b.classify_id = c.classify_id AND blog_isShow = 0
               ORDER BY blog_updateTime DESC
               LIMIT ?,?`;
      } 
      if (req.query.isShow == 1)  {
        sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime, blog_pubTime 
               FROM blog b, classify c 
               WHERE b.classify_id = c.classify_id AND blog_isShow = 1
               ORDER BY blog_pubTime DESC
               LIMIT ?,?`;
      }
      var sqlParams = [offset, limit];
      connection.query(sql, sqlParams, function (err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        res.json({status: 0, data: result, info: '获取成功'});
      })
    }
  },
  /*
  @description: 删除某篇文章
  @params: 文章id
  @return: 状态码
  */
  deleteBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var sql = `SELECT COUNT(*) num
                 FROM bbs
                 WHERE reply_id = ${req.query.id} AND type = 2`;
      connection.query(sql, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        if(result[0].num > 0) {
          var delSql = `DELETE 
                        FROM bbs
                        WHERE bbs_id IN (SELECT b2.bbs_id
                                         FROM (SELECT bbs_id, reply_id, type 
                                               FROM bbs) b2
                                         WHERE b2.reply_id = ${req.query.id} AND b2.type = 2);`;
          connection.query(delSql, function(err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
          })
        }
        var delSql2 = `DELETE FROM blog WHERE blog_id = ${req.query.id}`;
        connection.query(delSql2, function (err, result) {
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
  @description: 获取关键文章
  @params: 文章关键字
  @return: 文章列表
  */
  getKeyBlog (req, res) {
    var sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime, blog_pubTime
               FROM blog b, classify c
               WHERE b.classify_id = c.classify_id AND blog_isShow = ${req.query.isShow}
               AND blog_id IN (SELECT DISTINCT blog_id
                               FROM blog
                               WHERE blog_content LIKE ? OR blog_title LIKE ? OR blog_title LIKE ? OR classify_text LIKE ?)
               ORDER BY blog_updateTime DESC`;
    var sqlParam = [`%${req.query.keyWord}%`, `%${req.query.keyWord}%`, `%${req.query.keyWord}%`, `%${req.query.keyWord}%`];
    connection.query(sql, sqlParam, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    });
  },
  /*
  @description: 获取相关分类下的文章
  @params: 分类名
  @return: 文章列表
  */
  getClassifyBlog (req, res) {
    var sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime, blog_pubTime
               FROM blog b, classify c
               WHERE b.classify_id = c.classify_id AND blog_isShow = ${req.query.isShow} 
                  AND classify_text = ?
               ORDER BY blog_updateTime DESC`;
    var sqlParam = [req.query.text];
    connection.query(sql, sqlParam, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    }); 
  },
  /*
  @description: 发布文章
  @params: 文章id
  @return: 状态码
  */
  publishBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var upSql = `UPDATE blog
                   SET blog_isShow = 1,
                       blog_pubTime = NOW()
                   WHERE blog_id = ?`;
      var upSqlParam = [req.body.id];
      connection.query(upSql, upSqlParam, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        var mailSql = `SELECT blog_title, classify_text, blog_tags, blog_description
                       FROM blog b, classify c
                       WHERE b.classify_id = c.classify_id AND blog_id = ${req.body.id}`;
        connection.query(mailSql, function(err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          const param = {
            to: '',
            user_name: '',
            summery: result[0].blog_description,
            classify: result[0].classify_text,
            tags: result[0].blog_tags,
            id: req.body.id,
            title: result[0].blog_title,
            currentTime: Date.now(),
            pub_time: Date.now()
          };
          var mailSql2 = `SELECT user_email, user_name
                          FROM users`;
          connection.query(mailSql2, function(err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
            var i = 0;
            var interval = 400; //每封邮件发送的间隔时间
            _.map(result, function(user) {
              //异步执行，防止短时间链接过多
              setTimeout(() => {
                param.to = user.user_email;
                param.user_name = user.user_name;
                mail.new_article(param);
              }, interval * i++);
            })
          })
        })               
        res.json({status: 0, info: '发布成功'});
      })
    }
  },
  /*
  @description: 文章移稿
  @params: 文章id
  @return: 状态码
  */
  draftBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var upSql = `UPDATE blog
                   SET blog_isShow = 0
                   WHERE blog_id = ?`;
      var upSqlParam = [req.body.id];
      connection.query(upSql, upSqlParam, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        res.json({status: 0, info: '移稿成功'});
      })
    }
  },
  /*
  @description: 获取文章数目
  @params: 文章状态
  @return: 文章数目
  */
  getCount (req, res) {
    var sql = `SELECT COUNT(*) AS count 
               FROM blog
               WHERE blog_isShow = ${req.query.isShow}`;
    connection.query(sql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result[0].count});
    })
  },
  /*
  @description: 文章上一篇下一篇功能
  @params: 文章状态
  @params: 文章id
  @return: 当前文章的左右相邻文章
  */
  getAdjacentBlog (req, res) {
    var id = req.query.id;
    var show = req.query.show;
    var sql = `(SELECT blog_id, blog_title FROM blog WHERE blog_id < ${id} AND blog_isShow = ${show} ORDER BY blog_id DESC LIMIT 1) 
               UNION ALL 
               (SELECT blog_id, blog_title FROM blog WHERE blog_id > ${id} AND blog_isShow = ${show} ORDER BY blog_id ASC LIMIT 1);`
    connection.query(sql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    });
  },
  /*
  @description: 上传图片
  @params: 图片内容
  @return: 图片地址
  */
  uploadImg (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'});
    } else {
      const form = new formidable.IncomingForm();
      form.uploadDir = './server/public/image';
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err);
        }
        var oldPath = files.photo.path;
        var newPath = blogDir + '/' + files.photo.name;
        fs.renameSync(oldPath, newPath, (err) => {
          if (err) {
            console.log(err);
          }
        })
        newPath = newPath.replace('\\', '/');
        res.json({status: 0, url: newPath});
      });
    }
  }
};
