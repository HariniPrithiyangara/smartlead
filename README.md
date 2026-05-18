# 🚀 Harini Prithiyangara B - SmartLeads CRM

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-SMARTLEAD--FIVE.VERCEL.APP-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smartlead-five.vercel.app)

A production-grade, highly optimized Lead Management CRM built with the MERN stack and Tailwind CSS. Featuring seamless AI-powered workflows, responsive glassmorphism UI, and enterprise-level backend API routes.

<br />

## 🌟 Overview

SmartLeads is a premium Customer Relationship Management (CRM) dashboard designed to help sales teams track, manage, and engage with potential clients. Built with a focus on modern UI/UX aesthetics (glassmorphism) and robust engineering, it features a complete authentication system, Role-Based Access Control (RBAC), and integrates **Google's Gemini AI** to automatically generate personalized sales follow-up messages.

## 🚀 Live Links

- **Frontend (Live App):** [https://smartlead-five.vercel.app](https://smartlead-five.vercel.app)
- **Backend (API Base):** [https://smartlead-kpo7.onrender.com](https://smartlead-kpo7.onrender.com)
- **Database:** MongoDB Atlas (Cloud)

---

## ✨ Key Features

### 🔐 Security & Auth
- **JWT Authentication:** Secure cookie-less session management.
- **Role-Based Access Control (RBAC):** Differentiated access for `Admin` and `Sales` roles.
- **Bcrypt Password Hashing:** Secure credential storage.

### 🤖 AI Integration
- **Gemini AI Follow-Ups:** Automatically generates professional, context-aware email and WhatsApp messages based on the lead's profile, company, and interaction history.
- **Instant Messaging:** One-click "Send via WhatsApp" or "Send via Email" capabilities.

### 📊 Dashboard & Management
- **Global Search:** Real-time search indexing across all pages and tables.
- **Advanced Filtering:** Filter leads by Status (New, Contacted, Qualified, Lost) and Source.
- **CSV Export:** Download complete lead reports instantly.
- **Data Analytics:** Visual representation of lead pipelines and performance metrics.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons (Glassmorphism design system)
- **State Management:** Zustand
- **Data Fetching:** React Query (TanStack Query) + Axios
- **Form Handling:** React Hook Form + Zod (Strict Validation)
- **Routing:** React Router DOM

### Backend
- **Environment:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose ORM
- **AI Integration:** `@google/genai` (Gemini 2.5 Flash)
- **Security:** Helmet, CORS, Express-Rate-Limit

---

## 💻 Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/HariniPrithiyangara/smartlead.git
cd smartlead
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartleads
JWT_SECRET=your_super_secret_key
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCK_API=false
```
Start the frontend development server:
```bash
npm run dev
```

---

## 🚢 Deployment Architecture
- **Frontend Hosting:** Vercel (CI/CD connected to main branch)
- **Backend Hosting:** Render.com (Web Service)
- **Database Hosting:** MongoDB Atlas (M0 Free Tier)
- **Containerization:** Docker & Docker Compose configured for standard deployments.

## 📝 License
This project was built as part of an Internship assignment. All rights reserved.
