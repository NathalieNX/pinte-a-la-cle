var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// data layer

var ItemSchema = new mongoose.Schema({
    id : number,
    title : string,
    photo : number,
    contact : string,
    description : string,
    date : string,
    user : number,
})

ItemSchema.plugin(mongoosePaginate)
const Item = mongoose.model('Item', ItemSchema)

module.exports = Item;