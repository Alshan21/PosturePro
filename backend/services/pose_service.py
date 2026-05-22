import cv2
import mediapipe as mp
import numpy as np
import os
import uuid

BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Initialize the PoseLandmarker
options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path='pose_landmarker.task'),
    running_mode=VisionRunningMode.VIDEO
)

def calculate_angle(a, b, c):
    a = np.array(a) # First
    b = np.array(b) # Mid
    c = np.array(c) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
        
    return angle

def process_video(video_path: str, exercise_type: str) -> dict:
    """
    Processes the video, annotates it, saves the output, and returns posture metrics.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception("Could not open video file")

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30

    output_filename = f"{uuid.uuid4()}.mp4"
    output_path = os.path.join("processed", output_filename)
    
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    if not out.isOpened():
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    total_frames = 0
    correct_frames = 0
    mistakes = {
        "leaning_forward": 0,
        "shallow_depth": 0,
        "sagging_hips": 0,
        "high_hips": 0
    }
    
    # Define connections to draw skeleton
    connections = mp.solutions.pose.POSE_CONNECTIONS if hasattr(mp, 'solutions') else []
    
    with PoseLandmarker.create_from_options(options) as landmarker:
        frame_index = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            frame_timestamp_ms = int(1000 * frame_index / fps)
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
            pose_landmarker_result = landmarker.detect_for_video(mp_image, frame_timestamp_ms)
            
            annotated_image = frame.copy()
            
            if pose_landmarker_result.pose_landmarks:
                for pose_landmarks in pose_landmarker_result.pose_landmarks:
                    try:
                        total_frames += 1
                        is_frame_correct = True
                        feedback_txt = "Good Form"
                        
                        # Get key landmarks
                        hip = [pose_landmarks[23].x, pose_landmarks[23].y]
                        knee = [pose_landmarks[25].x, pose_landmarks[25].y]
                        ankle = [pose_landmarks[27].x, pose_landmarks[27].y]
                        shoulder = [pose_landmarks[11].x, pose_landmarks[11].y]
                        
                        knee_angle = calculate_angle(hip, knee, ankle)
                        back_angle = calculate_angle(shoulder, hip, knee)
                        body_angle = calculate_angle(shoulder, hip, ankle)

                        if exercise_type.lower() == 'squats':
                            if knee_angle < 120:
                                if back_angle < 75:
                                    is_frame_correct = False
                                    mistakes["leaning_forward"] += 1
                                    feedback_txt = "Incorrect: Back Too Bent"
                                elif knee_angle > 105:
                                    is_frame_correct = False
                                    mistakes["shallow_depth"] += 1
                                    feedback_txt = "Incorrect: Squat Deeper"
                                else:
                                    feedback_txt = "Correct Squat Depth"
                            else:
                                feedback_txt = "Standing/Descending"
                                
                        elif exercise_type.lower() == 'lunges':
                            if knee_angle < 130:
                                if back_angle < 80:
                                    is_frame_correct = False
                                    mistakes["leaning_forward"] += 1
                                    feedback_txt = "Incorrect: Leaning Forward"
                                elif knee_angle > 100:
                                    is_frame_correct = False
                                    mistakes["shallow_depth"] += 1
                                    feedback_txt = "Incorrect: Lunge Deeper"
                                else:
                                    feedback_txt = "Correct Lunge Form"
                            else:
                                feedback_txt = "Standing/Descending"
                                    
                        elif exercise_type.lower() == 'planks':
                            if body_angle < 165:
                                is_frame_correct = False
                                mistakes["sagging_hips"] += 1
                                feedback_txt = "Incorrect: Hip Position Too Low"
                            elif body_angle > 195:
                                is_frame_correct = False
                                mistakes["high_hips"] += 1
                                feedback_txt = "Incorrect: Hip Position Too High"
                            else:
                                feedback_txt = "Correct Plank Alignment"
                                
                        if is_frame_correct:
                            correct_frames += 1
                            color = (0, 255, 0) # Green for BGR
                        else:
                            color = (0, 0, 255) # Red for BGR
                            
                        # Draw feedback text with background for visibility
                        cv2.rectangle(annotated_image, (20, 30), (600, 80), (0,0,0), -1)
                        cv2.putText(annotated_image, feedback_txt, (30, 65), 
                                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, color, 3, cv2.LINE_AA)
                        
                        # Draw skeleton lines
                        if connections:
                            for connection in connections:
                                start_idx = connection[0]
                                end_idx = connection[1]
                                start_lm = pose_landmarks[start_idx]
                                end_lm = pose_landmarks[end_idx]
                                if start_lm.presence > 0.5 and end_lm.presence > 0.5:
                                    x1, y1 = int(start_lm.x * width), int(start_lm.y * height)
                                    x2, y2 = int(end_lm.x * width), int(end_lm.y * height)
                                    cv2.line(annotated_image, (x1, y1), (x2, y2), color, 4)

                        # Draw points
                        for landmark in pose_landmarks:
                            if landmark.presence > 0.5:
                                x = int(landmark.x * width)
                                y = int(landmark.y * height)
                                cv2.circle(annotated_image, (x, y), 6, color, -1)
                                cv2.circle(annotated_image, (x, y), 8, (255, 255, 255), 2)
                                
                    except Exception as e:
                        print("Error in frame analysis:", e)
                        
            out.write(annotated_image)
            frame_index += 1

    cap.release()
    out.release()
    
    score = 100
    if total_frames > 0:
        score = int((correct_frames / total_frames) * 100)
    elif total_frames == 0:
        score = 80
        
    status = "Correct" if score >= 70 else "Incorrect"
    
    major_mistake = max(mistakes, key=mistakes.get) if mistakes else None
    if major_mistake and mistakes[major_mistake] > 0:
        if major_mistake == "leaning_forward":
            final_feedback = "Your back was bending forward excessively. Keep your chest up and core engaged."
        elif major_mistake == "shallow_depth":
            final_feedback = "You are not reaching the full range of motion. Try to go deeper."
        elif major_mistake == "sagging_hips":
            final_feedback = "Your hips are dropping. Tighten your core and glutes."
        elif major_mistake == "high_hips":
            final_feedback = "Your hips are too high. Maintain a straight body line."
        else:
            final_feedback = "Needs improvement in form consistency."
    else:
        final_feedback = "Excellent form! Keep up the good work."
        
    return {
        "processed_video_path": f"processed/{os.path.basename(output_path)}",
        "score": score,
        "feedback": final_feedback,
        "status": status,
        "correct_frames": correct_frames,
        "total_frames": total_frames
    }
