import os
import hashlib
import jwt
import datetime
from fastapi import Header, HTTPException

# Uses environment variable if available,
# otherwise falls back to default local secret
SECRET_KEY = os.getenv("SECRET_KEY", "POSTURE_PRO_SUPER_SECRET")

def hash_password(password: str) -> str:
    # Static salt for hashing
    salt = "posture_salt_123"

    db_password = password + salt

    h = hashlib.sha256(db_password.encode())

    return h.hexdigest()


def create_jwt(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def decode_jwt(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired"
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


def get_current_user_email(
    authorization: str = Header(None)
) -> str:

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    try:
        token = authorization.split(" ")[1]

        payload = decode_jwt(token)

        return payload["email"]

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format"
        )