import React from 'react';
import { Mail, Shield, Lock, Eye, Users, FileText, AlertCircle } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Shield,
      title: "Introduction",
      content: "Swim Advisor respects your privacy. This policy explains what information we collect, how we use it, and how we protect it."
    },
    {
      icon: FileText,
      title: "Information We Collect",
      items: [
        {
          subtitle: "Personal details:",
          text: "only if you contact us (e.g., name, email)."
        },
        {
          subtitle: "Usage data:",
          text: "general analytics like page visits, clicks, and time on page, used to improve your experience."
        },
        {
          subtitle: "Media uploads:",
          text: "if you upload a swimming video for analysis, it's used only for generating feedback — not shared or made public."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      items: [
        { text: "To provide and improve our swimming learning tools." },
        { text: "To communicate with you if you reach out for support." },
        { text: "To analyze usage patterns and improve content recommendations." }
      ]
    },
    {
      icon: Lock,
      title: "Data Storage & Security",
      content: "All data is stored securely. Uploaded videos or personal details are not shared with third parties or advertisers.",
      highlight: "You can request deletion of your data anytime by contacting: swimadvisor@gmail.com"
    },
    {
      icon: Users,
      title: "Third-Party Services",
      content: "Swim Advisor may use safe, reputable services like YouTube for embedded videos or analytics tools (e.g., Google Analytics). These services have their own privacy policies."
    },
    {
      icon: AlertCircle,
      title: "Your Rights",
      content: "You can:",
      items: [
        { text: "Request access or deletion of your data." },
        { text: "Opt out of any email communication." }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4 pb-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-swim-blue-100 rounded-full">
            <Shield className="w-12 h-12 text-swim-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-penguin-dark mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600">
          Swim Advisor — Your Privacy Matters
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Content Sections - Vertical Layout */}
      <div className="space-y-6 mb-12">
        {sections.map((section, index) => (
          <section key={index} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 overflow-hidden">
            {/* Icon at Top Center */}
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-swim-blue-100 rounded-lg">
                <section.icon className="w-8 h-8 text-swim-blue-600" />
              </div>
            </div>

            {/* Title Below Icon */}
            <h2 className="text-xl sm:text-2xl font-bold text-penguin-dark mb-4 text-center">
              {index + 1}. {section.title}
            </h2>
            
            {/* Content Flows Beneath */}
            <div className="space-y-4">
              {section.content && (
                <p className="text-gray-700 leading-relaxed text-center sm:text-left">
                  {section.content}
                </p>
              )}

              {section.items && (
                <ul className="space-y-3 text-gray-700 leading-relaxed">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <span className="text-swim-blue-600 mt-1 flex-shrink-0">•</span>
                      <span className="flex-1">
                        {item.subtitle && (
                          <strong className="text-penguin-dark">{item.subtitle} </strong>
                        )}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {section.highlight && (
                <div className="mt-4 p-4 bg-swim-blue-50 border-l-4 border-swim-blue-600 rounded">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    <strong className="text-penguin-dark">Important:</strong> {section.highlight}
                  </p>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-swim-blue-600 to-swim-blue-700 rounded-xl shadow-lg p-8 sm:p-10 mb-8 text-center text-white">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Contact Us
        </h2>
        <p className="text-base sm:text-lg mb-6 opacity-90">
          For questions about this privacy policy, contact us at:
        </p>
        <a 
          href="mailto:swimadvisor@gmail.com"
          className="inline-flex items-center space-x-2 bg-white text-swim-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          <Mail size={20} />
          <span className="text-left">swimadvisor@gmail.com</span>
          </a>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-sm text-gray-600 leading-relaxed">
          By using Swim Advisor, you agree to this Privacy Policy. We may update this policy from time to time, 
          and any changes will be posted on this page with an updated date.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;