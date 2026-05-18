# SmartLeads CRM

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-SMARTLEAD--FIVE.VERCEL.APP-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smartlead-five.vercel.app)

## Description

SmartLeads CRM is a professional, production-grade Lead Management System engineered to streamline the entire customer acquisition pipeline. It was built to solve a critical issue faced by modern companies: losing track of high-intent leads incoming from multi-channel streams (websites, social media, ads) and experiencing high delay times in sales follow-ups.

Through this project, I engineered a complete, type-safe full-stack application featuring robust Role-Based Access Control (RBAC), advanced data querying, and an **intelligent follow-up system powered by Google Gemini AI** that enables sales agents to customize and fire off emails or WhatsApp chats in exactly two clicks.

### Why this project stands out:
- **Real Business Value:** Solves the core pipeline bottleneck of slow customer response times.
- **Enterprise Security:** Implements JWT-based route guarding and custom RBAC middleware.
- **Advanced State Flow:** Utilizes React Query alongside Zustand to manage client cache efficiently.
- **AI-Enhanced Workflows:** Connects directly with the latest Google Gemini model for fast, context-aware content generation.

## Table of Contents

- [Live Links](#-live-links)
- [Test Credentials](#-test-credentials)
- [Installation](#installation)
- [Docker Setup](#-docker-setup)
- [Usage](#usage)
- [API Endpoints](#-api-endpoints)
- [Features](#features)
- [Credits](#credits)
- [License](#license)

## 🚀 Live Links

- **Frontend (Vercel):** [https://smartlead-five.vercel.app](https://smartlead-five.vercel.app)
- **Backend (Render):** [https://smartlead-kpo7.onrender.com](https://smartlead-kpo7.onrender.com)
- **Database (Atlas):** MongoDB Cloud Sandbox

## 🔑 Test Credentials

For quick evaluation, use these pre-seeded test user accounts:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@smartleads.com` | `admin123` | Full access (Add, Edit, Delete, Stats, CSV) |
| **Sales Rep** | `sales@smartleads.com` | `sales123` | Limited access (Add, Edit, View, Stats, **Delete Hidden**) |

---

## Installation

To set up the development environment locally, follow these instructions:

### 1. Clone the Repository
```bash
git clone https://github.com/HariniPrithiyangara/smartlead.git
cd smartlead
```

### 2. Configure the Backend
Navigate to the `backend` folder, install the packages, and configure the environment variables:
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartleads
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the backend server in development mode:
```bash
npm run dev
```

### 3. Configure the Frontend
Open a new terminal, navigate to the `frontend` folder, install packages, and set up your variables:
```bash
cd frontend
npm install
```
Create a `.env` file inside the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCK_API=false
```
Start the frontend development server:
```bash
npm run dev
```

---

## 🐳 Docker Setup

This project is fully containerized for standard orchestrations. You can spin up the entire MERN stack locally with a single command:

1. **Verify your environment variable files:**
   Ensure `backend/.env` exists (or copy it from `backend/.env.example`). Docker Compose will read MONGODB_URI directly from the internal bridge network (`mongodb://mongo:27017/smartleads`).

2. **Launch MERN container clusters:**
   ```bash
   docker-compose up --build
   ```
   This compiles the optimized production Docker images and spins up:
   * **Database:** MongoDB 7 on port `27017`
   * **Backend:** Express API on port `5000`
   * **Frontend:** Nginx Serving Vite client on port `3000`

---

## Usage

Once both servers are running, open your browser to `http://localhost:5173`.

### Key User Flows:
1. **Authentication:** Register an account or log in with your credentials. 
2. **Dashboard Overview:** Monitor lead status updates, see recent leads, and view total revenues on the dynamic dashboard.
3. **Manage Leads:** Navigate to the **Leads** tab to add a new lead, edit existing details, or delete leads (Admin only).
4. **Generate AI Messages:** Edit any lead, click **✨ Generate AI Follow-up Message**, and choose **Email** or **WhatsApp** to contact the client instantly with high-conversion copy.
5. **Data Export:** Click **Export to CSV** to instantly download full pipelines for internal reporting.

---

## 📝 API Endpoints

All core API routing paths are strictly RESTful, type-safe, and secured:

| Method | Path | Auth | Description | Req. Body / Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Registers a new Sales/Admin user | `{ name, email, password, role }` |
| **POST** | `/api/auth/login` | Public | Standard user authentication | `{ email, password }` ➡️ returns JWT token |
| **GET** | `/api/leads` | JWT | Fetch paginated leads list with query filters | Supports `?page=1&limit=10&search=Rahul&status=Qualified` |
| **GET** | `/api/leads/stats` | JWT | Get real-time metric analytics aggregates | Returns pipeline count status metrics |
| **GET** | `/api/leads/:id` | JWT | View specific lead detailed model fields | Returns detailed model payload |
| **POST** | `/api/leads` | JWT | Create a new lead record | `{ name, email, status, source, company, phone }` |
| **PUT** | `/api/leads/:id` | JWT | Update active lead metadata values | Updates specific field properties |
| **DELETE**| `/api/leads/:id` | JWT + Admin | Permadelete a lead (RBAC enforced) | Restricts and rejects non-admin users (`403 Forbidden`) |
| **POST** | `/api/leads/:id/ai-followup`| JWT | Generate personalized sales copy (Gemini) | AI reads lead profile context, yields sales hooks |

---

## Features

- **Dynamic Search & Filtering:** Instantly query leads using URL-synced global search, status categorization, and source filters.
- **Role-Based Access Control (RBAC):** Restricts dangerous administrative operations (such as lead deletion) exclusively to users registered with the `Admin` role.
- **Google Gemini Integration:** A custom server-side service layer that queries `gemini-2.5-flash` to write personalized sales copy.
- **One-Click Communication:** Leverages standard `mailto:` protocol and `wa.me` API endpoints to launch native mailing or chat applications with pre-populated AI messages.
- **Professional Validation:** Uses frontend `Zod` schemas and custom backend middleware to secure and validate all API payloads.

---

## Credits

- **Google Gemini API:** Powering the AI-generation capabilities.
- **Tailwind CSS:** Responsive utility styling.
- **Lucide Icons:** Premium modern icon library.
- **Shields.io:** Custom metadata badge hosting.

---

## License

This project is licensed under the MIT License - see [choosealicense.com](https://choosealicense.com/) for details.
