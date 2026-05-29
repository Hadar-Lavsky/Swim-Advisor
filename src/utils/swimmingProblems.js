/**
 * Swimming Problems Detection and Mapping
 * Maps YOLO/OpenCV analysis results to specific swimming problems with actionable tips
 */

// Common swimming problems database (matching LearnPage structure)
export const SWIMMING_PROBLEMS = [
  {
    id: 1,
    title: "Body Sinks While Swimming",
    style: "general",
    description: "Your hips and legs drop below the surface, creating drag and making swimming difficult.",
    solutions: [
      "Keep your head and eyes looking down at the bottom of the pool",
      "Keep air in your lungs",
      "Try to get your hips to come up out of the water"
    ],
    relatedVideos: [
      { title: "Body Position Basics", youtubeId: "wLSBRflOGCU" },
      { title: "Streamline", youtubeId: "Ij0QS8R-F8s" }
    ],
    detectionCriteria: {
      // Detect if body position is low (YOLO bbox center is low in frame)
      bodyPositionLow: true,
      // OpenCV motion analysis shows downward movement
      downwardMotion: true
    }
  },
  {
    id: 2,
    title: "Legs Sink in Breaststroke",
    style: "breaststroke",
    description: "When you bend your knees too much during the kick, your thighs push downward and cause your hips and legs to sink, creating drag.",
    solutions: [
      "Bring your heels toward your hips, not your chest",
      "Keep knees closer together and under the water surface",
      "Practice whip kick with a kickboard to maintain correct form"
    ],
    relatedVideos: [
      { title: "Breaststroke Kick Fundamentals", youtubeId: "v61nEYUb5_0" }
    ],
    detectionCriteria: {
      strokeType: "breaststroke",
      legPositionLow: true
    }
  },
  {
    id: 3,
    title: "Legs Sink in Freestyle",
    style: "freestyle",
    description: "When you push off the wall, your legs sink down, creating drag and slowing you down.",
    solutions: [
      "Use a proper kick (from hips) and avoid stiff knees",
      "Think of your legs like two sticks moving up and down close together",
      "Press your chest down slightly to lift your hips"
    ],
    relatedVideos: [
      { title: "Flutter Kick", youtubeId: "OEzOWZYSjPI" }
    ],
    detectionCriteria: {
      strokeType: "freestyle",
      legPositionLow: true,
      kickInconsistent: true
    }
  },
  {
    id: 4,
    title: "Poor Freestyle Arm Entry",
    style: "freestyle",
    description: "Your hand enters the water incorrectly, causing splash and reducing efficiency.",
    solutions: [
      "Enter hand fingertips first, in line with your shoulder",
      "Reach forward fully before pulling back",
      "Keep your elbow higher than your hand during recovery"
    ],
    relatedVideos: [
      { title: "Freestyle Arm Entry", youtubeId: "OHjzgwUtfvU" }
    ],
    detectionCriteria: {
      strokeType: "freestyle",
      armEntrySplash: true,
      armEntryAngle: "incorrect"
    }
  },
  {
    id: 5,
    title: "Backstroke Zigzag Pattern",
    style: "backstroke",
    description: "Swimming in a zigzag pattern instead of straight, hitting lane lines often.",
    solutions: [
      "Look straight up at a fixed point on the ceiling",
      "Keep your body rotation balanced on both sides",
      "Practice counting strokes to maintain center position"
    ],
    relatedVideos: [
      { title: "backstroke head position", youtubeId: "jyFAcJVXYcM" }
    ],
    detectionCriteria: {
      strokeType: "backstroke",
      lateralMovement: true
    }
  },
  {
    id: 6,
    title: "Head Position Too High",
    style: "general",
    description: "Your head is lifted too high, causing your hips and legs to sink.",
    solutions: [
      "Look straight down at the bottom of the pool",
      "Keep the back of your head in the water",
      "Imagine a line from the top of your head to your toes"
    ],
    relatedVideos: [
      { title: "Body Position Basics", youtubeId: "wLSBRflOGCU" }
    ],
    detectionCriteria: {
      headPositionHigh: true
    }
  },
  {
    id: 7,
    title: "Insufficient Body Rotation",
    style: "freestyle",
    description: "Not rotating your body enough during freestyle, reducing power and efficiency.",
    solutions: [
      "Rotate your shoulders and hips together",
      "Aim for 30-45 degrees of rotation on each side",
      "Practice side kicking drills to improve rotation"
    ],
    relatedVideos: [
      { title: "Body Rotation", youtubeId: "Ij0QS8R-F8s" }
    ],
    detectionCriteria: {
      strokeType: "freestyle",
      rotationInsufficient: true
    }
  }
];

/**
 * Detects swimming problems based on YOLO and OpenCV analysis results
 * 
 * @param {Object} analysisResults - Results from vision analysis
 * @returns {Array} Array of detected problems with confidence scores
 */
