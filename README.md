# ResearchAssist Pro — MySQL Edition

Full-stack research support platform built with **React + Vite**, **Node.js + Express**, and **MySQL + Sequelize**.

---

## 📁 Project Structure

```
rap-mysql/
├── backend/
│   ├── config/
│   │   └── database.js          ← Sequelize MySQL connection
│   ├── models/
│   │   ├── index.js             ← Loads all models + syncDatabase()
│   │   ├── Admin.js
│   │   ├── Service.js
│   │   ├── Pricing.js
│   │   ├── Testimonial.js
│   │   ├── Contact.js
│   │   └── Workflow.js
│   ├── controllers/             ← Business logic (CRUD)
│   ├── routes/                  ← Express routers
│   ├── middleware/
│   │   └── auth.js              ← JWT protection
│   ├── server.js                ← App entry point
│   ├── seed.js                  ← DB seeder
│   └── .env.example
└── frontend/                    ← React + Vite + Tailwind (unchanged)
```

---

## ⚡ Quick Start

### Step 1 — Create the MySQL Database

Open **MySQL Workbench** or **phpMyAdmin** or your MySQL CLI and run:

```sql
CREATE DATABASE researchassist_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

> Tables are created **automatically** by Sequelize when the server starts. You do NOT need to run any SQL manually.

---

### Step 2 — Configure Backend .env

```bash
cd backend
copy .env.example .env        # Windows
# cp .env.example .env        # Mac/Linux
```

Edit `.env` with your MySQL credentials:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=researchassist_pro
DB_USER=root
DB_PASSWORD=your_mysql_password_here

JWT_SECRET=researchassistpro_super_secret_key_change_this
JWT_EXPIRES_IN=7d

NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

### Step 3 — Install & Seed Backend

```bash
cd backend
npm install
npm run seed
```

Expected output:
```
✅ MySQL connected
✅ MySQL tables synced
🗑️  Cleared existing data
👤 Admin created: admin@researchassistpro.com / Admin@123
📚 13 services seeded
💰 11 pricing plans seeded
⭐ 6 testimonials seeded
🔄 8 workflow steps seeded

✅ Database seeded successfully!
🔐 Admin login → admin@researchassistpro.com | Admin@123
```

---

### Step 4 — Start Backend

```bash
npm run dev
# Server runs at http://localhost:5000
```

---

### Step 5 — Setup & Start Frontend

```bash
cd ../frontend
npm install
copy .env.example .env        # Windows
# cp .env.example .env        # Mac/Linux
npm run dev
# Frontend runs at http://localhost:5173
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ MySQL Tables Created Automatically

| Table         | Description                        |
|---------------|------------------------------------|
| `admins`      | Admin users (bcrypt hashed passwords) |
| `services`    | Research services (13 seeded)      |
| `pricing`     | Pricing plans (11 seeded)          |
| `testimonials`| Client reviews (6 seeded)          |
| `contacts`    | Contact form submissions           |
| `workflow`    | Client journey steps (8 seeded)    |

---

## 🌐 Pages

| URL                    | Description                  |
|------------------------|------------------------------|
| `/`                    | Home (hero, services, pricing, testimonials) |
| `/services`            | All services with category filter |
| `/pricing`             | All pricing plans by tier    |
| `/about`               | About + team + values        |
| `/contact`             | Contact form                 |
| `/admin/login`         | Admin login                  |
| `/admin`               | Dashboard with stats         |
| `/admin/services`      | Manage services (CRUD)       |
| `/admin/pricing`       | Manage pricing (CRUD)        |
| `/admin/testimonials`  | Manage testimonials (CRUD)   |
| `/admin/contacts`      | View & manage contact messages |

---

## 🔌 API Endpoints

### Public
```
GET  /api/services          → Active services
GET  /api/pricing           → Active pricing plans
GET  /api/testimonials      → Active testimonials
GET  /api/workflow          → Workflow steps
POST /api/contacts          → Submit contact form
GET  /api/health            → Health check
```

### Protected (Bearer JWT required)
```
POST   /api/admin/login           → Admin login
GET    /api/admin/me              → Current admin info
GET    /api/admin/dashboard       → Stats (counts)

GET    /api/services/admin        → All services (incl. inactive)
POST   /api/services              → Create service
PUT    /api/services/:id          → Update service
DELETE /api/services/:id          → Delete service

GET    /api/pricing/admin         → All plans
POST   /api/pricing               → Create plan
PUT    /api/pricing/:id           → Update plan
DELETE /api/pricing/:id           → Delete plan

GET    /api/testimonials/admin    → All testimonials
POST   /api/testimonials          → Add testimonial
PUT    /api/testimonials/:id      → Update
DELETE /api/testimonials/:id      → Delete

GET    /api/contacts              → All contacts
PUT    /api/contacts/:id          → Update status
DELETE /api/contacts/:id          → Delete
```

---

## 🔐 Admin Credentials (after seeding)

```
Email:    admin@researchassistpro.com
Password: Admin@123
```

> ⚠️ Change this password in production!

---

## 🛠️ Common Issues

**"Access denied for user 'root'@'localhost'"**
→ Wrong `DB_PASSWORD` in `.env`. Check your MySQL password.

**"Unknown database 'researchassist_pro'"**
→ Create the database first: `CREATE DATABASE researchassist_pro;`

**"ECONNREFUSED 127.0.0.1:3306"**
→ MySQL server is not running. Start it via Services (Windows) or `brew services start mysql` (Mac).

**Frontend shows blank / API errors**
→ Make sure both servers are running (port 5000 + 5173) and `.env` files exist in both folders.
