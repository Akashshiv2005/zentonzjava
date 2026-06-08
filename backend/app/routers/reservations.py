from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db
from ..utils import WhatsappNotificationService

router = APIRouter(prefix="/api/reservations", tags=["reservations"])

@router.post("/", response_model=schemas.Reservation)
def create_reservation(reservation: schemas.ReservationCreate, db: Session = Depends(get_db)):
    new_res = models.Reservation(**reservation.model_dump())
    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    
    WhatsappNotificationService.send_reservation_notification(new_res)
    return new_res

@router.get("/", response_model=List[schemas.Reservation])
def get_all_reservations(db: Session = Depends(get_db)):
    return db.query(models.Reservation).all()

@router.get("/booked-slots", response_model=List[str])
def get_booked_slots(service: str, date: str, db: Session = Depends(get_db)):
    # Simulating what the Java backend might do to find booked slots
    reservations = db.query(models.Reservation).filter(
        models.Reservation.service == service,
        models.Reservation.date == date
    ).all()
    return [r.time for r in reservations]
