'use client';
import { useState } from 'react';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    company: '',
    email: '',
    telephone: '',
    message: '',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Image */}
      <div className="w-full md:w-2/5 relative">
        <div 
          className="h-[50vh] md:h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            position: 'sticky',
            top: 0
          }}
        ></div>
      </div>

      {/* Right side - Contact Form */}
      <div className="w-full md:w-3/5 bg-[#f7f9fc] font-lato px-4 py-12 md:p-16 lg:p-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
            {/* Left column - Enquiry sections */}
            <div className="md:w-2/5">
              {/* General Enquiries Section */}
              <div className="mb-12">
                <div className="inline-block bg-[#e9f0f9] px-4 py-2 mb-4">
                  <span className="text-[#203663] font-medium text-sm">GENERAL ENQUIRIES</span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">info@iqgroup.com</p>
                  <p className="text-gray-700">+91 22 4005 4242</p>
                </div>
              </div>

              {/* Press Enquiries Section */}
              <div>
                <div className="inline-block bg-[#e9f0f9] px-4 py-2 mb-4">
                  <span className="text-[#203663] font-medium text-sm">PRESS ENQUIRIES</span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 font-medium">Media Relations</p>
                  <p className="text-gray-700">press@iqgroup.com</p>
                  <p className="text-gray-700">+91 22 4005 4243</p>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold font-lato text-[#203663] mb-8">Send an enquiry</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="firstName" className="block text-[#203663] mb-2">
                    First Name <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="surname" className="block text-[#203663] mb-2">
                    Surname <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-[#203663] mb-2">
                    Company <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-[#203663] mb-2">
                    Email <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="telephone" className="block text-[#203663] mb-2">
                    Telephone <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-[#203663] mb-2">
                    Message <span className="text-[#203663]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  ></textarea>
                </div>

                <div className="mb-8 flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="newsletter" className="text-gray-700 text-sm">
                    Sign me up for the IQ Group Insights newsletter
                  </label>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-[#203663] border border-[#203663]   hover:bg-[#fbfbfb] cursor-pointer hover:text-[#203663] text-white px-8 py-4  transition-colors flex items-center"
                  >
                    <span>Send enquiry</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection; 