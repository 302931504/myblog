var mongoose = require('mongoose');

var ArticalSchema = mongoose.Schema({
  articalId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  summary: String,
  label: String,
  model: String,
  info: {
    lookUp: Number,
    like: Number
  }, 
  time: {
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    }
  },
  online: {
    type: Boolean,
    default: false
  }
});

const page_limit_number = 5;
const admin_page_limit_number = 10;

ArticalSchema.statics = {

  getAll: function (callback) {
    return this.find({})
               .sort('time.updateTime')
               .exec(callback); 
  },
  getDraftCount: function (callback) {
    return this.count({online: false})
               .exec(callback);
  },
  getDraftByPage: function (page, callback) {
    return this.find({online: false})
               .sort({'time.updateTime': -1})
               .skip(admin_page_limit_number * (page - 1)) 
               .limit(admin_page_limit_number)
               .exec(callback);
  },
  getOnlineAll: function (callback) {
    return this.find({online: true})
               .sort('time.updateTime') 
               .exec(callback);
  }, 
  getOnlineByPage: function (page, callback) {
    return this.find({online: true})
               .sort('time.updateTime')
               .skip(page_limit_number * (page - 1))
               .limit(page_limit_number)
               .exec(callback);
  },
  deleteOneBlog: function (id, callback) {
    return this.findOneAndRemove({_id: id})
               .exec(callback);
  }
}

var Artical = mongoose.model('artical', ArticalSchema);
module.exports = Artical;