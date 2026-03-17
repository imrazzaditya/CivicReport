# 🏛️ Civic Issue Reporting Platform

A full-stack MERN application that empowers citizens to report civic issues (road damage, garbage, water leakage, street light failures, etc.) and track their resolution. Admins manage, update, and resolve tickets through a dedicated dashboard with analytics.

---

## ✨ Features

### Citizen Features
- **Register / Login** with JWT authentication
- **Report issues** with title, description, category, location, and image/video uploads
- **Track ticket status** (Submitted → In Progress → Resolved / Rejected)
- **Visual progress stepper** and timeline
- **Edit or delete** tickets (if not yet resolved)

### Admin Features
- **Admin dashboard** with analytics (total, pending, resolved, category distribution)
- **View & filter** all tickets by category or status
- **Update ticket status** and add progress notes
- **Delete** any ticket

### Technical Highlights
- JWT-based authentication with role-based access control
- Cloudinary integration for image & video storage via Multer
- Responsive UI with Tailwind CSS, glassmorphism, and micro-animations
- RESTful API architecture
- Centralized error handling

---

## 🛠️ Tech Stack

| Layer       | Technology                           |
|-------------|--------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS 3      |
| Backend     | Node.js, Express.js                  |
| Database    | MongoDB (Mongoose ODM)               |
| Auth        | JSON Web Tokens (JWT), bcryptjs      |
| File Upload | Multer + Cloudinary                  |
| State       | Context API                          |
| HTTP Client | Axios                                |

---

## 📁 Project Structure

```
civic-issue-platform/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Auth context provider
│   │   ├── pages/              # Page-level components
│   │   ├── utils/              # Axios API instance
│   │   ├── App.jsx             # Router
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind + custom styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                     # Express backend
│   ├── config/                 # DB & Cloudinary config
│   ├── controllers/            # Route handlers
│   ├── middleware/              # Auth, upload, error handler
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API route definitions
│   ├── server.js               # Entry point
│   └── package.json
├── API_DOCUMENTATION.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Cloudinary** account ([sign up free](https://cloudinary.com))

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/civic-issue-platform.git
cd civic-issue-platform
```

### 2. Backend Setup
```bash
cd server
cp .env.example .env      # Fill in your values
npm install
npm run dev                # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
cp .env.example .env       # Optionally adjust API URL
npm install
npm run dev                # Starts on http://localhost:5173
```

---

## 🔑 Environment Variables

### Server (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/civic-issue-platform
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📸 Screenshots

> Add screenshots here after running the app locally.

| Page             | Screenshot                  |
|------------------|-----------------------------|
| Landing Page     | *screenshot placeholder*    |
| Login            | *screenshot placeholder*    |
| User Dashboard   | *screenshot placeholder*    |
| Create Ticket    | *screenshot placeholder*    |
| Ticket Detail    | *screenshot placeholder*    |
| Admin Dashboard  | *screenshot placeholder*    |
| Admin Tickets    | *screenshot placeholder*    |

---

## 🚢 Deployment

Please refer to the detailed [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions on deploying the backend to Render and frontend to Vercel.

### Quick Links
- [Render Dashboard](https://dashboard.render.com/)
- [Vercel Dashboard](https://vercel.com/)


---

## 🔧 Git Commands
```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: Civic Issue Reporting Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/civic-issue-platform.git
git push -u origin main
```

---

## 🔮 Future Improvements
- Email/SMS notifications on ticket status changes
- Google Maps integration for precise location tagging
- Real-time updates with WebSockets
- User profile management & password reset
- Dark mode toggle
- Export analytics as PDF/CSV
- Mobile app (React Native)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
