'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ServiceCard from './ServiceCard';

const NavDropdown = ({ isOpen, onClose, category }) => {
  // Define dropdown content based on category
  const dropdownContent = {
    services: {
      title: 'Services',
      description: 'Delivering tailored insights into portfolio risks and mitigation strategies to protect asset values and support clients throughout the entire transaction life cycle.',
      viewAllLink: '/services',
      cards: [
        {
          title: 'Industrial & Logistics',
          description: 'A provider of expert logistics and industrial advice, with full service, end-to-end capabilities across integrated capital markets and leasing teams.',
          link: '/services/industrial-logistics'
        },
        {
          title: 'Science & Technology',
          description: 'Trusted advice that means science thrives, development flourishes and investments succeed.',
          link: '/services/science-technology'
        },
        {
          title: 'Alternative Capital Markets',
          description: 'Unlocking key decision-makers at capital source to deliver value for investors and developers.',
          link: '/services/alternative-capital-markets'
        },
        {
          title: 'Sustainability Consultancy',
          description: 'Delivering actionable sustainability strategies.',
          link: '/services/sustainability-consultancy'
        }
      ]
    },
    research: {
      title: 'Research & Insights',
      description: 'Access our industry-leading research, analysis and insights to make informed decisions in today\'s rapidly evolving market landscape.',
      viewAllLink: '/research',
      cards: [
        {
          title: 'Market Reports',
          description: 'Comprehensive analysis of market trends, forecasts, and opportunities across key sectors.',
          link: '/research/market-reports'
        },
        {
          title: 'Industry Insights',
          description: 'Deep dives into specific industries with expert commentary and forward-looking perspectives.',
          link: '/research/industry-insights'
        },
        {
          title: 'White Papers',
          description: 'Thought leadership on emerging trends and strategic considerations for your business.',
          link: '/research/white-papers'
        },
        {
          title: 'Data Visualization',
          description: 'Interactive tools to explore market data and gain actionable intelligence.',
          link: '/research/data-visualization'
        }
      ]
    },
    about: {
      title: 'About',
      description: 'Learn about our company values, leadership team, and our commitment to excellence in everything we do.',
      viewAllLink: '/about',
      cards: [
        {
          title: 'Our Story',
          description: 'Discover our journey, mission and the values that drive our organization forward.',
          link: '/about/story'
        },
        {
          title: 'Leadership',
          description: 'Meet the experienced team guiding our strategic vision and operational excellence.',
          link: '/about/leadership'
        },
        {
          title: 'Global Presence',
          description: 'Explore our worldwide network of offices serving clients across key markets.',
          link: '/about/global-presence'
        },
        {
          title: 'Corporate Responsibility',
          description: 'Our commitment to sustainability, diversity, and positive community impact.',
          link: '/about/responsibility'
        }
      ]
    }
  };

  // Get content based on category
  const content = dropdownContent[category] || dropdownContent.services;

  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-full bg-white shadow-lg z-50 transition-all duration-300 transform origin-top"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Title and Description */}
          <div className="md:col-span-1">
            <h2 className="text-[#203663] text-4xl font-bold mb-4">{content.title}</h2>
            <p className="text-gray-600 mb-8">{content.description}</p>
            <Link 
              href={content.viewAllLink}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
            >
              <span className="bg-blue-100 p-3 rounded mr-3 group-hover:bg-blue-200 transition-colors">
                <ArrowRight size={18} />
              </span>
              <span>View All</span>
            </Link>
          </div>

          {/* Right Columns - Service Cards */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.cards.map((card, index) => (
              <ServiceCard 
                key={index}
                title={card.title}
                description={card.description}
                link={card.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDropdown; 