import os
from minio import Minio
# pyrefly: ignore [missing-import]
from fastapi import UploadFile
import uuid
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Minio Configuration (defaults that can be overridden by env vars)
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "localhost:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "minioadmin")
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "zentonez")

# Use False for HTTP (localhost), True for HTTPS
MINIO_SECURE = os.getenv("MINIO_SECURE", "False").lower() == "true"

try:
    minio_client = Minio(
        MINIO_ENDPOINT,
        access_key=MINIO_ACCESS_KEY,
        secret_key=MINIO_SECRET_KEY,
        secure=MINIO_SECURE
    )
    
    # Create bucket if it doesn't exist
    if not minio_client.bucket_exists(MINIO_BUCKET):
        minio_client.make_bucket(MINIO_BUCKET)
        logger.info(f"Created MinIO bucket: {MINIO_BUCKET}")
except Exception as e:
    logger.error(f"Failed to initialize MinIO client: {e}")
    minio_client = None


class MinioService:
    @staticmethod
    def store_file(file: UploadFile) -> str:
        if not minio_client:
            raise Exception("MinIO client is not initialized.")
        
        file_ext = os.path.splitext(file.filename)[1] if file.filename else ""
        unique_filename = f"{uuid.uuid4().hex}{file_ext}"
        
        # FastAPI UploadFile has a 'size' attribute in newer versions. 
        # Alternatively, we can use length=-1 and part_size=10*1024*1024 for unknown size.
        file_size = file.size if file.size is not None else -1
        
        minio_client.put_object(
            MINIO_BUCKET,
            unique_filename,
            file.file,
            length=file_size,
            part_size=10*1024*1024 if file_size == -1 else 0,
            content_type=file.content_type
        )
        return unique_filename

    @staticmethod
    def get_file_url(filename: str) -> str:
        # In a real setup, this might return a pre-signed URL or proxy the file
        # Here we assume the bucket is public or we proxy via FastAPI
        return filename

class WhatsappNotificationService:
    @staticmethod
    def send_reservation_notification(reservation):
        logger.info(f"Sending WhatsApp notification for reservation: {reservation.name} for {reservation.service}")

    @staticmethod
    def send_contact_notification(contact):
        logger.info(f"Sending WhatsApp notification for contact from: {contact.name}")
