from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
sys.path.append(r"d:\zentonz\backend")
from app.database import SQLALCHEMY_DATABASE_URL
from app.models import GalleryImage

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

images = db.query(GalleryImage).all()
for img in images:
    print(f"ID: {img.id}, Title: {img.title}, IsMagazine: {img.is_magazine}")
