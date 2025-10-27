import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Target } from 'lucide-react';

const WelcomeModal = ({ onClose, onSetGoal }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    onSetGoal();
  };

  const handleMaybeLater = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-scaleIn">
        {/* Celebration Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-swim-blue-100 to-swim-blue-200 rounded-full p-4">
            <PartyPopper size={48} className="text-swim-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🎉 Welcome to Swim Advisor!
        </h2>

        {/* Description */}
        <div className="space-y-4 mb-8 text-center">
          <p className="text-lg text-gray-700">
            We're excited to have you here! To get the most out of Swim Advisor, 
            you can set your swimming goal now.
          </p>
          <p className="text-md text-gray-600">
            Would you like to fill your swimming goal so we can guide you better?
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {/* Yes Button */}
          <button
            onClick={handleYes}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 text-white rounded-xl font-semibold hover:from-swim-blue-700 hover:to-swim-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <span> Yes, set my goal</span>
          </button>

          {/* No Button */}
          <button
            onClick={handleMaybeLater}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
          >
             No, maybe later
          </button>

          {/* Small Text */}
          <p className="text-xs text-center text-gray-500 mt-4 px-4">
            You can always update your goal anytime in your profile page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

