import Link from 'next/link';
import Image from 'next/image';
import GetStartedCard from './GetStartedCard';
const GetStartedSection = () => {
  return (
    <section id="how-to-get-started" className="py-16 bg-[#fbfbfb]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-12">
          How to Get Started
        </h2>
        {/* Steps Grid/Row Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> 
          {/* <GetStartedCard
            title="Get a Quote"
            description="Start by requesting a personalized quote."
            buttonText="Learn More →"
            buttonLink="/contact"
            icon={<Image src="/icons/quote-icon.svg" alt="Get a Quote Icon" width={32} height={32} className="text-blue-600" />}
          />
          <GetStartedCard
            title="Place Order"
            description="Select your raw materials and confirm your order."
            buttonText="Learn More →"
            buttonLink="/our-companies"
            icon={<Image src="/icons/order-icon.svg" alt="Place Order Icon" width={32} height={32} className="text-blue-600" />}
          />
          <GetStartedCard
            title="Submit Documents"
            description="Upload required purchase orders and compliance forms."
            buttonText="Learn More →"
            buttonLink="/documents"
            icon={<Image src="/icons/documents-icon.svg" alt="Submit Documents Icon" width={32} height={32} className="text-blue-600" />}
          />    
          <GetStartedCard
            title="Track & Receive"
            description="Monitor your shipment until it arrives."
            buttonText="Learn More →"
            buttonLink="/track"
            icon={<Image src="/icons/tracking-icon.svg" alt="Track & Receive Icon" width={32} height={32} className="text-blue-600" />}
          /> */}
          {/* Step Cards */}
          <Link
            href="/contact"
            aria-label="Get a Quote, navigate to Contact page"
            className="flex flex-col items-center text-center bg-gray-50 border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="group"
          >
            <div className="w-16 h-16 flex items-center  justify-center bg-blue-100 rounded-full mb-4">
              <Image src="/icons/quote-icon.svg" alt="Get a Quote Icon" width={32} height={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Get a Quote</h3>
            <p className="text-gray-600 text-sm mb-4">Start by requesting a personalized quote.</p>
            <span className="text-blue-600 text-sm font-semibold">Learn More →</span>
          </Link>

          <Link
            href="/our-companies"
            aria-label="Place Order, navigate to Our Companies page"
            className="flex border-2 border-gray-300  flex-col items-center text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="group"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
              <Image src="/icons/order-icon.svg" alt="Place Order Icon" width={32} height={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Place Order</h3>
            <p className="text-gray-600 text-sm mb-4">Select your raw materials and confirm your order.</p>
            <span className="text-blue-600 text-sm font-semibold">Learn More →</span>
          </Link>

          <Link
            href="/documents"
            aria-label="Submit Documents, navigate to Documents page"
            className="flex border-2 border-gray-300 flex-col items-center text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="group"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
              <Image src="/icons/documents-icon.svg" alt="Submit Documents Icon" width={32} height={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Submit Documents</h3>
            <p className="text-gray-600 text-sm mb-4">Upload required purchase orders and compliance forms.</p>
            <span className="text-blue-600 text-sm font-semibold">Learn More →</span>
          </Link>

          <Link
            href="/track"
            aria-label="Track & Receive, navigate to Track page"
            className="flex border-2 border-gray-300 flex-col items-center text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="group"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
              <Image src="/icons/tracking-icon.svg" alt="Track & Receive Icon" width={32} height={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Track & Receive</h3>
            <p className="text-gray-600 text-sm mb-4">Monitor your shipment until it arrives.</p>
            <span className="text-blue-600 text-sm font-semibold">Learn More →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection; 