import React, { useRef, useState, useCallback } from 'react';
import { Upload, Video, AlertCircle, FileVideo, X } from 'lucide-react';

const VideoUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  // Validate file type and size
  const validateFile = (file) => {
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a video file (.mp4, .mov, .avi)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 100MB';
    }

    return null;
  };

  const handleFile = (file) => {
    setError(null);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-penguin-dark mb-2">
          Upload Swimming Video
        </h2>
        <p className="text-gray-600">
          Upload a 5-10 second video of your swimming for AI analysis
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer ${
          dragActive
            ? 'border-swim-blue-500 bg-swim-blue-50'
            : 'border-gray-300 hover:border-swim-blue-400 hover:bg-swim-blue-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp4,.mov,.avi,video/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${
            dragActive ? 'bg-swim-blue-100' : 'bg-gray-100'
          }`}>
            <Upload className={`w-12 h-12 ${
              dragActive ? 'text-swim-blue-600' : 'text-gray-400'
            }`} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {dragActive ? 'Drop your video here' : 'Drag and drop your video here'}
            </h3>
            <p className="text-gray-600 mb-4">
              or click to browse your files
            </p>
            <button className="bg-swim-blue-600 text-white px-6 py-2 rounded-lg hover:bg-swim-blue-700 transition-colors duration-200 font-medium">
              Choose Video File
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Upload Error</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* File Requirements */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <FileVideo className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h4 className="font-medium text-gray-800 mb-1">Format</h4>
          <p className="text-sm text-gray-600">MP4, MOV, AVI</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Video className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h4 className="font-medium text-gray-800 mb-1">Duration</h4>
          <p className="text-sm text-gray-600">5-10 seconds</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Upload className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h4 className="font-medium text-gray-800 mb-1">Size</h4>
          <p className="text-sm text-gray-600">Max 100MB</p>
        </div>
      </div>

      {/* Sample Video Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-3 flex items-center">
          <Video className="w-5 h-5 mr-2" />
          Recording Tips for Best Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <span>Film from the side of the pool</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <span>Include 2-3 complete stroke cycles</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <span>Ensure swimmer stays in frame</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <span>Use good lighting and clear water</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
