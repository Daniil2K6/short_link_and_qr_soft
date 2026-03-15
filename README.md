# Short Link & QR Code Generator

## Введение

Данный проект реализует веб-сервис для создания коротких ссылок и генерации QR-кодов, аналогично сервису Bitly. Система предоставляет полнофункциональный API, позволяющий сокращать длинные URL-адреса, отслеживать статистику кликов и генерировать QR-коды для удобного распространения ссылок.

## Актуальность

В эпоху цифровых коммуникаций длинные URL-адреса затрудняют обмен ссылками в социальных сетях, мессенджерах и других платформах. Сервис сокращения ссылок решает эту проблему, предоставляя:

- **Компактные URLs**: Короткие коды вместо длинных адресов
- **Аналитику**: Отслеживание количества переходов по ссылкам
- **QR-коды**: Удобное распространение ссылок через мобильные устройства
- **Безопасность**: Защита от спама через системы ограничения запросов

## Цель и задачи

### Цель
Создать полнофункциональный API-first сервис для сокращения ссылок и генерации QR-кодов с веб-интерфейсом и администраторской консолью.

### Задачи
1. Разработать REST API для создания и управления короткими ссылками
2. Реализовать функцию редиректа с отслеживанием статистики кликов
3. Добавить генерацию QR-кодов для каждой короткой ссылки
4. Реализовать систему защиты от спама
5. Создать веб-интерфейс для взаимодействия с API
6. Разработать администраторскую консоль для управления ссылками
7. Протестировать функциональность системы

## Архитектура системы

```
┌─────────────────────────────────────────────────────────┐
│                  Client Applications                     │
│  (Website, Mobile Apps, Browser Extensions, 3rd Party) │
└─────────────────────────────────────────────────────────┘
                           │
                           │ REST API
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Express.js Backend                     │
├─────────────────┬─────────────────┬─────────────────┤
│   Controllers   │     Routes      │    Middleware   │
├─────────────────┴─────────────────┴─────────────────┤
│              Business Logic Layer                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ LinkSvc  │ │QRCodeSvc │ │ SpamSvc  │             │
│  └──────────┘ └──────────┘ └──────────┘             │
├─────────────────────────────────────────────────────────┤
│                   Database Layer                        │
│              (PostgreSQL)                               │
│  ┌─────────┬─────────┬──────────┬──────────┐           │
│  │ Users   │ Links   │ Clicks   │ RateLimit│           │
│  └─────────┴─────────┴──────────┴──────────┘           │
└─────────────────────────────────────────────────────────┘
```

## Описание API

### Основные эндпоинты

#### Создание короткой ссылки
```http
POST /api/links
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url"
}

Response:
{
  "id": 1,
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url",
  "shortUrl": "http://localhost:3000/abc123",
  "createdAt": "2026-03-15T14:39:32.211Z"
}
```

#### Получение всех ссылок
```http
GET /api/links?limit=20&offset=0
```

#### Редирект по короткой ссылке
```http
GET /:shortCode
Response: 301 Redirect to original URL
```

#### Получение статистики ссылки
```http
GET /api/links/{id}/stats

Response:
{
  "id": 1,
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url",
  "clickCount": 42,
  "status": "active",
  "createdAt": "2026-03-15T14:39:32.211Z",
  "clicksByDate": [
    {
      "click_date": "2026-03-15",
      "total_clicks": "10",
      "unique_visitors": "8"
    }
  ]
}
```

#### Получение QR-кода
```http
GET /api/links/{id}/qrcode
Response: { "qrCode": "data:image/png;base64,..." }

GET /api/links/{id}/qrcode/image
Response: PNG image
```

### Администраторские эндпоинты

```http
GET /api/admin/links              # Все ссылки
GET /api/admin/links/search?q=...  # Поиск ссылок
GET /api/admin/links/{id}/stats    # Статистика
PATCH /api/admin/links/{id}        # Изменение статуса
DELETE /api/admin/links/{id}       # Удаление ссылки
```

