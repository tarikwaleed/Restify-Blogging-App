const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
