# 📂 **Posture Pro** – AI‑Powered Posture‑Analysis Platform

> **A full‑stack web app that turns workout videos into instant, data‑driven posture feedback.**

---

## 🌟 Project Overview

| | |
|---|---|
| **Goal** | Let users upload a video of an exercise (e.g., squat, lunge, plank) and receive a **score (0‑100)** plus **actionable feedback** about form mistakes. |
| **Core Idea** | The backend extracts pose landmarks with **MediaPipe**, computes joint angles, evaluates exercise‑specific rules, and annotates the video with visual cues. |
| **Why It’s Cool** | Real‑time computer‑vision analysis, reusable scoring logic, and a clean Next.js UI – perfect for a portfolio or internship showcase. |

---

## ✨ Features

- **User authentication** (JWT‑based, password hashing).  
- **Video upload** with automatic processing.  
- **Exercise‑specific analysis** for **Squats, Lunges, Planks** (easily extensible).  
- **Angle‑based scoring** (knee, back, hip, body line).  
- **Frame‑by‑frame feedback** (leaning forward, shallow depth, sagging hips, high hips).  
- **Annotated output video** saved under `processed/`.  
- **MongoDB persistence** of users & analysis results.  
- **REST API** built with **FastAPI** (OpenAPI docs automatically generated).  
- **Responsive Next.js UI** with Tailwind‑styled pages for login, registration, upload, dashboard & result view.

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
|-------|------------|------|
| **Frontend** | **Next.js** + **TypeScript** + **Tailwind CSS** | SPA UI, client‑side routing, file upload, result display. |
| **Backend** | **FastAPI** + **Python 3.11** | HTTP API, CORS, static file serving. |
| **Computer Vision** | **OpenCV** + **MediaPipe Pose Landmarker** | Frame extraction, landmark detection, angle calculation. |
| **Database** | **MongoDB** (via **Motor** async driver) | Store users and analysis records. |
| **Auth** | **PyJWT** + SHA‑256 password hashing | JWT token generation/validation. |
| **Packaging** | **npm** (frontend) & **pip** (backend) | Dependency management. |

---

## 📂 Architecture / Folder Structure

```
PosturePro/
├─ backend/                     # Python FastAPI service
│  ├─ api/
│  │   └─ routes.py            # API endpoints (register, login, upload, queries)
│  ├─ database/
│  │   └─ mongo.py             # Motor client singleton
│  ├─ models/
│  │   └─ schemas.py           # Pydantic models (AnalysisResult, etc.)
│  ├─ services/
│  │   └─ pose_service.py      # Core video processing & scoring logic
│  ├─ utils/
│  │   └─ auth.py              # password hashing, JWT helpers, auth dependency
│  ├─ main.py                  # FastAPI app entry point
│  └─ requirements.txt         # Python deps
├─ frontend/ (actually “app/” under the repo)
│  ├─ app/                     # Next.js root
│  │   ├─ layout.tsx           # Root layout with global CSS & metadata
│  │   ├─ page.tsx             # Landing page (redirects to login/dashboard)
│  │   ├─ dashboard/          # Protected user dashboard (list of analyses)
│  │   ├─ upload/              # Video upload form + exercise selector
│  │   ├─ result/              # Shows processed video + score + feedback
│  │   ├─ login/ & register/   # Auth pages (JWT stored in localStorage)
│  │   └─ components/          # Reusable UI components (Header, Card, etc.)
│  ├─ public/                  # Static assets (favicon, images)
│  ├─ globals.css              # Tailwind + global styles
│  ├─ tailwind.config.ts      # Tailwind config (dark mode, custom colors)
│  ├─ next.config.ts           # Next.js config (CORS, asset handling)
│  └─ package.json
├─ .gitignore
└─ README.md   ← **you are reading this!**
```

---

## ⚙️ How It Works

### 1️⃣ Video Upload (Frontend)
1. User selects a video file and an **exercise type** (squat, lunge, plank).  
2. The file is POSTed to **`/api/upload`** with the JWT token in the `Authorization` header.

