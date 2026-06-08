from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import json
from .. import models, schemas
from ..database import get_db
from ..utils import MinioService

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])

@router.get("/", response_model=List[schemas.Testimonial])
def get_all_testimonials(db: Session = Depends(get_db)):
    return db.query(models.Testimonial).all()

@router.post("/", response_model=schemas.Testimonial)
def add_testimonial(
    testimonial: str = Form(...),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        t_data = json.loads(testimonial)
        new_testimonial = models.Testimonial(**t_data)
        
        if file:
            new_testimonial.image_name = MinioService.store_file(file)
            
        db.add(new_testimonial)
        db.commit()
        db.refresh(new_testimonial)
        return new_testimonial
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{id}", response_model=schemas.Testimonial)
def update_testimonial(
    id: int,
    testimonial: str = Form(...),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        existing = db.query(models.Testimonial).filter(models.Testimonial.id == id).first()
        if not existing:
            raise HTTPException(status_code=404, detail="Not found")
            
        t_data = json.loads(testimonial)
        for k, v in t_data.items():
            setattr(existing, k, v)
            
        if file:
            existing.image_name = MinioService.store_file(file)
            
        db.commit()
        db.refresh(existing)
        return existing
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{id}")
def delete_testimonial(id: int, db: Session = Depends(get_db)):
    existing = db.query(models.Testimonial).filter(models.Testimonial.id == id).first()
    if existing:
        db.delete(existing)
        db.commit()
    return {"ok": True}
