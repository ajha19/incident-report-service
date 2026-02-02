# Incident Reporting Dashboard

A robust, full-stack internal tool designed for teams to log, track, and manage incidents efficiently. Built with a **Node.js** backend and **React** frontend, focusing on usability and real-world workflows.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Incident+Dashboard+Preview)  
*(Replace this with a real screenshot if available)*

## 🚀 Key Features

- **End-to-End Workflow**: Complete lifecycle management from creation to resolution.
- **Live Status Tracking**: Toggle incidents between **Open** and **Resolved** states.
- **Insightful Stats**: Real-time dashboard counters for Total, Open, Critical, and Resolved incidents.
- **Powerful Search & Filters**: Instantly filter list by severity (Low to Critical) or status, and search by text.
- **Fully Responsive**: Optimized layout that adapts seamlessly to mobile, tablet, and desktop screens.
- **Lightweight Setup**: Uses in-memory storage for zero-config deployment (no database required).

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Logging**: Morgan

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Custom CSS (Responsive Grid & Flexbox)
- **HTTP Client**: Axios

## ⚡ Getting Started

Follow these steps to get the project running locally.

### Prerequisites
- Node.js (v14+ recommended)
- npm

### 1. Setup & Run Backend
The backend service runs on port `3000` by default.

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js
```
*You should see:* `🚀 Incident Reporting Service Started on URL: http://localhost:3000`

### 2. Setup & Run Frontend
Open a new terminal window. The frontend runs on port `5173`.

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```
*Open http://localhost:5173 in your browser.*

## 🔌 API Documentation

| Method | Endpoint | Description | Body Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/incidents` | List all incidents | - |
| `POST` | `/api/incidents` | Create new incident | `{ description, location, severity }` |
| `GET` | `/api/incidents/:id` | Get incident details | - |
| `PATCH` | `/api/incidents/:id` | Update status | `{ status: 'Open' \| 'Resolved' }` |

## ⚠️ Important Note

**Data Persistence**: This application uses **in-memory storage** to keep the setup simple and fast.
> **Restarting the `node server.js` process will wipe all created incidents.**

## 📂 Project Structure

```
incident-report-service/
├── server.js            # Backend entry point
├── src/                 # Backend source code
│   ├── routes/          # API route definitions
│   └── services/        # In-memory data store
├── frontend/            # React Frontend Application
│   ├── src/
│   │   ├── components/  # React components (Form, List, Stats)
│   │   ├── App.jsx      # Main layout logic
│   │   └── index.css    # Global & Responsive styles
│   └── vite.config.js   # Vite configuration (Proxy setup)
└── ...
```

---
*Built for efficient incident response.*
