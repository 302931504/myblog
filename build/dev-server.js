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

const apiRouter = express.Router()
/*apiRouter.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username === 'admin' || password === '123456') {
    req.session.user = {
      username: username,
      password: password
    }
    res.json({status: 0, info: '登录成功'})
  } else {
    res.json({status: -1, info: '不存在此账号'})
  }
})*/

//新增文章
apiRouter.post('/saveBlog', (req, res) => {
  /*if (!req.session.user) {
    res.json({status: -1, info: '请先登录'})
  } else{*/ 
    var text = req.body.classify_text;
    var sql = `SELECT classify_id FROM classify WHERE classify_text = ?`;
    var sqlParam = [text];
    connection.query(sql,sqlParam,function (err, result) {
      let classify_id;
      if (err) {
        console.log('[INSERT ERROR] - ',err.message);
        return;
      } else if (!result[0]) {
          console.log('null');
          var sql2 = 'INSERT INTO classify(classify_text) VALUES(?)';
          var sql2Param = [text];
          connection.query(sql2,sql2Param,function (err, result) {
            if(err){
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
            res.json({status: 0, info: '新分类创建成功'});  
            // classify_id = result.classify_id;
            console.log(result);
          })
        } else {
          console.log('in');
          // classify_id = result[0].classify_id;
        }
      var addSql = 'INSERT INTO blog(blog_title,classify_id,blog_tags,blog_description,blog_content,blog_isShow) VALUES (?,?,?,?,?,?)';
      var addSqlParams = [req.body.title,'1',req.body.tags,req.body.description,req.body.content,req.body.isShow];
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
  var sql = 'SELECT blog_id, blog_title, classify_text, blog_tags, blog_createTime, blog_updateTime FROM blog b, classify c WHERE b.classify_id = c.classify_id AND blog_isShow = 0';
  connection.query(sql, function (err, result) {
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


app.use('/api', apiRouter)

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
 