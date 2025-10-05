import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Video, FileVideo, Clock, Loader, Zap } from 'lucide-react';

const VideoPreview = ({ file, onReset, onAnalyze, isAnalyzing, uploadProgress }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const isOptimalDuration = duration >= 5 && duration <= 10;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-swim-blue-100 rounded-lg">
              <Video className="w-5 h-5 text-swim-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-penguin-dark">
                Video Preview
              </h3>
              <p className="text-sm text-gray-600">{file.name}</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="p-6">
        <div className="relative bg-black rounded-lg overflow-hidden mb-4">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-auto max-h-96"
            onLoadedMetadata={handleVideoLoad}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            controls={false}
            playsInline
          >
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center group">
            <button
              onClick={handlePlayPause}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-penguin-dark p-4 rounded-full shadow-lg transition-all duration-200 transform group-hover:scale-110"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
          </div>

          {/* Video Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm font-mono">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 bg-gray-600 rounded-full h-1">
                <div 
                  className="bg-swim-blue-500 h-1 rounded-full transition-all duration-100"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-white text-sm font-mono">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileVideo className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">File Size</span>
            </div>
            <p className="text-gray-600">{getFileSize(file.size)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Duration</span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-gray-600">{formatTime(duration)}</p>
              {duration > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isOptimalDuration 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {isOptimalDuration ? 'Optimal' : 'Check length'}
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Video className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Format</span>
            </div>
            <p className="text-gray-600">{file.type.split('/')[1].toUpperCase()}</p>
          </div>
        </div>

        {/* Duration Warning */}
        {duration > 0 && !isOptimalDuration && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">
                  Duration Recommendation
                </h4>
                <p className="text-yellow-700 text-sm">
                  {duration < 5 
                    ? 'Your video is shorter than 5 seconds. For best analysis results, we recommend 5-10 seconds showing 2-3 complete stroke cycles.'
                    : 'Your video is longer than 10 seconds. The analysis will focus on the first 10 seconds of your video.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 mx-auto ${
              isAnalyzing
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-swim-blue-600 text-white hover:bg-swim-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                <span>Analyze My Swimming</span>
              </>
            )}
          </button>

          {isAnalyzing && (
            <p className="text-sm text-gray-600 mt-2">
              This may take 30-60 seconds depending on video length
            </p>
          )}
        </div>

        {/* Backend Integration Note */}
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">
            🔧 Development Integration Point
          </h4>
          <p className="text-sm text-purple-700">
            <strong>Backend Connection:</strong> This "Analyze" button will send the video file to 
            the Python FastAPI endpoint at <code>/api/analyze</code> when the backend is integrated. 
            The FastAPI server will use MediaPipe for pose detection and OpenCV for video processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
