const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
  path : String,
  title:String
})
const fileModal = mongoose.model('file',fileSchema)
module.exports = fileModal