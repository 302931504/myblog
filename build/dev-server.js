'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog',{useMongoClient:true});

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'liushuai',
  database: 'blogtest'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('good-doer'));
app.use(session({
  secret: 'good-doer',
  resave: true,
  saveUninitialized: true
}));

//登录博客系统
const apiRouter = express.Router()
apiRouter.post('/login', (req, res) => {
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
        res.json({status: 0, info: '登录成功'});
        req.session.user = {
          username: username,
          password: password
        };
      } else {
        res.json({status: -1, info: '密码错误'});
      }
    }
  });
});

//退出博客系统
apiRouter.get('/logout', (req, res) => {
  if (req.session.user === {}) {
    res.json({status: -1,info: '未登录'});
  } else {
    req.session.user = {};
    res.json({status: 0,info: '退出成功'});
  }
})

//新增文章
apiRouter.post('/saveBlog', (req, res) => {
  /*if (!req.session.user) {
    res.json({status: -1, info: '请先登录'})
  } else{*/ 
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
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }  
        res.json({status: 0, info: '保存成功'});  
      }) 
    });   
  // }
});

//获取文章
apiRouter.get('/getOneBlog', (req, res) => {
  var sql = `SELECT blog_id, blog_title, classify_text, blog_content, blog_tags, blog_description, blog_isShow
             FROM blog b, classify c
             WHERE b.classify_id = c.classify_id AND blog_id = ${req.query.id}`;
  connection.query(sql, function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '获取成功', data: result});
  })
});

//更新文章
apiRouter.post('/updateBlog', (req, res) => {
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
});

//获取分类
apiRouter.get('/getClassify',(req,res) => {
  var sql = 'SELECT * FROM classify';
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, data: result, info: '获取成功'});
  })
})

//获取草稿箱文章列表
apiRouter.get('/getDraftList', (req, res) => {
  const limit = 10;
  let offset = (req.query.page - 1) * limit;
  var sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime 
             FROM blog b, classify c 
             WHERE b.classify_id = c.classify_id AND blog_isShow = 0
             ORDER BY blog_updateTime DESC
             LIMIT ?,?`;
  var sqlParams = [offset, limit];
  connection.query(sql, sqlParams, function (err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, data: result, info: '获取成功'});
  })
})

//删除某篇文章
apiRouter.get('/deleteBlog', (req, res) => {
  var sql = `DELETE FROM blog WHERE blog_id = ${req.query.id}`;
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '删除成功'});
  })
})

//删除某个分类
apiRouter.get('/deleteClassify', (req, res) => {
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
})

//新增分类
apiRouter.get('/addClassify', (req, res) => {
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
})

//获取线上文章列表
apiRouter.get('/getOnlineBlog', (req, res) => {
  const limit = 10;
  let offset = (req.query.page - 1) * limit;
  var sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime
             FROM blog b, classify c 
             WHERE b.classify_id = c.classify_id AND blog_isShow = 1
             ORDER BY blog_updateTime DESC
             LIMIT ?,?`;
  var sqlParams = [offset, limit];
  connection.query(sql, sqlParams, function (err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, data: result, info: '获取成功'});
  })
});

//获取用户列表
apiRouter.get('/getUserList', (req, res) => {
  const limit = 10;
  let offset = (req.query.page - 1) * limit;
  var sql = 'SELECT * FROM users LIMIT ?,?';
  var sqlParams = [offset, limit];
  connection.query(sql,sqlParams,function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '获取成功', data: result});
  })
})
//新增订阅
apiRouter.post('/addFollow', (req, res) => {
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
        res.json({status: 0, info: '新增成功', data: result.insertId});
      })
    }
  })
})

//删除某个用户
apiRouter.get('/deleteUser', (req, res) => {
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
})

//获取父留言板列表
apiRouter.get('/getBBSList', (req, res) => {
  const limit = 10;
  let offset = (req.query.page - 1) * limit;
  var sql = `SELECT * 
             FROM bbs 
             WHERE type = 0 
             ORDER BY bbs_time DESC
             LIMIT ?,?`;
  var sqlParams = [offset, limit];
  connection.query(sql,sqlParams,function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '获取成功', data: result});
  })
})

//获取子留言板列表
apiRouter.get('/getBBSChildList', (req, res) => {
  var sql = 'SELECT * FROM bbs_child';
  connection.query(sql,function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '获取成功', data: result});
  })  
})

//新增留言
apiRouter.post('/addBBS', (req, res) => {
  var addSql = 'INSERT INTO bbs(type, user_email, user_name, bbs_content) VALUES(?,?,?,?)';
  var addSqlParams = [req.body.type, req.body.user_email, req.body.user_name, req.body.bbs_content];
  connection.query(addSql, addSqlParams, function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '发表成功'});
  })
})

//新增子留言
apiRouter.post('/addChildBBS', (req, res) => {
  var addSql = `INSERT INTO bbs_child(parent_id, user_email, user_name, bbs_child_content)
                VALUES (?,?,?,?)`;
  var addSqlParams = [req.body.parent_id, req.body.user_email, req.body.user_name,req.body.bbs_child_content];
  connection.query(addSql, addSqlParams, function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '回复成功'});
  })
})

//删除父留言
apiRouter.get('/deleteBBS', (req, res) => {
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
});

//删除某条子留言
apiRouter.get('/deleteChildBBS', (req, res) => {
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
});

//新增行博
apiRouter.post('/addWalkingBlog', (req, res) => {
  var addSql = `INSERT INTO walking_blog(walking_blog_content, walking_blog_tags)
                VALUES(?,?)`;
  var addSqlParams = [req.body.content, req.body.tags];
  connection.query(addSql, addSqlParams, function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '添加成功'});
  })              
})

//获取行博
apiRouter.get('/getWalkingBlog', (req, res) => {
  var sql = `SELECT * FROM walking_blog ORDER BY walking_blog_time DESC`;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '获取成功', data: result});
  })
})

//获取博客相关数目
apiRouter.get('/getNum', (req, res) => {
  var sql = 'SELECT * FROM vw_blog_count';
  connection.query(sql, function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '获取成功', data: result});
  })
})

//获取关键文章
apiRouter.get('/getKeyBlog', (req, res) => {
  var sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime
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
  })
})

//获取相关分类下的文章
apiRouter.get('/getClassifyBlog', (req, res) => {
  var sql = `SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime
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
  })              
})

//发布文章
apiRouter.post('/publishBlog', (req, res) => {
  var upSql = `UPDATE blog
               SET blog_isShow = 1
               WHERE blog_id = ?`;
  var upSqlParam = [req.body.id];
  connection.query(upSql, upSqlParam, function(err, result) {
    if(err) {
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    res.json({status: 0, info: '发布成功'});
  })
})

//文章移稿
apiRouter.post('/draftBlog', (req, res) => {
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
})

app.use('/api', apiRouter)

function checkSession (item) {
  if (!req.session.user) {
    return false;
  }
}

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
 