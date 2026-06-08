from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
import io

from .. import models, schemas
from ..database import get_db
from ..utils import MinioService, minio_client, MINIO_BUCKET

router = APIRouter(
    prefix="/api/gallery",
    tags=["gallery"]
)

@router.get("/", response_model=List[schemas.GalleryImage])
def get_all_images(db: Session = Depends(get_db)):
    return db.query(models.GalleryImage).all()

@router.post("/upload", response_model=schemas.GalleryImage)
def upload_image(
    file: UploadFile = File(...), 
    title: str = Form(...),
    description: str = Form(""),
    is_magazine: bool = Form(False),
    db: Session = Depends(get_db)
):
    try:
        filename = MinioService.store_file(file)
        new_image = models.GalleryImage(
            file_name=filename, 
            title=title, 
            description=description,
            is_magazine=is_magazine
        )
        db.add(new_image)
        db.commit()
        db.refresh(new_image)
        return new_image
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{id}", response_model=schemas.GalleryImage)
def update_image(id: int, image_update: schemas.GalleryImageUpdate, db: Session = Depends(get_db)):
    image = db.query(models.GalleryImage).filter(models.GalleryImage.id == id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    image.title = image_update.title
    if image_update.description is not None:
        image.description = image_update.description
        
    db.commit()
    db.refresh(image)
    return image

@router.delete("/{id}")
def delete_image(id: int, db: Session = Depends(get_db)):
    image = db.query(models.GalleryImage).filter(models.GalleryImage.id == id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Optional: also delete from minio
    # if minio_client:
    #     minio_client.remove_object(MINIO_BUCKET, image.file_name)

    db.delete(image)
    db.commit()
    return {"ok": True}

from fastapi.responses import RedirectResponse
from datetime import timedelta

@router.get("/images/{file_name}")
def serve_image(file_name: str):
    try:
        if not minio_client:
            raise HTTPException(status_code=500, detail="Minio client not initialized")
        
        # Generate a direct download link that expires in 1 hour
        # This completely bypasses Python streaming and lets MinIO serve the file instantly
        url = minio_client.presigned_get_object(
            MINIO_BUCKET, 
            file_name, 
            expires=timedelta(hours=1)
        )
        
        # We redirect the browser directly to MinIO
        return RedirectResponse(url=url, status_code=302)
        
    except Exception as e:
        raise HTTPException(status_code=404, detail="File not found")
