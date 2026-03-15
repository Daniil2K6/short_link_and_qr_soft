# Deployment & Quick Start Guide

## 🚀 Current Status

### ✅ Servers Running

| Service | Port | Status | Command |
|---------|------|--------|---------|
| Backend API | 3000 | ✅ Running | `npm start` from backend/ |
| Frontend Dev | 5173 | ✅ Running | `npm run dev` from frontend/ |
| Database | 5432 | ✅ Running | PostgreSQL (shortlink_qr) |

---

## 📡 API Endpoints Ready

### Link Management
- `POST /api/links` - Create short link
- `GET /api/links` - Get all links
- `GET /:shortCode` - Redirect to original URL
- `GET /api/links/:id/stats` - Get statistics
- `GET /api/links/:id/qrcode` - Get QR code (JSON)
- `GET /api/links/:id/qrcode/image` - Get QR code (PNG)

### Admin Management
- `GET /api/admin/links` - View all links
- `GET /api/admin/links/search?q=...` - Search links
- `PATCH /api/admin/links/:id` - Update link
- `DELETE /api/admin/links/:id` - Delete link

---

## 🎨 Frontend Pages

- **Home** - http://localhost:5173/ - Create short links
- **Dashboard** - http://localhost:5173/dashboard - View all links
- **Statistics** - http://localhost:5173/statistics - Link statistics

---

## 📋 Commands to Restart Servers

### Terminal 1 - Backend
```bash
cd /Users/daniilka/Documents/dev/short_link_and_QR/backend
npm start
# Output: ✓ Server running on http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd /Users/daniilka/Documents/dev/short_link_and_QR/frontend
npm run dev
# Output: ➜ Local: http://localhost:5173/
```

### Terminal 3 - Admin Console (Optional)
```bash
cd /Users/daniilka/Documents/dev/short_link_and_QR/backend
npm run admin
# Interactive admin menu appears
```

---

## 🧪 Running Tests

```bash
cd /Users/daniilka/Documents/dev/short_link_and_QR/backend
npm test
# Result: Test Suites: 1 passed, Tests: 4 passed
```

---

## 📊 Project Structure

```
/Users/daniilka/Documents/dev/short_link_and_QR/
├── backend/              # Node.js + Express API
│   ├── src/             # Source code
│   ├── __tests__/       # Jest tests
│   ├── package.json
│   ├── .env
│   └── npm start        # Run backend
│
├── frontend/            # React + Vite
│   ├── src/             # React components & pages
│   ├── package.json
│   └── npm run dev      # Run frontend
│
├── README.md            # Full project documentation
└── TEST_REPORT.md       # Testing report
```

---

## 🔧 Configuration

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shortlink_qr
DB_USER=postgres
DB_PASSWORD=password
SERVER_PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Database
- **Type**: PostgreSQL
- **Database**: shortlink_qr
- **Tables**: users, links, clicks, rate_limits
- **Status**: ✅ Auto-initialized on server start

---

## 🌟 Features Ready

✅ Create short links in seconds  
✅ Generate QR codes automatically  
✅ Track click statistics in real-time  
✅ Spam protection with rate limiting  
✅ Admin console for link management  
✅ Full REST API  
✅ Modern React UI  
✅ Responsive design  

---

## 📈 Testing Results

```
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Time:        0.544 seconds

✅ QR Code Generation - PASS
✅ URL Validation - PASS
✅ Statistics Tracking - PASS
✅ Redirect Functionality - PASS
```

---

## 🚦 Quick Test

### Create a link:
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://github.com"}'
```

### Get statistics:
```bash
curl http://localhost:3000/api/links/1/stats
```

### Generate QR code:
```bash
curl http://localhost:3000/api/links/1/qrcode
```

---

## 📝 Documentation

- **README.md** - Full project documentation with diagrams
- **TEST_REPORT.md** - Detailed testing report
- **API Examples** - In README.md

---

## 🔐 Security Features

- ✅ CORS enabled
- ✅ Helmet.js for HTTP headers
- ✅ Rate limiting (10 requests/15 seconds)
- ✅ Input validation
- ✅ Error handling
- ✅ SQL injection prevention (prepared statements)

---

## 💾 Database Backup

```bash
# Backup database
pg_dump shortlink_qr > backup.sql

# Restore database
psql shortlink_qr < backup.sql
```

---

## 🆘 Troubleshooting

### Backend not starting?
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

### PostgreSQL connection failed?
```bash
# Start PostgreSQL
brew services start postgresql@14

# Check status
brew services list
```

### Frontend not loading?
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📞 Support

All code is well-documented with comments. Check:
- Backend: `/backend/src/`
- Frontend: `/frontend/src/`

---

**Created**: March 15, 2026  
**Status**: Production Ready ✅  
**Version**: 1.0.0  