### 2️⃣ Backend Processing (`services/pose_service.py`)
| Step | What Happens | Key Code |
|------|--------------|----------|
| **Open video** | `cv2.VideoCapture` validates file. | `cap = cv2.VideoCapture(video_path)` |
| **Pose detection** | MediaPipe `PoseLandmarker` runs in **VIDEO** mode for every frame. | `landmarker.detect_for_video(...)` |
| **Landmark extraction** | Hip (23), knee (25), ankle (27), shoulder (11) indices are read. | `hip = [...]` etc. |
| **Angle calculation** | `calculate_angle` uses the law of cosines via `np.arctan2`. | `knee_angle = calculate_angle(hip, knee, ankle)` |
| **Exercise‑specific rules** | • **Squats**: knee < 120 ° & back < 75 ° → *leaning forward*; knee > 105 ° → *shallow depth*.<br>• **Lunges**: similar checks with different thresholds.<br>• **Planks**: body angle defines *hip sag* or *high hips*. | Conditional blocks in `process_video`. |
| **Scoring** | `score = int((correct_frames / total_frames) * 100)` (fallback = 80). | Lines 177‑183. |
| **Feedback generation** | The most frequent mistake (`max(mistakes, key=mistakes.get)`) picks a human‑readable message; if none, “Excellent form!”. | Lines 185‑199. |
| **Annotated video** | Draws skeleton, colored frame outline (green = good, red = bad) and feedback text on each frame, then writes to `processed/`. | Lines 144‑166, `out.write`. |
| **Response** | Returns a JSON payload with processed video path, score, feedback, status, frame counts. | Returned dict at lines 200‑207. |

### 3️⃣ Persistence
- New analysis document inserted into MongoDB collection `analyses`.  
- User’s email (extracted from JWT) links the record to the account.

### 4️⃣ Retrieval (Frontend)
- Dashboard calls **`GET /api/analyses`** → list of past analyses.  
- Clicking an entry calls **`GET /api/analyses/{id}`** → video URL + score displayed on the **Result** page.

---

## 📦 Installation

### Prerequisites
- **Node ≥ 20** (for the frontend).  
- **Python ≥ 3.11** and `pip`.  
- **MongoDB** instance (local or Atlas) – update connection string in `backend/database/mongo.py`.

### Backend
```bash
cd PosturePro/backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload   # http://0.0.0.0:8000
```
The API docs are available at `http://localhost:8000/docs`.

### Frontend
```bash
cd PosturePro/frontend   # actually the `app/` folder
npm install
npm run dev               # http://localhost:3000
```

### Environment Variables (optional)
- `SECRET_KEY` in `backend/utils/auth.py` – replace the placeholder with your own secret.  
- `MONGODB_URI` in `backend/database/mongo.py` – set the proper connection string.

---

## 📡 API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/register` | ❌ | Register a new user (email + password). Returns JWT. |
| `POST` | `/api/login` | ❌ | Login, returns JWT. |
| `POST` | `/api/upload` | ✅ (Bearer) | Upload video + `exercise_type`. Returns processed video path, score, feedback. |
| `GET`  | `/api/analyses` | ✅ (Bearer) | List all analyses for the current user. |
| `GET`  | `/api/analyses/{id}` | ✅ (Bearer) | Get a single analysis (video URL, metrics). |
*All routes are prefixed with **`/api`** in the FastAPI app.*

---

## 🚀 Running the Full Stack
1. **Start MongoDB** (ensure the DB is reachable).  
2. **Launch the backend** (`uvicorn main:app --reload`).  
3. **Launch the frontend** (`npm run dev`).  
4. Open `http://localhost:3000`, register, log in, and start uploading workout videos.

---

## 📈 Future Improvements
| Area | Idea |
|------|------|
| **Exercise library** | Add support for deadlifts, push‑ups, yoga poses (new angle rules). |
| **Model upgrade** | Swap MediaPipe pose landmarker with a custom TensorFlow/PyTorch model for higher accuracy. |
| **Realtime feedback** | Stream webcam feed and provide live overlay instead of batch video processing. |
| **Cloud deployment** | Dockerize both services, add CI/CD pipelines, host on Vercel (frontend) + Render/AWS (backend). |
| **Enhanced UI** | Dark mode toggle, animated progress circles, and a “share result” button for social media. |
| **Analytics** | Aggregate user‑level statistics (average score, improvement over time). |

---
