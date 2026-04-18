# Hayden Novariyo - Dynamic Portfolio Website

A modern, minimalist, and fully dynamic portfolio website built with React, Tailwind CSS, Express, and SQLite. This application features an elegant earthy aesthetic and includes a comprehensive Admin Dashboard that allows for complete content management without touching a single line of code.

## 🚀 Features

### Public Frontend
* **Dynamic Content:** Everything from the hero tagline to the about bio, experiences, skills, and FAQs are fetched dynamically from the database.
* **Modern Aesthetic:** Clean, earthy neutral color palette featuring beige backgrounds, brown text, and subtle golden/rusty accents.
* **Responsive Design:** Fully scaled and optimized for mobile, tablet, and desktop viewports using Tailwind CSS.
* **Interactive Elements:** Micro-animations (via Lucide React icons), custom scrolling logic, and glowing hover states across the application.
* **Direct Contact System:** Integrated "Send via WhatsApp" and "Send via Email" buttons that instantly compose pre-filled messages using native mail clients or WhatsApp Web/App.

### Admin Dashboard
* **Secure Authentication:** Protected `/admin` routes using JWT (JSON Web Tokens) and bcrypt password hashing.
* **Content Management System (CMS):** A multi-tab dashboard seamlessly managing Database CRUD operations for every single section of the portfolio.
* **Image Uploading:** Integrated `multer` functionality allowing admins to securely upload and update custom profile pictures and assets on the fly.
* **Clean UI:** Intuitive interface with toast notifications, loading states, and live-previews.

## 📁 Project Structure

This is a Full-Stack application separated logically into two main directories internally:

```text
/
├── server/                     # Backend Node.js Environment
│   ├── routes/                 # Express API endpoints for each section (hero, about, contact, upload, etc)
│   ├── middleware/             # JWT Auth verification logic
│   ├── uploads/                # Local storage for admin-uploaded images
│   ├── db.js                   # SQLite database initialization and schema definitions
│   ├── seed.js                 # Seeding script for default DB data & admin credentials
│   └── index.js                # Core Express server configuration
├── src/                        # Frontend React Environment
│   ├── admin/                  # Admin Dashboard sub-components and management views
│   ├── components/             # Reusable UI elements (Navbar, Footer, RevealWrappers)
│   ├── context/                # React Context for global auth state management
│   ├── hooks/                  # Custom Axios hooks (useApi)
│   ├── pages/                  # Top-level page views (PublicPortfolio, AdminDashboard, Login)
│   ├── sections/               # Public portfolio view components (HeroSection, AboutSection, etc)
│   ├── App.jsx                 # Application entry and React Router architecture
│   └── main.jsx                # DOM rendering
├── index.html                  # Core HTML file
├── index.css                   # Global CSS, utilities, and aesthetic overrides
├── tailwind.config.js          # Tailwind theme, typography, and color configurations
└── vite.config.js              # Vite bundler and API proxy settings
```

## 🛠️ Tech Stack & Core Fundamentals

### Frontend
* **React 18** - Core UI framework.
* **Vite** - Lightning-fast build tool and development server.
* **Tailwind CSS** - Utility-first styling framework used for the complete design system.
* **React Router Dom** - Handling client-side navigation between public and admin routes.
* **Lucide-React** - Lightweight SVG icon library.
* **Axios** - For managing API requests to the backend server.

### Backend
* **Node.js & Express** - Efficient web server routing and handling.
* **MySQL (better-sqlite3)** - Lightweight, file-based relational database that is highly performant.
* **JWT (jsonwebtoken)** - Stateless authentication tokens for the admin dashboard.
* **Multer** - Middleware for handling `multipart/form-data` during profile picture uploads. 

## 💻 Local Development Workflow

To work on this project locally, you must run both the backend Express server and the frontend Vite development server concurrently.

### 1. Start the Backend Server
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
npm run dev
```
*(The backend will run on `http://localhost:5000`)*

### 2. Start the Frontend Server
Open a new, separate terminal at the root directory:
```bash
npm install
npm run dev
```
*(The frontend will run on `http://localhost:5173`. Vite is configured to proxy all `/api` requests to port 5000 automatically).*

### Admin Credentials
To access the `/admin` portal locally to manage content, the default seeded credentials are:
* **Username:** `admin`
* **Password:** `hayden2024`

## ☁️ Deployment (Railway)

The application is configured for a unified deployment on **Railway**.

### 1. Unified Web Service
The backend (`server/index.js`) is configured to serve the built frontend files from the `dist/` directory. This allows you to deploy the entire repository as a single service.

### 2. Environment Variables
In your Railway dashboard, add the following variables:
- `MYSQL_URL`: The full connection string you provided.
- `JWT_SECRET`: A secure random string for admin sessions.
- `NODE_ENV`: `production`

### 3. Build & Deployment Logic
- Railway will detect the root `package.json`.
- It will run `npm install` and the `postinstall` script (which installs backend dependencies).
- It will then run `npm run build` to generate the frontend and finally `npm start` to launch the server.

### 4. Database Setup
Once connected, run the seeder one last time on the production environment if needed to initialize your Railway MySQL tables:
```bash
# Via Railway CLI or Terminal
node server/seed.js
```
