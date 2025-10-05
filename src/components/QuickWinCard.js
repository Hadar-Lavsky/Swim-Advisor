import React from 'react';
import { Clock, Zap, Target } from 'lucide-react';

const QuickWinCard = ({ quickWin }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'float-body-line': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'breathing': return 'bg-green-100 text-green-600 border-green-200';
      case 'arms': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'legs': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'immediate': return Zap;
      default: return Target;
    }
  };

  const ImpactIcon = getImpactIcon(quickWin.impact);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-swim-blue-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <ImpactIcon className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-penguin-dark">
              {quickWin.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Clock size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">{quickWin.timeNeeded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        {quickWin.description}
      </p>

      {/* Category Tag */}
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(quickWin.category)}`}>
          {quickWin.category.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        
        <div className="flex items-center space-x-1 text-green-600">
          <Zap size={16} />
          <span className="text-sm font-medium">{quickWin.impact}</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-4 bg-swim-blue-600 text-white py-2 px-4 rounded-lg hover:bg-swim-blue-700 transition-colors duration-200 font-medium">
        Try This Now
      </button>
    </div>
  );
};

export default QuickWinCard;
