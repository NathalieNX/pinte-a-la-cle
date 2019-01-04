var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// data layer

var ItemFoundSchema = new mongoose.Schema({
    id : Number,
    title : String,
    photo : Number,
    contact : String,
    description : String,
    date : String,
    user : Number,
})

ItemFoundSchema.plugin(mongoosePaginate);
const ItemFound = mongoose.model('ItemFound', ItemFoundSchema);

module.exports = ItemFound;