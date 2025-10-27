import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit2, Mail, IdCard,Award,X} from 'lucide-react';
import SwimDecisionTree from './SwimDecisionTree';

export default function UserProfile() {
  const { user, profile, updateProfile, signOut } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [message, setMessage] = useState('');
  const [showDecisionTree, setShowDecisionTree] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update name state when profile changes
  useEffect(() => {
    if (profile?.name) {
      setName(profile.name);
    }
  }, [profile]);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const { error } = await updateProfile({ name });

    setIsUpdating(false);
    
    if (error) {
      setMessage('Error updating name: ' + error.message);
    } else {
      setMessage('Name updated successfully!');
      setIsEditingName(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDecisionTreeComplete = async (programData) => {
    setIsUpdating(true);
    
    // Update profile with the new goal from decision tree
    const { error } = await updateProfile({
      goal: programData.goal,
    });

    setIsUpdating(false);

    if (error) {
      setMessage('Error updating profile: ' + error.message);
    } else {
      setMessage('Profile updated with your new program! ');
      setShowDecisionTree(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-swim-blue-700 mb-1">
              Your Profile
            </h2>
            <p className="text-gray-500 text-sm">Manage your swimming journey</p>
          </div>
        
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 animate-fadeIn">
            <span className="text-lg">✅</span>
            <span className="font-medium">{message}</span>
          </div>
        )}

        {/* Profile Information Grid */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="bg-gradient-to-r from-swim-blue-50 to-blue-50 rounded-xl p-5 border border-swim-blue-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                <IdCard size={16} className="text-swim-blue-600" />
                Name
              </label>
              {!isEditingName && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1.5 hover:bg-swim-blue-100 rounded-lg transition-colors duration-200"
                  title="Edit name"
                >
                  <Edit2 size={16} className="text-swim-blue-600" />
                </button>
              )}
            </div>
            
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 border border-swim-blue-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your name"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-swim-blue-600 text-white rounded-lg hover:bg-swim-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingName(false);
                    setName(profile.name);
                  }}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <p className="text-xl font-bold text-gray-800">{profile.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2 mb-2">
              <Mail size={16} className="text-gray-500" />
              Email
            </label>
            <p className="text-lg font-medium text-gray-700">{user.email}</p>
          </div>

          

          {/* Goal */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2 mb-2">
              <Award size={16} className="text-purple-600" />
              your Goal 
            </label>
            <p className="text-lg font-medium text-gray-800">
              {profile.goal || 'No goal set yet'}
            </p>
            
            {/* Redo Questions Button */}
            <button
              onClick={() => setShowDecisionTree(true)}
              className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              <span>{profile.goal ? 'Edit goal' : 'Set your goal'} </span>
            </button>
          </div>
        </div>
      </div>

      {/* Decision Tree Modal */}
      {showDecisionTree && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-swim-blue-50 to-swim-blue-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Loading Overlay */}
            {isUpdating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-swim-blue-600 border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-swim-blue-700 font-semibold">Saving your profile...</p>
                </div>
              </div>
            )}
            
            {/* Close Button */}
            <button
              onClick={() => setShowDecisionTree(false)}
              disabled={isUpdating}
              className="sticky top-4 right-4 float-right p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Close"
            >
              <X size={24} className="text-gray-600" />
            </button>

            {/* Decision Tree Component */}
            <SwimDecisionTree onComplete={handleDecisionTreeComplete} />
          </div>
        </div>
      )}
    </>
  );
}





