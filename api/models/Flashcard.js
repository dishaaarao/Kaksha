const mongoose = require('mongoose');

const flashcardDeckSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: String,
  cards: [{ question: String, answer: String }],
}, { timestamps: true });

module.exports = mongoose.model('FlashcardDeck', flashcardDeckSchema);
