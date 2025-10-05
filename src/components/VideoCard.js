import React, { useState } from 'react';
import { Clock, User, ExternalLink, Play } from 'lucide-react';

const VideoCard = ({ video }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStyleColor = (style) => {
    switch (style) {
      case 'freestyle': return 'bg-blue-100 text-blue-800';
      case 'backstroke': return 'bg-purple-100 text-purple-800';
      case 'breaststroke': return 'bg-green-100 text-green-800';
      case 'butterfly': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Original card with thumbnail */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Thumbnail */}
        <div className="relative group cursor-pointer" onClick={handleVideoClick}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white rounded-full p-3">
              <Play className="w-8 h-8 text-swim-blue-600" fill="currentColor" />
            </div>
          </div>
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-penguin-dark mb-2 line-clamp-2 cursor-pointer hover:text-swim-blue-600 transition-colors"
              onClick={handleVideoClick}>
            {video.title}
          </h3>

          {/* Channel */}
          <div className="flex items-center text-gray-600 mb-3">
            <User size={14} className="mr-1" />
            <span className="text-sm">{video.channel}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {video.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStyleColor(video.style)}`}>
              {video.style.charAt(0).toUpperCase() + video.style.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
              {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
            </span>
            {video.equipment !== 'none' && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {video.equipment.replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleVideoClick}
            className="w-full bg-swim-blue-600 text-white py-2 px-4 rounded-lg hover:bg-swim-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ExternalLink size={16} />
            <span>Watch Video</span>
          </button>
        </div>
      </div>

      {/* Modal with embedded video */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
