# Swim Advisor

A modern web platform helping swimmers improve their technique through personalized learning paths, curated content, and future AI-powered video analysis.

## Features

### Current Features (v1.0)
- **User Authentication**: Secure Google OAuth sign-in
- **User Profiles**: Personalized swimming profiles with goal setting
- **Content Library**: Curated swimming videos with smart filtering
- **Learning Paths**: Structured approach to swimming fundamentals
- **Problem Solving**: Common swimming issues with practical solutions

### Coming Soon
- **AI Video Analysis**: Upload swimming videos for AI-powered technique feedback
- **Progress Tracking**: Monitor your improvement over time
- **Social Features**: Connect with coaches and other swimmers


## Getting Started

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

3. **Configure environment**:
```bash
cp env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. **Start development server**:
```bash
npm start
```

Visit `http://localhost:3000`

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
- **Vercel** - Frontend hosting 
- **Supabase Cloud** - Backend hosting
