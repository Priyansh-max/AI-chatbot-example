# Spur AI Support Chat

A live chat widget with an AI support agent built for the Spur take-home assignment. The agent helps customers with shipping, returns, and general store inquiries.

![Tech Stack](https://img.shields.io/badge/React-19-blue) ![Tech Stack](https://img.shields.io/badge/Express-5-green) ![Tech Stack](https://img.shields.io/badge/PostgreSQL-Prisma-purple)

## What's this?

It's a chat widget (like the ones you see on most websites) powered by Google's Gemini API. Users can ask questions about shipping policies, returns, payment methods, etc. The conversation history is stored in PostgreSQL so users can revisit past chats.

**Live Demo:** [Frontend](https://your-frontend-url.vercel.app) | [Backend](https://your-backend-url.onrender.com)

## Tech Stack

**Frontend**
- React 19 + Vite
- TailwindCSS v4

**Backend**
- Node.js + Express 5
- TypeScript
- Prisma ORM + PostgreSQL
- Gemini API

## Running Locally

### Prerequisites

- Node.js 18+
- PostgreSQL database (I used [Supabase](https://supabase.com) - free tier works fine)
- Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/spur-assignment.git
cd spur-assignment
```

Install dependencies for both frontend and backend:

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Set up environment variables

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/database"
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
```

> If you're using Supabase, grab both URLs from Project Settings → Database → Connection string. Use the "Transaction" URL for `DATABASE_URL` and "Session" URL for `DIRECT_URL`.

### 3. Set up the database

```bash
cd backend
npm run db:generate
npm run db:push
```

### 4. Run it

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat/message` | Send a message, get AI response |
| GET | `/chat/history/:sessionId` | Get messages for a conversation |
| GET | `/chat/conversations` | List all past conversations |
| GET | `/health` | Health check |

### Example request

```bash
curl -X POST http://localhost:3000/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What is your return policy?"}'
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWidget.jsx    # Main chat widget
│   │   │   ├── ChatInput.jsx     # Message input
│   │   │   ├── MessageList.jsx   # Message display
│   │   │   ├── Message.jsx       # Single message
│   │   │   └── LandingPage.jsx   # Landing page
│   │   ├── services/
│   │   │   └── chatService.js    # API calls
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.routes.ts    # API routes
│   │   ├── services/
│   │   │   └── llm.service.ts    # Gemini integration
│   │   ├── db/
│   │   │   └── index.ts          # Prisma client
│   │   └── index.ts              # Express app
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   └── package.json
│
└── README.md
```

## Deployment

**Frontend → Vercel**
1. Push to GitHub
2. Import in Vercel
3. Set `frontend` as root directory
4. Add env variable: `VITE_API_URL=https://your-backend.onrender.com`

**Backend → Render**
1. Create new Web Service
2. Set root directory to `backend`
3. Build command: `npm install && npm run db:generate && npm run build`
4. Start command: `npm start`
5. Add environment variables (DATABASE_URL, DIRECT_URL, GEMINI_API_KEY)

---

Built by [Priyansh Agarwal](https://priyanshagarwal.me)

