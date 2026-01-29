# MongoDB Atlas Configuration Guide

## Issue
Your backend cannot connect to MongoDB Atlas because the cluster's network access is not configured.

## Solution Steps

### 1. Configure Network Access (IP Whitelist)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click on **"Network Access"** in the left sidebar (under Security)
3. Click **"Add IP Address"**
4. Choose one of these options:
   - **Option A (Quick Test)**: Click "Allow Access from Anywhere" (0.0.0.0/0)
     - ⚠️ Only for development/testing
   - **Option B (Recommended)**: Click "Add Current IP Address"
     - This adds your current IP
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to propagate

### 2. Verify Database User
1. Click **"Database Access"** in the left sidebar
2. Verify your user exists (username: `hrms`)
3. If not, click "Add New Database User":
   - Username: `hrms`
   - Password: `yXeGaMdvL7DkYcL` (or your chosen password)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

### 3. Test Connection
After configuring network access, restart your backend:
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

Then try adding an employee from the frontend.

### 4. Verify Connection String
Your current `.env` should have:
```
MONGO_URI=mongodb+srv://hrms:yXeGaMdvL7DkYcL@cluster0.xumu03y.mongodb.net/?appName=Cluster0
DB_NAME=hrms
```

## Common Issues

**"Authentication failed"**: Password is wrong in connection string
**"Connection timeout"**: IP not whitelisted (do step 1)
**"Network error"**: Check your internet connection

## Browser Console Error
The "Host validation failed" error you see is from a browser extension (like a password manager or ad blocker), NOT from your MongoDB cluster. You can safely ignore it.
