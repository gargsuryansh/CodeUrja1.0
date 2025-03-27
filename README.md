# Half Baked Coders

# AI-Powered News Verification System

## Overview
VeriFact-AI is a **Next.js + Flask**-based platform that verifies news authenticity using AI-powered **similarity search** and **web scraping**. The core feature is an **AI Agent** that searches the web for credible sources and compares them to the article in question.

Additionally, we've built a **browser extension** that allows users to verify news articles directly from any source they are reading.

## Tech Stack
### Frontend (Next.js)
- Built with **Next.js** (React framework) for fast rendering and SEO benefits.
- Uses **Tailwind CSS** for styling.
- Integrates with the backend for real-time verification of news articles.
- Displays news credibility scores and source comparisons.

### Backend (Flask)
- **Flask** serves as the backend API.
- Scrapes and processes real-time news from **credible sources**.
- Uses **vector-based similarity search** to compare news articles.
- Leverages **AI-based NLP models** for content analysis.

### AI Agent & Similarity Search
- AI Agent fetches and evaluates multiple news sources to cross-check facts.
- Uses **embedding models** (e.g., OpenAI, Sentence Transformers) for similarity detection.
- Filters out misinformation and ranks sources based on credibility.

### Browser Extension
- The **Chrome Extension** allows users to verify news instantly.
- It scans the current article and provides real-time authenticity predictions.
- Uses the same AI model as the platform for consistency.

## How It Works
1. **User inputs or visits a news article.**
2. **Backend scrapes related news sources.**
3. **AI Agent analyzes and compares the information.**
4. **Similarity search determines factual accuracy.**
5. **Users get a credibility score & source comparisons.**

## MVP Features
- ✅ **AI-powered web search & similarity matching**
- ✅ **Next.js frontend for user-friendly interactions**
- ✅ **Flask API for data processing & analysis**
- ✅ **Real-time news credibility scoring**
- ✅ **Chrome extension for instant verification**

## Future Enhancements
- 🔄 Improving AI model accuracy & credibility scoring.
- 📊 Adding a dashboard for tracking misinformation trends.
- 🌍 Expanding to multiple languages for broader accessibility.

## Team
🚀 **Half Baked Coders** - A team passionate about **AI, Web3, and Fullstack development**!

---
Let us know if you have any feedback or ideas to improve the project! 🚀

