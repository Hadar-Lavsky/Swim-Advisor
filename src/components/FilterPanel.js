import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const filterOptions = {
    style: [
      { value: '', label: 'All Styles' },
      { value: 'freestyle', label: 'Freestyle' },
      { value: 'backstroke', label: 'Backstroke' },
      { value: 'breaststroke', label: 'Breaststroke' },
      { value: 'butterfly', label: 'Butterfly' },
      { value: 'survival', label: 'Survival' }
    ],
    technique: [
      { value: '', label: 'All Techniques' },
      { value: 'stroke-mechanics', label: 'Stroke Mechanics' },
      { value: 'body-position', label: 'Body Position' },
      { value: 'breathing', label: 'Breathing' },
      { value: 'arms', label: 'Arms & Pull' },
      { value: 'kick', label: 'Kick & Legs' },
      { value: 'timing', label: 'Timing & Coordination' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {Object.entries(filterOptions).map(([filterType, options]) => (
        <div key={filterType}>
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {filterType === 'technique' ? 'Technique Focus' : filterType}
          </label>
          <select
            value={filters[filterType]}
            onChange={(e) => handleFilterChange(filterType, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent bg-white"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
