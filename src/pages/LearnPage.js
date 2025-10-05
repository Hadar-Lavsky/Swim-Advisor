import React, { useState, useEffect } from 'react';
import { Search, Filter, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnPage = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [filters, setFilters] = useState({
    style: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Common swimming problems data
  const problemData = [
    {
      id: 1,
      title: "Body Sinks While Swimming",
      style: "general",
      description: "Your hips and legs drop below the surface, creating drag and making swimming difficult.",
      solutions: [
        "Keep your head and eyes looking down at the bottom of the pool",
        "keep air in your lungs",
        "try the hips come up out of the water"
      ],
      relatedVideos: [
        { title: "Body Position Basics", youtubeId: "wLSBRflOGCU" },
        { title: "Streamline", youtubeId: "Ij0QS8R-F8s" }
      ]
    },
    {
      id: 2,
      title: "Legs Sink in Breaststroke",
      style: "breaststroke",
      description: "When you bend your knees too much during the kick, your thighs push downward and cause your hips and legs to sink, creating drag.",
      solutions: [
        "Bring your heels toward your hips, not your chest",
        "Keep knees closer together and under the water surface",
        "Practice whip kick with a kickboard to maintain correct form"
      ],
      relatedVideos: [
        { title: "Breaststroke Kick Fundamentals", youtubeId: "v61nEYUb5_0" },
      ]
    },
    {
      id: 3,
      title: "Legs Sink in Freestyle",
      style: "freestyle",
      description: "When you push off the wall, your legs sink down, creating drag and slowing you down.",
      solutions: [
        "Use a proper kick (from hips) and avoid stiff knees",
        "Think of your legs like two sticks moving up and down close together",
      ],
      relatedVideos: [
        { title: "Flutter Kick", youtubeId: "OEzOWZYSjPI" },
      ]
    },
    {
      id: 4,
      title: "floating issues",
      style: "general",
      description: "Difficulty staying afloat on your without sinking.",
      solutions: [
        "Practice the water float tutorial",
        "make the exercises stepwise"
      ],
      relatedVideos: [
        { title: "Water float tutorial", youtubeId: "Pf8mGGRPiyM" },
        { title: "float basic", youtubeId: "wLSBRflOGCU" }
      ]
    },
    {
      id: 5,
      title: "Poor Freestyle Arm Entry",
      style: "freestyle",
      description: "Your hand enters the water incorrectly, causing splash and reducing efficiency.",
      solutions: [
        "Enter hand fingertips first, in line with your shoulder",
        "Reach forward fully before pulling back",
        "Keep your elbow higher than your hand during recovery"
      ],
      relatedVideos: [
        { title: "Freestyle Arm Entry", youtubeId: "OHjzgwUtfvU" }
      ]
    },
    {
      id: 6,
      title: "Backstroke Zigzag Pattern",
      style: "backstroke",
      description: "Swimming in a zigzag pattern instead of straight, hitting lane lines often.",
      solutions: [
        "Look straight up at a fixed point on the ceiling",
        "Keep your body rotation balanced on both sides",
        "Practice counting strokes to maintain center position"
      ],
      relatedVideos: [
        { title: "backstroke head position", youtubeId: "jyFAcJVXYcM" }
      ]
    },
    {
      id: 7,
      title: "water comfort issues",
      style: "",
      description: "scared to step into the water or anxious about swimming.",
      solutions: [
        "Practice in a shallow pool until comfortable",
        "Watch a water comfort tutorial",
        "recommend to train with a coach to build confidence"
      ],
      relatedVideos: [
        { title: "water comfort tutorial", youtubeId: "tgB8w_Fgrvc" }
      ]
    }
  ];

  const styleOptions = [
    { value: '', label: 'General' },
    { value: 'general', label: 'General Problems' },
    { value: 'freestyle', label: 'Freestyle' },
    { value: 'breaststroke', label: 'Breaststroke' },
    { value: 'backstroke', label: 'Backstroke' },
    { value: 'butterfly', label: 'Butterfly' }
  ];

  useEffect(() => {
    setProblems(problemData);
    setFilteredProblems(problemData);
  }, []);

  useEffect(() => {
    let filtered = problems.filter(problem => {
      const matchesStyle = !filters.style || problem.style === filters.style;
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStyle && matchesSearch;
    });

    setFilteredProblems(filtered);
  }, [problems, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      style: ''
    });
    setSearchTerm('');
  };

  const activeFilterCount = Object.values(filters).filter(filter => filter !== '').length;

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-penguin-dark mb-4">
          Common Swimming Problems
        </h1>
        <p className="text-xl text-gray-600">
          Learn simple solutions to improve your swimming technique
        </p>
      </div>

      {/* Search and Filter Bar - ContentPage Style */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              showFilters 
                ? 'bg-swim-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter size={20} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-penguin-orange text-white rounded-full px-2 py-1 text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Swimming Style
              </label>
              <select
                value={filters.style}
                onChange={(e) => handleFilterChange('style', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent bg-white"
              >
                {styleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-penguin-dark">
          {filteredProblems.length} Problem{filteredProblems.length !== 1 ? 's' : ''} Found
        </h2>
      </div>

      {/* Problems Grid */}
      {filteredProblems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredProblems.map(problem => (
            <div key={problem.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              {/* Title */}
              <h3 className="text-xl font-semibold text-penguin-dark mb-3">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {problem.description}
              </p>

              {/* Solutions */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Solutions:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                {problem.solutions.map((solution, index) => (
                <li key={index} className="marker:text-swim-blue-500">
                {solution}
                </li>
               ))}
              </ul>

              </div>

              {/* Related Videos */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Related Videos:</h4>
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No problems found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or selecting a different style
          </p>
        </div>
      )}

      
    </div>
  );
};

export default LearnPage;