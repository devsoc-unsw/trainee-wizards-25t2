# trainee-wizards-25t2

# 🛍️ MarketBot – AI Negotiator for Facebook Marketplace via Discord

## 📌 Overview

MarketBot is an AI-powered listing assistant and negotiation bot built to automate Facebook Marketplace sales. Sellers use a **Discord bot** to create and manage listings. Once posted, the bot interacts with buyers on **Facebook Messenger**, handles price negotiation using **OpenAI**, and schedules meetings through **Google Calendar** once a deal is reached.

This is an early version of the project. **Architecture, file structure, and responsibilities are subject to change** as development progresses and new requirements emerge.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Interface (Sellers) | Discord Bot (discord.js) |
| Interface (Buyers) | Facebook Messenger Bot (Facebook Messenger API) |
| Backend API | Express.js |
| AI Engine | OpenAI (GPT-4) |
| Scheduler | Google Calendar API |
| Database | PostgreSQL |

---

## 🧠 System Architecture
Discord Bot → Express API ← FB Messenger Bot
                    ↓
            PostgreSQL Database
                    ↓
            OpenAI Negotiator Logic
                    ↓
            Google Calendar Scheduler


---

## 🗂️ Project Structure

```bash
/marketbot/
├── discord-bot/             # Handles all Discord bot logic and slash commands
│   ├── commands/            # Commands like createListing, listListings
│   ├── events/              # Bot events (e.g. ready, interaction)
│   ├── discordClient.js     # Sets up and exports the bot client
│   └── index.js             # Entry point for Discord bot

├── fb-bot/                  # Facebook Messenger bot logic
│   ├── fbWebhook.js         # Webhook listener for buyer messages
│   └── messageHandler.js    # Handles message processing and GPT responses

├── backend/                 # Core backend logic
│   ├── api/                 # Express.js route definitions
│   │   ├── listings.js      # Listing creation and management
│   │   └── scheduler.js     # Scheduling logic
│   ├── db/                  # PostgreSQL models and connection
│   │   ├── models/          # Models for User, Listing, Conversation
│   │   └── index.js         # DB setup
│   ├── ai/                  # AI negotiation layer
│   │   └── negotiator.js    # OpenAI prompt and logic
│   ├── scheduler/           # Google Calendar integration
│   │   └── calendar.js      # Handles event creation
│   └── server.js            # Starts backend server

├── prisma/   # Database schema/migrations (Prisma)

├── .env                     # Environment variables
├── package.json             # Project scripts and dependencies
└── README.md                # You're here!

```

## 🔧 Setup 
1. Clone and Install
``` bash
git clone https://github.com/your-org/marketbot.git
cd marketbot
npm install
```

2. Add Environment Variables (will add later)
``` bash
DISCORD_TOKEN=your_token
FB_VERIFY_TOKEN=your_token
FB_PAGE_ACCESS_TOKEN=your_token
OPENAI_API_KEY=your_key
DATABASE_URL=postgres://user:pass@localhost:5432/marketbot
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
```

3. Setup local Postgresql database

4. Configure .env file using .env.example

5. Run prisma schema to setup your database
``` bash
npx prisma migrate dev
``` 

6. Run Project
``` bash
npm run dev
```