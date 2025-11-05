import React from 'react';
import { UserPlus, TvMinimalPlay, Wrench, WavesLadder } from 'lucide-react';
import ContactUs from '../components/ContactUs';
import PageHeader from '../components/PageHeader';

const AboutPage = () => { 
  const services = [
    {
      icon: TvMinimalPlay,
      title: 'Video Content Library',
      
    },
    {
      icon: Wrench,
      title: 'Common Problems in Swimming',
    },
    {
      icon: WavesLadder,
      title: 'Customized Programs for users',
      
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-16">
      <PageHeader
        title="About Swim Advisor"
        description="Learn swimming the smart way efficient, simple."
        titleSize="large"
        descriptionColor="blue"
        bottomMargin="mb-16"
      />

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
            <UserPlus size={20} />
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
      <ContactUs />
    </div>
  );
};

export default AboutPage;



