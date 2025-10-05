import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Target, Play, BookOpen, AlertCircle } from 'lucide-react';

const ProblemCard = ({ problem, getSeverityColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'float-body-line': return Target;
      case 'arms': return Target;
      case 'legs': return Target;
      case 'breathing': return Target;
      default: return BookOpen;
    }
  };

  const CategoryIcon = getCategoryIcon(problem.category);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-swim-blue-100 rounded-lg">
              <CategoryIcon className="w-5 h-5 text-swim-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-penguin-dark">
                {problem.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(problem.severity)}`}>
                  {problem.severity}
                </span>
                <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>{problem.timeToFix}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {problem.description}
        </p>

        {/* Quick Fix */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Quick Fix</span>
          </div>
          <p className="text-green-700 text-sm">
            {problem.quickFix}
          </p>
        </div>

        {/* Symptoms Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <AlertCircle size={16} className="mr-1" />
            Common Symptoms
          </h4>
          <div className="flex flex-wrap gap-2">
            {problem.symptoms.slice(0, 2).map((symptom, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {symptom}
              </span>
            ))}
            {problem.symptoms.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                +{problem.symptoms.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-swim-blue-600 hover:text-swim-blue-700 font-medium transition-colors duration-200"
        >
          <span>{isExpanded ? 'Less Details' : 'More Details'}</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 bg-gray-50">
          {/* All Symptoms */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              All Symptoms
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {problem.symptoms.map((symptom, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Target size={16} className="mr-1" />
              Solutions & Drills
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {problem.solutions.map((solution, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{solution}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Videos */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Play size={16} className="mr-1" />
              Related Videos
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {problem.relatedVideos.map((video, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-2 text-left p-2 bg-white rounded border hover:bg-swim-blue-50 hover:border-swim-blue-300 transition-colors duration-200"
                >
                  <Play size={14} className="text-swim-blue-600" />
                  <span className="text-sm text-gray-700">{video}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
