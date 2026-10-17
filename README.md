# ⚡ Pulseboard — Personalized Content Dashboard

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764abc?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3.1-fcc72b?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.52-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)

A modern, production-grade frontend dashboard tracking live **News**, **Trending Movies (TMDB)**, and **Social Posts**. Features real-time API integrations, drag-and-drop feed reordering, instant debounced search, glassmorphic UI, custom theme toggle, and an automated testing suite covering unit, integration, and E2E flows.

---

## 🚀 Live Demo & Preview

- **Live Application Demo:** [Click Here](https://pulseboard-dashboard.vercel.app)
- **Demo Credentials:** The app includes mock data fallbacks and demo login sessions out-of-the-box (`alex@example.com`).

---

## ✨ Features

- **Personalized Aggregated Feed**: Unified feed merging live News articles, TMDB movie recommendations, and social updates.
- **Drag-and-Drop Feed Customization**: Reorder your feed with accessible keyboard & pointer drag handles powered by `@dnd-kit`.
- **Global Debounced Search**: Fast instant multi-source search with keyboard shortcut (`⌘K` / `Ctrl+K`).
- **Persistence & Offline Storage**: Saved favorites, category filters, and user preferences automatically persist in `localStorage`.
- **Premium Glassmorphic UI**: Styled with Tailwind CSS, ambient glows, shimmering skeleton loaders, card hover lifts, and Framer Motion micro-animations.
- **Zero-Flash Dark Mode**: CSS custom properties paired with a synchronous theme boot script to eliminate flash of unstyled theme (FOUT).
- **Dual-Mode Backend Proxies**: Server-side Next.js route handlers keep API keys private; automatically switches between live API data and sample data.
- **Responsive Layout**: Collapsible sidebar, mobile navigation drawer, and sticky frosted glass header.
- **Enterprise-Grade Testing**: 100% passing test suite across 12 test suites (31 unit/integration tests) and Playwright E2E automation.

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) + React 19 | Server & Client Components, Server-side API Proxies |
| **Language** | TypeScript (Strict Mode) | Full end-to-end type safety |
| **State Management** | Redux Toolkit + RTK Query | Global state, API caching, and optimistic updates |
| **Styling & Icons** | Tailwind CSS 3 + Lucide React | Utility-first styling, CSS variables, sleek iconography |
| **Interactivity** | Framer Motion + `@dnd-kit` | Micro-interactions, page transitions, drag-and-drop |
| **Unit & Integration** | Vitest + React Testing Library | Fast unit and component test runner |
| **End-to-End** | Playwright | Multi-browser headless E2E verification |
| **External APIs** | NewsAPI.org + The Movie Database (TMDB) | Live worldwide news and movie catalog |

---

## 📁 Project Architecture

```text
personalized-content-dashboard/
├── public/                # Static assets, images, and fonts
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # Server-side API proxy routes (news, movies, search, social)
│   │   ├── feed/          # Reorderable personalized feed page
│   │   ├── favorites/     # User-saved bookmarks page
│   │   ├── trending/      # Curated top trending page
│   │   ├── search/        # Debounced global search results page
│   │   ├── settings/      # Category, content type & theme settings
│   │   ├── login/         # Mock authentication portal
│   │   ├── globals.css    # CSS variables, animations, and typography tokens
│   │   ├── layout.tsx     # Root layout with Theme boot script & AppShell
│   │   └── page.tsx       # Main executive dashboard
│   ├── components/        # Modular UI components
│   │   ├── cards/         # ContentCard, ContentMedia, Hover interactions
│   │   ├── dashboard/     # Greeting hero, StatsRow, MockNotice
│   │   ├── feed/          # FeedSection, ContentGrid, SortableFeed, FilterChips
│   │   ├── layout/        # AppShell, Header, Sidebar, NavItems, ThemeToggle
│   │   ├── search/        # SearchBar component
│   │   └── ui/            # Button, Badge, Skeleton, LoadingSpinner, EmptyState
│   ├── features/          # Redux slices (auth, favorites, feed, preferences, theme)
│   ├── hooks/             # Custom React hooks (useUnifiedFeed)
│   ├── lib/               # Constants, mappers, mock data, utility helpers
│   ├── store/             # Redux Store, typed hooks, RTK Query ContentApi
│   └── types/             # TypeScript definitions and data models
├── tests/
│   └── e2e/               # Playwright end-to-end tests
├── .env.example           # Environment template
├── playwright.config.ts   # E2E test configuration
├── tailwind.config.ts     # Tailwind theme and custom shadow definitions
├── tsconfig.json          # TypeScript compiler configuration
└── vitest.config.ts       # Vitest unit test configuration
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### 2. Clone and Install

```bash
git clone https://github.com/<your-username>/personalized-content-dashboard.git
cd personalized-content-dashboard
npm install
```

> **Windows PowerShell Users**: If script execution is disabled on your system (`npm.ps1 cannot be loaded`), enable it once:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> *(Or append `.cmd` to commands: `npm.cmd install`)*

---

## 🔑 Environment Variables & API Setup

The application runs immediately out of the box with sample mock data. To fetch **real live data**, create a `.env.local` file:

```bash
# Windows
copy .env.example .env.local

# macOS / Linux
cp .env.example .env.local
```

Open `.env.local` and add your free API credentials:

```env
# NewsAPI Key from https://newsapi.org/register
NEWS_API_KEY=your_newsapi_key_here

# TMDB v4 Read Access Token or v3 API Key from https://www.themoviedb.org/settings/api
TMDB_API_TOKEN=your_tmdb_token_here
```

### Getting Free API Keys:
1. **NewsAPI**: Register at [https://newsapi.org/register](https://newsapi.org/register) to get an instant API key.
2. **TMDB**: Register at [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup), navigate to **Settings → API**, and generate a developer key or v4 read access token.

---

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🧪 Testing Suite

### Unit & Integration Tests (Vitest)
Executes 31 automated tests covering Redux reducers, search debouncing, card favoriting, and UI interactions:

```bash
npm test
```

For interactive watch mode:
```bash
npm run test:watch
```

### End-to-End Tests (Playwright)
Validates complete user flows across Chromium, Firefox, and WebKit:

```bash
# Install browsers once
npx playwright install chromium

# Run E2E tests
npm run test:e2e
```

### Code Quality (ESLint)
```bash
npm run lint
```

---

## 🌐 Deploy to Vercel

The easiest way to deploy this project is via the [Vercel Platform](https://vercel.com):

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/new) and click **Import Project**.
3. In **Environment Variables**, optionally provide `NEWS_API_KEY` and `TMDB_API_TOKEN`.
4. Click **Deploy**.

> **Note on NewsAPI**: NewsAPI's free developer tier restricts direct requests from hosted domains (`*.vercel.app`). The server proxy automatically handles this by serving fallback sample data when upstream calls are restricted.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
