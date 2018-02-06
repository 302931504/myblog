const connection = require('../mysql/connection.js');
var checkSession = require('./util.js');

module.exports = {
  /*
  @description: 获取分类
  @params: none
  @return: 分类列表
  */
  getClassify (req, res) {
    var sql = 'SELECT * FROM classify';
    connection.query(sql,function (err, result) {
      if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, data: result, info: '获取成功'});
    });
  },
  /*
  @description: 删除某个分类
  @params: 分类id
  @return: 状态码
  */
  deleteClassify (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var sql = 'SELECT COUNT(*) AS num FROM blog WHERE classify_id = ?';
      var sqlParam = [req.query.classify_id];
      connection.query(sql,sqlParam,function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        if(result[0].num > 0){
          res.json({status: -1, info: '该分类有文章存在不能删除'});
        }
        if(result[0].num === 0){
          var delSql = 'DELETE FROM classify WHERE classify_id = ?';
          var delSqlParam = [req.query.classify_id];
          connection.query(delSql,delSqlParam,function (err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
            res.json({status: 0, info: '删除成功'});
          })
        }
      })
    }
  },
  /*
  @description: 新增分类
  @params: 分类名
  @return: 分类id
  */
  addClassify (req, res) {
    if (!checkSession(req)) {
      res.json({status: -1, info: '请先登录'})
    } else {
      var sql = 'SELECT COUNT(*) AS num FROM classify WHERE classify_text = ?';
      var sqlParam = [req.query.classify_text];
      connection.query(sql,sqlParam,function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        if(result[0].num>0){
          res.json({status: -1, info: '已存在该分类'});
        }
        if(result[0].num===0){
          var addSql = 'INSERT INTO classify(classify_text) VALUES(?)';
          var addSqlParam = [req.query.classify_text];
          connection.query(addSql,addSqlParam,function(err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
            res.json({status: 0, info: '创建成功', data: result.insertId});
          })
        }
      })
    }
  }
};