## Структура проекта

```
short_link_and_QR/
├── backend/
│   ├── src/
│   │   ├── index.js              # Главный файл приложения
│   │   ├── admin/
│   │   │   └── adminConsole.js   # Администраторская консоль
│   │   ├── controllers/
│   │   │   ├── LinkController.js
│   │   │   └── AdminController.js
│   │   ├── routes/
│   │   │   ├── apiRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── redirectRoutes.js
│   │   ├── services/
│   │   │   ├── QRCodeService.js
│   │   │   ├── ShortCodeService.js
│   │   │   └── SpamProtectionService.js
│   │   ├── models/
│   │   │   ├── Link.js
│   │   │   ├── User.js
│   │   │   └── Click.js
│   │   ├── database/
│   │   │   └── db.js
│   │   └── middleware/
│   │       ├── rateLimitMiddleware.js
│   │       └── errorHandler.js
│   ├── __tests__/
│   │   ├── QRCodeService.test.js
│   │   └── ShortCodeService.test.js
│   ├── package.json
│   ├── .env
│   └── jest.config.js
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── LinkGenerator.jsx
│   │   │   ├── LinkGenerator.css
│   │   │   ├── LinkResult.jsx
│   │   │   └── LinkResult.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Statistics.jsx
│   │   │   └── Statistics.css
│   │   └── services/
│   │       └── api.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## UseCase диаграмма

```
    ┌─────────────────────────────────────────┐
    │          System: Short Link Service      │
    └─────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    ┌─────────┐   ┌──────────┐   ┌──────────┐
    │Пользую  │   │Админист- │   │  Система │
    │  чатель │   │  ратор   │   │  спама   │
    └┬────────┘   └────┬─────┘   └──────────┘
     │                 │
     │ Создать         │ Управлять
     │ ссылку          │ ссылками
     ├─────────────────┤
     │                 │
     ├─Create Link──────┤
     │                 │
     ├─View Link────────┤         ┌──────────┐
     │                 │────────→ │ Check     │
     ├─Copy to Clipboard          │ Rate Limit│
     │                 │          └──────────┘
     ├─Generate QR────────┐
     │                    │
     │              ┌─────▼─────┐
     │              │QR Service  │
     │              └────────────┘
     │
     ├─Get QR Code
     │
     └─Track Clicks
                    ┌────────────┐
                    │ Statistics  │
                    │  Service    │
                    └────────────┘
```

## User Story Map структура

```
┌─────────────────────────────────────────────────────────┐
│             User: Regular User (Logged In)              │
├─────────────────────────────────────────────────────────┤
│  1. Create Short Link                                   │
│     ├─ Enter long URL                                   │
│     ├─ Generate short link                              │
│     ├─ View generated short code                        │
│     ├─ Copy to clipboard                                │
│     └─ Generate QR code                                 │
│                                                         │
│  2. Manage Created Links                                │
│     ├─ View all my links                                │
│     ├─ Filter links by date                             │
│     ├─ Delete link                                      │
│     └─ Block link                                       │
│                                                         │
│  3. Track Analytics                                     │
│     ├─ View click statistics                            │
│     ├─ See clicks by date                               │
│     ├─ View unique visitors                             │
│     └─ Export statistics                                │
│                                                         │
│  4. Share Links                                         │
│     ├─ Copy short link                                  │
│     ├─ Download QR code                                 │
│     └─ Share on social media                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                User: Administrator                      │
├─────────────────────────────────────────────────────────┤
│  1. Monitor All Links                                   │
│     ├─ View all system links                            │
│     ├─ Search links by URL or code                      │
│     ├─ Filter by status (active/blocked)                │
│     └─ Sort by date, clicks                             │
│                                                         │
│  2. Manage Suspicious Content                           │
│     ├─ View problematic links                           │
│     ├─ Block malicious links                            │
│     ├─ Delete inappropriate links                       │
│     └─ View reason for blocking                         │
│                                                         │
│  3. System Analytics                                    │
│     ├─ View total statistics                            │
│     ├─ Monitor spam attempts                            │
│     ├─ Check rate limit violations                      │
│     └─ Generate system reports                          │
│                                                         │
│  4. Maintenance                                         │
│     ├─ Backup data                                      │
│     ├─ Clean old records                                │
│     └─ Update system settings                           │
└─────────────────────────────────────────────────────────┘
```

## ER диаграмма (Entity-Relationship)

```
┌──────────────────┐
│     Users        │
├──────────────────┤
│ id (PK)          │
│ email            │
│ password_hash    │
│ username         │
│ created_at       │
│ updated_at       │
└────────┬─────────┘
         │
         │ 1:N
         │
         ▼
