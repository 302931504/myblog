const express = require('express');
var config = require('./config/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('good-doer'));
app.use(session({
  secret: 'good-doer',
  resave: true,
  saveUninitialized: true
}));

const apiRouter = express.Router();

require('./server/routes/routes.js')(apiRouter);
app.use('/api', apiRouter);

app.use(express.static('./dist'));

var port = process.env.PORT || config.build.port;

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});