const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');
const FlashcardDeck = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token. Please log in again.' });
  }
};

// ---------------- AUTH API ----------------

router.post('/auth/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    console.log('Creating new user...');
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ email, password: hashedPassword, name });
    console.log('User object created, saving...');
    await user.save();
    console.log('User saved successfully');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: 'User created', user: { id: user._id, name, email } });
  } catch (err) {
    console.error('Signup error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'yes' : 'no');
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    console.log('Comparing password...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: 'Logged in', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ---------------- AI API ----------------

router.post('/generate-notes', async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `System: Generate structured notes in JSON format strictly matching this schema: {"title": "String", "headings": [{"heading": "String", "points": ["String"]}]}"
    
    Topic/Text: ${text}`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating notes' });
  }
});

router.post('/generate-flashcards', async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `System: Generate exactly 5 flashcards from the text in JSON format matching this schema: {"flashcards": [{"question": "String", "answer": "String"}]}. Return ONLY the JSON object.
    
    Topic/Text: ${text}`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    res.json(parsed.flashcards || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating flashcards' });
  }
});

router.post('/generate-quiz', async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `System: Generate a comprehensive 10-question multiple choice quiz in JSON format strictly matching this schema: {"quiz": [{"question": "String", "options": ["String", "String", "String", "String"], "answer": "String", "explanation": "String"}]}. The answer must exactly match one of the options. Include explanations for why the correct answer is right. Questions should cover:
    1. Key concepts and definitions
    2. Important details and facts
    3. Cause and effect relationships
    4. Comparisons and contrasts
    5. Applications and examples
    6. Problem-solving scenarios
    7. Analytical thinking
    8. Synthesis of information
    9. Evaluation and judgment
    10. Creative applications
    
    Make questions challenging but fair, with clear distractors and educational value.
    
    Topic/Text: ${text}`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    res.json(parsed.quiz || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating quiz' });
  }
});

router.post('/generate-summary', async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `System: Generate a summary in JSON format strictly matching this schema: {"summary": "String", "bullet_points": ["String"], "keywords": ["String"]}
    
    Text to summarize: ${text}`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating summary' });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    const formattedHistory = history.map(h => {
      // map 'assistant' back to 'model' for Gemini standard if using standard conversation, 
      // but we can just prepend text to basic prompt for simplicity given requirements.
      const prefix = h.role === 'user' ? 'User:' : 'Tutor:';
      return `${prefix} ${h.content}`;
    }).join('\n\n');

    const prompt = `System: You are an AI Study Tutor. Explain concepts simply and answer doubts effectively. Keep responses concise.

Conversation History:
${formattedHistory}

User: ${message}`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in chat' });
  }
});

// ---------------- SAVE API ----------------

router.post('/save-notes', authMiddleware, async (req, res) => {
  try {
    const { title, headings } = req.body;
    const note = new Note({
      user: req.user.id,
      title,
      headings
    });
    await note.save();
    res.json({ message: 'Notes saved successfully', note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save notes' });
  }
});

router.post('/save-flashcards', authMiddleware, async (req, res) => {
  try {
    const { topic, cards } = req.body;
    const deck = new FlashcardDeck({
      user: req.user.id,
      topic,
      cards
    });
    await deck.save();
    res.json({ message: 'Flashcards saved successfully', deck });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save flashcards' });
  }
});

router.post('/save-quiz', authMiddleware, async (req, res) => {
  try {
    const { topic, score, total, questions } = req.body;
    const quizResult = new Quiz({
      user: req.user.id,
      topic,
      score,
      total,
      questions
    });
    await quizResult.save();
    res.json({ message: 'Quiz score saved successfully', quiz: quizResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

module.exports = router;
