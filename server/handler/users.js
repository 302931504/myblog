const connection = require('../mysql/connection.js');
const mail = require('../mail/mailHandlers.js');
var checkSession = require('./util.js');

module.exports = {
  /*
  @description: 获取用户列表
  @params: 页码
  @return: 用户列表
  */
  getUserList (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      const limit = 10;
      let offset = (req.query.page - 1) * limit;
      var sql = 'SELECT * FROM users ORDER BY add_time DESC LIMIT ?,?';
      var sqlParams = [offset, limit];
      connection.query(sql,sqlParams,function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        if (result.length > 0) {
          res.json({status: 0, info: '获取成功', data: result});
        } else if (result.length <= 0) {
          res.json({status: -1, info: '暂无记录', data: result});
        }
      });
    }
  },
  /*
  @description: 新增订阅
  @params: 用户名
  @params: 用户邮箱
  @return: 用户id
  */
  addFollow (req, res) {
    var sql = 'SELECT COUNT(*) AS num FROM users WHERE user_email = ?';
    var sqlParam = [req.body.user_email];
    connection.query(sql,sqlParam,function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      if(result[0].num > 0) {
        res.json({status: -1, info: '该邮箱已经订阅博客'});
      }
      if(result[0].num === 0) {
        var addSql = 'INSERT INTO users(user_email, user_name) VALUES(?,?)';
        var addSqlParam = [req.body.user_email, req.body.user_name];
        connection.query(addSql,addSqlParam,function(err, result) {
          if(err) {
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }
          let param = {
            currentTime: Date.now()
          }
          mail.new_follow(param);
          res.json({status: 0, info: '新增成功', data: result.insertId});
        })
      }
    })
  },
  /*
  @description: 删除某个用户
  @params: 用户id
  @return: 状态码
  */
  deleteUser (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var delSql = 'DELETE FROM users WHERE user_id = ?';
      var delSqlParam = [req.query.user_id];
      connection.query(delSql,delSqlParam,function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          res.json({status: -1, info: '错误！删除失败'});
          return;
        }
        res.json({status: 0, info: '删除成功'});
      })
    }
  },
  /*
  @description: 获取用户数目
  @params: none
  @return: 用户数
  */
  userCount (req, res) {
    var sql = `SELECT COUNT(*) AS count
               FROM users`;
    connection.query(sql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result[0].count})
    })
  }
}