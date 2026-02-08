// Vision Analysis API Service
// This service handles communication with the Python backend for YOLO + OpenCV analysis
// Backend: Python FastAPI with YOLO model.pt and OpenCV

const API_BASE_URL = process.env.REACT_APP_VISION_API_URL || 'http://localhost:8000';

/**
 * Analyzes a video using YOLO model and OpenCV
 * 
 * BACKEND PROCESS:
 * 1. Receives video file
 * 2. Extracts frames using OpenCV
 * 3. Analyzes frames with YOLO model.pt
 * 4. Uses OpenCV for additional analysis and conclusions
 * 5. Returns comprehensive analysis results
 * 
 * @param {File} videoFile - The video file to analyze
 * @param {Function} onProgress - Progress callback (percent, stage)
 * @returns {Promise<Object>} Analysis results with YOLO detections and OpenCV conclusions
 */
export const analyzeVideoWithVision = async (videoFile, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('model_path', 'model.pt'); // YOLO model path
    formData.append('analysis_type', 'yolo_opencv');

    // Use XMLHttpRequest for progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const uploadPercent = (event.loaded / event.total) * 50; // Upload is 50% of total
          onProgress?.(uploadPercent, 'Uploading video...');
        }
      });

      // Track processing progress (if backend sends progress updates)
      xhr.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const processPercent = 50 + (event.loaded / event.total) * 50; // Processing is remaining 50%
          onProgress?.(processPercent, 'Processing frames...');
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const results = JSON.parse(xhr.responseText);
            onProgress?.(100, 'Analysis complete!');
            resolve(results);
          } catch (error) {
            reject(new Error('Failed to parse response from server'));
          }
        } else {
          reject(new Error(`Analysis failed: ${xhr.statusText} (${xhr.status})`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error: Failed to connect to vision analysis server'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new Error('Request timeout: Analysis took too long'));
      });

      xhr.timeout = 300000; // 5 minutes timeout for video processing
      xhr.open('POST', `${API_BASE_URL}/api/vision/analyze`);
      xhr.send(formData);
    });

  } catch (error) {
    console.error('❌ Vision analysis failed:', error);
    throw new Error(`Failed to analyze video: ${error.message}`);
  }
};

/**
 * Gets the status of a vision analysis job
 * Used for polling long-running analysis jobs
 * 
 * @param {string} jobId - The analysis job ID
 * @returns {Promise<Object>} Analysis status and results if complete
 */
export const getVisionAnalysisStatus = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vision/status/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get analysis status: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to get vision analysis status:', error);
    throw error;
  }
};

/**
 * Mock implementation for development/testing
 * Returns sample YOLO + OpenCV analysis results
 */
export const mockVisionAnalysis = async (videoFile, onProgress) => {
  console.log('🎬 Mock Vision Analysis: Processing video file:', videoFile.name);
  console.log('📁 File size:', (videoFile.size / (1024 * 1024)).toFixed(2), 'MB');
  console.log('🎯 Analysis will use YOLO model.pt and OpenCV');

  // Simulate progress
  const stages = [
    { percent: 10, stage: 'Uploading video...' },
    { percent: 30, stage: 'Extracting frames with OpenCV...' },
    { percent: 50, stage: 'Loading YOLO model.pt...' },
    { percent: 70, stage: 'Analyzing frames with YOLO...' },
    { percent: 85, stage: 'Processing with OpenCV...' },
    { percent: 95, stage: 'Generating conclusions...' },
    { percent: 100, stage: 'Analysis complete!' }
  ];

  for (const { percent, stage } of stages) {
    onProgress?.(percent, stage);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Return mock analysis results matching expected backend format
  return {
    analysis_id: `vision_${Date.now()}`,
    timestamp: new Date().toISOString(),
    video_info: {
      filename: videoFile.name,
      duration: 8.5,
      total_frames: 255,
      frames_analyzed: 255,
      fps: 30
    },
    
    // YOLO Detection Results
    yolo_analysis: {
      model_used: 'model.pt',
      detections: [
        {
          frame_number: 45,
          objects: [
            {
              class: 'person',
              confidence: 0.95,
              bbox: [120, 80, 200, 350],
              class_id: 0
            },
            {
              class: 'swimming_pool',
              confidence: 0.88,
              bbox: [0, 200, 640, 480],
              class_id: 1
            }
          ]
        },
        {
          frame_number: 90,
          objects: [
            {
              class: 'person',
              confidence: 0.97,
              bbox: [150, 75, 230, 345],
              class_id: 0
            }
          ]
        }
      ],
      total_detections: 156,
      average_confidence: 0.92,
      detected_classes: ['person', 'swimming_pool']
    },

    // OpenCV Analysis Results
    opencv_analysis: {
      frame_extraction: {
        method: 'cv2.VideoCapture',
        frames_extracted: 255,
        extraction_rate: '1 frame per 0.033s'
      },
      motion_analysis: {
        optical_flow_detected: true,
        motion_vectors: 1240,
        average_motion_magnitude: 15.3
      },
      color_analysis: {
        dominant_colors: ['#0066CC', '#00CCFF', '#FFFFFF'],
        water_clarity_score: 0.85
      },
      edge_detection: {
        edges_detected: true,
        canny_threshold: [50, 150],
        edge_density: 0.23
      }
    },

    // Combined Conclusions
    conclusions: {
      swimmer_detected: true,
      detection_confidence: 0.95,
      analysis_quality: 'high',
      recommendations: [
        'Swimmer successfully detected in video',
        'Good video quality for analysis',
        'Motion tracking is consistent',
        'Consider filming from side angle for better analysis'
      ],
      technical_notes: [
        'YOLO model successfully identified person in 98% of frames',
        'OpenCV motion analysis shows consistent swimming pattern',
        'Edge detection confirms clear water visibility',
        'Color analysis indicates good lighting conditions'
      ]
    },

    // Performance Metrics
    processing_metrics: {
      total_processing_time: 12.5,
      frame_processing_rate: 20.4, // frames per second
      yolo_inference_time: 8.2,
      opencv_processing_time: 4.3
    }
  };
};

export default {
  analyzeVideoWithVision,
  getVisionAnalysisStatus,
  mockVisionAnalysis
};
