import React from 'react';
import { Waves, Lightbulb } from 'lucide-react';
import TrainingBlock from './TrainingBlock';

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300">
      {/* Exercise Title */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-100">
        <div className="p-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-md">
          <Waves className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {exercise.name}
        </h2>
      </div>

      {/* Awareness Cues */}
      {exercise.awareness && exercise.awareness.length > 0 && (
        <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-900">Awareness Cues</h3>
          </div>
          <ul className="space-y-2">
            {exercise.awareness.map((cue, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span className="text-sm md:text-base">{cue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Training Blocks */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-sky-500 rounded"></span>
          Training Session
        </h3>
        {exercise.blocks.map((block, index) => (
          <TrainingBlock key={index} block={block} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseCard;


