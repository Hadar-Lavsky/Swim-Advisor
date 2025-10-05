import React from 'react';
import { Mail, Linkedin, Youtube, Wrench, Target } from 'lucide-react';

const AboutPage = () => {
  const services = [
    {
      icon: Youtube,
      title: 'Video Content Library',
      
    },
    {
      icon: Wrench,
      title: 'Common Problems in Swimming',
    },
    {
      icon: Target,
      title: 'Swimming Analysis',
      comingSoon: true
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-penguin-dark mb-6">
          About Swim Advisor
        </h1>
        <p className="text-xl sm:text-2xl text-swim-blue-600 font-medium max-w-3xl mx-auto px-4">
          Learn swimming the smart way — efficient, simple, and built to last.
        </p>
      </div>

      {/* Section 1 - Our Goal */}
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-8">
        <h2 className="text-3xl font-bold text-penguin-dark mb-6">Our Goal</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to provide simple, structured knowledge of swimming filtered and 
          organized by instructors  so learners can focus on what truly matters.
        </p>
      </div>

      {/* Section 2 - Who We Are */}
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-8">
        <h2 className="text-3xl font-bold text-penguin-dark mb-6">Who We Are</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Swim Advisor was created by a swim instructor and computer science student passionate 
          about merging coaching experience with technology.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We understand the challenges swimmers face when trying to learn effectively, and our 
          goal is to simplify the journey.
        </p>
        
        {/* LinkedIn Connection */}
        <div className="flex items-center justify-center sm:justify-start">
          <a 
            href="https://www.linkedin.com/in/hadar-lavsky-1b9970342/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-swim-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-swim-blue-700 transition-colors duration-200"
          >
            <Linkedin size={20} />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Section 3 - What We Provide */}
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-8">
        <h2 className="text-3xl font-bold text-penguin-dark mb-8 text-center">
          What We Provide
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-gray-50 hover:bg-swim-blue-50 transition-colors duration-200 relative"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-swim-blue-600 rounded-full">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-penguin-dark mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
              {service.comingSoon && (
                <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 - Contact Us */}
      <div className="bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 rounded-xl shadow-lg p-8 sm:p-12 mb-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-6 opacity-90">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <a 
          href="mailto:myswimadvisor@gmail.com"
          className="inline-flex items-center space-x-2 bg-white text-swim-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
        >
          <Mail size={20} />
          <span>myswimadvisor@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default AboutPage;



