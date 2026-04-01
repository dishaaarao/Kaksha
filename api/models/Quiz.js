const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: String,
  score: Number,
  total: Number,
  questions: [{ question: String, options: [String], answer: String }],
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
