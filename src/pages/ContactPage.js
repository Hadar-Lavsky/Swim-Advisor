import React, { useState } from 'react';
import { Mail, Send, MessageCircle, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:myswimadvisor@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-swim-blue-100 rounded-full">
            <MessageCircle className="w-12 h-12 text-swim-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-penguin-dark mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-penguin-dark mb-6">
            Send us a Message
          </h2>

          {isSubmitted ? (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600">
                Your email client should have opened. We'll get back to you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swim-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-swim-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-swim-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                This will open your email client to send the message
              </p>
            </form>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Direct Email */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-swim-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-swim-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-penguin-dark mb-2">
                  Email Us Directly
                </h3>
                <p className="text-gray-600 mb-4">
                  Prefer to send an email yourself? Reach out directly:
                </p>
                <a
                  href="mailto:myswimadvisor@gmail.com"
                  className="inline-flex items-center space-x-2 text-swim-blue-600 font-semibold hover:text-swim-blue-700 transition-colors duration-200"
                >
                  <Mail size={18} />
                  <span>myswimadvisor@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-gradient-to-br from-swim-blue-50 to-swim-blue-100 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-penguin-dark mb-4">
              What to Expect
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-swim-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700">
                  We typically respond within 24-48 hours
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-swim-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700">
                  All feedback and suggestions are welcome
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-swim-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700">
                  Technical issues will be prioritized
                </span>
              </li>
            </ul>
          </div>

          {/* Common Topics */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-penguin-dark mb-4">
              Common Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Technical Support
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Feature Requests
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Content Suggestions
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Partnership Inquiries
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                General Questions
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

