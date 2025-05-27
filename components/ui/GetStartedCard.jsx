import Link from 'next/link';

const GetStartedCard = ({ 
  title = "How to get started", 
  description = "Whether you need to find prices, place a booking, submit documents, or track your cargo, our step-by-step guides will help you find your way around.",
  buttonText = "Get started",
  buttonLink = "/",
  icon 
}) => {
  return (
    
    <div className="flex flex-col border border-gray-300 rounded-md py-4 px-2 max-w-[350px] shadow-sm">
      <div className="flex h-full w-full items-start justify-between gap-3">
        <div className="w-6 h-6">{icon}</div>
        <div className="flex-1">
          <h2 className="text-lg text-[#010A4E] font-semibold">{title}</h2>
          <p className="text-sm text-gray-700 mt-1">{description}</p>
        </div>
      </div>
      <Link href={buttonLink}>
      <button className="mt-4 self-center bg-[#010A4E] text-white text-sm font-semibold px-4 py-2 rounded-md">
        Get started
      </button>
      </Link>
    </div>
    
  );
};

export default GetStartedCard; 