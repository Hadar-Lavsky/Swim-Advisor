# 🏊‍♂️ Swim Advisor

A modern web platform helping swimmers improve their technique through personalized learning paths, curated content, and future AI-powered video analysis.

## ✨ Features

### Current Features (v1.0)
- **🔐 User Authentication**: Secure Google OAuth sign-in
- **👤 User Profiles**: Personalized swimming profiles with goal setting
- **🌊 Smart Decision Tree**: Interactive questionnaire to find your perfect swimming program
- **📚 Content Library**: Curated swimming videos with smart filtering
- **🎯 Learning Paths**: Structured approach to swimming fundamentals
- **🎓 Problem Solving**: Common swimming issues with practical solutions

### Coming Soon
- **🎥 AI Video Analysis**: Upload swimming videos for AI-powered technique feedback
- **📊 Progress Tracking**: Monitor your improvement over time
- **👥 Social Features**: Connect with coaches and other swimmers

## 🚀 Quick Start

**New to the project?** Check out our detailed [Quick Start Guide](docs/QUICK_START.md) for complete setup instructions!

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (free tier)
- Google OAuth credentials (for authentication)

### Installation

1. **Clone and install**:
```bash
git clone <your-repo-url>
cd Swim-Advisor
npm install
```

2. **Set up Supabase backend**:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the database migration: `supabase/migrations/001_initial_setup.sql`
   - Enable Google OAuth provider
   - See [supabase/README.md](supabase/README.md) for details

3. **Configure environment**:
```bash
cp env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. **Start development server**:
```bash
npm start
```

Visit `http://localhost:3000` 🎉

## 📚 Documentation

- **[Quick Start Guide](docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Backend Architecture](docs/BACKEND_ARCHITECTURE.md)** - Detailed backend documentation
- **[Supabase Setup](supabase/README.md)** - Database and authentication setup

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Context API** - State management

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Built-in authentication
  - Row-level security
  - Real-time subscriptions
- **Google OAuth** - Secure authentication

### Infrastructure
- **Vercel** - Frontend hosting (recommended)
- **Supabase Cloud** - Backend hosting

## 📁 Project Structure