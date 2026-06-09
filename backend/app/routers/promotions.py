# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db
from ..utils import MinioService

router = APIRouter(prefix="/api/promotions", tags=["promotions"])

@router.get("/", response_model=List[schemas.Promotion])
def get_all_promotions(db: Session = Depends(get_db)):
    return db.query(models.Promotion).all()

@router.get("/active", response_model=schemas.Promotion)
def get_active_promotion(db: Session = Depends(get_db)):
    promo = db.query(models.Promotion).filter(models.Promotion.is_active == True).first()
    if not promo:
        raise HTTPException(status_code=204, detail="No active promotion")
    return promo

def deactivate_all(db: Session):
    active_promos = db.query(models.Promotion).filter(models.Promotion.is_active == True).all()
    for p in active_promos:
        p.is_active = False
    db.commit()

@router.post("/", response_model=schemas.Promotion)
def create_promotion(promo: schemas.PromotionCreate, db: Session = Depends(get_db)):
    if promo.is_active:
        deactivate_all(db)
    
    new_promo = models.Promotion(**promo.model_dump())
    db.add(new_promo)
    db.commit()
    db.refresh(new_promo)
    return new_promo

@router.put("/{id}", response_model=schemas.Promotion)
def update_promotion(id: int, promo: schemas.PromotionCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Promotion).filter(models.Promotion.id == id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Not found")
    
    if promo.is_active:
        deactivate_all(db)
        
    for key, value in promo.model_dump().items():
        setattr(existing, key, value)
        
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/{id}")
def delete_promotion(id: int, db: Session = Depends(get_db)):
    existing = db.query(models.Promotion).filter(models.Promotion.id == id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(existing)
    db.commit()
    return {"ok": True}

@router.post("/upload")
def upload_image(file: UploadFile = File(...)):
    try:
        filename = MinioService.store_file(file)
        return filename
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
