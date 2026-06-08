# Zen Tonez Beauty Parlour

## 🚀 How to Run the Project Locally

This project consists of a **React Frontend** and a **Python FastAPI Backend**.
Follow these steps to set everything up on your machine!

### 1️⃣ Database Setup (PostgreSQL)
1. Install PostgreSQL on your machine.
2. Open pgAdmin or PSQL and create a database named `zentonez`.
3. Set your postgres user password to `1234` (or update the connection string in `backend/app/database.py` and `backend/import_db.py`).

### 2️⃣ Backend Setup
The backend runs on Python 3.10+ using FastAPI and SQLAlchemy.
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. **Import the Database!** (This will load all the services, testimonials, gallery, and admin login):
   ```bash
   python import_db.py
   ```
5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8081
   ```

### 3️⃣ Frontend Setup
The frontend is a React application built with Vite and Tailwind CSS.
1. Open a *new* terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 🔑 Admin Credentials
- Navigate to `http://localhost:5173/admin`
- **Username:** `admin`
- **Password:** `admin`

That's it! Everything should be fully connected and working properly!
