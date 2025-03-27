# AI-Powered News Verifier

## Problem Statement
AI-Powered Fake News Detection
- Create an AI-based news verification tool that detects misinformation by analyzing text, images and sources.

## 📌 Overview
AI-Powered News Verifier is a web-based platform that helps users distinguish real news from misinformation. It features a **Next.js frontend** for a smooth user experience, a **Flask backend** for processing requests, and an **AI Agent** that scans the web for real news and performs **similarity search** to verify sources.

## Team Members:
- Abhivyakt Bhati
- Armaan Raj Thakur
- Fardeen Khan
- Pushkar Singh

## 🚀 Features
### ✅ **Next.js Frontend**
- Modern, responsive UI for seamless user experience.
- Uses **Tailwind CSS** for styling.
- Interactive search and result visualization.

### 🛠 **Flask Backend**
- API built with **Flask** to handle requests.
- Uses **natural language processing (NLP)** to compare news.
- Handles similarity search using **vector embeddings**.

### 🔍 **Similarity Search**
- Extracts key features from input text.
- Compares against a database of reliable news sources.
- Uses **cosine similarity / semantic search** for accuracy.

### 🤖 **AI Agent (MVP)**
- Searches the web for **real news** related to a given topic.
- Fetches articles from trusted sources.
- Compares retrieved articles with input text to find factual accuracy.
- Provides users with a reliability score and citations.

## 🏗 Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Flask, Python
- **AI & NLP**: OpenAI/Gemini API, Sentence Transformers

## 📦 Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/news-verifier.git
cd news-verifier
```

### 2️⃣ Install dependencies
#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3️⃣ Run the project
- Open `http://localhost:3000` for the frontend.
- Flask API runs on `http://localhost:5000`.

## 📌 Future Improvements
- **Improved AI Model** for better news verification.
- **User Authentication** to save verification history.
- **Browser Extension** for on-the-go news fact-checking.

## 🎯 MVP Goal
To develop an AI-powered agent that searches the web for real news, analyzes it, and provides **fact-based verification** against user-provided news.

---
💡 **Contribute**: PRs are welcome! Reach out if you have ideas to enhance the project. 🚀