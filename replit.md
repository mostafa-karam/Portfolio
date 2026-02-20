# Portfolio - Mostafa Karam

## Overview

A modern, single-page portfolio website for a Cybersecurity Analyst and Full Stack Developer. The site showcases skills, experience, projects, and includes a contact form. It's built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure

The project uses a three-directory monorepo layout:

- **`client/`** — React frontend (SPA)
- **`server/`** — Express backend (API server)
- **`shared/`** — Shared TypeScript types, schemas, and route definitions used by both client and server

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (config in `vite.config.ts`)
- **Routing**: Wouter (lightweight client-side router) — only two routes: Home (`/`) and 404
- **Styling**: Tailwind CSS with CSS variables for theming (dark/light mode support)
- **UI Components**: shadcn/ui (New York style) built on Radix UI primitives — components live in `client/src/components/ui/`
- **Animations**: Framer Motion for scroll reveals, transitions, and loading animation
- **State Management**: TanStack React Query for server state; React context for theme
- **Forms**: React Hook Form with Zod validation (via `@hookform/resolvers`)
- **Key Libraries**: `typewriter-effect` (hero typing animation), `react-scroll` (smooth section scrolling), `canvas-confetti` (celebration effect on form submit), `react-icons` (tech stack icons), `lucide-react` (UI icons)

Path aliases are configured in `tsconfig.json` and `vite.config.ts`:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Backend Architecture

- **Framework**: Express.js running on Node.js
- **Language**: TypeScript, executed via `tsx` in development
- **API**: Single REST endpoint — `POST /api/contact` for contact form submissions
- **Route Definitions**: Shared between client and server via `shared/routes.ts`, which defines paths, HTTP methods, and Zod input/output schemas
- **Dev Server**: In development, Vite dev server is attached as middleware to the Express server (see `server/vite.ts`) for HMR
- **Production**: Client is built to `dist/public/`, server is bundled with esbuild to `dist/index.cjs`, and Express serves the static files (see `server/static.ts`)

### Database Layer

- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-orm/node-postgres`
- **Schema**: Defined in `shared/schema.ts` — currently one table:
  - `messages` — stores contact form submissions (id, name, email, message, createdAt)
- **Migrations**: Managed via `drizzle-kit push` (config in `drizzle.config.ts`, migrations output to `./migrations/`)
- **Storage Pattern**: `server/storage.ts` exports a `DatabaseStorage` class implementing `IStorage` interface, instantiated as a singleton `storage` object

### Build System

- **Development**: `npm run dev` runs `tsx server/index.ts` which starts Express with Vite middleware
- **Production Build**: `npm run build` runs `script/build.ts` which:
  1. Builds the client with Vite (output to `dist/public/`)
  2. Bundles the server with esbuild (output to `dist/index.cjs`), externalizing most deps except an allowlist
- **Production Start**: `npm start` runs `node dist/index.cjs`
- **Type Checking**: `npm run check` runs `tsc`
- **DB Push**: `npm run db:push` runs `drizzle-kit push`

### Theme System

Dark mode is the default. Theme toggle between dark/light is managed via a React context provider (`ThemeProvider`) that persists to `localStorage` and toggles a CSS class on `<html>`. CSS variables in `client/src/index.css` define the color palette (only dark mode variables are currently defined in `:root`).

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection string must be set as `DATABASE_URL` environment variable. Compatible with Neon, Railway, or any PostgreSQL provider.

### Key NPM Packages
- **Drizzle ORM + drizzle-kit** — Database ORM and migration tooling
- **pg** — PostgreSQL client (node-postgres)
- **express** — HTTP server
- **zod + drizzle-zod** — Schema validation shared between client and server
- **@tanstack/react-query** — Async server state management
- **framer-motion** — Animations
- **shadcn/ui + Radix UI** — Component library foundation
- **tailwindcss** — Utility-first CSS
- **wouter** — Client-side routing
- **react-hook-form** — Form handling

### Fonts (External CDN)
- Google Fonts: JetBrains Mono (headings/code), Inter (body text), DM Sans, Fira Code, Geist Mono, Architects Daughter

### Replit-Specific Plugins (Dev Only)
- `@replit/vite-plugin-runtime-error-modal` — Always active
- `@replit/vite-plugin-cartographer` — Dev only when `REPL_ID` is set
- `@replit/vite-plugin-dev-banner` — Dev only when `REPL_ID` is set