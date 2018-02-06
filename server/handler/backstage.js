const connection = require('../mysql/connection.js');
var checkSession = require('./util.js');

module.exports = {
  /*
  @description：登录博客
  @params：account
  @params：password
  @return：管理员信息 
  */
  login (req, res) {
    const username = req.body.username
    const password = req.body.password
    var sql = `SELECT *, COUNT(*) num FROM manager WHERE m_account = ?`;
    var sqlParam = [username];
    connection.query(sql, sqlParam, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      if (result[0].num <= 0) {
        res.json({status: -1, info: '不存在此账号'});
      }
      if (result[0].num > 0) {
        if (result[0].m_password === password) {
          req.session.user = {
            username: username,
            password: password
          };
          let user = {
            username: username,
            password: password,
            nickname: result[0].m_nickname,
            email: result[0].m_email
          };
          res.json({status: 0, info: '登录成功', user: user});
        } else {
          res.json({status: -1, info: '密码错误'});
        }
      }
    });
  },
  /*
  @description: 退出博客
  @params: none
  @return: 清空管理员信息
  */
  logout (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      req.session.user = {};
      res.json({status: 0,info: '退出成功', user: req.session.user});
    }
  },
  /*
  @description: 获取博客资源数目
  @params: none
  @return: 博客资源数目
  */
  getNum (req, res) {
    var sql = 'SELECT * FROM vw_blog_count';
    connection.query(sql, function(err, result) {
      if(err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    });
  },
  /*
  @description: 更新管理员信息
  @params: 管理员信息
  @return: 更新后的信息
  */
  updateMInfo (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var sql = `SELECT COUNT(*) num, m_password FROM manager WHERE m_account = ?`;
      var sqlParam = [req.body.oldAccount];
      connection.query(sql, sqlParam, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        if(result[0].num <= 0) {
          res.json({status: -1, info: '账号不存在'});
          return;
        }
        if(result[0].num > 0) {
          if(req.body.oldPass !== result[0].m_password) {
            res.json({status: -1, info: '密码错误'});
            return;
          } else {
            var upSql = `UPDATE manager
                         SET m_account = ?,
                             m_password = ?,
                             m_nickname = ?,
                             m_email = ?
                         WHERE m_account = ?`;
            var upSqlParams = [req.body.account,req.body.password,req.body.nickname,req.body.email,req.body.account];
            connection.query(upSql, upSqlParams, function(err, result) {
              if(err) {
                console.log('[INSERT ERROR] - ',err.message);
                return;
              }
              res.json({status: 0, info: '更新成功', data: result});
            })
          }
        }
      })
    }
  }
}