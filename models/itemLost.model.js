var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// data layer

var ItemLostSchema = new mongoose.Schema({
    id : Number,
    title : String,
    photo : Number,
    contact : String,
    description : String,
    date : String,
    user : Number,
    palc : String,
})

ItemLostSchema.plugin(mongoosePaginate);
const ItemLost = mongoose.model('ItemLost', ItemLostSchema);

module.exports = ItemLost;