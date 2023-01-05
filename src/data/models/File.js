const mongoose = require('mongoose')
const { Schema } = mongoose
// Identique à const Schema = mongoose.Schema

const fileSchema = new Schema({
  fileName: {
    type: String
  },
  originalName: {
    type: String
  },
  mimeType: {
    type: String
  },
  url: {
    type: String
  },
  path: {
    type: String
  },
  size: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.models.File || mongoose.model('File', fileSchema)
