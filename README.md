# 🔗 URL Shortener & QR Code Generator
**[Русский](#русский) | [English](#english)**

---

# Русский

## 📖 Веб-сервис для создания коротких ссылок и генерации QR-кодов

Полнофункциональное веб-приложение для сокращения длинных URL-адресов и генерации QR-кодов. Система отслеживает посещения, различает переходы по QR-кодам и прямым ссылкам, с подробной статистикой использования.

### 🚀 Быстрый старт

**Требования:** Node.js, npm, PostgreSQL

```bash
# Установить зависимости
cd backend && npm install && cd ../frontend && npm install

# Запустить backend (терминал 1)
cd backend && npm start

# Запустить frontend (терминал 2)
cd frontend && npm run dev

# Запустить админ-консоль (терминал 3)
cd backend && npm run admin
```

- **Сайт:** http://localhost:5173
- **API:** http://localhost:3000

### ✨ Основные возможности

**Для пользователей:**
- ✅ Создавать короткие ссылки без регистрации
- ✅ Генерировать QR-коды для каждой ссылки
- ✅ Просматривать все созданные ссылки (Dashboard)
- ✅ Получать подробную статистику переходов
- ✅ Различение переходов по QR-коду и прямым ссылкам

**Для администраторов:**
- ✅ Управлять всеми ссылками в системе
- ✅ Блокировать вредоносные ссылки
- ✅ Просматривать статистику по всем ссылкам
- ✅ Консольная администраторская панель

### 🏗️ Архитектура

**Три основных компонента:**

1. **Backend (Node.js + Express)**
   - REST API для управления ссылками
   - PostgreSQL база данных
   - Защита от спама
   - QR-код генерация

2. **Frontend (React + Vite)**
   - Главная страница для создания ссылок
   - Dashboard - список всех ссылок
   - Statistics - подробная статистика

3. **Admin Console (Node.js CLI)**
   - Просмотр всех ссылок
   - Поиск по ссылкам
   - Блокировка/удаление ссылок
   - Просмотр статистики

### 📝 API Endpoints

- `POST /api/links` - Создать короткую ссылку (гости welcome!)
- `GET /api/links` - Получить все ссылки
- `GET /api/links/:id/stats` - Получить статистику ссылки
- `GET /api/links/:id/qrcode` - Получить QR-код
- `GET /:shortCode` - Редирект на оригинальный URL

### 💻 Stack технологии

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React, Vite, Axios, CSS
- **Database:** PostgreSQL с отношениями
- **Auth:** JWT tokens (опциональная регистрация)
- **QR:** Библиотека для генерации QR-кодов

---

# English

## 📖 URL Shortener & QR Code Generator Web Service

A full-featured web application for shortening long URLs and generating QR codes. The system tracks visits, distinguishes between QR code and direct link clicks, with detailed usage analytics.

### 🚀 Quick Start

**Requirements:** Node.js, npm, PostgreSQL

```bash
# Install dependencies
cd backend && npm install && cd ../frontend && npm install

# Start backend (terminal 1)
cd backend && npm start

# Start frontend (terminal 2)
cd frontend && npm run dev

# Start admin console (terminal 3)
cd backend && npm run admin
```

- **Website:** http://localhost:5173
- **API:** http://localhost:3000

### ✨ Key Features

**For Users:**
- ✅ Create short links without registration
- ✅ Generate QR codes for each link
- ✅ View all created links (Dashboard)
- ✅ Get detailed click analytics
- ✅ Distinguish between QR code and direct link clicks

**For Administrators:**
- ✅ Manage all links in the system
- ✅ Block malicious links
- ✅ View analytics for all links
- ✅ Console-based admin panel

### 🏗️ Architecture

**Three Main Components:**

1. **Backend (Node.js + Express)**
   - REST API for link management
   - PostgreSQL database
   - Spam protection
   - QR code generation

2. **Frontend (React + Vite)**
   - Home page for creating links
   - Dashboard - list of all links
   - Statistics - detailed analytics

3. **Admin Console (Node.js CLI)**
   - View all links
   - Search links
   - Block/delete links
   - View analytics

### 📝 API Endpoints

- `POST /api/links` - Create short link (guests welcome!)
- `GET /api/links` - Get all links
- `GET /api/links/:id/stats` - Get link statistics
- `GET /api/links/:id/qrcode` - Get QR code
- `GET /:shortCode` - Redirect to original URL

### 💻 Technology Stack

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React, Vite, Axios, CSS
- **Database:** PostgreSQL with relations
- **Auth:** JWT tokens (optional registration)
- **QR:** Library for QR code generation

---

**[Back to top](#-url-shortener--qr-code-generator)**
