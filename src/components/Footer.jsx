import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
            <Link to="/about" className="text-gray-600 hover:text-swim-blue-600 transition-colors text-sm">
              About
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-swim-blue-600 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-swim-blue-600 transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 All rights reserved to Swim Advisor
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;