┌──────────────────────┐         ┌──────────────────┐
│      Links           │         │     Clicks       │
├──────────────────────┤         ├──────────────────┤
│ id (PK)              │ 1:N     │ id (PK)          │
│ short_code (UNIQUE)  │────────→│ link_id (FK)     │
│ original_url         │◀────────│ ip_address       │
│ user_id (FK)         │         │ user_agent       │
│ created_at           │         │ referer          │
│ updated_at           │         │ created_at       │
│ click_count          │         └──────────────────┘
│ status               │
│ ip_address           │
└──────────────────────┘

┌──────────────────────┐
│   Rate Limits        │
├──────────────────────┤
│ id (PK)              │
│ ip_address (UNIQUE)  │
│ request_count        │
│ first_request_at     │
│ last_request_at      │
└──────────────────────┘
```

## Макеты интерфейса

### Главная страница (Home)
```
╔════════════════════════════════════════════╗
║    Short Link & QR Code Generator          ║
║  Home | Dashboard | Statistics             ║
╠════════════════════════════════════════════╣
║                                            ║
║      Short Link & QR Code Generator       ║
║    Shorten your URLs and generate QR      ║
║         codes instantly                    ║
║                                            ║
║  ┌──────────────────────────────────────┐  ║
║  │ Enter your long URL here...          │  ║
║  └──────────────────────────────────────┘  ║
║  ┌─────────────────────────────────────┐   ║
║  │ Generate Short Link                  │   ║
║  └─────────────────────────────────────┘   ║
║                                            ║
║  ┌──────────────────────────────────────┐  ║
║  │ Link Created Successfully!            │  ║
║  │                                       │  ║
║  │ Original URL:                         │  ║
║  │ https://example.com/very/long/...    │  ║
║  │ [Copy]                                │  ║
║  │                                       │  ║
║  │ Short Link:                           │  ║
║  │ http://localhost:3000/abc123 [Copy]  │  ║
║  │                                       │  ║
║  │ QR Code:                              │  ║
║  │ [QR Code Image 200x200]  [Download]   │  ║
║  └──────────────────────────────────────┘  ║
║                                            ║
╚════════════════════════════════════════════╝
```

### Страница Dashboard
```
╔════════════════════════════════════════════╗
║    Short Link & QR Code Generator          ║
║  Home | Dashboard | Statistics             ║
╠════════════════════════════════════════════╣
║                                            ║
║  Dashboard                                 ║
║                                            ║
║  ┌────────────────────────────────────┐   ║
║  │ Short Code | URL | Clicks | Status │   ║
║  ├────────────────────────────────────┤   ║
║  │ abc123 | github.com | 42 | active  │   ║
║  │ xyz789 | google.com | 15 | active  │   ║
║  │ def456 | amazon.com |  8 | blocked │   ║
║  │ ghi012 | example... | 23 | active  │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  ┌──────────────────────────────────────┐  ║
║  │ Page 1 of 5   < 1 2 3 4 5 >          │  ║
║  └──────────────────────────────────────┘  ║
║                                            ║
╚════════════════════════════════════════════╝
```

### Страница Statistics
```
╔════════════════════════════════════════════╗
║    Short Link & QR Code Generator          ║
║  Home | Dashboard | Statistics             ║
╠════════════════════════════════════════════╣
║                                            ║
║  Statistics for Link [____   ] [Get Stats]  ║
║                                            ║
║  ┌──────────────┬──────────────┐            ║
║  │ Short Code   │ abc123       │            ║
║  ├──────────────┼──────────────┤            ║
║  │ Total Clicks │ 42           │            ║
║  ├──────────────┼──────────────┤            ║
║  │ Status       │ active       │            ║
║  └──────────────┴──────────────┘            ║
║                                            ║
║  Original URL:                             ║
║  https://github.com                        ║
║                                            ║
║  Clicks by Date:                           ║
║  2026-03-15: 10 clicks (8 unique)          ║
║  2026-03-14:  8 clicks (6 unique)          ║
║  2026-03-13: 24 clicks (15 unique)         ║
║                                            ║
╚════════════════════════════════════════════╝
```

## Технологии

### Backend
- **Node.js** - runtime environment
- **Express.js** - веб-фреймворк
- **PostgreSQL** - база данных
- **nanoid** - генерация коротких id
- **qrcode** - генерация QR-кодов
- **dotenv** - управление переменными окружения

### Frontend
- **React** - UI библиотека
- **Vite** - инструмент сборки
- **React Router** - маршрутизация
- **Axios** - HTTP клиент

### Testing
- **Jest** - фреймворк для тестирования

## Возможности

### Реализованные функции
- ✅ Создание коротких ссылок
- ✅ Редирект по короткой ссылке
- ✅ Автоматическое отслеживание кликов
- ✅ Генерация QR-кодов
- ✅ Статистика по ссылкам
- ✅ Защита от спама (rate limiting)
- ✅ Администраторская консоль
- ✅ REST API для всех операций
- ✅ Веб-интерфейс с React
- ✅ Модульная архитектура

### Защита от спама
- Ограничение количества запросов с одного IP
- Временное окно для контроля частоты запросов
- Автоматическая очистка истекших лимитов

## Запуск проекта

### Требования
- Node.js 14+
- PostgreSQL 12+
- npm или yarn

### Установка

1. **Клонирование репозитория**
```bash
cd short_link_and_QR
```

2. **Установка зависимостей backend**
```bash
cd backend
npm install
```

3. **Установка зависимостей frontend**
```bash
cd ../frontend
npm install
```

4. **Настройка базы данных**
Убедитесь, что PostgreSQL запущен и создана база данных `shortlink_qr`.

5. **Конфигурация .env**
```bash
cd backend
cp .env.example .env
# Отредактируйте .env под вашу систему
```

### Запуск

**Backend:**
```bash
cd backend
npm start
# Сервер будет доступен на http://localhost:3000
```

**Frontend:**
```bash
cd frontend
npm run dev
# Приложение будет доступен на http://localhost:5173
```

**Администраторская консоль:**
```bash
cd backend
npm run admin
```

## Тестирование

```bash
cd backend
npm test
```

## Результаты тестирования

```
Test Suites: 1 passed, 1 total
Tests: 4 passed, 4 total
- QRCodeService.generateQRCode ✓
- QRCodeService.generateQRCodeBuffer ✓
- ShortCodeService.isValidUrl (3 тестов) ✓
```

## API Примеры

### Создание ссылки
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://github.com"}'
```

### Получение всех ссылок
```bash
curl http://localhost:3000/api/links
```

### Получение QR-кода
```bash
curl http://localhost:3000/api/links/1/qrcode
```

### Получение статистики
```bash
curl http://localhost:3000/api/links/1/stats
```

## Перезапуск серверов

```bash
# Backend
cd backend && npm start

# Frontend (в отдельном терминале)
cd frontend && npm run dev

# Admin console (в отдельном терминале)
cd backend && npm run admin
```

## Автор

Проект разработан как учебное решение для демонстрации создания fullstack веб-приложения.

## Лицензия

MIT
