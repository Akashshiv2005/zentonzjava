from sqlalchemy import create_engine, text

engine = create_engine('postgresql://postgres:1234@localhost:5432/zentonez')

descriptions = {
    "Skin Care": "Advanced rituals for a timeless, youthful glow.",
    "Facial Treatment": "Finding harmony in the heart of artisanal beauty.",
    "Manicure Deluxe": "Precision couture for your delicate fingertips.",
    "Pedicure Care": "Relaxing and rejuvenating sole therapies.",
    "Hair Spa": "Bespoke artistry for the crown you never take off.",
    "Bridal Makeup": "Ethereal transformation for your biggest day.",
    "Nail Art": "Precision and detail for your fingertips.",
    "Lice Treatment": "Holistic and gentle care therapies.",
    "Zentonez Logo": "The mark of artisanal beauty.",
    
    "Glow Facial": "Transformative rituals for your skin.",
    "Hair Rejuvenation": "Premium hair care treatments.",
    "Bridal Look": "A timeless masterpiece.",
    "Acrylic Nails": "Fine art of beauty.",
    "Classic Manicure": "Bespoke nail artistry."
}

with engine.begin() as conn:
    for title, desc in descriptions.items():
        conn.execute(
            text("UPDATE gallery_images SET description = :desc WHERE title = :title"),
            {"desc": desc, "title": title}
        )
print("Updated descriptions successfully!")
