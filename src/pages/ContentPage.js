import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock,} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import FilterPanel from '../components/FilterPanel';

const ContentPage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filters, setFilters] = useState({
    style: '',
    technique: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [highlightedVideo, setHighlightedVideo] = useState(null);
  const location = useLocation();


  
  const Videos = [
    {
      id: 1,
      title: "Breaststroke Kick Fundamentals",
      thumbnail: "https://img.youtube.com/vi/v61nEYUb5_0/maxresdefault.jpg",
      youtubeId: "v61nEYUb5_0",
      duration: "3:00",
      channel: "Chris Burton",
      style: "breaststroke",
      technique: "kick",
      level: "beginner",
      equipment: "none",
      description: "Basic dry land exercises for breaststroke."
    },
    {
      id: 2,
      title: "Breaststroke full movement",
      thumbnail: "https://img.youtube.com/vi/z2E1C9hWirY/maxresdefault.jpg",
      youtubeId: "z2E1C9hWirY",
      duration: "5:00",
      channel: "SwimUp",
      style: "breaststroke",
      technique: "arms",
      level: "beginner",
      equipment: "none",
      description: "Breaststroke arms and legs and movement."
    },
    {
      id: 3,
      title: "Body Position Basics",
      thumbnail: "https://img.youtube.com/vi/wLSBRflOGCU/maxresdefault.jpg",
      youtubeId: "wLSBRflOGCU",
      duration: "00:30",
      channel: "SwimLifePro",
      style: "all",
      technique: "body",
      level: "beginner",
      equipment: "none",
      description: "Floating basics."
    },
    {
      id: 4,
      title: "Streamline",
      thumbnail: "https://img.youtube.com/vi/Ij0QS8R-F8s/maxresdefault.jpg",
      youtubeId: "Ij0QS8R-F8s",
      duration: "1:00",
      channel: "Fares Ksebati",
      style: "all",
      technique: "body",
      level: "beginner",
      equipment: "none",
      description: "Improve your streamline."
    },
    {
      id: 5,
      title: "Freestyle Kick Fundamentals",
      thumbnail: "https://img.youtube.com/vi/OEzOWZYSjPI/maxresdefault.jpg",
      youtubeId: "OEzOWZYSjPI",
      duration: "2:30",
      channel: "Swim Technique",
      style: "breaststroke",
      technique: "kick",
      level: "beginner",
      equipment: "none",
      description: "freestyle kick basics."
    },
    {
      id: 6,
      title: "Freestyle common mistakes",
      thumbnail: "https://img.youtube.com/vi/LijdyVaaDnY/maxresdefault.jpg",
      youtubeId: "LijdyVaaDnY",
      duration: "9:30",
      channel: "Skills N' Talents",
      style: "freestyle",
      technique: "timing",
      level: "advanced",
      equipment: "none",
      description: "smooth swimming and common mistakes."
    },
    {
      id: 7,
      title: "Eggbeater",
      thumbnail: "https://img.youtube.com/vi/9LBF9DnZTF0/maxresdefault.jpg",
      youtubeId: "9LBF9DnZTF0",
      duration: "1:20",
      channel: "Peter Zamoyski",
      style: "survival",
      technique: "",
      level: "",
      equipment: "",
      description: "standing in the water."
    },


    {
      id: 8,
      title: "backstroke head position",
      thumbnail: "https://img.youtube.com/vi/jyFAcJVXYcM/maxresdefault.jpg",
      youtubeId: "jyFAcJVXYcM",
      duration: "2:30",
      channel: "SIKANA",
      style: "backstroke",
      technique: "",
      level: "",
      equipment: "",
      description: "20 Sec of example the rest exercises."
    },

    {
      id: 9,
      title: "Freestyle Arm Entry",
      thumbnail: "https://img.youtube.com/vi/OHjzgwUtfvU/maxresdefault.jpg",
      youtubeId: "OHjzgwUtfvU",
      duration: "2:30",
      channel: "SwimGym",
      style: "freestyle",
      technique: "",
      level: "",
      equipment: "",
      description: "."
    },
    {
      id: 10,
      title: "Water Comfort tutorial",
      thumbnail: "https://img.youtube.com/vi/tgB8w_Fgrvc/maxresdefault.jpg",
      youtubeId: "tgB8w_Fgrvc",
      duration: "6:30",
      channel: "Splash Foundation",
      style: "all",
      technique: "",
      level: "",
      equipment: "",
      description: "great for beginners who are afraid of water."
    },


    {
      id: 11,
      title: "Water float tutorial",
      thumbnail: "https://img.youtube.com/vi/Pf8mGGRPiyM/maxresdefault.jpg",
      youtubeId: "Pf8mGGRPiyM",
      duration: "4:15",
      channel: "Splash Foundation",
      style: "all",
      technique: "",
      level: "",
      equipment: "",
      description: "great for beginners."
    },
    
    {
      id: 12,
      title: "Swimming Underwater ",
      thumbnail: "https://img.youtube.com/vi/KXd6mLvc_Zc/maxresdefault.jpg",
      youtubeId: "KXd6mLvc_Zc",
      duration: "1:20",
      channel: "Stew Smith",
      style: "survival",
      technique: "",
      level: "",
      equipment: "",
      description: "bewares of hyperventilation!!!"
    },
    {
      id: 13,
      title: "Head position Open Water",
      thumbnail: "https://img.youtube.com/vi/uE5X1Z9M3ko/maxresdefault.jpg",
      youtubeId: "uE5X1Z9M3ko",
      duration: "2:40",
      channel: "",
      style: "survival",
      technique: "",
      level: "",
      equipment: "",
      description: "each 3-6 strokes head up."
    },


  ];

  useEffect(() => {
    // Simulate loading videos
    setVideos(Videos);
    setFilteredVideos(Videos);

    // Check for video parameter in URL
    const params = new URLSearchParams(location.search);
    const videoId = params.get('video');
    if (videoId) {
      setHighlightedVideo(videoId);
      // Scroll to the video after a short delay to ensure it's rendered
      setTimeout(() => {
        const element = document.getElementById(`video-${videoId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location.search]);

  useEffect(() => {
    // Apply filters and search
    let filtered = videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.channel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStyle = !filters.style || video.style === filters.style;
      const matchesTechnique = !filters.technique || video.technique === filters.technique;

      return matchesSearch && matchesStyle && matchesTechnique;
    });

    setFilteredVideos(filtered);
  }, [videos, filters, searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      style: '',
      technique: ''
    });
    setSearchTerm('');
  };

  const activeFilterCount = Object.values(filters).filter(filter => filter !== '').length;

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-penguin-dark mb-4">
          Swimming Video Library
        </h1>
        <p className="text-xl text-gray-600">
          Discover curated YouTube videos to improve your swimming technique
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search videos, channels, or techniques..."
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
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-penguin-dark">
          {filteredVideos.length} Video{filteredVideos.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>Sort by duration</span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              id={`video-${video.youtubeId}`}
              className={highlightedVideo === video.youtubeId ? 'ring-4 ring-sky-400 rounded-xl' : ''}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No videos found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
