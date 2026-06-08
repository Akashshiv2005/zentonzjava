from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import hashlib
import os

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Create a simple schema for login request
class LoginRequest(BaseModel):
    username: str
    password: str

def hash_password(password: str) -> str:
    # Use SHA-256 for simple secure hashing
    return hashlib.sha256(password.encode()).hexdigest()

def init_admin(db: Session):
    # Check if admin exists
    admin = db.query(models.AdminUser).filter(models.AdminUser.username == "admin").first()
    if not admin:
        new_admin = models.AdminUser(
            username="admin",
            password_hash=hash_password("admin")
        )
        db.add(new_admin)
        db.commit()

@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    # Ensure default admin exists
    init_admin(db)
    
    admin = db.query(models.AdminUser).filter(models.AdminUser.username == req.username).first()
    
    if not admin or admin.password_hash != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Return a simple token (in a real app, use JWT)
    return {"token": "zt_admin_token_" + admin.username}

@router.get("/verify")
def verify_token(token: str):
    if not token or not token.startswith("zt_admin_token_"):
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"ok": True}
