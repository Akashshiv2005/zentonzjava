import json
import os
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime
from app.database import engine, Base
from app.models import Promotion, Service, Testimonial, GalleryImage, Reservation, Contact, AdminUser

print("Setting up database tables...")
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

if not os.path.exists('zentonez_data.json'):
    print("Error: zentonez_data.json not found!")
    exit(1)

with open('zentonez_data.json', 'r') as f:
    data = json.load(f)

print("Clearing existing data...")
for table in reversed(Base.metadata.sorted_tables):
    session.execute(table.delete())
session.commit()

print("Importing data...")

for item in data.get('admin_users', []):
    session.add(AdminUser(**item))

for item in data.get('promotions', []):
    session.add(Promotion(**item))

for item in data.get('services', []):
    session.add(Service(**item))

for item in data.get('testimonials', []):
    session.add(Testimonial(**item))

for item in data.get('gallery', []):
    session.add(GalleryImage(**item))

for item in data.get('reservations', []):
    if item.get('reservation_date') and isinstance(item['reservation_date'], str):
        item['reservation_date'] = datetime.fromisoformat(item['reservation_date']).date()
    session.add(Reservation(**item))

for item in data.get('contacts', []):
    session.add(Contact(**item))

session.commit()
print("Database imported successfully!")
