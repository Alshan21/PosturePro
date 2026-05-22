from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from typing import List
import os
import shutil
from database.mongo import db
from models.schemas import AnalysisResult
from services.pose_service import process_video
from utils.auth import hash_password, create_jwt, get_current_user_email
from pydantic import BaseModel

router = APIRouter()

class UserAuthSchema(BaseModel):
    email: str
    password: str

@router.post("/register")
async def register(user: UserAuthSchema):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_pwd = hash_password(user.password)
    new_user = {
        "email": user.email,
        "password": hashed_pwd
    }
    await db.users.insert_one(new_user)
    token = create_jwt(user.email)
    return {"message": "User registered successfully", "token": token, "email": user.email}

@router.post("/login")
async def login(user: UserAuthSchema):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    if db_user["password"] != hash_password(user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    token = create_jwt(user.email)
    return {"message": "Login successful", "token": token, "email": user.email}

@router.post("/upload")
async def upload_video(
    file: UploadFile = File(...),
    exercise_type: str = Form(...),
    user_email: str = Depends(get_current_user_email)
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
        
    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    # Process video with AI
    try:
        result = process_video(file_location, exercise_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    # Save to DB
    new_analysis = {
        "user_email": user_email,
        "exercise_type": exercise_type,
        "original_video": file_location,
        "processed_video": result["processed_video_path"],
        "score": result["score"],
        "feedback": result["feedback"],
        "status": result["status"],
        "correct_frames": result.get("correct_frames", 0),
        "total_frames": result.get("total_frames", 0)
    }
    
    insert_result = await db.analyses.insert_one(new_analysis)
    new_analysis["_id"] = str(insert_result.inserted_id)
    
    return {"message": "Video processed successfully", "data": new_analysis}

@router.get("/analyses")
async def get_analyses(user_email: str = Depends(get_current_user_email)):
    analyses = []
    cursor = db.analyses.find({"user_email": user_email})
    async for document in cursor:
        document["_id"] = str(document["_id"])
        analyses.append(document)
    return {"data": analyses}
    
@router.get("/analyses/{analysis_id}")
async def get_analysis(analysis_id: str, user_email: str = Depends(get_current_user_email)):
    from bson import ObjectId
    try:
        document = await db.analyses.find_one({"_id": ObjectId(analysis_id), "user_email": user_email})
        if document:
            document["_id"] = str(document["_id"])
            return {"data": document}
        raise HTTPException(status_code=404, detail="Analysis not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")
