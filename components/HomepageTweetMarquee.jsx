'use client';

import TweetMarquee from './TweetMarquee';
import { motion } from 'framer-motion';

export default function HomepageTweetMarquee() {
  // IQ Group tweet URLs
  const tweetUrls = [
    "https://x.com/IQGroupMumbai/status/1932872422589399092",
    "https://x.com/IQGroupMumbai/status/1926183337166577775",
    "https://x.com/IQGroupMumbai/status/1925185100653760894",
    "https://x.com/IQGroupMumbai/status/1591689282762469376"
  ];

  return (
    <div className="bg-[#fbfbfb] py-12 md:pb-8 md:pt-0  xl:px-[8.2vw] md:mt-[5vh]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-6">
          <h2 className="font-bold font-lato text-[#203663] text-[28px] text-center md:text-left md:text-4xl lg:text-5xl">
            SOCIAL MEDIA UPDATES
          </h2>
          <p className="text-gray-600 mt-4 px-2 md:px-0 max-w-3xl text-center md:text-left text-[20px] lg:text-[23px] font-onest">
            Stay connected with our latest news, events, and industry insights through our social media channels.
          </p>
        </motion.div>
      </div>
      
      <TweetMarquee 
        tweetUrls={tweetUrls}
        direction="right" 
        speed="slow"
        showTitle={false}
      />
    </div>
  );
} 