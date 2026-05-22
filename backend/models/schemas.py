from pydantic import BaseModel
from typing import Optional

class AnalysisResult(BaseModel):
    exercise_type: str
    original_video: str
    processed_video: str
    score: int
    feedback: str
    status: str
