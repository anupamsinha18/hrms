import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
print(f"DEBUG: Testing connection with URI: {MONGO_URI}")

if not MONGO_URI:
    print("ERROR: MONGO_URI not found in .env")
    exit(1)

try:
    # Use a short timeout to fail fast
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # The ismaster command is cheap and does not require auth.
    client.admin.command('ismaster')
    print("SUCCESS: Connection to MongoDB server successful!")
    
    # Check if we can list databases (requires auth)
    dbs = client.list_database_names()
    print(f"SUCCESS: authenticated. Databases: {dbs}")

except OperationFailure as e:
    print(f"Authentication failed: {e}")
except ConnectionFailure as e:
    print(f"Connection failed: {e}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
