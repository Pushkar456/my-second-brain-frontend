# 🧠 my-brain – Personal Knowledge Management System

The **my-brain** project is a **full-stack personal knowledge management system** where users can create, organize, and search their notes, documents, and media.  
It combines a **React frontend** with an **Express + TypeScript backend**, **MongoDB** for structured storage, and **Qdrant** for semantic vector search.  

The frontend is the main entry point for users, providing a clean and intuitive interface for managing their "second brain."

---

## 🚀 Features
- **User Authentication** (Register/Login, protected routes with JWT)  
- **Dashboard** to view and manage all content  
- **Add/Edit Content** via a clean form with support for text, files, and media (≤16MB)  
- **Semantic Search** (searches by meaning, not just keywords)  
- **Tagging & Metadata** for easier content organization  
- **Responsive UI** with reusable React components  

---

## 🛠️ Tech Stack
### Frontend
- **React + TypeScript** – Component-based, strongly typed UI development  
- **Recoil** – State management for global data (auth, search results, etc.)  
- **Axios** – For calling backend APIs  
- **Lucide React** – Icons for UI  
- **TailwindCSS** – Styling with utility-first classes  

### Backend
- **Express + TypeScript** – API layer  
- **MongoDB** – Stores user data, content, and file uploads  
- **Qdrant** – Vector DB for semantic search  
- **JWT Authentication** – Secure access control  

---

## 📂 Project Structure
my-brain/
│── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Main routes (Dashboard, Login, Register, etc.)
│ │ ├── recoil/ # State management
│ │ ├── utils/ # Helper functions (API calls, formatters)
│ │ └── App.tsx # Route definitions
│ │
│ └── package.json
│
│── backend/
│ ├── src/
│ │ ├── routes/ # API routes (User, Brain, Content)
│ │ ├── controllers/ # Business logic
│ │ └── index.ts # Server entry point
│ │
│ └── package.json
│
└── README.md

markdown
Copy code

---

## 🖥️ Frontend Routes
These are the **main routes (React Router)** available in the frontend:

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Landing Page** | Intro to app, redirects to `/login` if not authenticated |
| `/login` | **Login Page** | User login form |
| `/register` | **Register Page** | New user signup |
| `/dashboard` | **Dashboard** | Main page showing user’s content (protected route) |
| `/add-content` | **ContentForm** | Add new note/document/file |
| `/search` | **Search Page** | Perform semantic search, view results |
| `/profile` | **Profile Page** | Manage account details |

Protected routes (`/dashboard`, `/add-content`, `/search`, `/profile`) require authentication.  
Auth state is stored via **Recoil** and verified with the backend using **JWT tokens**.  

---

## ⚡ How It Works (User Flow)
1. **User signs up / logs in** → JWT issued, stored in local state.  
2. **Frontend routes** (`/dashboard`, `/add-content`, `/search`) are unlocked.  
3. **Adding content** → API call to backend → stored in MongoDB + embeddings generated → pushed to Qdrant.  
4. **Searching** → Query embedding sent → Qdrant finds matches → backend fetches metadata → results displayed in React.  
5. **Dashboard** dynamically updates with new/edited/deleted content.  

---

## 📡 Example API Calls from Frontend
```ts
// Login
await axios.post("/auth/login", { email, password });

// Add Content
await axios.post("/content", { title, text, tags, file }, {
  headers: { Authorization: `Bearer ${token}` }
});

// Search Content
await axios.post("/search", { query: "deep learning" }, {
  headers: { Authorization: `Bearer ${token}` }
});
🧪 Scripts
Frontend
bash
Copy code
cd frontend
npm install
npm run dev     # Runs frontend on http://localhost:5173
