import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import notFoundImage from '../pics/404.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
       
        {/* 404 Image */}
        <div className="mb-8 flex justify-center mt-16 px-4">
          <img 
            src={notFoundImage} 
            alt="Lost at Sea - 404 Error" 
            className="max-w-full h-auto rounded-2xl shadow-2xl"
            style={{ maxHeight: '400px' }}
          />
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-6xl font-bold text-swim-blue-600 mb-4">Error</h1>
          <h2 className="text-3xl font-bold text-penguin-dark mb-4">
            Lost at Sea
          </h2>
          
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has drifted away.
          </p>

          {/* Return Home Button */}
          <button
            onClick={handleReturnHome}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-swim-blue-700 hover:to-swim-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home size={24} />
            <span>Return to Shore </span>
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default NotFoundPage;

