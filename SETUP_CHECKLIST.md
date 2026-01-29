# MongoDB Atlas Quick Setup Checklist

## ✅ What You've Already Done
- [x] Created a MongoDB Atlas cluster
- [x] Added IP address to Network Access
- [x] Fixed SSL configuration in backend
- [x] Fixed `.env` file format

## ❌ What's Still Blocking You
- [ ] **Get correct username/password from MongoDB Atlas**

## 🔧 Fix Authentication (Do This Now)

### Step 1: Go to MongoDB Atlas
Open: https://cloud.mongodb.com/

### Step 2: Database Access
Click **"Database Access"** in left sidebar (under Security)

### Step 3: Reset or Create User

**You will see a list of users. Pick ONE option:**

#### Option A: Reset Existing User Password
1. Click **"EDIT"** button next to any user
2. Click **"Edit Password"**
3. Click **"Autogenerate Secure Password"**
4. **COPY THE PASSWORD IMMEDIATELY** (you won't see it again!)
5. Click **"Update User"**

#### Option B: Create New User
1. Click **"ADD NEW DATABASE USER"**
2. **Username**: `hrmsuser` (or any name you want)
3. **Password**: Click "Autogenerate Secure Password" and **COPY IT**
4. **Database User Privileges**: Select "Read and write to any database"
5. Click **"Add User"**

### Step 4: Update .env File

Open: `/Users/anupamsinha/Desktop/untitled folder 4/hrms-lite/backend/.env`

Replace with your actual credentials:
```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_COPIED_PASSWORD@cluster0.xumu03y.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true
DB_NAME=hrms
```

**Example (if username is `hrmsuser` and password is `Abc123XYZ`):**
```
MONGO_URI=mongodb+srv://hrmsuser:Abc123XYZ@cluster0.xumu03y.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true
DB_NAME=hrms
```

### Step 5: Restart Backend
The backend should auto-reload, but if not:
```bash
# Press Ctrl+C to stop
# Then run:
uvicorn main:app --reload
```

### Step 6: Test
Go to your frontend (http://localhost:5173) and try adding an employee!

---

## 📊 About Database & Collections

**You DON'T need to create anything manually!**

When you successfully add your first employee:
- ✨ MongoDB will automatically create database `hrms`
- ✨ MongoDB will automatically create collection `employees`
- ✨ MongoDB will automatically create collection `attendance` (when you mark attendance)

This is called "lazy creation" - MongoDB creates things only when needed.

---

## 🎯 Summary

1. **Fix authentication** (get correct password from Atlas)
2. **Update `.env`** with real credentials
3. **Restart backend**
4. **Add employee** from frontend
5. **Database & collections auto-create** ✨

That's it!
