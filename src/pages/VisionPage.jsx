import React, { useState, useMemo } from 'react';
import { Upload, Eye, Loader, AlertCircle, CheckCircle, Video, Zap, Target, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoUpload from '../components/VideoUpload';
import VideoPreview from '../components/VideoPreview';
import { analyzeVideoWithVision, mockVisionAnalysis } from '../api/visionApi';
import SectionCard from '../components/SectionCard';
import PageHeader from '../components/PageHeader';
import { detectSwimmingProblems, getDefaultTips } from '../utils/swimmingProblems';

const VisionPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [useMock, setUseMock] = useState(true); // Toggle for mock/real API

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setAnalysisResults(null);
    setAnalysisError(null);
    setProgress(0);
    setProgressStage('');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResults(null);
    setProgress(0);
    setProgressStage('Initializing...');

    try {
      const analysisFunction = useMock ? mockVisionAnalysis : analyzeVideoWithVision;
      
      const results = await analysisFunction(selectedFile, (percent, stage) => {
        setProgress(percent);
        setProgressStage(stage || 'Processing...');
      });

      setAnalysisResults(results);
    } catch (error) {
      console.error('Vision analysis failed:', error);
      setAnalysisError(error.message || 'Failed to analyze video. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    setAnalysisError(null);
    setProgress(0);
    setProgressStage('');
    setIsAnalyzing(false);
  };

  const analysisStep = useMemo(() => {
    if (!selectedFile) return 'upload';
    if (isAnalyzing) return 'analyzing';
    if (analysisResults) return 'results';
    if (analysisError) return 'error';
    return 'preview';
  }, [selectedFile, isAnalyzing, analysisResults, analysisError]);

  // Detect problems from analysis results
  const detectedProblems = useMemo(() => {
    if (!analysisResults) return [];
    // Use detected_problems from API if available, otherwise detect from results
    if (analysisResults.detected_problems && analysisResults.detected_problems.length > 0) {
      return analysisResults.detected_problems;
    }
    return detectSwimmingProblems(analysisResults);
  }, [analysisResults]);

  // Get default tips if no problems detected
  const defaultTips = useMemo(() => {
    if (detectedProblems.length > 0) return [];
    return getDefaultTips();
  }, [detectedProblems]);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <PageHeader
        title="Vision Analysis"
        description="Upload your swimming video for YOLO model analysis and OpenCV processing"
      />

      {/* API Mode Toggle */}
      <div className="mb-6 flex justify-center">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useMock}
              onChange={(e) => setUseMock(e.target.checked)}
              className="w-4 h-4 text-swim-blue-600 rounded focus:ring-swim-blue-500"
            />
            <span className="text-sm text-gray-700">
              {useMock ? 'Using Mock API (Development)' : 'Using Real API (Production)'}
            </span>
          </label>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {/* Step 1: Upload */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            analysisStep === 'upload' ? 'bg-swim-blue-100 text-swim-blue-700' : 
            selectedFile ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            <Upload size={20} />
            <span className="font-medium">Upload</span>
          </div>

          <div className="text-gray-400">→</div>

          {/* Step 2: Preview */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            analysisStep === 'preview' ? 'bg-swim-blue-100 text-swim-blue-700' : 
            analysisStep === 'analyzing' || analysisStep === 'results' ? 'bg-green-100 text-green-700' : 
            'bg-gray-100 text-gray-500'
          }`}>
            <Video size={20} />
            <span className="font-medium">Preview</span>
          </div>

          <div className="text-gray-400">→</div>

          {/* Step 3: Analyze */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            analysisStep === 'analyzing' ? 'bg-swim-blue-100 text-swim-blue-700' : 
            analysisStep === 'results' ? 'bg-green-100 text-green-700' : 
            'bg-gray-100 text-gray-500'
          }`}>
            {analysisStep === 'analyzing' ? <Loader size={20} className="animate-spin" /> : <Eye size={20} />}
            <span className="font-medium">Analyze</span>
          </div>

          <div className="text-gray-400">→</div>

          {/* Step 4: Results */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            analysisStep === 'results' ? 'bg-green-100 text-green-700' : 
            'bg-gray-100 text-gray-500'
          }`}>
            <CheckCircle size={20} />
            <span className="font-medium">Results</span>
          </div>
        </div>
      </div>

      {/* Detected Problems Section - Show by default when results available */}
      {analysisResults && (detectedProblems.length > 0 || defaultTips.length > 0) && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-penguin-dark mb-4">
            {detectedProblems.length > 0 ? 'Detected Issues & Tips' : 'General Tips for Improvement'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(detectedProblems.length > 0 ? detectedProblems : defaultTips).map((problem) => (
              <SectionCard 
                key={problem.id || problem.title} 
                padding="p-6" 
                className="hover:shadow-xl transition-shadow duration-200"
              >
                {/* Title */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-penguin-dark">
                    {problem.title}
                  </h3>
                  {problem.confidence && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                      {Math.round(problem.confidence * 100)}% match
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {problem.description}
                </p>

                {/* Solutions/Tips */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    Tips to Fix:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                    {problem.solutions.map((solution, index) => (
                      <li key={index} className="marker:text-swim-blue-500">
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Videos */}
                {problem.relatedVideos && problem.relatedVideos.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      Related Videos:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {problem.relatedVideos.map((video, index) => (
                        <Link
                          key={index}
                          to={`/content?video=${video.youtubeId}`}
                          className="inline-flex items-center space-x-1 px-3 py-2 bg-swim-blue-50 text-swim-blue-600 rounded-lg hover:bg-swim-blue-100 transition-colors duration-200 text-sm"
                        >
                          <Play size={14} />
                          <span>{video.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </SectionCard>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upload/Preview */}
        <div className="lg:col-span-2">
          {!selectedFile ? (
            <VideoUpload onFileSelect={handleFileSelect} />
          ) : (
            <VideoPreview 
              file={selectedFile} 
              onReset={handleReset}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              uploadProgress={progress}
            />
          )}

          {/* Analysis Status */}
          {isAnalyzing && (
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Vision Analysis in Progress
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-blue-700 mb-2">
                  <span>{progressStage || 'Processing...'}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="text-sm text-blue-700 mt-4 flex items-center space-x-2">
                  <Zap className="w-4 h-4 shrink-0" />
                  <p>{progressStage || 'Processing...'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {analysisError && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">
                  Analysis Failed
                </h3>
              </div>
              <p className="text-red-700 mb-4">{analysisError}</p>
              <button
                onClick={() => setAnalysisError(null)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Info/Results */}
        <div className="lg:col-span-1">
          {analysisResults ? (
            <div className="space-y-4">
              {/* YOLO Analysis Results */}
              <SectionCard title="YOLO Analysis" padding="p-6" titleSize="text-xl">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Model Used:</span>
                    <span className="font-semibold text-swim-blue-600">
                      {analysisResults.yolo_analysis?.model_used || 'model.pt'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Detections:</span>
                    <span className="font-semibold">
                      {analysisResults.yolo_analysis?.total_detections || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Confidence:</span>
                    <span className="font-semibold">
                      {(analysisResults.yolo_analysis?.average_confidence * 100 || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Detected Classes:</p>
                    <div className="flex flex-wrap gap-2">
                      {(analysisResults.yolo_analysis?.detected_classes || []).map((cls, idx) => (
                        <span key={idx} className="px-2 py-1 bg-swim-blue-100 text-swim-blue-700 rounded text-xs font-medium">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* OpenCV Analysis Results */}
              <SectionCard title="OpenCV Analysis" padding="p-6" titleSize="text-xl">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frames Extracted:</span>
                    <span className="font-semibold">
                      {analysisResults.opencv_analysis?.frame_extraction?.frames_extracted || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Motion Detected:</span>
                    <span className="font-semibold">
                      {analysisResults.opencv_analysis?.motion_analysis?.optical_flow_detected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Clarity:</span>
                    <span className="font-semibold">
                      {(analysisResults.opencv_analysis?.color_analysis?.water_clarity_score * 100 || 0).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Edge Density:</span>
                    <span className="font-semibold">
                      {(analysisResults.opencv_analysis?.edge_detection?.edge_density * 100 || 0).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </SectionCard>

              {/* Conclusions */}
              <SectionCard title="Conclusions" padding="p-6" titleSize="text-xl">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {analysisResults.conclusions?.swimmer_detected ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      Swimmer Detected: {analysisResults.conclusions?.swimmer_detected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">Confidence:</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(analysisResults.conclusions?.detection_confidence || 0) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1 block">
                      {(analysisResults.conclusions?.detection_confidence * 100 || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="font-medium text-gray-800 mb-2">Recommendations:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {(analysisResults.conclusions?.recommendations || []).map((rec, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-swim-blue-600">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionCard>

              {/* Processing Metrics */}
              <SectionCard title="Processing Metrics" padding="p-6" titleSize="text-xl">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Time:</span>
                    <span className="font-semibold">
                      {analysisResults.processing_metrics?.total_processing_time?.toFixed(2) || 0}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">YOLO Inference:</span>
                    <span className="font-semibold">
                      {analysisResults.processing_metrics?.yolo_inference_time?.toFixed(2) || 0}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">OpenCV Processing:</span>
                    <span className="font-semibold">
                      {analysisResults.processing_metrics?.opencv_processing_time?.toFixed(2) || 0}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frame Rate:</span>
                    <span className="font-semibold">
                      {analysisResults.processing_metrics?.frame_processing_rate?.toFixed(1) || 0} fps
                    </span>
                  </div>
                </div>
              </SectionCard>
            </div>
          ) : (
            <SectionCard title="How Vision Analysis Works" padding="p-6" titleSize="text-xl">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Upload Video</h4>
                    <p className="text-sm text-gray-600">
                      Upload your swimming video (.mp4, .mov, .avi)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Frame Extraction</h4>
                    <p className="text-sm text-gray-600">
                      OpenCV extracts frames from your video for analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">YOLO Analysis</h4>
                    <p className="text-sm text-gray-600">
                      YOLO model.pt analyzes each frame to detect objects and swimmers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">OpenCV Processing</h4>
                    <p className="text-sm text-gray-600">
                      OpenCV provides motion analysis, edge detection, and color analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Get Conclusions</h4>
                    <p className="text-sm text-gray-600">
                      Receive comprehensive analysis results and recommendations
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">
                  🔧 Technical Stack
                </h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• YOLO model.pt for object detection</li>
                  <li>• OpenCV for video processing</li>
                  <li>• Python FastAPI backend</li>
                  <li>• Frame-by-frame analysis</li>
                </ul>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionPage;
