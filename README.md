# Artisan Ceramics Limited — Web Application & Admin CMS

Complete full-stack web application for **Artisan Ceramics Limited**, featuring a dynamic public website with interactive GSAP animations, coupled with a Laravel 13 REST API backend and a React SPA Admin CMS.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 18, Vite, React Router 6, GSAP, Tailwind / CSS Modules | Preserves 100% of the original artisan design, smooth animations, and interactive catalog system. |
| **Admin Panel** | React SPA (embedded under `/admin`), Protected Route Guards | Full-featured CMS with permanent clean light-mode, file upload support, and real-time management. |
| **Backend API** | PHP 8.2+, Laravel 13, Laravel Sanctum | RESTful API managing site sections, media uploads, catalogs, catalog requests, team members, careers, events, and inquiries. |
| **Database** | SQLite (zero-config local default) / MySQL 8.0 (Docker ready) | Relational schema with migrations and pre-configured database seeders. |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ and `npm`
- **PHP**: v8.2+ with `pdo`, `sqlite3` or `pdo_mysql`, `fileinfo`, `mbstring` extensions
- **Composer**: v2.x
- *(Optional)* **Docker & Docker Compose**: For running MySQL 8.0 container

---

### 2. Backend Setup (`aclBackend`)

```bash
cd aclBackend

# 1. Install PHP dependencies
composer install

# 2. Copy environment file
cp .env.example .env

# 3. Generate application encryption key
php artisan key:generate

# 4. Link public storage (for uploaded images & videos)
php artisan storage:link

# 5. Run migrations & seed initial data (Admin user, sections, catalogs, events, team)
php artisan migrate --seed

# 6. Start the Laravel development server
php artisan serve --host=127.0.0.1 --port=8000
```
> The API will be running at `http://127.0.0.1:8000/api`.

#### *(Optional)* Using Docker for MySQL:
```bash
cd aclBackend
docker compose up -d
# Update DB_CONNECTION=mysql in .env, then:
php artisan migrate --seed
```

---

### 3. Frontend & Admin Setup (`aclSite`)

```bash
cd aclSite

# 1. Install Node dependencies
npm install

# 2. Start the Vite development server
npm run dev
```
> The website will be live at `http://localhost:5173`.

---

## 🔐 Admin Panel Credentials

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Username / Email**: `admin` *(or `admin@artisanceramics.com`)*
- **Password**: `admin12345`

---

## ✨ Key Features & Enhancements

1. **Catalog Request System**:
   - Heavy static PDF downloads have been decoupled from the public server.
   - High-resolution thumbnails are shown with dynamic fallbacks.
   - Clicking a catalog opens a visitor request modal (*Name*, *Email*, *Catalog details*).
   - Incoming inquiries appear live in the **Catalog Requests** section of the Admin Panel, where admins can manage and fulfill requests.

2. **Full Dynamic CMS**:
   - **Hero Section**: Update hero title, tagline, subtitle, or upload custom banner MP4 video.
   - **Profile Journey**: Manage the corporate journey video, factory imagery, and company overview.
   - **Event Countdown Popup**: Set target dates, titles, and activate/deactivate the modal.
   - **Catalog Manager**: Add new catalog editions with custom thumbnail uploads.
   - **Upcoming Events & News**: Publish press releases, events, and exhibition announcements.
   - **Board of Directors**: Manage leadership profiles, designations, and executive committee photos.
   - **Career Openings**: Post vacancies with department, deadlines, and requirements.
   - **Contact Messages**: Receive and review customer inquiries directly from the contact form.

3. **Admin Experience**:
   - Protected by token-based authentication guards (`ProtectedRoute`).
   - Popups (e.g. Ambiente event modal) are strictly isolated to public routes and never interfere with the admin dashboard.
   - Permanent light theme with optimized high-contrast styling for administrative clarity.
