# 🤖 AI Chatbot

A simple AI chatbot built using React.js, Node.js, Express.js, and Google's Gemini API.

## Features

- Interactive chat interface
- AI-generated responses using Gemini
- Conversation history passed as context
- Loading indicator while waiting for responses
- React frontend and Express backend

## Tech Stack

- **Frontend:** React.js, Vite, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **AI Model:** Google Gemini API
- **Communication:** REST API, Fetch API

## Project Structure

```text
ai-chatbot/
├── client/       # React frontend
└── server/       # Express backend
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ThisMadhuKaushik/ai-chatbot.git
cd ai-chatbot
```

### 2. Start the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm start
```

The backend runs on `http://localhost:5000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown in your terminal.

## How It Works

1. The user sends a message through the React interface.
2. React sends the message and conversation history to the Express backend.
3. The backend sends the conversation context to Gemini.
4. Gemini generates a response.
5. The backend returns the response to React, which displays it.

## Current Limitations

- Conversation history is stored temporarily in frontend state.
- Messages are not saved permanently in a database.
- A valid Gemini API key and internet connection are required.

## Author

**Madhu Kaushik**

GitHub: [ThisMadhuKaushik](https://github.com/ThisMadhuKaushik)
