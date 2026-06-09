# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import promotions, services, testimonials, gallery, reservations, contact, admin

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zen Tonez Beauty Parlour API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(promotions.router)
app.include_router(services.router)
app.include_router(testimonials.router)
app.include_router(gallery.router)
app.include_router(reservations.router)
app.include_router(contact.router)
app.include_router(admin.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Zen Tonez FastAPI Backend"}
