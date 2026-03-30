const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  headings: [{ heading: String, points: [String] }],
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
