import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Video, Waves, Droplet, Dumbbell, Clock, ArrowRight} from 'lucide-react';
import logo from '../logo.png';


const HomePage = () => {
  const features = [
    {
      icon: Search,
      title: 'Video Content Library',
      description: 'Access curated YouTube videos filtered by swimming style, technique focus, skill level, and equipment.',
      link: '/content',
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Learn Techniques',
      description: 'Explore our comprehensive taxonomy of swimming problems with quick-win solutions and deep learning paths.',
      link: '/learn',
      color: 'bg-green-500'
    },
    {
      icon: Video,
      title: 'Analyze Your Swimming',
      description: 'Upload your swimming videos for AI-powered analysis and personalized feedback (coming soon).',
      link: '/analyze',
      color: 'bg-purple-500'
    }
  ];

  const fundamentals = [
    { 
      icon: Droplet, 
      number: '1', 
      title: 'Water Comfort',
      description: 'Getting comfortable in water'
    },
    { 
      icon: Waves, 
      number: '2', 
      title: 'Floating',
      description: 'Mastering body position'
    },
    { 
      icon: Dumbbell, 
      number: '3', 
      title: 'Stroke Technique',
      description: 'Efficient movement patterns'
    },
    { 
      icon: Clock, 
      number: '4', 
      title: 'Timing',
      description: 'Coordination & Sync'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Swim Advisor" className="h-21 w-21 rounded-full" />
        </div>
        <h1 className="text-5xl md:text-5xl font-bold text-penguin-dark mb-6">
        Swim smarter with
        <span className="block text-swim-blue-600">Swim Advisor</span>
        </h1>
       
        
      </div>

      {/* Fundamentals Workflow Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center text-penguin-dark mb-4">
          The Fundamentals
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          these 4 fundamentals are the streamline of swimming
        </p>
        
        {/* Desktop Workflow - Horizontal */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-8">
          {fundamentals.map((fundamental, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 max-w-xs">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-swim-blue-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-swim-blue-100 rounded-full">
                      <fundamental.icon className="w-10 h-10 text-swim-blue-600" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-swim-blue-600 text-white rounded-full font-bold mb-3">
                      {fundamental.number}
                    </div>
                    <h3 className="text-lg font-bold text-penguin-dark mb-2">
                      {fundamental.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {fundamental.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < fundamentals.length - 1 && (
                <ArrowRight className="w-8 h-8 text-swim-blue-600 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Workflow - Vertical */}
        <div className="md:hidden space-y-6">
          {fundamentals.map((fundamental, index) => (
            <div key={index}>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-swim-blue-100 rounded-full">
                      <fundamental.icon className="w-8 h-8 text-swim-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 bg-swim-blue-600 text-white rounded-full font-bold text-sm">
                        {fundamental.number}
                      </div>
                      <h3 className="text-lg font-bold text-penguin-dark">
                        {fundamental.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {fundamental.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < fundamentals.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-6 h-6 text-swim-blue-600 transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 rounded-2xl p-12 text-center text-white mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Swimming?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of swimmers who have improved their technique with Swim Advisor
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/content"
            className="bg-white text-swim-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Search size={24} />
            <span>Browse Videos</span>
          </Link>
          <Link 
            to="/learn"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-swim-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <BookOpen size={24} />
            <span>Start Learning</span>
          </Link>
        </div>
      </div>
    








    </div>
  );
};

export default HomePage;
