import React from 'react';
import { Clock } from 'lucide-react';

const TrainingBlock = ({ block }) => {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-4 border border-sky-200 hover:border-sky-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-lg font-semibold text-gray-800">{block.name}</h4>
        <div className="flex items-center gap-1.5 text-sky-600 bg-white px-3 py-1 rounded-lg">
          <Clock size={16} />
          <span className="text-sm font-medium">{block.time}</span>
        </div>
      </div>
      
      
    </div>
  );
};

export default TrainingBlock;


