import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, RotateCcw, Loader, AlertCircle, CheckCircle, Video } from 'lucide-react';
import VideoUpload from '../components/VideoUpload';
import VideoPreview from '../components/VideoPreview';
import AnalysisResults from '../components/AnalysisResults';
import { analyzeVideo } from '../api/analyzeVideo';

const AnalyzePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setAnalysisResults(null);
    setAnalysisError(null);
    setUploadProgress(0);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResults(null);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Call the analysis API (currently mocked)
      // TODO: Replace with actual backend integration when Python FastAPI is ready
      const results = await analyzeVideo(selectedFile);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisError(error.message || 'Failed to analyze video. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    setAnalysisError(null);
    setUploadProgress(0);
    setIsAnalyzing(false);
  };

  const getAnalysisStep = () => {
    if (!selectedFile) return 'upload';
    if (isAnalyzing) return 'analyzing';
    if (analysisResults) return 'results';
    if (analysisError) return 'error';
    return 'preview';
  };

  const analysisStep = getAnalysisStep();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-penguin-dark mb-4">
          AI Swimming Analysis
        </h1>
        <p className="text-xl text-gray-600">
          Upload your swimming video for AI-powered technique analysis and personalized feedback
        </p>
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

          {/* Arrow */}
          <div className="text-gray-400">→</div>

          {/* Step 2: Preview */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            analysisStep === 'preview' ? 'bg-swim-blue-100 text-swim-blue-700' : 
            analysisStep === 'analyzing' || analysisStep === 'results' ? 'bg-green-100 text-green-700' : 
            'bg-gray-100 text-gray-500'
          }`}>
            <Play size={20} />
            <span className="font-medium">Preview</span>
          </div>

          {/* Arrow */}
          <div className="text-gray-400">→</div>

          {/* Step 3: Analyze */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            analysisStep === 'analyzing' ? 'bg-swim-blue-100 text-swim-blue-700' : 
            analysisStep === 'results' ? 'bg-green-100 text-green-700' : 
            'bg-gray-100 text-gray-500'
          }`}>
            {analysisStep === 'analyzing' ? <Loader size={20} className="animate-spin" /> : <Video size={20} />}
            <span className="font-medium">Analyze</span>
          </div>

          {/* Arrow */}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upload/Preview */}
        <div className="lg:col-span-2">
          {!selectedFile ? (
            /* Upload Component */
            <VideoUpload onFileSelect={handleFileSelect} />
          ) : (
            /* Preview Component */
            <VideoPreview 
              file={selectedFile} 
              onReset={handleReset}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              uploadProgress={uploadProgress}
            />
          )}

          {/* Analysis Status */}
          {isAnalyzing && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Analyzing Your Swimming Video
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-blue-700">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                
                <div className="text-sm text-blue-700 mt-4">
                  <p className="mb-2">🔍 Processing video frames...</p>
                  <p className="mb-2">🤖 Running AI analysis...</p>
                  <p>📊 Generating personalized feedback...</p>
                </div>
              </div>

              {/* Backend Integration Note */}
              <div className="mt-4 p-3 bg-blue-100 rounded border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  <strong>Development Note:</strong> This will connect to Python FastAPI backend 
                  with MediaPipe and OpenCV for real swimming analysis.
                </p>
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
            /* Analysis Results */
            <AnalysisResults results={analysisResults} />
          ) : (
            /* Info Panel */
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-penguin-dark mb-4">
                How It Works
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Upload Video</h4>
                    <p className="text-sm text-gray-600">
                      Upload a 5-10 second swimming video (.mp4, .mov)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">AI Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Our AI analyzes your stroke mechanics, body position, and timing
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-swim-blue-100 rounded-full flex items-center justify-center text-swim-blue-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Get Feedback</h4>
                    <p className="text-sm text-gray-600">
                      Receive personalized tips and drill recommendations
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  💡 Tips for Best Results
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Film from the side of the pool</li>
                  <li>• Include 2-3 complete stroke cycles</li>
                  <li>• Ensure good lighting and clear water</li>
                  <li>• Keep the swimmer in frame throughout</li>
                </ul>
              </div>

              {/* Backend Integration Note */}
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">
                  🚀 Coming Soon: AI Analysis
                </h4>
                <p className="text-sm text-purple-700">
                  Full integration with Python backend using MediaPipe for pose detection 
                  and OpenCV for video processing will provide real-time swimming analysis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
