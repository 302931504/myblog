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
  isOK: {
    type: Boolean,
    default: false
  }
});

const page_limit_number = 5;
ArticalSchema.statics = {

  getAll: function (callback) {
    return this.find({})
               .sort('time.updateTime')
               .exec(callback); 
  },
  getByPage: function (page, callback) {
    return this.find({})
               .sort('time.updateTime')
               .skip(page_limit_number * (page - 1))
               .limit(page_limit_number)
               .exec(callback);
  },
  getOnlineAll: function (callback) {
    return this.find({isOK: true})
               .sort('time.updateTime') 
               .exec(callback);
  },
  getOnlineByPage: function (page, callback) {
    return this.find({isOK: true})
               .sort('time.updateTime')
               .skip(page_limit_number * (page - 1))
               .limit(page_limit_number)
               .exec(callback);
  }
}

var Artical = mongoose.model('artical', ArticalSchema);
module.exports = Artical;