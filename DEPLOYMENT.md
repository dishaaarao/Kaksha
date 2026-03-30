# 🚀 Deployment Guide - AI Study Assistant

## 📋 Prerequisites

1. **Vercel Account** (free)
2. **MongoDB Atlas Account** (free tier)
3. **Groq API Key** (free)

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Get your connection string
6. Add your IP to whitelist (0.0.0.0/0 for Vercel)

## 🔑 Step 2: Get Required API Keys

### Groq API Key
1. Go to [Groq Console](https://console.groq.com/)
2. Create a free account
3. Generate an API key
4. Copy the key (starts with `gsk_`)

### JWT Secret
Generate a strong random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🌐 Step 3: Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
cd /Users/disharao/Desktop/Kaksha/ai-study-assistant
vercel
```

4. Follow the prompts and set environment variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-study-assistant?retryWrites=true&w=majority
JWT_SECRET=your-generated-jwt-secret
GROQ_API_KEY=your-groq-api-key
```

### Method 2: Using GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub account to Vercel
3. Import the repository
4. Set environment variables in Vercel dashboard

## ⚙️ Environment Variables

In your Vercel dashboard, set these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-study-assistant?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
GROQ_API_KEY=gsk_your-groq-api-key-here
NODE_ENV=production
```

## 🔄 Step 4: Verify Deployment

1. Visit your Vercel URL
2. Test signup functionality
3. Test login functionality
4. Test AI features

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP whitelist includes 0.0.0.0/0
   - Verify database user credentials

2. **CORS Issues**
   - The project includes CORS middleware
   - Should work automatically with Vercel

3. **Build Errors**
   - Ensure all dependencies are in api/package.json
   - Check file paths in vercel.json

4. **API Not Working**
   - Check Vercel function logs
   - Verify environment variables are set
   - Ensure API routes are properly configured

## 📁 Project Structure After Deployment

```
ai-study-assistant/
├── api/                    # Vercel serverless functions
│   ├── index.js           # Main API server
│   └── package.json       # API dependencies
├── frontend/              # React frontend
│   ├── dist/              # Built frontend
│   └── package.json       # Frontend dependencies
├── backend/               # Original backend (reference)
├── vercel.json           # Vercel configuration
└── .env.example          # Environment variables template
```

## 🎉 Success!

Your AI Study Assistant is now live! 🚀

- Frontend: React app served by Vercel
- Backend: Node.js serverless functions
- Database: MongoDB Atlas
- AI: Groq API integration

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Verify MongoDB Atlas connection
3. Ensure all environment variables are set
4. Test locally first to confirm functionality
