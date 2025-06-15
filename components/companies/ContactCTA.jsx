import Link from 'next/link';

/**
 * Reusable Contact CTA component for company pages
 * 
 * @param {Object} props
 * @param {string} props.title - CTA title
 * @param {string} props.description - CTA description
 * @param {string} props.buttonText - Button text (default: 'Contact Us')
 * @param {string} props.buttonLink - Button link (default: '/contact')
 * @param {string} props.className - Additional CSS classes
 */
const ContactCTA = ({
  title = 'Ready to discuss your requirements?',
  description = 'Our team is available to help you find the right solution.',
  buttonText = 'Contact Us',
  buttonLink = '/contact',
  className = '',
}) => {
  return (
    <div className={`mt-16 bg-[#203663] text-white p-8 rounded-lg ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-200">{description}</p>
        </div>
        <div className="mt-6 md:mt-0">
          <Link 
            href={buttonLink} 
            className="inline-block bg-white text-[#203663] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA; 