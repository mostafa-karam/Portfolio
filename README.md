# Portfolio - Mostafa Karam

A modern, high-performance portfolio website for a Cybersecurity Analyst and Full Stack Developer. Built with React, Vite, Express, and Tailwind CSS.

## 🚀 Getting Started

Follow these steps to set up the project locally after downloading the ZIP file.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A PostgreSQL database (optional for local development if you use the provided mock storage, but required for production)

### Database Setup (PostgreSQL)

The project uses **PostgreSQL** with **Drizzle ORM**.

1. **Get a Connection String**:
   - You can use [Neon](https://neon.tech/), [Railway](https://railway.app/), or any PostgreSQL provider.
2. **Set Environment Variable**:
   - Create a `.env` file in the root directory:
     ```env
     DATABASE_URL=postgres://user:password@host:port/dbname
     ```
3. **Push Schema to Database**:
   - Run this command to create the necessary tables in your database:
     ```bash
     npx drizzle-kit push
     ```

---

## 📤 Deploying to GitHub

1. **Create a new repository** on [GitHub](https://github.com/new).
2. **Initialize Git** in your local project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. **Link to GitHub** and push:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Deploying to Vercel

Vercel is the best platform for deploying Vite-based applications.

1. **Log in to [Vercel](https://vercel.com)**.
2. Click **"Add New"** > **"Project"**.
3. **Import your GitHub repository**.
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**: If you are using a database, add your `DATABASE_URL` in the "Environment Variables" section.
6. Click **Deploy**.

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Shadcn UI

## 📄 License

This project is licensed under the MIT License.
