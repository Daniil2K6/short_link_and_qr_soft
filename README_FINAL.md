# ✅ СИСТЕМА ГОТОВА К ИСПОЛЬЗОВАНИЮ

## 🚀 Как Начать (Пошагово)

### Шаг 1: Откройте Фронтенд
```
http://localhost:5175
```

### Шаг 2: Зарегистрируйтесь или Войдите

**Вариант 1: Зарегистрироваться (новый аккаунт)**
```
Нажмите: Register
Заполните:
  Username: YOUR_USERNAME (любой)
  Password: YOUR_PASSWORD (от 3 символов)
Нажмите: Register
```

**Вариант 2: Войти (существующие аккаунты)**
```
Нажмите: Login
Заполните:
  Username: demo
  Password: 123
Нажмите: Login
```

### Шаг 3: Используйте Сервис

После логина вы попадёте на **Dashboard**

**Функции:**
- 🔗 **Home** - Создавайте короткие ссылки
- 📊 **Dashboard** - Ваши ссылки
- 📈 **Statistics** - Статистика по кликам
- 👨‍💼 **Admin Panel** (только админ) - Управление системой

---

## 👥 Учётные Данные

### АДМИНИСТРАТОР
```
Username: admin
Password: Admin@1234
```

### ТЕСТОВЫЕ ПОЛЬЗОВАТЕЛИ (можете использовать сразу)
```
demo / 123
alice / pass123
bob / mypass
testuser / Test@1234
test / test
testapi / pass
```

**Или создайте свой:**
```
Username: любой (от 1 символа)
Password: любой (от 3 символов)
```

---

## 🌐 Все Ссылки

| Назначение | URL | 🔐 Требует логина? |
|-----------|-----|------------------|
| Главная | http://localhost:5175 | ❌ Нет |
| Регистрация | http://localhost:5175/register | ❌ Нет |
| Логин | http://localhost:5175/login | ❌ Нет |
| Dashboard | http://localhost:5175/dashboard | ✅ Да |
| Статистика | http://localhost:5175/statistics | ✅ Да |
| Админ-панель | http://localhost:5175/admin | ✅ Да (админ только) |

---

## ⚙️ Что Изменили (Последние Обновления)

### 1️⃣ Логин: Email → Username ✅
- **Было:** Login требовал email
- **Стало:** Login требует username (как и регистрация)
- **Пример:** username: `demo` password: `123`

### 2️⃣ Регистрация: Упрощена ✅
- ✅ Email опционален (автогенерируется)
- ✅ Пароль 3+ символа (было 6+)
- ✅ Без сложности паролей
- ✅ Без подтверждения пароля

---

## 🧪 Тестирование

### Создать Ссылку
```
1. Login / Register
2. На главной введите URL: https://github.com
3. Нажмите Generate
4. Получите короткую ссылку + QR код ✅
```

### Посмотреть Статистику
```
1. Dashboard - видите свои ссылки
2. Statistics - введите ID или short code
3. Видите клики, QR код, даты ✅
```

### Админ-панель (админ только)
```
1. Login как admin / Admin@1234
2. Откройте http://localhost:5175/admin
3. 3 вкладки:
   - Users: управление пользователями
   - Links: управление ссылками
   - User Details: информация о пользователе
```

---

## 📊 API Примеры

### Регистрация
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "myuser",
    "password": "mypass"
  }'
```

### Логин (Username!)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "demo",
    "password": "123"
  }'
```

### Создать ссылку (требует токен)
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "originalUrl": "https://www.github.com"
  }'
```

---

## 🛠️ Технический Стек

**Frontend:**
- React 18
- Vite
- React Router

**Backend:**
- Node.js / Express
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- PostgreSQL

**Authentication:**
- JWT токены (7 дней)
- Bcryptjs (cost 10)
- Role-based access (admin/user)

---

## 🔒 Безопасность

✅ Пароли хешированы bcryptjs  
✅ JWT токены с 7-дневным сроком  
✅ Protected routes (требуют аутентификацию)  
✅ Admin-only endpoints защищены  
✅ Cascade delete (удаление юзера удаляет его ссылки)  

---

## 📁 Файлы Документации

- **CHEATSHEET.md** - Быстрая справка (учётные данные, ссылки)
- **ADMIN_PANEL_GUIDE.md** - Полное руководство админ-панели
- **USER_GUIDE.md** - Пошаговые инструкции для пользователей
- **QUICK_START.md** - Быстрый старт
- **DATABASE_SCHEMA.md** - Структура БД с ER диаграммой

---

## ✨ Итог

✅ Система **полностью готова**  
✅ Backend работает на **http://localhost:3000**  
✅ Frontend работает на **http://localhost:5175**  
✅ Database: **PostgreSQL (shortlink_qr)**  

**7 активных пользователей в системе:**
1. admin (админ)
2. demo (тест)
3. alice (тест)
4. bob (тест)
5. testuser (тест)
6. test (тест)
7. testapi (тест)

---

**Готово! Можете начинать использовать систему! 🎉**

*Last Updated: March 17, 2026*
