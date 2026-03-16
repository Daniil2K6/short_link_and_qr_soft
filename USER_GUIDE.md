# 📖 User Guide - Short Link & QR Code Generator

## 🏠 Homepage (Everyone Can Access)

**URL:** http://localhost:5175/

```
┌─────────────────────────────────────────┐
│  Short Link & QR Code Generator         │
│  (Logo & Navigation)                    │
├─────────────────────────────────────────┤
│                                         │
│  Welcome! Create short links instantly  │
│                                         │
│  [LOGIN]  [REGISTER]                   │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Paste your long URL here...      │  │
│  │                                  │  │
│  │ [Generate Short Link]            │  │
│  └──────────────────────────────────┘  │
│                                         │
│  Features:                              │
│  • Fast & Easy                          │
│  • QR Code Generation                   │
│  • Click Tracking                       │
│  • Statistics & Analytics               │
│                                         │
└─────────────────────────────────────────┘
```

**Action:** LOGIN or REGISTER to create links

---

## 📝 Step 1: Registration

**URL:** http://localhost:5175/register

### Form Fields:
```
┌─────────────────────────────────┐
│ Create Your Account             │
├─────────────────────────────────┤
│                                 │
│ Email Address:                  │
│ [___________________________]    │
│                                 │
│ Username:                       │
│ [___________________________]    │
│                                 │
│ Password:                       │
│ [___________________________ ]   │
│ (min 8 chars, uppercase, digit) │
│                                 │
│ [ REGISTER ]                    │
│                                 │
│ Already have account?           │
│ [ LOGIN ]                       │
└─────────────────────────────────┘
```

