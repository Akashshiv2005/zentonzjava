# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from typing import List, Optional
import json
from .. import models, schemas
from ..database import get_db
from ..utils import MinioService

router = APIRouter(prefix="/api/services", tags=["services"])

@router.get("/", response_model=List[schemas.Service])
def get_all_services(db: Session = Depends(get_db)):
    return db.query(models.Service).all()

@router.post("/", response_model=schemas.Service)
def create_service(
    service: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        service_data = json.loads(service)
        new_service = models.Service(**service_data)
        
        if image:
            new_service.image_name = MinioService.store_file(image)
            
        db.add(new_service)
        db.commit()
        db.refresh(new_service)
        return new_service
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{id}", response_model=schemas.Service)
def update_service(
    id: int,
    service: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        existing = db.query(models.Service).filter(models.Service.id == id).first()
        if not existing:
            raise HTTPException(status_code=404, detail="Not found")
            
        service_data = json.loads(service)
        for k, v in service_data.items():
            setattr(existing, k, v)
            
        if image:
            existing.image_name = MinioService.store_file(image)
            
        db.commit()
        db.refresh(existing)
        return existing
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{id}")
def delete_service(id: int, db: Session = Depends(get_db)):
    existing = db.query(models.Service).filter(models.Service.id == id).first()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True}
