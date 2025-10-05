import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Play, 
  Award,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react';

const AnalysisResults = ({ results }) => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    breakdown: false,
    recommendations: true,
    technical: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-penguin-dark">
                Analysis Complete
              </h2>
              <p className="text-sm text-gray-600">
                {formatTimestamp(results.timestamp)}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-swim-blue-600 transition-colors">
              <Download size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-swim-blue-600 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-swim-blue-600 transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreColor(results.overall_score)} border-current mb-4`}>
            <span className="text-2xl font-bold">{results.overall_score}</span>
          </div>
          <h3 className="text-lg font-semibold text-penguin-dark mb-2">
            Overall Score: {getScoreLabel(results.overall_score)}
          </h3>
          <p className="text-gray-600">
            {results.video_info.stroke_type.charAt(0).toUpperCase() + results.video_info.stroke_type.slice(1)} • {results.video_info.duration}s • {results.video_info.frames_analyzed} frames
          </p>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="bg-white rounded-xl shadow-lg">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-swim-blue-600" />
            <h3 className="text-lg font-semibold text-penguin-dark">Quick Overview</h3>
          </div>
          {expandedSections.overview ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {expandedSections.overview && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(results.technique_analysis).map(([category, data]) => {
                const categoryName = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <div key={category} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{categoryName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(data.score)}`}>
                        {data.score}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          data.score >= 85 ? 'bg-green-500' : 
                          data.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-lg">
        <button
          onClick={() => toggleSection('breakdown')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-swim-blue-600" />
            <h3 className="text-lg font-semibold text-penguin-dark">Detailed Analysis</h3>
          </div>
          {expandedSections.breakdown ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {expandedSections.breakdown && (
          <div className="px-6 pb-6 space-y-6">
            {Object.entries(results.technique_analysis).map(([category, data]) => {
              const categoryName = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
              return (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-penguin-dark">{categoryName}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(data.score)}`}>
                      {data.score}/100
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div>
                      <h5 className="flex items-center text-sm font-medium text-green-700 mb-2">
                        <CheckCircle size={16} className="mr-1" />
                        Strengths
                      </h5>
                      <ul className="space-y-1">
                        {data.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-green-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Issues */}
                    <div>
                      <h5 className="flex items-center text-sm font-medium text-red-700 mb-2">
                        <AlertCircle size={16} className="mr-1" />
                        Areas for Improvement
                      </h5>
                      <ul className="space-y-1">
                        {data.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg">
        <button
          onClick={() => toggleSection('recommendations')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-swim-blue-600" />
            <h3 className="text-lg font-semibold text-penguin-dark">Personalized Recommendations</h3>
          </div>
          {expandedSections.recommendations ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {expandedSections.recommendations && (
          <div className="px-6 pb-6 space-y-6">
            {/* Immediate Fixes */}
            <div>
              <h4 className="font-semibold text-penguin-dark mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-red-500" />
                Quick Fixes (Try Today)
              </h4>
              <div className="space-y-2">
                {results.recommendations.immediate_fixes.map((fix, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm">{fix}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drill Suggestions */}
            <div>
              <h4 className="font-semibold text-penguin-dark mb-3 flex items-center">
                <Play className="w-4 h-4 mr-2 text-blue-500" />
                Recommended Drills
              </h4>
              <div className="grid gap-4">
                {results.recommendations.drill_suggestions.map((drill, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-blue-800">{drill.name}</h5>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                        {drill.duration}
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm mb-2">{drill.description}</p>
                    <p className="text-blue-600 text-xs">
                      <strong>Focus:</strong> {drill.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Plan */}
            <div>
              <h4 className="font-semibold text-penguin-dark mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-500" />
                4-Week Training Plan
              </h4>
              <div className="grid gap-3">
                {Object.entries(results.recommendations.training_plan).map(([week, plan]) => (
                  <div key={week} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded font-medium">
                        {week.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-green-700 text-sm">{plan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Technical Details */}
      <div className="bg-white rounded-xl shadow-lg">
        <button
          onClick={() => toggleSection('technical')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-swim-blue-600" />
            <h3 className="text-lg font-semibold text-penguin-dark">Technical Analysis</h3>
          </div>
          {expandedSections.technical ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {expandedSections.technical && (
          <div className="px-6 pb-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pose Analysis */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">AI Pose Detection</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Key points detected:</span>
                    <span className="font-medium">{results.pose_analysis.key_points_detected}/33</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence score:</span>
                    <span className="font-medium">{(results.pose_analysis.confidence_score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stroke count:</span>
                    <span className="font-medium">{results.pose_analysis.stroke_count}</span>
                  </div>
                </div>
              </div>

              {/* Body Angles */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Body Angles</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(results.pose_analysis.body_angles).map(([angle, value]) => (
                    <div key={angle} className="flex justify-between">
                      <span className="text-gray-600">{angle.replace('_', ' ')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(results.efficiency_metrics).map(([metric, value]) => (
                  <div key={metric} className="bg-gray-50 rounded p-3 text-center">
                    <div className="text-lg font-bold text-penguin-dark">{value}</div>
                    <div className="text-xs text-gray-600">{metric.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Integration Note */}
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">
                🔬 AI Analysis Details
              </h4>
              <p className="text-sm text-purple-700">
                This analysis was generated using MediaPipe pose detection and OpenCV video processing. 
                The backend analyzed {results.video_info.frames_analyzed} frames to track body position, 
                stroke mechanics, and movement patterns in real-time.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-swim-blue-600 text-white py-3 px-6 rounded-lg hover:bg-swim-blue-700 transition-colors duration-200 font-medium">
          Download Full Report
        </button>
        <button className="flex-1 border border-swim-blue-600 text-swim-blue-600 py-3 px-6 rounded-lg hover:bg-swim-blue-50 transition-colors duration-200 font-medium">
          Analyze Another Video
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
