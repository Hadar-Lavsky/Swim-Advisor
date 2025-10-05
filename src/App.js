import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import LearnPage from './pages/LearnPage';
import AnalyzePage from './pages/AnalyzePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ComingSoonPage from './pages/ComingSoonPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-swim-blue-50 to-swim-blue-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/privacy" element={<PrivacyPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/coming-soon" element={<ComingSoonPage/>} />
            {/* Catch-all route for 404 - must be last */}
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
