import os
import glob
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
from minio import Minio

# Load environment variables
load_dotenv()

MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "127.0.0.1:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "minioadmin")
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "zentonez")
MINIO_SECURE = os.getenv("MINIO_SECURE", "False").lower() in ("true", "1", "yes")

def import_minio_images():
    print(f"Connecting to MinIO at {MINIO_ENDPOINT} (secure={MINIO_SECURE})...")
    client = Minio(
        MINIO_ENDPOINT,
        access_key=MINIO_ACCESS_KEY,
        secret_key=MINIO_SECRET_KEY,
        secure=MINIO_SECURE
    )

    # 1. Create bucket if it doesn't exist
    if not client.bucket_exists(MINIO_BUCKET):
        print(f"Bucket '{MINIO_BUCKET}' does not exist. Creating it...")
        client.make_bucket(MINIO_BUCKET)
    else:
        print(f"Bucket '{MINIO_BUCKET}' already exists.")

    # 2. Make the bucket public so the frontend can read images directly
    print(f"Setting public read access policy on bucket '{MINIO_BUCKET}'...")
    policy = f'''{{
        "Version": "2012-10-17",
        "Statement": [
            {{
                "Effect": "Allow",
                "Principal": {{"AWS": ["*"]}},
                "Action": ["s3:GetObject"],
                "Resource": ["arn:aws:s3:::{MINIO_BUCKET}/*"]
            }}
        ]
    }}'''
    client.set_bucket_policy(MINIO_BUCKET, policy)

    # 3. Upload all images from the minio_export folder
    export_dir = "minio_export"
    if not os.path.exists(export_dir):
        print(f"Error: Directory '{export_dir}' not found!")
        return

    print("Uploading images to MinIO...")
    files = glob.glob(os.path.join(export_dir, "*"))
    for file_path in files:
        if os.path.isfile(file_path):
            file_name = os.path.basename(file_path)
            # Determine content type based on extension
            content_type = "image/png" if file_name.endswith(".png") else "image/webp"
            
            print(f"  Uploading {file_name}...")
            client.fput_object(
                MINIO_BUCKET,
                file_name,
                file_path,
                content_type=content_type
            )
            
    print("MinIO image import completed successfully!")

if __name__ == "__main__":
    import_minio_images()
