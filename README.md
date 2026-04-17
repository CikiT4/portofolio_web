# Hayden Novariyo Portfolio

A full-stack portfolio website for **Hayden Novariyo Wira Alfisyahr** — Event Organizer, Content Creator & CS Student.

## ✨ Features

- **Public Portfolio** — Animated sections: Hero, About, Experience, Services, Skills, Stats, Education, Organizations, FAQ, Contact
- **Admin Dashboard** — JWT-authenticated CRUD panel for all content
- **REST API** — Express.js backend with SQLite database
- **Animations** — IntersectionObserver scroll reveals, skill bar animations, stats counters, service modals

## 🗂 Project Structure

```
porto/
├── index.html          # Vite HTML entry
├── index.css           # Global Tailwind styles
├── main.jsx            # React root
├── src/
│   ├── App.jsx                 # React Router
│   ├── context/AuthContext.jsx # JWT auth state
│   ├── hooks/
│   │   ├── useApi.js           # Axios instance
│   │   └── useScrollReveal.js  # IntersectionObserver hook
│   ├── pages/
│   │   ├── PublicPortfolio.jsx # Public page
│   │   ├── AdminLogin.jsx      # Login
│   │   └── AdminDashboard.jsx  # Admin panel
│   ├── sections/               # Portfolio sections (Hero, About, etc.)
│   ├── admin/                  # Admin CRUD panels
│   └── components/             # Reusable components
└── server/
    ├── index.js        # Express app
    ├── db.js           # SQLite schema
    ├── seed.js         # CV data seeder
    ├── middleware/     # Auth + rate-limit
    └── routes/         # REST API endpoints
```

## 🚀 Quick Start

### 1. Install Frontend Dependencies
```bash
cd porto
npm install
```

### 2. Install Backend Dependencies
```bash
cd porto/server
npm install
```

### 3. Seed the Database
```bash
cd porto/server
node seed.js
```

### 4. Start the Backend (Terminal 1)
```bash
cd porto/server
npm start
# Or use nodemon for dev:
# npx nodemon index.js
```

### 5. Start the Frontend (Terminal 2)
```bash
cd porto
npm run dev
```

### 6. Open in Browser
- **Portfolio**: http://localhost:5173
- **Admin Login**: http://localhost:5173/admin/login
- **API Health**: http://localhost:5000/api/health

## 🔑 Admin Credentials
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `hayden2024` |

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Animations | CSS keyframes + IntersectionObserver + Framer Motion |
| Backend | Node.js + Express |
| Database | SQLite (via better-sqlite3) |
| Auth | JWT (jsonwebtoken) + bcryptjs |

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Get JWT token |
| GET | `/api/hero` | — | Hero content |
| PUT | `/api/hero` | Admin | Update hero |
| GET | `/api/about` | — | About content |
| PUT | `/api/about` | Admin | Update about |
| GET/POST/PUT/DELETE | `/api/experiences` | GET: public | Experience CRUD |
| GET/POST/PUT/DELETE | `/api/services` | GET: public | Services CRUD |
| GET/POST/PUT/DELETE | `/api/skills` | GET: public | Skills CRUD |
| GET/POST/PUT/DELETE | `/api/stats` | GET: public | Stats CRUD |
| GET/POST/PUT/DELETE | `/api/education` | GET: public | Education CRUD |
| GET/POST/PUT/DELETE | `/api/organizations` | GET: public | Organizations CRUD |
| GET/POST/PUT/DELETE | `/api/faqs` | GET: public | FAQs CRUD |
| POST | `/api/contact` | — | Submit contact form |
| GET/DELETE | `/api/contact` | Admin | Manage messages |

## 🎨 Design System

- **Background**: `#080808` (ink-950)
- **Text**: `#E8E8E8` (ink-100)
- **Accent**: `#C9A84C` (gold)
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) + JetBrains Mono (labels)

## 🌐 Repository Setup

```bash
# Initialize git repo (from porto/ directory)
git init
git add .
git commit -m "feat: initial portfolio site for Hayden Novariyo"
git remote add origin https://github.com/yourusername/hayden-portfolio.git
git push -u origin main
```

---

*Built with ❤️ for Hayden Novariyo Wira Alfisyahr*
