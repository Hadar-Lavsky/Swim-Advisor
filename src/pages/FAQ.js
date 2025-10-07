import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

const AskPenguinPage = () => {
  const [activeTab, setActiveTab] = useState('parents');
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const qaSections = {
    parents: [
      {
        question: "How do I choose the right goggles for my child?",
        answer: "You can buy any decent brand, but the most important thing is fit and comfort. The goggles should cover the eyes exactly — not press too tight and not too wide. Make sure your child feels comfortable."
      },
      {
        question: "At what age should my child start learning to swim?",
        answer: "It varies from child to child, but generally around age 6 kids can start learning basic strokes. Between ages 7–9, children develop better balance and coordination in water, which helps them focus and learn technique more effectively."
      },
      {
        question: "My child has a trauma or fear of the pool — what should I do?",
        answer: "Trauma and fear need personal attention and professional guidance. Start with private lessons and a patient instructor who can rebuild confidence step by step."
      },
      {
        question: "I want my child to improve faster — what can we do at home?",
        answer: "Encourage your child and keep swimming fun. Try simple dry-land drills at home like arm movements, balance games, or breathing control exercises."
      }
    ],
    swimmers: [
      {
        question: "How many times per week should I swim to improve?",
        answer: "At least twice a week."
      },
      {
        question: "How do I know which style to learn first?",
        answer: "Most people start with freestyle or breaststroke. Choose whichever feels easier and more natural."
      },
      {
        question: "How long does it take to learn swimming?",
        answer: "If you have basic water comfort and flow, you can usually learn within 10–12 lessons."
      },
      {
        question: "Why should I learn swimming?",
        answer: "Swimming builds strength, coordination, and confidence, improves heart and lung health, and is a low-impact full-body workout perfect for all ages."
      }
    ],
    general: [
      {
        question: "What is Swim Advisor?",
        answer: "Just swim smarter — structured guidance, and instructor insights."
      },
      {
        question: "What is the goal of Swim Advisor?",
        answer: "To help both beginners and pros improve effectively."
      },
      {
        question: "Is Swim Advisor free to use?",
        answer: "Yes, basic access is free for everyone."
      },
      {
        question: "What's coming next?",
        answer: "The upcoming Swim Analyzer for real-time stroke feedback plus personal swim plans and community Q&A."
      }
    ]
  };

  const currentQuestions = qaSections[activeTab];

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {/* Hero Section with Penguin */}
      <div className="text-center mb-12 mt-12">
        <div className="flex justify-center mb-6">
          
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-penguin-dark mb-4">
          Ask the Penguin
        </h1>
        
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <button
            onClick={() => {
              setActiveTab('parents');
              setOpenAccordion(null);
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'parents'
                ? 'bg-swim-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Parents
          </button>
          <button
            onClick={() => {
              setActiveTab('swimmers');
              setOpenAccordion(null);
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'swimmers'
                ? 'bg-swim-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Swimmers
          </button>
          <button
            onClick={() => {
              setActiveTab('general');
              setOpenAccordion(null);
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'general'
                ? 'bg-swim-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            General
          </button>
        </div>
      </div>

      {/* Q&A Accordion */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="space-y-4">
          {currentQuestions.map((qa, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-penguin-dark pr-4">
                  {qa.question}
                </span>
                {openAccordion === index ? (
                  <ChevronUp className="w-6 h-6 text-swim-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-swim-blue-600 flex-shrink-0" />
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordion === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {qa.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">
            Didn't find what you were looking for?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Feel free to reach out to us directly
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-swim-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            <Mail size={20} />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskPenguinPage;

