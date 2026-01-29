from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import certifi

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

print(f"DEBUG: MONGO_URI loaded: {MONGO_URI}")

# Configure MongoDB client with SSL certificate bypass for development
# Note: tlsAllowInvalidCertificates=True bypasses SSL verification
client = AsyncIOMotorClient(
    MONGO_URI,
    tlsAllowInvalidCertificates=True,
    serverSelectionTimeoutMS=5000
)
db = client[DB_NAME]

async def get_database():
    return db
