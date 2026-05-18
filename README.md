# SmartLeads CRM 🚀

A production-grade Lead Management CRM built for the Full Stack Intern Assignment.

## Tech Stack

**Frontend:** React + Vite + TypeScript + Tailwind CSS + React Query + Zustand  
**Backend:** Node.js + Express + TypeScript + MongoDB + Mongoose + JWT

## Features

- ✅ JWT Authentication (Register/Login)
- ✅ Role-Based Access Control (Admin / Sales)
- ✅ Full Leads CRUD
- ✅ Advanced filtering (status, source, search, sort)
- ✅ Debounced search (500ms)
- ✅ Pagination
- ✅ CSV Export (PapaParse)
- ✅ Zod validation (frontend + backend)
- ✅ Docker + Docker Compose
- 🌟 Bonus: Premium Dark Mode Support

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Edit with your MongoDB URI
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/auth/me` | Get current user |

### Leads
| Method | Endpoint | Auth | Role |
|--------|----------|------|------|
| GET | `/api/leads` | ✅ | All |
| GET | `/api/leads/stats` | ✅ | All |
| GET | `/api/leads/:id` | ✅ | All |
| POST | `/api/leads` | ✅ | All |
| PUT | `/api/leads/:id` | ✅ | All |
| DELETE | `/api/leads/:id` | ✅ | Admin |

### Query Parameters (GET /api/leads)
```
?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1&limit=10
```

## Docker

```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## Project Structure

```
project/
├── frontend/          # Vite + React + TS
│   └── src/
│       ├── api/       # Axios API calls
│       ├── components/ # Reusable UI components
│       ├── hooks/     # Custom React hooks
│       ├── pages/     # Route pages
│       ├── store/     # Zustand state
│       └── types/     # TypeScript types
├── backend/           # Express + TS
│   └── src/
│       ├── controllers/ # Route handlers
│       ├── services/    # Business logic
│       ├── models/      # Mongoose models
│       ├── middleware/  # Auth, RBAC, validation
│       └── routes/      # Express routes
└── docker-compose.yml
```

## Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartleads
JWT_SECRET=your_secret_here
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
