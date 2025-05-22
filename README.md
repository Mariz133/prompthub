# 📦 PromptHub

PromptHub is a full-stack AI-powered web application that allows users to analyze, enhance, and explore text prompts using OpenAI’s GPT-4o. It features secure magic link authentication via Supabase, a clean and responsive UI using Tailwind CSS, and seamless serverless backend functionality powered by Next.js App Router.

✨ Overview
PromptHub empowers users to:

✅ Submit creative or instructional prompts

🤖 Instantly analyze or expand their ideas using OpenAI

🔐 Authenticate securely with email-based magic link login

📱 Use the app from any device via a mobile-friendly interface

🕘 View history of previously analyzed prompts and responses  


This project was created as a final full-stack assignment to demonstrate practical use of:

- ✅ Next.js 14 App Router  
- ✅ Supabase  
- ✅ OpenAI API integration  


⚙️ Features
- **Frontend & Backend:** Next.js 14 (App Router)  
- **Authentication:** Supabase Magic Link (email OTP)  
- **Prompt Analyzer:** Submit a prompt and receive an AI-generated expansion  
- **Prompt History Sidebar:** View and revisit previous prompts and responses  
- **Data Storage:** Supabase database with saved prompt + OpenAI response  
- **Styling:** Tailwind CSS  
- **AI Integration:** OpenAI GPT-4o  
- **Deployment:** Vercel  
- **Routing:** Fully client-rendered experience with protected routes  
- **Login Flow:** Simple, responsive, and redirect-safe  

🧰 Tech Stack
Next.js 14

Tailwind CSS

Supabase

OpenAI API

Vercel (for deployment)

🛠️ Setup Guide
✅ Prerequisites

Node.js (v18+)

Git

GitHub account

Supabase project and API keys

OpenAI API key

✅ 1. Clone the Repository

git clone https://github.com/Mariz133/prompthub.git
cd prompthub

✅ 2. Install Dependencies

npm install


✅ 3. Set Up Environment Variables
Create a .env.local file in the root directory:


NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key

✅ 4. Run the Development Server

npm run dev
Visit http://localhost:3000 to test locally.

✅ 5. Set Up Supabase
Log into Supabase

Create a new project

In the SQL editor, run:


```sql
create table prompts (
  id uuid primary key default uuid_generate_v4(),
  text text,
  category text,
  created_at timestamp default now()
);
```

Enable Magic Link (email-based authentication)

🚀 Live Deployment
https://prompthub-five.vercel.app/

📘 Learning & Development Notes
Key Concepts I Learned
Next.js App Router: Built with server/client component architecture using the modern app/ directory

Supabase Auth: Integrated magic link email login with route protection (e.g. /analyze redirects unauthenticated users)

OpenAI API: Used GPT-4o for prompt analysis via secure backend API routes

Component Design: Created reusable components (SubmitPrompt, PromptList, LogoutButton)

Deployment: Connected GitHub to Vercel and managed .env securely

AI Tools Used
ChatGPT (OpenAI): Helped scaffold the project, debug Supabase edge cases, and refine login logic

GitHub Copilot: Assisted with React component development and cleanup

📂 File Structure
 
prompthub/
├── app/
│   ├── analyze/
│   │   ├── AnalyzePageClient.jsx
│   │   └── page.jsx
│   ├── api/
│   │   └── analyzeprompt/
│   │       └── route.js
│   ├── login/
│   │   ├── LoginPageClient.jsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── SubmitPrompt.jsx
│   │   ├── PromptList.jsx
│   │   └── LogoutButton.jsx
│   ├── page.jsx        # Landing page + Prompt Feed
│   └── layout.js
├── lib/
│   ├── supabase.js
│   └── openai.js
├── .env.local
└── README.md

✅ TODOs / Known Issues
✅ Add prompt history and save to Supabase

✅ Save OpenAI response along with prompt

✅ Add history sidebar to /analyze page

⏳ Improve loading states with skeleton screens or spinners