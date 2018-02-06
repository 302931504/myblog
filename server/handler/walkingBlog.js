const connection = require('../mysql/connection.js');
const checkSession = require('./util.js');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports = {
  /*
  @description: 新增行博
  @params: 内容
  @params: 标签
  @return: 状态码
  */
  addWalkingBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      const form = new formidable.IncomingForm();
      form.uploadDir = './server/public/image';
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err);
        }
        var oldPath = files.file.path;
        var newPath = path.join(path.dirname(oldPath),files.file.name);
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.log(err);
          }
        })
        newPath = newPath.replace('\\', '/');
        var addSql = `INSERT INTO walking_blog(walking_blog_content, walking_blog_tags, w_img_url)
                      VALUES(?,?,?)`;
        var addSqlParams = [fields.content, fields.tags, newPath];
        connection.query(addSql, addSqlParams, function(err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          res.json({status: 0, info: '添加成功'});
        })
      })
    }        
  },
  /*
  @description: 获取行博
  @params: none
  @return: 行博列表
  */
  getWalkingBlog (req, res) {
    var sql = `SELECT w.*, ifnull(b.count, 0) as comment_count
               FROM walking_blog w LEFT JOIN 
                                   (SELECT reply_id, count(*) as count 
                                    FROM bbs 
                                    WHERE type = 1 
                                    GROUP BY reply_id) b 
                                   ON w.walking_blog_id = b.reply_id
              ORDER BY w.walking_blog_time DESC`;
    connection.query(sql, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    })
  },
  /*
  @description: 删除行博
  @params: 行博id
  @return: 状态码
  */
  deleteWBlog (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var sql = `SELECT COUNT(*) num
                 FROM bbs
                 WHERE reply_id = ${req.query.id} AND type = 1`;
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
                                         WHERE b2.reply_id = ${req.query.id} AND b2.type = 1);`;
          connection.query(delSql, function(err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
          })
        }
        var delSql2 = `DELETE FROM walking_blog WHERE walking_blog_id = ${req.query.id}`;
        connection.query(delSql2, function (err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          res.json({status: 0, info: '删除成功'});
        })
      })
    }
  }
}