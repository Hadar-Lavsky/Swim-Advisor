# Vision Analysis Backend Setup

This document explains how to set up the Python backend for the Vision Analysis feature.

## Overview

The Vision Analysis feature uses:
- **YOLO model.pt** - For object detection in video frames
- **OpenCV** - For frame extraction, motion analysis, edge detection, and color analysis
- **Python FastAPI** - Backend API server

## Prerequisites

- Python 3.8 or higher
- YOLO model file (`model.pt`) - Place in the backend directory

## Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install required packages:
```bash
pip install fastapi uvicorn python-multipart opencv-python ultralytics numpy
```

## Setup

1. **Place your YOLO model file**:
   - Copy your `model.pt` file to the backend directory
   - Or update `MODEL_PATH` in `backend_example.py` to point to your model location

2. **Configure CORS** (if needed):
   - Update `allow_origins` in `backend_example.py` to match your frontend URL

## Running the Backend

### Development Mode:
```bash
uvicorn backend_example:app --reload --port 8000
```

### Production Mode:
```bash
uvicorn backend_example:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST `/api/vision/analyze`
Upload and analyze a video file.

**Request:**
- `video`: Video file (multipart/form-data)
- `model_path`: Optional, defaults to "model.pt"

**Response:**
```json
{
  "analysis_id": "vision_1234567890",
  "timestamp": "2026-02-08T12:00:00",
  "video_info": {
    "filename": "swimming_video.mp4",
    "duration": 8.5,
    "total_frames": 255,
    "frames_analyzed": 255,
    "fps": 30.0
  },
  "yolo_analysis": {
    "model_used": "model.pt",
    "detections": [...],
    "total_detections": 156,
    "average_confidence": 0.92,
    "detected_classes": ["person", "swimming_pool"]
  },
  "opencv_analysis": {
    "frame_extraction": {...},
    "motion_analysis": {...},
    "color_analysis": {...},
    "edge_detection": {...}
  },
  "conclusions": {
    "swimmer_detected": true,
    "detection_confidence": 0.95,
    "analysis_quality": "high",
    "recommendations": [...],
    "technical_notes": [...]
  },
  "processing_metrics": {
    "total_processing_time": 12.5,
    "frame_processing_rate": 20.4,
    "yolo_inference_time": 8.2,
    "opencv_processing_time": 4.3
  }
}
```

### GET `/api/vision/status/{job_id}`
Get status of an analysis job (for async processing).

### GET `/`
Health check endpoint.

## Frontend Configuration

In your React app, set the environment variable:

```bash
# .env
REACT_APP_VISION_API_URL=http://localhost:8000
```

Or update `src/api/visionApi.js` to use your backend URL.

## Processing Flow

1. **Video Upload**: Frontend sends video file to `/api/vision/analyze`
2. **Frame Extraction**: Backend uses OpenCV to extract frames from video
3. **YOLO Analysis**: Each frame is analyzed with YOLO model.pt for object detection
4. **OpenCV Processing**: 
   - Motion analysis using optical flow
   - Color analysis for water clarity
   - Edge detection for feature extraction
5. **Conclusion Generation**: Results from YOLO and OpenCV are combined to generate recommendations
6. **Response**: Comprehensive analysis results are returned to frontend

## Troubleshooting

### YOLO Model Not Found
- Ensure `model.pt` exists in the backend directory
- Check `MODEL_PATH` variable in `backend_example.py`
- The backend will still work but return mock YOLO results

### CORS Errors
- Update `allow_origins` in the CORS middleware to include your frontend URL
- Ensure backend is running and accessible

### Video Processing Errors
- Check video format (supports .mp4, .mov, .avi)
- Ensure video file is not corrupted
- Check OpenCV installation: `python -c "import cv2; print(cv2.__version__)"`

### Performance Issues
- For large videos, consider implementing async processing with job queues
- Reduce frame extraction rate for faster processing
- Use GPU acceleration for YOLO if available

## Next Steps

- Implement async job processing for large videos
- Add video format conversion support
- Add progress tracking via WebSockets
- Implement result caching
- Add authentication/authorization
