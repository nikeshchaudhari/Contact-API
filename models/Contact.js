const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    fullName :{type:String, require:true},
    email : {type:String, require:true},
    phone :{type:Number, require:true},
    address :{type:String,required:true},
    batch:{type:String,required:true}
})
module.exports = mongoose.model('contact',contactSchema)