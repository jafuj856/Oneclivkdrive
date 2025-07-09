# 🚗 Admin Dashboard – Car Listings (Next.js + Tailwind + API)

This is a complete admin dashboard built using **Next.js (Pages Router)**, with cookie-based authentication and full listing management features (Approve, Reject, Edit). Built to be clean, responsive, and functional.

---

## 🧩 Features

✅ Login Page  
✅ Cookie-based Auth (via `js-cookie`)  
✅ Protected Routes using `middleware.ts`  
✅ Admin Dashboard (Table View)  
✅ Approve / Reject Car Listings  
✅ Edit Modal with Validation (MUI + Tailwind)  
✅ API Integration with `GET` and `PUT`  
✅ Hosted on Vercel (or run locally)

---

## 🔐 Admin Login

```txt
Email: oneclickdrive@gmail.com
Password: 123456

## 🧪 Run Locally

```bash
git clone https://github.com/jafuj856/Oneclivkdrive.git
cd Oneclivkdrive
npm install
npm run dev
Open in browser: http://localhost:3000

## 🔗 Live Demo
👉 https://oneclivkdrive.vercel.app

##📂 Key Project Structure
bash
Copy
Edit
/pages
  ├── index.tsx              # Login Page
  ├── dashboard.tsx          # Admin Dashboard
  └── api/listings.ts        # Listings API

/components
  └── EditFile.tsx           # Edit modal (MUI)

middleware.ts                # Cookie-based Auth Protection
tailwind.config.js           # TailwindCSS Configuration
