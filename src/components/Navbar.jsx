import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Youtube, Wrench, Video, Menu, X  } from 'lucide-react';
import logo from '../logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/content', label: 'Content', icon: Youtube },
    { path: '/learn', label: 'Fixes', icon: Wrench },
   // { path: '/analyze', label: 'Analyze', icon: Video },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile menu toggle
  const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
   
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/30 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-lg border-b-4 border-swim-blue-500'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Swim Advisor" className={`rounded-full transition-all duration-300 ${
              isScrolled ? 'h-8 w-8' : 'h-12 w-12'
            }`} />
            <div>
              <h1 className={`font-bold text-penguin-dark transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>
                Swim Advisor
              </h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(path)
                    ? 'bg-swim-blue-100 text-swim-blue-700 border-2 border-swim-blue-300'
                    : 'text-gray-700 hover:text-swim-blue-600 hover:bg-swim-blue-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
<div className="md:hidden">
  <button 
    onClick={toggleMobileMenu}
    className="text-gray-700 hover:text-swim-blue-600 transition-colors duration-200"
  >
    {isMobileMenuOpen ? (
      <X className="w-6 h-6" />
    ) : (
      <Menu className="w-6 h-6" />
    )}
  </button>
</div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(path)
                      ? 'bg-swim-blue-100 text-swim-blue-700 border-2 border-swim-blue-300'
                      : 'text-gray-700 hover:text-swim-blue-600 hover:bg-swim-blue-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;