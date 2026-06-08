import requests
import json

url = 'http://localhost:8081/api/services/'
existing_res = requests.get(url).json()
existing_titles = [s.get('title', '').lower() for s in existing_res]

services_to_add = [
    {'title': 'Artisan Hair Spa', 'category': 'Hair Health', 'price': '₹899+', 'description': '', 'duration': '45 - 60 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Premium Facial', 'category': 'Facial Treatment', 'price': '₹1,250+', 'description': '', 'duration': '60 - 90 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Skin Care Ritual', 'category': 'Skin Wellness', 'price': '₹400+', 'description': '', 'duration': '45 - 60 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Master Hair Styling', 'category': 'Hair Artistry', 'price': '₹1,500+', 'description': '', 'duration': '30 - 45 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Designer Nails', 'category': 'Nail Artistry', 'price': '₹1,500+', 'description': '', 'duration': '60 - 90 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Luxury Manicure', 'category': 'Nail Care', 'price': '₹599+', 'description': '', 'duration': '60 - 75 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Luxury Pedicure', 'category': 'Nail Care', 'price': '₹599+', 'description': '', 'duration': '60 - 75 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Lice Treatment', 'category': 'Scalp Care', 'price': '₹5,000+', 'description': '', 'duration': '45 - 60 Min', 'highlights': '', 'image_name': ''},
    {'title': 'Artisan Ear Piercing', 'category': 'Specialized Care', 'price': '₹299+', 'description': '', 'duration': '15 - 30 Min', 'highlights': '', 'image_name': ''}
]

added = 0
for s in services_to_add:
    if s['title'].lower() not in existing_titles:
        requests.post(url, data={'service': json.dumps(s)})
        added += 1

print(f"Added {added} new services")
