import React from 'react';
import { Mail } from 'lucide-react';

const ContactUs = ({ 
  title = "Contact Us", 
  description = "Have questions or feedback? We'd love to hear from you!",
  showIcon = true,
  className = ""
}) => {
  return (
    <div className={`bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 rounded-xl shadow-lg p-8 sm:p-10 mb-8 sm:mb-12 text-center text-white ${className}`}>
      {showIcon && (
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        {title}
      </h2>
      
      <p className="text-base sm:text-lg mb-6 opacity-90">
        {description}
      </p>
      
      <a 
        href="mailto:myswimadvisor@gmail.com"
        className="inline-flex items-center space-x-2 bg-white text-swim-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
      >
        <Mail size={20} />
        <span>myswimadvisor@gmail.com</span>
      </a>
    </div>
  );
};

export default ContactUs;
