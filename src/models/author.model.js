const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
});

module.exports = mongoose.model('Author', authorSchema);
