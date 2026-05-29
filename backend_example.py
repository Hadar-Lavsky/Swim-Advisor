"""
Python FastAPI Backend for Vision Analysis
This backend handles video upload, frame extraction, YOLO analysis, and OpenCV processing

Requirements:
    pip install fastapi uvicorn python-multipart opencv-python ultralytics numpy

Usage:
    uvicorn backend_example:app --reload --port 8000
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from ultralytics import YOLO
import os
import tempfile
from typing import Optional
import time
from datetime import datetime

MODEL_PATH = "model.pt"
yolo_model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global yolo_model
    try:
        if os.path.exists(MODEL_PATH):
            yolo_model = YOLO(MODEL_PATH)
            print(f"✅ YOLO model loaded successfully from {MODEL_PATH}")
        else:
            print(f"⚠️  Warning: {MODEL_PATH} not found. Using placeholder.")
    except Exception as e:
        print(f"❌ Error loading YOLO model: {e}")
    yield

app = FastAPI(title="Swim Advisor Vision API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_frames_opencv(video_path: str, fps: Optional[int] = None) -> list:
    """
    Extract frames from video using OpenCV
    
    Args:
        video_path: Path to video file
        fps: Optional FPS to extract frames at (None = extract all frames)
    
    Returns:
        List of frames (numpy arrays)
    """
    cap = cv2.VideoCapture(video_path)
    frames = []
    
    if not cap.isOpened():
        raise ValueError("Could not open video file")
    
    video_fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = 1
    if fps and fps < video_fps:
        frame_interval = int(video_fps / fps)
    
    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_count % frame_interval == 0:
            frames.append(frame)
        
        frame_count += 1
    
    cap.release()
    return frames, video_fps

def analyze_with_yolo(frames: list, model) -> dict:
    """
    Analyze frames using YOLO model
    
    Args:
        frames: List of frame numpy arrays
        model: YOLO model instance
    
    Returns:
        Dictionary with YOLO detection results
    """
    if model is None:
        # Return mock results if model not loaded
        return {
            "detections": [],
            "total_detections": 0,
            "average_confidence": 0.0,
            "detected_classes": []
        }
    
    all_detections = []
    detected_classes_set = set()
    confidences = []
    
    for idx, frame in enumerate(frames):
        # Run YOLO inference
        results = model(frame, verbose=False)
        
        frame_detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls_id = int(box.cls[0])
                confidence = float(box.conf[0])
                bbox = box.xyxy[0].tolist()
                
                # Get class name
                class_name = model.names[cls_id]
                detected_classes_set.add(class_name)
                
                frame_detections.append({
                    "class": class_name,
                    "confidence": confidence,
                    "bbox": bbox,
                    "class_id": cls_id
                })
                confidences.append(confidence)
        
        if frame_detections:
            all_detections.append({
                "frame_number": idx,
                "objects": frame_detections
            })
    
    return {
        "detections": all_detections,
        "total_detections": len(confidences),
        "average_confidence": np.mean(confidences) if confidences else 0.0,
        "detected_classes": list(detected_classes_set)
    }

def analyze_with_opencv(frames: list) -> dict:
    """
    Analyze frames using OpenCV for motion, color, and edge detection
    
    Args:
        frames: List of frame numpy arrays
    
    Returns:
        Dictionary with OpenCV analysis results
    """
    if len(frames) < 2:
        return {
            "frame_extraction": {"frames_extracted": len(frames)},
            "motion_analysis": {"optical_flow_detected": False},
            "color_analysis": {"water_clarity_score": 0.0},
            "edge_detection": {"edge_density": 0.0}
        }
    
    # Motion Analysis using Optical Flow
    prev_gray = cv2.cvtColor(frames[0], cv2.COLOR_BGR2GRAY)
    motion_vectors = 0
    motion_magnitudes = []
    
    for frame in frames[1:]:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
        magnitude = np.sqrt(flow[..., 0]**2 + flow[..., 1]**2)
        motion_magnitudes.append(np.mean(magnitude))
        motion_vectors += np.sum(magnitude > 1.0)  # Threshold for significant motion
        prev_gray = gray
    
    # Color Analysis
    sample_frame = frames[len(frames) // 2]
    hsv = cv2.cvtColor(sample_frame, cv2.COLOR_BGR2HSV)
    
    # Analyze water clarity (blue channel dominance)
    blue_mask = cv2.inRange(hsv, np.array([100, 50, 50]), np.array([130, 255, 255]))
    water_clarity = np.sum(blue_mask > 0) / (sample_frame.shape[0] * sample_frame.shape[1])
    
    # Edge Detection
    gray_frame = cv2.cvtColor(sample_frame, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray_frame, 50, 150)
    edge_density = np.sum(edges > 0) / (edges.shape[0] * edges.shape[1])
    
    return {
        "frame_extraction": {
            "method": "cv2.VideoCapture",
            "frames_extracted": len(frames),
            "extraction_rate": f"1 frame per {1.0/30:.3f}s"  # Assuming 30fps
        },
        "motion_analysis": {
            "optical_flow_detected": motion_vectors > 0,
            "motion_vectors": int(motion_vectors),
            "average_motion_magnitude": float(np.mean(motion_magnitudes)) if motion_magnitudes else 0.0
        },
        "color_analysis": {
            "dominant_colors": ["#0066CC", "#00CCFF", "#FFFFFF"],  # Simplified
            "water_clarity_score": float(water_clarity)
        },
        "edge_detection": {
            "edges_detected": edge_density > 0,
            "canny_threshold": [50, 150],
            "edge_density": float(edge_density)
        }
    }

def detect_swimming_problems(yolo_results: dict, opencv_results: dict, frame_height: int = 480) -> list:
    """
    Detect specific swimming problems based on YOLO and OpenCV analysis
    
    Returns list of detected problems with solutions (similar to Fixes page)
    """
    problems = []
    
    # Problem 1: Legs Sink in Freestyle
    avg_bbox_y = calculate_average_bbox_y(yolo_results.get("detections", []), frame_height)
    if avg_bbox_y > 0.6:  # Lower 40% of frame
        problems.append({
            "id": 3,
            "title": "Legs Sink in Freestyle",
            "style": "freestyle",
            "description": "When you push off the wall, your legs sink down, creating drag and slowing you down.",
            "solutions": [
                "Use a proper kick (from hips) and avoid stiff knees",
                "Think of your legs like two sticks moving up and down close together",
                "Press your chest down slightly to lift your hips"
            ],
            "relatedVideos": [
                {"title": "Flutter Kick", "youtubeId": "OEzOWZYSjPI"}
            ],
            "confidence": min(avg_bbox_y * 1.2, 1.0)
        })
    
    # Problem 2: Poor Freestyle Arm Entry
    edge_density = opencv_results.get("edge_detection", {}).get("edge_density", 0)
    if edge_density > 0.2:  # High edge density suggests splash
        problems.append({
            "id": 4,
            "title": "Poor Freestyle Arm Entry",
            "style": "freestyle",
            "description": "Your hand enters the water incorrectly, causing splash and reducing efficiency.",
            "solutions": [
                "Enter hand fingertips first, in line with your shoulder",
                "Reach forward fully before pulling back",
                "Keep your elbow higher than your hand during recovery"
            ],
            "relatedVideos": [
                {"title": "Freestyle Arm Entry", "youtubeId": "OHjzgwUtfvU"}
            ],
            "confidence": min(edge_density * 3, 1.0)
        })
    
    # Problem 3: Body Sinks While Swimming
    motion_mag = opencv_results.get("motion_analysis", {}).get("average_motion_magnitude", 0)
    if avg_bbox_y > 0.55 and motion_mag > 10:
        problems.append({
            "id": 1,
            "title": "Body Sinks While Swimming",
            "style": "general",
            "description": "Your hips and legs drop below the surface, creating drag and making swimming difficult.",
            "solutions": [
                "Keep your head and eyes looking down at the bottom of the pool",
                "Keep air in your lungs",
                "Try to get your hips to come up out of the water"
            ],
            "relatedVideos": [
                {"title": "Body Position Basics", "youtubeId": "wLSBRflOGCU"},
                {"title": "Streamline", "youtubeId": "Ij0QS8R-F8s"}
            ],
            "confidence": min((avg_bbox_y - 0.5) * 2 + (motion_mag / 20), 1.0)
        })
    
    # Sort by confidence
    problems.sort(key=lambda x: x.get("confidence", 0), reverse=True)
    return problems

def calculate_average_bbox_y(detections: list, frame_height: int = 480) -> float:
    """Calculate average Y position of bounding boxes (0-1, where 0 is top)"""
    if not detections:
        return 0.5

    total_y = 0
    count = 0

    for detection in detections:
        if "objects" in detection:
            for obj in detection["objects"]:
                if "bbox" in obj and len(obj["bbox"]) >= 4:
                    center_y = (obj["bbox"][1] + obj["bbox"][3]) / 2
                    total_y += center_y / frame_height
                    count += 1

    return total_y / count if count > 0 else 0.5

def generate_conclusions(yolo_results: dict, opencv_results: dict) -> dict:
    """
    Generate conclusions from YOLO and OpenCV analysis
    
    Args:
        yolo_results: YOLO analysis results
        opencv_results: OpenCV analysis results
    
    Returns:
        Dictionary with conclusions and recommendations
    """
    swimmer_detected = "person" in yolo_results.get("detected_classes", [])
    detection_confidence = yolo_results.get("average_confidence", 0.0)
    
    recommendations = []
    technical_notes = []
    
    if swimmer_detected:
        recommendations.append("Swimmer successfully detected in video")
    else:
        recommendations.append("Swimmer not clearly detected - ensure good visibility")
    
    if detection_confidence > 0.8:
        recommendations.append("High detection confidence - good video quality")
    elif detection_confidence > 0.5:
        recommendations.append("Moderate detection confidence - consider better lighting")
    else:
        recommendations.append("Low detection confidence - improve video quality")
    
    if opencv_results.get("motion_analysis", {}).get("optical_flow_detected"):
        recommendations.append("Motion tracking is consistent")
    
    water_clarity = opencv_results.get("color_analysis", {}).get("water_clarity_score", 0.0)
    if water_clarity > 0.7:
        recommendations.append("Good water clarity detected")
    
    # Technical notes
    total_detections = yolo_results.get("total_detections", 0)
    frames_analyzed = opencv_results.get("frame_extraction", {}).get("frames_extracted", 0)
    
    if frames_analyzed > 0:
        detection_rate = total_detections / frames_analyzed
        technical_notes.append(
            f"YOLO detected objects in {detection_rate*100:.1f}% of frames"
        )
    
    technical_notes.append(
        f"OpenCV motion analysis shows {'consistent' if opencv_results.get('motion_analysis', {}).get('optical_flow_detected') else 'limited'} swimming pattern"
    )
    
    return {
        "swimmer_detected": swimmer_detected,
        "detection_confidence": detection_confidence,
        "analysis_quality": "high" if detection_confidence > 0.8 else "medium" if detection_confidence > 0.5 else "low",
        "recommendations": recommendations,
        "technical_notes": technical_notes
    }

@app.post("/api/vision/analyze")
async def analyze_video(video: UploadFile = File(...)):
    """
    Main endpoint for video analysis
    
    Process:
    1. Save uploaded video to temporary file
    2. Extract frames using OpenCV
    3. Analyze frames with YOLO model.pt
    4. Process with OpenCV for motion/color/edge analysis
    5. Generate conclusions
    6. Return comprehensive results
    """
    start_time = time.time()
    
    # Save uploaded video to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
        tmp_path = tmp_file.name
        content = await video.read()
        tmp_file.write(content)
    
    try:
        # Step 1: Extract frames with OpenCV
        print("📹 Extracting frames with OpenCV...")
        frames, video_fps = extract_frames_opencv(tmp_path)
        
        if not frames:
            raise HTTPException(status_code=400, detail="Could not extract frames from video")
        
        # Step 2: Analyze with YOLO
        print("🤖 Analyzing frames with YOLO...")
        yolo_start = time.time()
        yolo_results = analyze_with_yolo(frames, yolo_model)
        yolo_time = time.time() - yolo_start
        
        # Step 3: Analyze with OpenCV
        print("⚡ Processing with OpenCV...")
        opencv_start = time.time()
        opencv_results = analyze_with_opencv(frames)
        opencv_time = time.time() - opencv_start
        
        # Step 4: Detect swimming problems
        print("🔍 Detecting swimming problems...")
        frame_height = frames[0].shape[0] if frames else 480
        detected_problems = detect_swimming_problems(yolo_results, opencv_results, frame_height)
        
        # Step 5: Generate conclusions
        print("👁️ Generating conclusions...")
        conclusions = generate_conclusions(yolo_results, opencv_results)
        
        total_time = time.time() - start_time
        
        # Get video duration
        cap = cv2.VideoCapture(tmp_path)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = frame_count / video_fps if video_fps > 0 else 0
        cap.release()
        
        # Compile results
        results = {
            "analysis_id": f"vision_{int(time.time())}",
            "timestamp": datetime.now().isoformat(),
            "video_info": {
                "filename": video.filename,
                "duration": round(duration, 2),
                "total_frames": frame_count,
                "frames_analyzed": len(frames),
                "fps": round(video_fps, 2)
            },
            "yolo_analysis": {
                "model_used": MODEL_PATH if yolo_model else "not_loaded",
                **yolo_results
            },
            "opencv_analysis": opencv_results,
            "conclusions": conclusions,
            "detected_problems": detected_problems,
            "processing_metrics": {
                "total_processing_time": round(total_time, 2),
                "frame_processing_rate": round(len(frames) / total_time, 2),
                "yolo_inference_time": round(yolo_time, 2),
                "opencv_processing_time": round(opencv_time, 2)
            }
        }
        
        return JSONResponse(content=results)
        
    except Exception as e:
        print(f"❌ Error processing video: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")
    
    finally:
        # Clean up temporary file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

@app.get("/api/vision/status/{job_id}")
async def get_analysis_status(job_id: str):
    """
    Get status of an analysis job (for async processing)
    Currently returns mock status - implement job queue if needed
    """
    return {
        "job_id": job_id,
        "status": "completed",
        "progress": 100
    }

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Swim Advisor Vision API",
        "status": "running",
        "yolo_model_loaded": yolo_model is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
