import React from 'react';
import TweetMarquee from '../../components/TweetMarquee';

export default function TwitterFeedPage() {
  // Example tweet URLs
  const tweetUrls = [
    "https://twitter.com/IQGroupMumbai/status/1591689282762469376",
    "https://twitter.com/elonmusk/status/1552020025858492416",
    "https://twitter.com/natfriedman/status/1451953211802193920",
    "https://twitter.com/jack/status/20"
  ];

  return (
    <main className="min-h-screen bg-[#fbfbfb] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center font-lato text-[#203663]">
          IQ Group Social Media
        </h1>
        
        <div className="mb-16">
          <p className="text-lg text-center max-w-3xl mx-auto mb-6 font-onest">
            Stay updated with our latest news, events, and industry insights through our social media channels.
          </p>
          
          <p className="text-sm text-center max-w-3xl mx-auto mb-12 font-onest text-gray-500">
            Our Twitter feed showcases the latest updates and announcements from IQ Group.
            Follow us on Twitter for real-time industry insights and company news.
          </p>
          
          {/* Tweet Marquee Component */}
          <TweetMarquee 
            tweetUrls={tweetUrls}
            title="LATEST UPDATES FROM TWITTER" 
            direction="right" 
            speed="slow" 
            className="bg-[#fbfbfb]"
          />
        </div>
        
        {/* Individual Tweet Example */}
        <div className="max-w-xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 font-lato text-[#203663]">Featured Tweet</h2>
          <div className="bg-white p-4 rounded-xl shadow-md border">
            <TweetMarquee 
              tweetUrls={["https://twitter.com/IQGroupMumbai/status/1591689282762469376"]}
              title="" 
              className="p-0"
            />
          </div>
        </div>
      </div>
    </main>
  );
} 