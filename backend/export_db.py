import json
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.models import Base, Promotion, Service, Testimonial, GalleryImage, Reservation, Contact, AdminUser

engine = create_engine('postgresql://postgres:1234@localhost:5432/zentonez')
Session = sessionmaker(bind=engine)
session = Session()

data = {
    'promotions': [p.__dict__ for p in session.query(Promotion).all()],
    'services': [s.__dict__ for s in session.query(Service).all()],
    'testimonials': [t.__dict__ for t in session.query(Testimonial).all()],
    'gallery': [g.__dict__ for g in session.query(GalleryImage).all()],
    'reservations': [r.__dict__ for r in session.query(Reservation).all()],
    'contacts': [c.__dict__ for c in session.query(Contact).all()],
    'admin_users': [a.__dict__ for a in session.query(AdminUser).all()],
}

# Remove SQLAlchemy state
for key in data:
    for item in data[key]:
        if '_sa_instance_state' in item:
            del item['_sa_instance_state']

with open('zentonez_data.json', 'w') as f:
    json.dump(data, f, indent=4, default=str)

print("Database exported successfully to zentonez_data.json")
