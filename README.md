# AI Study Assistant

A full-stack AI-powered web application designed to help students learn more effectively. Features include taking any topic and generating structured notes, interactive flashcards, multiple-choice quizzes, smart summaries, and a dedicated AI chat tutor.

## Folder Structure
```
ai-study-assistant/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── models/
│   │   └── User.js (stub for DB schemas)
│   └── routes/
│       └── api.js
└── frontend/
    ├── .eslintrc.cjs
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── Layout.jsx
        │   └── Sidebar.jsx
        └── pages/
            ├── ChatTutor.jsx
            ├── Dashboard.jsx
            ├── Flashcards.jsx
            ├── Login.jsx
            ├── NotesGenerator.jsx
            ├── Quiz.jsx
            ├── Signup.jsx
            └── Summary.jsx
```

## Tech Stack
- **Frontend**: React.js, Tailwind CSS (v4), Framer Motion, Lucide React, Vite, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Gemini SDK
- **AI**: Gemini API (`gemini-2.5-flash`)

## Requirements
- Node.js (v18+ recommended)
- MongoDB Database (Local instance running on `mongodb://localhost:27017` or cloud DB)
- Gemini API Key

## Setup & Installation

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Open the `backend/.env` file and replace the variables with your own:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-study-assistant
   JWT_SECRET=supersecretkey_change_me
   GEMINI_API_KEY=AIzaSyAHYgLfoOB9XcDqmTyCH83mnCqiIXEMR14
   ```
   *Note: Ensure you have an active Gemini API key or else the AI features will fail with a 500 server error.*
4. Start the backend DEV server:
   ```bash
   npm run dev
   # OR
   npx nodemon index.js
   ```
   *The server should run on http://localhost:5000*

### 2. Frontend Setup
1. Open a separate terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the link provided in your terminal (usually `http://localhost:5173`) in your web browser.

## Features
- **AI Notes Generator**: Paste text or a topic to generate structured notes with headings and bullet points.
- **AI Chat Tutor**: A conversational chatbot context-aware of studying, providing simple explanations to complex doubts.
- **Flashcards Generator**: Takes a text or concept and generates 5 Q&A spaced-repetition flashcards featuring 3D flip animations.
- **AI Quiz Generator**: Creates multiple-choice questions with correct answers to test your knowledge dynamically.
- **Summary & Revision Mode**: Reduces massive blocks of text into summaries, bullet points, and key keywords.
- **Save Notes Feature**: Built functionality hooks (to be connected with DB schema) allowing notes/decks saves.
- **Dark Mode**: Complete system-themed light and dark functionality seamlessly transitioning interface colors.
- **Glassmorphism**: Premium "wow-inducing" vibrant aesthetics leveraging Tailwind classes.
