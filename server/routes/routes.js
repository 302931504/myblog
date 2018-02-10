var article = require('../handler/article.js');
var backstage = require('../handler/backstage.js');
var classify = require('../handler/classify.js');
var comment = require('../handler/comment.js');
var users = require('../handler/users.js');
var walkingBlog = require('../handler/walkingBlog.js');

module.exports =  (apiRouter) => {
  apiRouter.post('/login', backstage.login);
  apiRouter.get('/logout', backstage.logout);
  apiRouter.get('/getNum', backstage.getNum);
  apiRouter.post('/updateMInfo', backstage.updateMInfo);

  apiRouter.post('/saveBlog', article.saveBlog);
  apiRouter.get('/getOneBlog', article.getOneBlog);
  apiRouter.post('/updateBlog', article.updateBlog);
  apiRouter.get('/getBlogList', article.getBlogList);
  apiRouter.get('/deleteBlog', article.deleteBlog);
  apiRouter.get('/getKeyBlog', article.getKeyBlog);
  apiRouter.get('/getClassifyBlog', article.getClassifyBlog);
  apiRouter.post('/publishBlog', article.publishBlog);
  apiRouter.post('/draftBlog', article.draftBlog);
  apiRouter.get('/getCount', article.getCount);
  apiRouter.get('/getAdjacentBlog', article.getAdjacentBlog);
  apiRouter.get('/getOnlineBlogList', article.getOnlineBlogList);
  apiRouter.post('/uploadImg', article.uploadImg);

  apiRouter.get('/getClassify', classify.getClassify);
  apiRouter.get('/deleteClassify', classify.deleteClassify);
  apiRouter.get('/addClassify', classify.addClassify);

  apiRouter.post('/addChildBBS', comment.addChildBBS);
  apiRouter.get('/deleteBBS', comment.deleteBBS);
  apiRouter.get('/deleteChildBBS', comment.deleteChildBBS);
  apiRouter.post('/comment', comment.comment);
  apiRouter.get('/getComment', comment.getComment);
  apiRouter.post('/quote', comment.quote);

  apiRouter.get('/getUserList', users.getUserList);
  apiRouter.post('/addFollow', users.addFollow);
  apiRouter.get('/deleteUser', users.deleteUser);
  apiRouter.get('/userCount', users.userCount);

  apiRouter.post('/addWalkingBlog', walkingBlog.addWalkingBlog);
  apiRouter.get('/getWalkingBlog', walkingBlog.getWalkingBlog);
  apiRouter.get('/deleteWBlog', walkingBlog.deleteWBlog);
  apiRouter.get('/getWalkDetail', walkingBlog.getWalkDetail);
};