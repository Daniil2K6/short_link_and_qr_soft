# 🚀 QuickRef - Учётные Данные & Ссылки

## 🌐 Основное
```
Frontend: http://localhost:5175
Backend:  http://localhost:3000
```

---

## 👨‍💼 ADMIN (полный контроль)
```
Username: admin
Email:    admin@short-link.com
Password: Admin@1234
```
**Может:** Всё управлять в /admin

---

## 👤 Test Users (для тестирования)

### demo
```
Username: demo
Password: 123
```

### alice
```
Username: alice
Password: pass123
```

### bob
```
Username: bob
Password: mypass
```

---

## 🔗 Страницы

| Назначение | URL |
|-----------|-----|
| Главная | http://localhost:5175 |
| Регистрация | http://localhost:5175/register |
| Логин | http://localhost:5175/login |
| Dashboard | http://localhost:5175/dashboard |
| Статистика | http://localhost:5175/statistics |
| **Админ-панель** | **http://localhost:5175/admin** |

---

## ⚡ Быстрый старт

### 1. Зарегистрируйтесь
- Откройте http://localhost:5175/register
- Username: **demo**
- Password: **123**
- Нажмите Register

### 2. Создайте ссылку
- На главной введите URL
- Нажмите Generate
- Получите короткую ссылку

### 3. Войдите как админ
- http://localhost:5175/login
- Email: **admin@short-link.com**
- Password: **Admin@1234**

### 4. Откройте админ-панель
- http://localhost:5175/admin
- Управляйте пользователями и ссылками

---

## 📋 Админ-панель (ВЕБ)

**ЭТО ФРОНТЕНД СТРАНИЦА, НЕ КОНСОЛЬ!**

```
http://localhost:5175/admin
```

**Состоит из 3 вкладок:**
1. 👥 **Users** - Список пользователей, удаление, изменение ролей
2. 🔗 **Links** - Все ссылки, блокировка, удаление
3. 📋 **User Details** - Информация о пользователе и его ссылки

---

## 🔑 Простая Регистрация

✅ **Email опционален** (автогенерируется)  
✅ **Пароль 3+ символа** (был 6+)  
✅ **Без сложности паролей**  
✅ **Без подтверждения пароля**

**Примеры паролей:**
- ✅ "123"
- ✅ "abc"
- ✅ "pass"

---

## 📱 Все Функции

### Гость (не залогинен)
- Видит главную
- Может зарегистрироваться
- Может войти

### Юзер (залогинен как user)
- Создаёт ссылки
- Видит свой Dashboard
- Видит Статистику своих ссылок
- НЕ может управлять другими пользователями

### Админ (залогинен как admin)
- ✅ Видит админ-панель /admin
- ✅ Управляет пользователями (удаление, роли)
- ✅ Управляет ссылками (статус, удаление)  
- ✅ Видит всю статистику
- ✅ Может сделать админом любого пользователя

---

## 🎯 Типичные Задачи

### Создать ссылку
1. Login / Register
2. На главной введите URL
3. Generate → получите короткую ссылку

### Посмотреть статистику
1. Dashboard (видите свои ссылки)
2. Statistics → введите ID или short code
3. Видите клики, QR код, даты

### Заблокировать ссылку (админ)
1. Login как admin
2. /admin → Links tab
3. Change Status → blocked

### Удалить пользователя (админ)
1. Login как admin
2. /admin → Users tab
3. Delete → подтвердить

### Сделать админом (админ)
1. Login как admin
2. /admin → Users tab
3. Change Role → admin

---

## 💻 Команды

```bash
# Запустить бэкенд
cd backend && npm start

# Запустить фронтенд
cd frontend && npm run dev

# Админ консоль (старая, не рекомендуется)
npm run admin

# База данных
psql -U postgres -d shortlink_qr
```

---

**Любые вопросы? Смотри подробные гайды:**
- [ADMIN_PANEL_GUIDE.md](ADMIN_PANEL_GUIDE.md) - Все про админ-панель
- [USER_GUIDE.md](USER_GUIDE.md) - Пошаговые инструкции
- [QUICK_START.md](QUICK_START.md) - Быстрый старт
