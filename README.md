src/
├─ app/ # Точки входа, маршрутизация, провайдеры
│ ├─ layout.tsx
│ ├─ page.tsx
│ └─ providers/ # Глобальные контексты (AuthProvider, ThemeProvider и т.д.)
│
├─ processes/ # Бизнес-процессы уровня приложения (авторизация, онбординг)
│
├─ widgets/ # Крупные UI-блоки (Navbar, Sidebar, Footer и т.п.)
│
├─ features/ # Фичи (LoginForm, AddToCartButton, UserDropdown)
│
├─ entities/ # Сущности (User, Product, Post)
│
├─ shared/ # Переиспользуемые модули
│ ├─ ui/ # UI-kit компоненты (Button, Modal, Input)
│ ├─ lib/ # хелперы, утилиты
│ ├─ config/ # глобальные настройки (api, env)
│ └─ api/ # клиенты, axios instance и т.д.

### Stack

- **Next.js** – фреймворк для React (SSR, SSG, роутинг).
- **React / ReactDOM** – библиотека для UI.
- **@tanstack/react-query** – управление серверным состоянием, кеш запросов.
- **@tanstack/react-table** – таблицы с сортировкой и фильтрацией.
- **axios** – HTTP-клиент для API.
- **zustand** – легковесный state-manager.
- **react-hook-form** – формы и валидация.
- **zod** – схема и валидация данных.
- **react-window** – виртуализация списков.
- **tailwindcss / tailwind-merge / clsx / cva** – стили и удобное управление классами.
- **lucide-react** – иконки.
- **@radix-ui/react-slot** – проброс children/props в UI-компонентах.

### 🛠 Dev-injections

- **TypeScript** – типизация.
- **ESLint / eslint-config-next** – линтинг.
- **MSW** – мок API для разработки.
- **Tailwind + postcss** – стили.
- **tw-animate-css** – анимации.
- **@types/** пакеты – типы для React, Node.
