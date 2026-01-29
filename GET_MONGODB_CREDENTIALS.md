# How to Get Your MongoDB Atlas Credentials

## The Problem
Your current credentials (`hrms` / `yXeGaMdvL7DkYcL`) are **not working**. You need to get the correct username and password from MongoDB Atlas.

## Step-by-Step Instructions

### 1. Go to MongoDB Atlas
Open: https://cloud.mongodb.com/

### 2. Navigate to Database Access
- Click **"Database Access"** in the left sidebar (under "Security")

### 3. Check Existing Users
Look for a user in the list. You should see:
- Username (e.g., `admin`, `hrms`, or something else)
- Authentication Method
- Database User Privileges

### 4. Get the Password

**Option A: If you remember the password**
- Use that password in your `.env` file

**Option B: If you forgot the password (most common)**
- Click the **"Edit"** button next to your user
- Click **"Edit Password"**
- Either:
  - Click **"Autogenerate Secure Password"** → Copy it immediately!
  - Or type your own password
- Click **"Update User"**

**Option C: Create a new user**
- Click **"Add New Database User"**
- Username: `hrms` (or any name)
- Password: Click "Autogenerate" or create your own
- Database User Privileges: **"Read and write to any database"**
- Click **"Add User"**

### 5. Update Your .env File

Open `/Users/anupamsinha/Desktop/untitled folder 4/hrms-lite/backend/.env`

Replace the line with your actual credentials:
```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xumu03y.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true
```

**Example:**
If your username is `admin` and password is `MyPass123`, it should be:
```
MONGO_URI=mongodb+srv://admin:MyPass123@cluster0.xumu03y.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true
```

### 6. Restart the Backend
```bash
cd backend
uvicorn main:app --reload
```

### 7. Test
Try adding an employee from the frontend!

---

## Important Notes
- **No angle brackets**: Don't use `<username>` or `<password>`
- **No spaces**: The password should have no spaces before or after
- **Special characters**: If your password has special characters like `@`, `#`, `%`, you need to URL-encode them
