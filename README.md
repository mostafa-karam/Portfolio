# Cybersecurity Analyst & Full Stack Developer Portfolio

A modern, high-performance portfolio website for **Mostafa Karam**. Built with a Nintendo-style dark theme, featuring smooth animations, a terminal-inspired about section, and a secure contact form.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Radix UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui
- **Icons**: Lucide React, React Icons

## ✨ Features

- **Dark Theme**: Permanent high-contrast dark mode with neon green accents.
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop.
- **Terminal UI**: Interactive-style terminal for education and certifications.
- **Loading Animation**: Custom intro sequence.
- **Smooth Navigation**: Scroll-based navigation with parallax effects.
- **Contact System**: Fully functional contact form with database persistence.

## 🛠️ Local Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file or set the following:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
   ```

4. Push Database Schema:

   ```bash
   npm run db:push
   ```

5. Start Development Server:
   ```bash
   npm run dev
   ```

## 📦 Project Structure

- `client/`: React frontend application
- `server/`: Express backend API
- `shared/`: Shared types and database schemas
- `migrations/`: Database migration files

## 🚀 Deployment

### Vercel / Netlify (Frontend)

The frontend can be deployed as a static site after building:

```bash
npm run build
```

### Backend & Database

The backend requires a Node.js environment and a PostgreSQL instance (e.g., Neon, Railway, or AWS RDS).

---

Designed & Built by Mostafa Karam.
