import motor.motor_asyncio
import os

MONGO_DETAILS = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
db = client.posture_pro
