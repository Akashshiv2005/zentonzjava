import json
import os
import sys
from datetime import datetime
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import sessionmaker
from app.database import engine, Base
from app.models import Promotion, Service, Testimonial, GalleryImage, Reservation, Contact, AdminUser

def seed_database():
    print("Setting up database tables...")
    Base.metadata.create_all(bind=engine)

    Session = sessionmaker(bind=engine)
    session = Session()

    data_file = 'zentonez_data.json'
    if not os.path.exists(data_file):
        print(f"Error: {data_file} not found!")
        sys.exit(1)

    with open(data_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("Clearing existing data...")
    # Delete backwards to respect foreign keys if any
    for table in reversed(Base.metadata.sorted_tables):
        session.execute(table.delete())
    session.commit()

    print("Importing data from zentonez_data.json...")

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
        # Convert string date to datetime.date object
        if item.get('reservation_date') and isinstance(item['reservation_date'], str):
            item['reservation_date'] = datetime.fromisoformat(item['reservation_date']).date()
        session.add(Reservation(**item))

    for item in data.get('contacts', []):
        session.add(Contact(**item))

    try:
        session.commit()
        print("Data inserted successfully!")
    except Exception as e:
        session.rollback()
        print(f"Error inserting data: {e}")
        sys.exit(1)

    print("Fixing Postgres auto-increment sequences...")
    # Reset postgres sequences so new inserts don't fail with ID collisions
    tables = [
        'promotions', 
        'services', 
        'testimonials', 
        'reservations', 
        'contacts', 
        'gallery_images',
        'admin_users'
    ]
    
    from sqlalchemy import text

    try:
        for table in tables:
            query = f"SELECT setval(pg_get_serial_sequence('{table}', 'id'), coalesce(max(id),1), max(id) IS NOT null) FROM {table};"
            session.execute(text(query))
        session.commit()
        print("Sequences fixed successfully!")
    except Exception as e:
        session.rollback()
        print(f"Error fixing sequences: {e}")
        # Note: Will fail gracefully if not using Postgres
    finally:
        session.close()
        
    print("Database seeding is complete!")

if __name__ == "__main__":
    seed_database()