### Requirements:
- Email: Valid email format
- Username: Can contain letters, numbers, underscores
- Password: Min 8 characters
  - At least 1 uppercase letter (A-Z)
  - At least 1 number (0-9)
  - At least 1 special character (@#$%^&*)

### Success:
✅ Account created  
✅ Logged in automatically  
✅ Redirected to Dashboard

---

## 🔐 Step 2: Login

**URL:** http://localhost:5175/login

### Form Fields:
```
┌─────────────────────────────────┐
│ Login to Your Account           │
├─────────────────────────────────┤
│                                 │
│ Email Address:                  │
│ [___________________________]    │
│                                 │
│ Password:                       │
│ [___________________________ ]   │
│                                 │
│ [ LOGIN ]                       │
│                                 │
│ Don't have account?             │
│ [ REGISTER ]                    │
└─────────────────────────────────┘
```

### Login As:
```
👤 REGULAR USER
   Email: testuser@test.com
   Password: Test@1234

👨‍💼 ADMIN USER
   Email: admin@short-link.com
   Password: Admin@1234
```

### Success:
✅ Logged in  
✅ See username in top-right corner  
✅ Access to Dashboard & Statistics

---

## 🔗 Step 3: Create Short Link (For Registered Users)

**URL:** http://localhost:5175/ (after login)

### How to Create:

1. **Enter Long URL**
   ```
   ┌──────────────────────────────────────────┐
   │ Paste your long URL here...              │
   │ https://github.com/Daniil2K6/some/very/ │
   │ long/path/that/needs/shortening          │
   └──────────────────────────────────────────┘
   ```

2. **Click Generate Button**
   ```
   [ ✓ Generate Short Link & QR Code ]
   ```

3. **Get Results**
   ```
   ┌───────────────────────────────────┐
   │ ✅ Success!                       │
   ├───────────────────────────────────┤
   │                                   │
   │ Short Link: xxUkXUH               │
   │ http://localhost:3000/xxUkXUH     │
   │                                   │
   │ [📋 Copy] [🔗 Open]               │
   │                                   │
   │ QR Code:                          │
   │ ┌─────────────────────┐           │
   │ │ ██ ██ ██ ██ ██     │           │
   │ │    QR CODE IMAGE    │           │
   │ │ ██ ██ ██ ██ ██     │           │
   │ └─────────────────────┘           │
   │                                   │
   └───────────────────────────────────┘
   ```

### Important Notes:
- Only **logged-in users** can create links
- Your links are associated with your account
- You can only see/manage your own links
- Admin can see all links

---

## 📊 Step 4: View Dashboard

**URL:** http://localhost:5175/dashboard

### Dashboard Features:
```
┌─────────────────────────────────┐
│ My Links                        │
├─────────────────────────────────┤
│                                 │
│ You have 3 links                │
│                                 │
│ ┌─ Link #1 ────────────────┐   │
│ │ xxUkXUH                   │   │
│ │ → github.com/Daniil2K6    │   │
│ │ Clicks: 5 | Status: Active│   │
│ │ Created: Mar 16, 2:20 PM  │   │
│ │ [View Stats] [Edit] [Del] │   │
│ └───────────────────────────┘   │
│                                 │
│ ┌─ Link #2 ────────────────┐   │
│ │ yqPCt05                   │   │
│ │ → localhost:5173          │   │
│ │ Clicks: 12 | Status: Active
│ │ Created: Mar 15, 10:17 PM │   │
│ │ [View Stats] [Edit] [Del] │   │
│ └───────────────────────────┘   │
│                                 │
│ [+ Create New Link]             │
│                                 │
└─────────────────────────────────┘
```

### Actions:
- **View Stats:** See click details, QR code, source
- **Edit:** Change original URL (coming soon)
- **Delete:** Remove link permanently
- **Create New:** Go back to home to create

---

## 📈 Step 5: View Statistics

**URL:** http://localhost:5175/statistics

### Statistics Page:
```
┌──────────────────────────────────┐
│ Link Statistics                  │
├──────────────────────────────────┤
│                                  │
│ Search for a link:               │
│ [Enter Link ID or Short Code__]  │
│ [ Get Statistics ]               │
│                                  │
├──────────────────────────────────┤
│ Results:                         │
│                                  │
│ ┌─ Short Code ───┐   ┌─ Clicks ──┐
│ │ xxUkXUH       │   │ 5         │
│ └───────────────┘   └───────────┘
│                                  │
│ ┌─ Status ──────┐  ┌─ Via QR ──┐
│ │ active       │  │ 2         │
│ └───────────────┘  └───────────┘
│                                  │
│ ┌─ QR Code ──────────────────┐  │
│ │ ┌─────────────────────┐    │  │
│ │ │ [QR CODE IMAGE]     │    │  │
│ │ └─────────────────────┘    │  │
│ │ Link: /xxUkXUH?source=qr   │  │
│ └────────────────────────────┘  │
│                                  │
│ ┌─ Clicks by Date ───────────┐  │
│ │ 2026-03-16: 3 clicks       │  │
│ │ 2026-03-15: 2 clicks       │  │
│ └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

### What You Can See:
- Total clicks on link
- Direct clicks vs QR code clicks
- Clicks by date
- QR code to share
- Original long URL

---

## 👨‍💼 Step 6: Admin Panel (Admin Users Only)

**URL:** http://localhost:5175/admin  
⚠️ **Access Level:** Admin users only

### Admin Dashboard:
```
┌────────────────────────────────────┐
│ Admin Control Panel                │
├────────────────────────────────────┤
│                                    │
│ [Users] [Links] [User Details]    │
│                                    │
├────────────────────────────────────┤
│ Users Tab:                         │
│                                    │
│ Total Users: 5                     │
│                                    │
│ ID │ Email              │ Role    │ │
│ ───┼────────────────────┼─────────│ │
│ 1  │ admin@short...     │ admin   │ │
│ 2  │ testuser@test.com  │ user    │ │
│ 3  │ john@example.com   │ user    │ │
│                                    │
│ [View] [Delete] [Change Role v]    │
│                                    │
└────────────────────────────────────┘
```

### Admin Features:

#### Tab 1: Users
```
Actions Available:
┌─────────────────────────────────┐
│ User Management                 │
├─────────────────────────────────┤
│                                 │
│ View User:                      │
│ - See all user info             │
│ - Email, username, role, date   │
│ - Show all their links          │
│                                 │
│ Delete User:                    │
│ - Remove user account            │
│ - ⚠️ CASCADE: Deletes their    │
│   links and clicks too          │
│                                 │
│ Change Role:                    │
│ - Promote user to admin         │
│ - Demote admin to user          │
│                                 │
│ Refresh List:                   │
│ - View latest changes           │
│                                 │
└─────────────────────────────────┘
```

#### Tab 2: Links
```
Actions Available:
┌─────────────────────────────────┐
│ Link Management                 │
├─────────────────────────────────┤
│                                 │
│ View All Links:                 │
│ - See all system links          │
│ - Show creator user_id          │
│ - Display current status        │
│                                 │
│ Change Status:                  │
│ - active: Link works           │
│ - inactive: Link disabled      │
│ - blocked: Link unavailable    │
│                                 │
│ Delete Link:                    │
│ - Permanently remove link       │
│ - Deletes associated clicks    │
│                                 │
│ Filter by User:                │
│ - See only a user's links      │
│                                 │
└─────────────────────────────────┘
```

#### Tab 3: User Details
```
View Specific User Details:
┌─────────────────────────────────┐
│ User Profile                    │
├─────────────────────────────────┤
│                                 │
│ ID: 2                           │
│ Email: testuser@test.com        │
│ Username: testuser              │
│ Role: user                      │
│ Member Since: Mar 16, 1:20 PM   │
│                                 │
│ Links Created by This User:     │
│                                 │
│ Link ID │ Short Code │ Status   │
│ ────────┼───────────┼──────────│
│ 16      │ xxUkXUH   │ active   │
│ 11      │ zBIkX71   │ active   │
│                                 │
│ [Delete User] [Change Role v]   │
│                                 │
└─────────────────────────────────┘
```

---

## 🚪 Logout

**From Any Authenticated Page:**

```
Top Right Corner:
┌────────────────────┐
│ testuser ▼         │
├────────────────────┤
│ Profile Settings   │
│ Account            │
│ ────────────────   │
│ Logout             │  ← Click here
└────────────────────┘
```

After logout:
- ✅ Token deleted from localStorage
- ✅ Redirected to login page
- ✅ Cannot access protected pages

---

## 🔒 Access Control Rules

### Public Pages (No Login Needed)
- ✅ Home page (/)
- ✅ Register page (/register)
- ✅ Login page (/login)

### Authenticated Pages (Login Required)
- ✅ Dashboard (/dashboard)
- ✅ Statistics (/statistics)
- ❌ Admin panel (redirects to login)

### Admin-Only Pages
- ✅ Admin Panel (/admin)
- ❌ Regular users get error: "Access Denied"

---

## ⚠️ Important Notes

### For Users 👤
- Your password is hashed with bcryptjs (never stored plaintext)
- JWT token stored in browser (7-day expiration)
- Only you can see your links on Dashboard
- Share short links with anyone (clickable)

### For Admins 👨‍💼
- Have access to ALL user accounts and links
- Can delete users (cascades to their data)
- Can change any link status or delete
- Can promote/demote user roles
- Can monitor all activity

### Security Best Practices
- ✅ Change your password periodically
- ✅ Don't share login credentials
- ✅ Use strong passwords (8+ chars)
- ✅ Log out when using shared computers
- ✅ Report suspicious admin activity

---

## 🐛 Troubleshooting

### Can't Create Links
- **Check:** Are you logged in? (username in top-right)
- **Fix:** Click "Login" if not logged in

### Can't See Links on Dashboard
- **Check:** Do you own the links? (created by you)
- **Check:** Are they active? (not deleted)
- **Fix:** Create a new link on Home page

### Statistics Page Not Working
- **Check:** Did you enter valid Link ID or short code?
- **Check:** Does the link still exist?
- **Fix:** Try link ID 1-15 from Dashboard

### Admin Panel Access Denied
- **Check:** Is your account an admin? (User role: admin)
- **Check:** Try logging out and back in
- **Fix:** Only admin@short-link.com has admin access by default

### Forgot Password
- Current version: No password reset (coming soon)
- **Option:** Admin can delete your account, re-register

---

## 🎯 Quick Cheat Sheet

| Action | URL | Access |
|--------|-----|--------|
| Home | http://localhost:5175/ | Everyone |
| Register | http://localhost:5175/register | Everyone |
| Login | http://localhost:5175/login | Everyone |
| Dashboard | http://localhost:5175/dashboard | Logged-in users |
| Statistics | http://localhost:5175/statistics | Logged-in users |
| Admin | http://localhost:5175/admin | Admin only |

---

## 📞 Support

**Issues? Check:**
1. Frontend errors → Browser Developer Tools (F12)
2. API errors → Check backend console
3. Database errors → Check PostgreSQL logs
4. All else → Restart both services

**Restart Services:**
```bash
# Kill and restart backend
lsof -ti:3000 | xargs kill -9

# In backend folder
npm start

# In another terminal, frontend folder  
npm run dev
```

---

*Last Updated: March 16, 2026*  
*Documentation Version: 2.0*
