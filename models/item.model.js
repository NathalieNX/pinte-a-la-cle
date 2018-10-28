var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// data layer

var ItemSchema = new mongoose.Schema({
    id : Number,
    title : String,
    photo : Number,
    contact : String,
    description : String,
    date : String,
    user : Number,
})

ItemSchema.plugin(mongoosePaginate);
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;