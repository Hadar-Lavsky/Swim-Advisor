import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import comingSoonImage from '../pics/soon.png';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
       
            {/* Coming Soon Image */}
        <div className="mb-8 flex justify-center mt-16 px-4">
          <img 
            src={comingSoonImage} 
            alt="Coming Soon" 
            className="max-w-full h-auto rounded-2xl shadow-2xl"
            style={{ maxHeight: '400px' }}
          />
        </div>

        {/* Coming Soon Message */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
         
          
          <p className="text-gray-500 mb-8">
            This feature is currently under development. Stay tuned for something amazing!
          </p>

          {/* Return Home Button */}
          <button
            onClick={handleReturnHome}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-swim-blue-700 hover:to-swim-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home size={24} />
            <span>Return Home</span>
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default ComingSoonPage;

