const connection = require('../mysql/connection.js');

module.exports = {
  /*
  @description: 获取分类及分类下的文章数目
  @params: none
  @return: 分类
  */
  getClassifyCount (req, res) {
    var sql = `SELECT c.classify_text, IFNULL(b.count,0) AS count
               FROM classify c LEFT JOIN(SELECT classify_id, COUNT(*) AS count
                                         FROM blog
                                         WHERE blog_isShow = 1
                                         GROUP BY classify_id) b
                                    ON c.classify_id = b.classify_id`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log('[SELECT getClassifyCount ERROR] - ',err.message);
        return;
      }
      res.json({status: 0, info: '获取成功', data: result});
    });
  },
  /*
  @description: 获取文章&日期
  @params: none
  @return: 文章列表
  */
  getBlogDate (req, res) {
    var sql = `SELECT DATE_FORMAT(blog_pubTime,'%y%m') AS time
               FROM blog
               WHERE blog_isShow = 1
               GROUP BY DATE_FORMAT(blog_pubTime,'%y%m')
               ORDER BY time DESC`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log('[SELECT getpubTime ERROR] - ',err.message);
        return;
      }
      var time = [];
      if (!result.length) {
        res.json({status: -1, info: '没有符合此条件的博文'});
        return;
      }
      for (let i = 0; i < result.length; i++) {
        time.push({yearMonth: result[i].time, blogs: []});
      }
      var sql2 = `SELECT blog_title, blog_id, DATE_FORMAT(blog_pubTime,'%y%m') AS ymonth, DATE_FORMAT(blog_pubTime,'%m-%d') AS mday
                  FROM blog
                  WHERE blog_isShow = 1`;
      connection.query(sql2, (err, result) => {
        if (err) {
          console.log('[SELECT getpubTime2 ERROR] - ',err.message);
          return;
        }
        for (let i = 0; i < time.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (time[i].yearMonth === result[j].ymonth) {
              time[i].blogs.push(result[j]);
            }
          }
        }
        res.json({status: 0, info: '获取成功', data: time});
      }); 
    });
  },
  /*
  @description: 获取关键文章&日期
  @params: 关键字
  @return: 文章列表
  */
  getClassifyBlogDate (req, res) {
    var sql = `SELECT DATE_FORMAT(blog_pubTime,'%y%m') AS time
               FROM blog b, classify c
               WHERE blog_isShow = 1 AND b.classify_id = c.classify_id AND c.classify_text = ?
               GROUP BY DATE_FORMAT(blog_pubTime,'%y%m')
               ORDER BY time DESC`;
    var sqlParam = [req.query.classify];
    connection.query(sql, sqlParam, (err, result) => {
      if (err) {
        console.log('[SELECT getClassifyBlogDate1 ERROR] - ',err.message);
        return;
      }
      if (!result.length) {
        res.json({status: -1, info: '没有符合此条件的博文'});
        return;
      } else {
        var time = [];
        for (let i = 0; i < result.length; i++) {
          time.push({yearMonth: result[i].time, blogs: []});
        }
        var sql2 = `SELECT blog_title, blog_id, DATE_FORMAT(blog_pubTime,'%y%m') AS ymonth, DATE_FORMAT(blog_pubTime,'%m-%d') AS mday
                    FROM blog b, classify c
                    WHERE blog_isShow = 1 AND b.classify_id = c.classify_id AND c.classify_text = ?`;
        connection.query(sql2, sqlParam, (err, result) => {
          if (err) {
            console.log('[SELECT getClassifyBlogDate2 ERROR] - ',err.message);
            return;
          }
          for (let i = 0; i < time.length; i++) {
            for (let j = 0; j < result.length; j++) {
              if (time[i].yearMonth === result[j].ymonth) {
                time[i].blogs.push(result[j]);
              }
            }
          }
          res.json({status: 0, info: '获取成功', data: time});
        }); 
      }
    });
  } 
}