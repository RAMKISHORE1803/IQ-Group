'use client';
import Link from 'next/link';

const ServiceCard = ({ title, description, link, arrow = true }) => {
  return (
    <Link href={link} className="block group">
      <div className="bg-blue-50 rounded-md p-8 h-full transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-[#203663]">{title}</h3>
          {arrow && (
            <div className="text-[#203663]">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          )}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard; 