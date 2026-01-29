# HRMS Lite

A lightweight Human Resource Management System built with React (Vite) and FastAPI (MongoDB).

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** FastAPI, Python, MongoDB (Motor)
- **Database:** MongoDB

## Functionality
- **Employee Management:** Add, List, Delete Employees.
- **Attendance Management:** Mark, View Attendance.

## Setup & Run Locally

### Prerequisites
- Node.js & npm
- Python 3.8+
- MongoDB running locally (or update `.env` with URI)

### Backend
1. Navigate to `backend`:
   ```sh
   cd backend
   ```
2. Create virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run server:
   ```sh
   uvicorn main:app --reload
   ```
   Server runs at `http://localhost:8000`.

### Frontend
1. Navigate to `frontend`:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run dev server:
   ```sh
   npm run dev
   ```
   Frontend runs at `http://localhost:5173` (or 5174).

## Deployment

### Backend (Render/Railway)
1. Push code to GitHub.
2. Connect Repo to Render/Railway.
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
5. Add Environment Variables (`MONGO_URI`, `DB_NAME`).

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Connect Repo to Vercel/Netlify.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Update `api.js` base URL to point to the deployed backend URL (using environment variables `VITE_API_URL`).
