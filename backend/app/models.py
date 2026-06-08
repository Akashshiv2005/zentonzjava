from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from sqlalchemy.sql import func
from .database import Base

class Promotion(Base):
    __tablename__ = "promotions"

    id = Column(Integer, primary_key=True, index=True)
    is_active = Column(Boolean, default=False)
    tag_text = Column(String)
    title_part1 = Column(String)
    title_part2 = Column(String)
    description = Column(String(1000))
    offer_tag = Column(String)
    offer_title = Column(String)
    discount_value = Column(String)
    discount_suffix = Column(String)
    features = Column(String(1000))
    image_name = Column(String)


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    description = Column(String(1000))
    price = Column(String)
    duration = Column(String)
    highlights = Column(String(500))
    image_name = Column(String)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    service = Column(String)
    quote = Column(Text)
    rating = Column(Integer)
    image_name = Column(String)


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    service = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    notes = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String)
    phone = Column(String, nullable=False)
    service = Column(String)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String)
    title = Column(String)
    description = Column(String)
    is_magazine = Column(Boolean, default=False)


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
