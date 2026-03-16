# 🚀 Quick Start Guide

## ⚡ 30-Second Setup

### Already Running?
If you see both services running, skip to [Access Links](#access-links)

### Start Backend
```bash
cd backend
npm install  # if not done yet
npm start
# Should show: "Server is running on port 3000"
```

### Start Frontend  
```bash
# In new terminal
cd frontend
npm install  # if not done yet
npm run dev
# Should show: "Vite v5.4.21 ready in ... ms"
# Local: http://localhost:5175
```

---

## 🌐 Access Links

| What | Link | Status |
|------|------|--------|
| **Frontend** | http://localhost:5175 | ✅ User interface |
| **API** | http://localhost:3000 | ✅ Backend API |
| **Admin API** | http://localhost:3000/api/admin | ✅ Admin endpoints |

---

## 👤 Login Credentials

### Regular User
```
Email: testuser@test.com
Password: Test@1234
Role: user
```

### Admin User  
```
Email: admin@short-link.com
Password: Admin@1234
Role: admin
```

### Register New
- Go to http://localhost:5175/register
- Create new account

---

## 📝 What You Can Do

### As Regular User
- ✅ Create short links
- ✅ View your links in Dashboard
- ✅ Check statistics and click tracking
- ✅ Generate QR codes

### As Admin
- ✅ View all users
- ✅ Delete user accounts
- ✅ Change user roles
- ✅ Manage all links in system
- ✅ Block/unblock links

---

## 🧪 Test Everything

### 1. Create Link
1. Login as any user
2. Go Home, paste URL
3. Click "Generate"
4. Get short link + QR code

### 2. View Dashboard
1. Logged in? Go to Dashboard
2. See all your links
3. Click any link for details

### 3. Check Statistics
1. Go to Statistics page
2. Enter Link ID or short code
3. See clicks, QR code, trends

### 4. Admin Features
1. Login as admin@short-link.com
2. Go to /admin
3. Manage users and links

---

## 📊 Database

```
Database: shortlink_qr
User: postgres
Password: password
Host: localhost:5432

Tables:
- users (accounts & roles)
- links (short links)
- clicks (click tracking)
- rate_limits (abuse protection)
```

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for detailed schema.

---

## 🔍 View Logs

### Backend Errors
```bash
# Terminal with npm start running
# Watch for error messages
```

### Frontend Errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors

### Database
```bash
psql -U postgres -d shortlink_qr
# Then run SQL commands

# View users
SELECT * FROM users;

# View links
SELECT * FROM links;

# View clicks
SELECT * FROM clicks;
```

---

## 🛠️ Useful Commands

### Stop Services
```bash
# Kill processes
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:5175 | xargs kill -9  # Frontend (or 5173/5174)
```

### Restart Clean
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install  
npm run dev
```

### Check if Running
```bash
curl http://localhost:3000/health
# Should return: {"status":"OK"}

curl http://localhost:5175/
# Should return HTML
```

---

## 📖 Full Guides

- **User Guide:** [USER_GUIDE.md](USER_GUIDE.md)
- **Database Schema:** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)
- **Test Report:** [TEST_REPORT.md](TEST_REPORT.md)
- **Features:** [NEW_FEATURES_V2.md](NEW_FEATURES_V2.md)

---

## ✅ Quick Health Check

```bash
# 1. Backend running?
curl http://localhost:3000/health

# 2. Frontend accessible?
curl http://localhost:5175/

# 3. Can register?
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"Test@1234"}'

# 4. Can login?
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@short-link.com","password":"Admin@1234"}'

# If all return 200-201, you're good! ✅
```

---

## 🎯 Next Steps

1. **[Open Frontend](http://localhost:5175/)** → Create account
2. **[Create Link](http://localhost:5175/)** → Generate short link
3. **[View Dashboard](http://localhost:5175/dashboard)** → See your links
4. **[Check Stats](http://localhost:5175/statistics)** → Track clicks
5. **[Admin Panel](http://localhost:5175/admin)** → Manage system (admin only)

---

**🚀 Happy linking! Questions? Check USER_GUIDE.md**
