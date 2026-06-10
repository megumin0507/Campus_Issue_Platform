# Campus Issue Platform

This is the frontend/backend platform for the campus issue project.

The platform currently contains:

* A FastAPI backend
* A React + TypeScript frontend
* A simple login/register system
* A local SQLite database for development

---

## 1. Project Structure

```txt
Campus-Issue-Platform/
│
├─ apps/
│  ├─ backend/
│  │  ├─ main.py
│  │  ├─ config.py
│  │  ├─ api/
│  │  ├─ core/
│  │  ├─ db/
│  │  ├─ models/
│  │  ├─ repositories/
│  │  ├─ schemas/
│  │  └─ services/
│  │
│  └─ frontend/
│     ├─ package.json
│     ├─ src/
│     └─ ...
│
├─ requirements.txt
├─ .env.example
└─ README.md
```

---

## 2. Backend Setup

The backend uses Python, FastAPI, SQLAlchemy, SQLite, and JWT authentication.

### Step 1: Create Python virtual environment

From the project root:

```bash
python -m venv .venv
```

Activate it.

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

---

### Step 2: Install backend dependencies

```bash
pip install -r requirements.txt
```

If package errors happen, try:

```bash
pip install fastapi uvicorn sqlalchemy python-jose[cryptography] passlib[bcrypt] "bcrypt<5" python-dotenv pydantic[email]
```

---

### Step 3: Create `.env`

Copy `.env.example` and rename it to `.env`.

Example `.env`:

```env
DATABASE_URL=sqlite:///./campus_issue.db
JWT_SECRET_KEY=replace-this-with-your-own-random-secret
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

To generate a random JWT secret:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Paste the output into `JWT_SECRET_KEY`.

Do not commit `.env` to GitHub.

---

### Step 4: Run backend server

From the project root:

```bash
uvicorn apps.backend.main:app --reload
```

The backend should run at:

```txt
http://localhost:8000
```

You can check the API docs here:

```txt
http://localhost:8000/docs
```

You can test the health check here:

```txt
http://localhost:8000/api/health
```

Expected result:

```json
{
  "status": "ok"
}
```

---

## 3. Frontend Setup

The frontend uses React, TypeScript, and Vite.

Open another terminal.

### Step 1: Go to frontend folder

```bash
cd apps/frontend
```

---

### Step 2: Install frontend dependencies

```bash
npm install
```

---

### Step 3: Run frontend server

```bash
npm run dev
```

The frontend should run at:

```txt
http://localhost:5173
```

---

## 4. Normal Development Flow

Use two terminals.

### Terminal 1: Backend

```bash
cd Campus-Issue-Platform
.\.venv\Scripts\Activate.ps1
uvicorn apps.backend.main:app --reload
```

On macOS/Linux:

```bash
cd Campus-Issue-Platform
source .venv/bin/activate
uvicorn apps.backend.main:app --reload
```

---

### Terminal 2: Frontend

```bash
cd Campus-Issue-Platform/apps/frontend
npm run dev
```

Then open:

```txt
http://localhost:5173
```

---

## 5. Login/Register Test

After starting both backend and frontend, open:

```txt
http://localhost:5173/register
```

Create a test account.

Then try logging in at:

```txt
http://localhost:5173/login
```

The backend auth endpoints are:

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

You can also test them directly from:

```txt
http://localhost:8000/docs
```

---

## 6. Common Problems

### Problem: `ModuleNotFoundError: No module named 'apps'`

Make sure you run the backend from the project root:

```bash
uvicorn apps.backend.main:app --reload
```

Do not run this command from inside `apps/backend`.

---

### Problem: `No module named 'jose'`

Run:

```bash
pip install python-jose[cryptography]
```

---

### Problem: `No module named 'passlib'`

Run:

```bash
pip install passlib[bcrypt]
```

---

### Problem: bcrypt password error

If you see an error related to bcrypt and password length, install bcrypt version below 5:

```bash
pip uninstall bcrypt
pip install "bcrypt<5"
```

Also make sure `requirements.txt` contains:

```txt
bcrypt<5
```

---

### Problem: Frontend cannot connect to backend

Make sure the backend is running at:

```txt
http://localhost:8000
```

Also make sure the frontend API base URL is:

```ts
const API_BASE_URL = "http://localhost:8000/api";
```

---

## 7. Notes

This is currently a local development setup.

The login system currently supports:

* Register
* Login
* Logout
* JWT token storage in frontend
* `/auth/me` user identity check

The next step is to connect login state to real platform features, especially comments.
