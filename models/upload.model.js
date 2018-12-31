var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')


var UploadSchema = mongoose.Schema({
  id: Number,
  name: String,
  created: Date,
  file: Object
});

UploadSchema.plugin(mongoosePaginate);
const Upload = mongoose.model('Upload', UploadSchema);

module.exports = mongoose.model('Upload', UploadSchema);