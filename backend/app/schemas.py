from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PromotionBase(BaseModel):
    is_active: Optional[bool] = False
    tag_text: Optional[str] = None
    title_part1: Optional[str] = None
    title_part2: Optional[str] = None
    description: Optional[str] = None
    offer_tag: Optional[str] = None
    offer_title: Optional[str] = None
    discount_value: Optional[str] = None
    discount_suffix: Optional[str] = None
    features: Optional[str] = None
    image_name: Optional[str] = None

class PromotionCreate(PromotionBase):
    pass

class Promotion(PromotionBase):
    id: int
    class Config:
        from_attributes = True


class ServiceBase(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[str] = None
    duration: Optional[str] = None
    highlights: Optional[str] = None
    image_name: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    class Config:
        from_attributes = True


class TestimonialBase(BaseModel):
    name: Optional[str] = None
    service: Optional[str] = None
    quote: Optional[str] = None
    rating: Optional[int] = 0
    image_name: Optional[str] = None

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: int
    class Config:
        from_attributes = True


class GalleryImageBase(BaseModel):
    file_name: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    is_magazine: Optional[bool] = False

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageUpdate(BaseModel):
    title: str
    description: Optional[str] = None

class GalleryImage(GalleryImageBase):
    id: int
    class Config:
        from_attributes = True


class ReservationBase(BaseModel):
    service: str
    date: str
    time: str
    name: str
    phone: str
    notes: Optional[str] = None

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


class ContactBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: str
    service: Optional[str] = None
    message: str

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True
