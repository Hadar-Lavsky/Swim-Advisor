import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Timer, Lock } from 'lucide-react';
import ExerciseCard from '../components/ExerciseCard';
import { useAuth } from '../contexts/AuthContext';

const ExercisePage = () => {
  const { user, profile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Exercise programs by level
  const exercisesByLevel = {
    "Water Confidence Program": {
      name: "Water Confidence Program",
      awareness: [
        "Stay calm and breathe naturally",
        "Trust the water to support you",
        "Move slowly and mindfully"
      ],
      blocks: [
        { name: "Warm-up & Water Entry", time: "5 min" },
        { name: "Water Walking", time: "5 min" },
        { name: "Bubble Flow", time: "3×5 breaths" },
        { name: "Face Submersion Challenge", time: "5 min" },
        { name: "Star Float & Back Float", time: "3×10 s" },
        { name: "Toy Dive Game", time: "5 min" }
      ]
    },
    "Balance & Gliding Program": {
      name: "Balance & Gliding Program",
      awareness: [
        "Feel your body alignment in water",
        "Extend fully like a streamline",
        "Relax and let momentum carry you"
      ],
      blocks: [
        { name: "Superman Glide", time: "5×3 m" },
        { name: "Stand-to-Float Transition", time: "5 min" },
        { name: "Star Float (Front)", time: "3×10 s" },
        { name: "Back Float & Breath Awareness", time: "3×10 s" },
        { name: "Streamline Position", time: "4×5 m" },
        { name: "Diving Toys", time: "5 min" }
      ]
    }
  };

  // Default program for all other users
  const defaultExercise = {
    name: "General Swimming Program",
    awareness: [
      "Relax neck and shoulders",
      "Exhale softly under water",
      "Feel the support of the water"
    ],
    blocks: [
      { name: "Warm-up & Water Entry", time: "5 min" },
      { name: "Glide Practice", time: "3×25m" },
      { name: "Breathing Balance", time: "8 min" },
      { name: "Body Position Drills", time: "4×50m" },
      { name: "Free Swim", time: "10 min" },
      { name: "Cooldown Float", time: "5 min" }
    ]
  };

  // Determine which program to show
  let selectedExercise = defaultExercise;

  if (user && profile?.goal) {
    if (profile.goal.includes("Water Confidence")) {
      selectedExercise = exercisesByLevel["Water Confidence Program"];
    } else if (profile.goal.includes("Balance & Gliding")) {
      selectedExercise = exercisesByLevel["Balance & Gliding Program"];
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 py-10 px-4">
      <div className="max-w-[700px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Your Training Program
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            {user ? 'Your personalized training session' : 'Preview of our training programs'}
          </p>
          
          {/* Program Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Calendar size={16} className="text-sky-600" />
              <span>2 sessions per week</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Timer size={16} className="text-sky-600" />
              <span>40 min each</span>
            </div>
          </div>
        </div>

        {/* Exercise Card */}
        <ExerciseCard exercise={selectedExercise} />

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            Remember: Progress comes from awareness, not perfection
          </p>
        </div>
      </div>

      {/* Sign-In Required Modal (for non-logged-in users) */}
      {!user && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-scaleIn">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-swim-blue-100 to-swim-blue-200 rounded-full p-4">
                <Lock size={48} className="text-swim-blue-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Sign In Required
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-8 text-center">
              <p className="text-lg text-gray-700">
                To access your personalized training program, please sign in to your account.
              </p>
              <p className="text-md text-gray-600">
                Get exercises tailored to your swimming level and goals!
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              {/* Sign In Button */}
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 text-white rounded-xl font-semibold hover:from-swim-blue-700 hover:to-swim-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <span>Sign In</span>
              </button>

              {/* Back to Home Button */}
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                Back to Home Page
              </button>

              {/* Small Text */}
              <p className="text-xs text-center text-gray-500 mt-4 px-4">
                Sign in with your Google account in seconds
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;

