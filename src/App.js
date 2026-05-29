import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import SwimDecisionTree from './components/SwimDecisionTree';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import LearnPage from './pages/LearnPage';
import AnalyzePage from './pages/AnalyzePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ComingSoonPage from './pages/ComingSoonPage';
import FAQ from './pages/FAQ';
import ProfilePage from './pages/ProfilePage';
import ExercisePage from './pages/ExercisePage';
import VisionPage from './pages/VisionPage';
import { X } from 'lucide-react';

// Inner component that has access to AuthContext
function AppContent() {
  const { isNewUser, clearNewUserFlag, updateProfile } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showDecisionTree, setShowDecisionTree] = useState(false);

  // Show welcome modal when a new user is detected
  useEffect(() => {
    if (isNewUser) {
      setShowWelcomeModal(true);
    }
  }, [isNewUser]);

  const handleSetGoal = () => {
    setShowWelcomeModal(false);
    setShowDecisionTree(true);
  };

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    clearNewUserFlag();
  };

  const handleDecisionTreeComplete = async (programData) => {
    // Update profile with the new goal from decision tree
    const { error } = await updateProfile({
      goal: programData.goal,
    });

    if (error) {
      console.error('Error updating profile:', error);
    }
    
    setShowDecisionTree(false);
    clearNewUserFlag();
  };

  const handleCloseDecisionTree = () => {
    setShowDecisionTree(false);
    clearNewUserFlag();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-swim-blue-50 to-swim-blue-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/privacy" element={<PrivacyPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/FAQ" element={<FAQ/>} />
          <Route path="/coming-soon" element={<ComingSoonPage/>} />
          {/* Catch-all route for 404 - must be last */}
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </main>
      <Footer />

      {/* Welcome Modal for New Users */}
      {showWelcomeModal && (
        <WelcomeModal 
          onClose={handleCloseWelcome}
          onSetGoal={handleSetGoal}
        />
      )}

      {/* Decision Tree Modal */}
      {showDecisionTree && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-swim-blue-50 to-swim-blue-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={handleCloseDecisionTree}
              className="sticky top-4 right-4 float-right p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors duration-200 z-10"
              title="Close"
            >
              <X size={24} className="text-gray-600" />
            </button>

            {/* Decision Tree Component */}
            <SwimDecisionTree onComplete={handleDecisionTreeComplete} />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
