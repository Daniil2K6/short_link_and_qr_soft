# Database Schema Documentation

## Overview
PostgreSQL database `shortlink_qr` with 4 main tables for managing short links, users, click tracking, and rate limiting.

---

## Table Structures

### 1. USERS Table
Stores user account information with role-based access control.

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | - | Unique user identifier |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | - | User email address |
| `password_hash` | VARCHAR(255) | NOT NULL | - | Bcrypt hashed password |
| `username` | VARCHAR(100) | NOT NULL, UNIQUE | - | User login name |
| `role` | VARCHAR(20) | - | `'user'` | Access level: `'user'` or `'admin'` |
| `created_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | Account creation time |
| `updated_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | Last update time |

**Indexes:** `users_pkey`, `users_email_key`, `users_username_key`  
**Foreign Keys Referenced:** `links.user_id`

---

### 2. LINKS Table
Stores shortened link information with user association.

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | - | Unique link identifier |
| `short_code` | VARCHAR(50) | NOT NULL, UNIQUE | - | Generated 7-char short code |
| `original_url` | TEXT | NOT NULL | - | Full URL being shortened |
| `user_id` | INTEGER | FOREIGN KEY (users.id) | NULL | Link creator (null = guest) |
| `click_count` | INTEGER | - | `0` | Total number of clicks |
| `status` | VARCHAR(20) | - | `'active'` | Link status: `active`, `inactive`, `blocked` |
| `ip_address` | VARCHAR(45) | - | NULL | IPv4/IPv6 of link creator |
| `created_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | Link creation time |
| `updated_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | Last modification time |

**Indexes:** `links_pkey`, `idx_links_short_code`, `idx_links_user_id`, `links_short_code_key`  
**Foreign Keys:** `links_user_id_fkey` → `users(id)`  
**Referenced By:** `clicks.link_id` (ON DELETE CASCADE)

---

### 3. CLICKS Table
Tracks individual click events on shortened links.

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | - | Unique click identifier |
| `link_id` | INTEGER | FOREIGN KEY (links.id) | NULL | Link that was clicked |
| `ip_address` | VARCHAR(45) | - | NULL | Visitor's IP address |
| `user_agent` | TEXT | - | NULL | Browser/device user agent string |
| `referer` | VARCHAR(255) | - | NULL | HTTP Referer header |
| `source` | VARCHAR(50) | - | `'direct'` | Click source: `'direct'` or `'qr'` |
| `created_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | Click timestamp |

**Indexes:** `clicks_pkey`, `idx_clicks_link_id`  
**Foreign Keys:** `clicks_link_id_fkey` → `links(id)` (ON DELETE CASCADE)

---

### 4. RATE_LIMITS Table
Implements per-IP rate limiting to prevent abuse.

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | - | Unique rate limit record |
| `ip_address` | VARCHAR(45) | NOT NULL, UNIQUE | - | Client IP address |
| `request_count` | INTEGER | - | `1` | Requests in current window |
| `first_request_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | First request timestamp |
| `last_request_at` | TIMESTAMP | - | CURRENT_TIMESTAMP | Most recent request |

**Indexes:** `rate_limits_pkey`, `idx_rate_limits_ip`, `rate_limits_ip_address_key`

---

## Relationships

```
USERS (1) ──── (N) LINKS
  - One user creates many links
  - user_id can be NULL (guest-created links)

LINKS (1) ──── (N) CLICKS
  - One link receives many clicks
  - CASCADE delete: deleting link removes all its clicks
```

---

## Example Queries

### Get all links created by a user
```sql
SELECT l.id, l.short_code, l.original_url, l.click_count, l.status
FROM links l
WHERE l.user_id = 1
ORDER BY l.created_at DESC;
```

### Get click statistics for a link
```sql
SELECT 
  l.short_code,
  l.click_count,
  COUNT(c.id) as total_clicks,
  COUNT(DISTINCT c.ip_address) as unique_visitors,
  c.source,
  COUNT(c.id) as count
FROM links l
LEFT JOIN clicks c ON c.link_id = l.id
WHERE l.id = 7
GROUP BY l.short_code, l.click_count, c.source;
```

### Get clicks by date
```sql
SELECT 
  DATE(c.created_at) as click_date,
  COUNT(c.id) as total_clicks,
  COUNT(DISTINCT c.ip_address) as unique_visitors
FROM clicks c
WHERE c.link_id = 7
GROUP BY DATE(c.created_at)
ORDER BY click_date DESC;
```

### Update user role to admin
```sql
UPDATE users SET role = 'admin' WHERE id = 1;
```

### Block/Unblock a link
```sql
UPDATE links SET status = 'blocked' WHERE id = 5;
UPDATE links SET status = 'active' WHERE id = 5;
```

### Delete user and cascade delete their links
```sql
DELETE FROM users WHERE id = 1;  -- Automatically deletes their links and clicks
```

---

## Notes

- **Cascade Delete:** Deleting a link automatically removes all associated clicks
- **User-Link Association:** Links created by authenticated users have `user_id` set
- **Guest Links:** Links can have NULL `user_id` (created by anonymous users)
- **Role System:** Only users with `role = 'admin'` can access `/admin` panel
- **Timestamps:** All tables use CURRENT_TIMESTAMP for automatic timestamps
- **Unique Constraints:** Ensures email, username, and short_code uniqueness
- **Indexing:** Commonly searched fields (user_id, link_id, ip_address) are indexed

---

## Database Connection Info

- **Host:** localhost
- **Port:** 5432
- **Database Name:** shortlink_qr
- **User:** postgres
- **Password:** password
- **Driver:** PostgreSQL (pg)

---

*Last Updated: March 16, 2026*