export const detectSwimmingProblems = (analysisResults) => {
  if (!analysisResults) return [];

  const detectedProblems = [];
  const yoloResults = analysisResults.yolo_analysis || {};
  const opencvResults = analysisResults.opencv_analysis || {};
  const conclusions = analysisResults.conclusions || {};

  // Detect stroke type (simplified - in real implementation, use pose detection)
  const detectedStroke = detectStrokeType(yoloResults, opencvResults);

  // Check each problem against detection criteria
  SWIMMING_PROBLEMS.forEach(problem => {
    let confidence = 0;
    let matchedCriteria = 0;
    let totalCriteria = 0;

    // Check if stroke type matches (if problem is stroke-specific)
    if (problem.style && problem.style !== 'general') {
      if (detectedStroke !== problem.style) {
        return; // Skip if stroke doesn't match
      }
    }

    // Check detection criteria
    const criteria = problem.detectionCriteria || {};

    // Body position low (legs sinking)
    if (criteria.bodyPositionLow || criteria.legPositionLow) {
      totalCriteria++;
      // Simulate detection based on YOLO bbox positions
      const avgBboxY = calculateAverageBboxY(yoloResults.detections || []);
      if (avgBboxY > 0.6) { // Lower 40% of frame
        matchedCriteria++;
        confidence += 0.3;
      }
    }

    // Head position high
    if (criteria.headPositionHigh) {
      totalCriteria++;
      const avgBboxY = calculateAverageBboxY(yoloResults.detections || []);
      if (avgBboxY < 0.3) { // Upper 30% of frame
        matchedCriteria++;
        confidence += 0.25;
      }
    }

    // Motion analysis checks
    if (criteria.downwardMotion) {
      totalCriteria++;
      const motionMag = opencvResults.motion_analysis?.average_motion_magnitude || 0;
      if (motionMag > 10) {
        matchedCriteria++;
        confidence += 0.2;
      }
    }

    // Arm entry splash (detected via edge density and motion)
    if (criteria.armEntrySplash) {
      totalCriteria++;
      const edgeDensity = opencvResults.edge_detection?.edge_density || 0;
      if (edgeDensity > 0.2) { // High edge density suggests splash
        matchedCriteria++;
        confidence += 0.25;
      }
    }

    // Rotation insufficient
    if (criteria.rotationInsufficient) {
      totalCriteria++;
      // Simplified: check if motion is mostly forward (low lateral variation)
      const motionVectors = opencvResults.motion_analysis?.motion_vectors || 0;
      if (motionVectors < 500) { // Low motion variation suggests minimal rotation
        matchedCriteria++;
        confidence += 0.2;
      }
    }

    // Lateral movement (zigzag)
    if (criteria.lateralMovement) {
      totalCriteria++;
      const motionMag = opencvResults.motion_analysis?.average_motion_magnitude || 0;
      if (motionMag > 15) { // High motion suggests lateral movement
        matchedCriteria++;
        confidence += 0.25;
      }
    }

    // If enough criteria matched, add problem
    if (matchedCriteria > 0 && confidence > 0.2) {
      detectedProblems.push({
        ...problem,
        confidence: Math.min(confidence, 1.0),
        matchedCriteria,
        totalCriteria,
        detectedStroke
      });
    }
  });

  // Sort by confidence (highest first)
  return detectedProblems.sort((a, b) => b.confidence - a.confidence);
};

/**
 * Detects stroke type from analysis results
 * Simplified detection - in production, use pose detection
 */
const detectStrokeType = (yoloResults, opencvResults) => {
  // Default to freestyle (most common)
  // In production, analyze arm movement patterns, kick patterns, etc.
  const detectedClasses = yoloResults.detected_classes || [];
  
  // Very simplified detection
  if (detectedClasses.includes('backstroke')) return 'backstroke';
  if (detectedClasses.includes('breaststroke')) return 'breaststroke';
  
  // Default to freestyle
  return 'freestyle';
};

/**
 * Calculates average Y position of bounding boxes (0-1, where 0 is top)
 */
const calculateAverageBboxY = (detections) => {
  if (!detections || detections.length === 0) return 0.5;

  let totalY = 0;
  let count = 0;

  detections.forEach(detection => {
    if (detection.objects && detection.objects.length > 0) {
      detection.objects.forEach(obj => {
        if (obj.bbox && obj.bbox.length >= 4) {
          // bbox format: [x1, y1, x2, y2] — normalized by backend before sending
          const centerY = (obj.bbox[1] + obj.bbox[3]) / 2;
          totalY += centerY;
          count++;
        }
      });
    }
  });

  return count > 0 ? totalY / count : 0.5;
};

/**
 * Gets default problems to show when no specific issues detected
 * These are general tips for improvement
 */
export const getDefaultTips = () => {
  return [
    {
      id: 'default-1',
      title: "Focus on Body Position",
      style: "general",
      description: "Maintain a horizontal body position with your head, hips, and feet aligned.",
      solutions: [
        "Keep your head in line with your spine",
        "Press your chest down slightly to lift your hips",
        "Keep your legs near the surface with a gentle kick"
      ],
      relatedVideos: [
        { title: "Body Position Basics", youtubeId: "wLSBRflOGCU" }
      ],
      isDefault: true
    },
    {
      id: 'default-2',
      title: "Improve Your Kick",
      style: "general",
      description: "A proper kick provides propulsion and helps maintain body position.",
      solutions: [
        "Kick from your hips, not your knees",
        "Keep your legs relatively straight with slight knee bend",
        "Use a small, fast kick rather than a big, slow one"
      ],
      relatedVideos: [
        { title: "Flutter Kick", youtubeId: "OEzOWZYSjPI" }
      ],
      isDefault: true
    },
    {
      id: 'default-3',
      title: "Work on Arm Technique",
      style: "freestyle",
      description: "Proper arm technique maximizes propulsion and efficiency.",
      solutions: [
        "Enter your hand fingertips first",
        "Reach forward fully before starting the pull",
        "Keep your elbow high during recovery"
      ],
      relatedVideos: [
        { title: "Freestyle Arm Entry", youtubeId: "OHjzgwUtfvU" }
      ],
      isDefault: true
    }
  ];
};
