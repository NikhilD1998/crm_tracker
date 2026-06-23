# CRM Tracker

A full-stack Customer Relationship Management (CRM) application built using the MERN stack. The platform enables businesses to manage customers, leads, and user accounts through a secure and responsive web interface.

---

## Project Overview

CRM Tracker helps organizations streamline customer management and sales processes by providing a centralized dashboard for managing users and customer data.

### Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Customer Management
- Lead Tracking
- Responsive Dashboard
- RESTful APIs
- MongoDB Integration

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Context API

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- CORS

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Backend Setup Instructions

### Clone Repository

```bash
git clone https://github.com/NikhilD1998/crm_tracker
cd crm_tracker/server
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## Frontend Setup Instructions

### Navigate to Client Directory

```bash
cd client
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

inside `client/src/services/api.js`

replace the backend url

### Start Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Nikhil Dada",
  "email": "nikhil2@example.com",
  "password": "password@123"
}
```

---

#### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "nikhil2@example.com",
  "password": "password@123"
}
```

---

#### Get Current User

```http
GET /api/auth/me
```

Authorization:

```text
Bearer <jwt_token>
```

---

### Opportunities

#### Get All Opportunities

```http
GET /api/opportunities
```

Authorization:

```text
Bearer <jwt_token>
```

---

#### Get Opportunity By ID

```http
GET /api/opportunities/:id
```

Example:

```http
GET /api/opportunities/6a3914f2ff3ff812ae6f39e3
```

Authorization:

```text
Bearer <jwt_token>
```

---

#### Create Opportunity

```http
POST /api/opportunities
```

Request Body:

```json
{
  "customerName": "Tesla Inc.",
  "contactName": "Elon Musk",
  "contactEmail": "elon@tesla.com",
  "contactPhone": "+1-555-123-4567",
  "requirement": "Enterprise CRM solution with analytics dashboard",
  "estimatedValue": 150000,
  "stage": "Qualified",
  "priority": "High",
  "nextFollowUpDate": "2026-06-30",
  "notes": "Interested in premium plan. Follow up after proposal review."
}
```

Authorization:

```text
Bearer <jwt_token>
```

---

#### Update Opportunity

```http
PUT /api/opportunities/:id
```

Request Body Example:

```json
{
  "stage": "Proposal Sent",
  "priority": "High",
  "estimatedValue": 200000,
  "nextFollowUpDate": "2026-07-05",
  "notes": "Proposal shared with client. Waiting for feedback."
}
```

Authorization:

```text
Bearer <jwt_token>
```

---

#### Delete Opportunity

```http
DELETE /api/opportunities/:id
```

Authorization:

```text
Bearer <jwt_token>
```

---

## Deployment Steps

### Backend Deployment (Render)

1. Push backend code to GitHub.
2. Create a new Render Web Service.
3. Select GitHub repository.
4. Set Root Directory:

```text
server
```

5. Add environment variables.
6. Configure:

```text
Build Command: npm install
Start Command: npm start
```

7. Deploy the service.

---

### Frontend Deployment (Vercel)

1. Import GitHub repository into Vercel.
2. Set Root Directory:

```text
client
```

3. Add environment variable:

```env
VITE_API_URL=https://your-backend.onrender.com
```

4. Deploy the application.

---

## Live Application

### Frontend

```text
https://crm-tracker-neon.vercel.app
```

### Backend

```text
https://crm-tracker-muug.onrender.com
```

---

## GitHub Repository

```text
https://github.com/NikhilD1998/crm_tracker
```

---

## Test Credentials

Registration is enabled, create a new account.

Otherwise use:

```text
Email: demouser@admin.com
Password: 123456789
```

---
