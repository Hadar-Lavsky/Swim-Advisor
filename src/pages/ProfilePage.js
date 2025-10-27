import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swim-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-swim-blue-600 text-white px-6 py-2 rounded-lg hover:bg-swim-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-penguin-dark mb-2">
            
          </h1>
          
        </div>
        
        <UserProfile />
      </div>
    </div>
  );
}

