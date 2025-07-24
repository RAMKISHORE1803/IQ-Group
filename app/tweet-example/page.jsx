import React from 'react';
import TweetEmbed from '../../components/TweetEmbed';

export default function TweetExamplePage() {
  return (
    <main className="min-h-screen bg-[#fbfbfb] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center font-lato text-[#203663]">
          Tweet Embed Examples
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-center mb-12 font-onest">
            Examples of individual tweet embeds using Twitter's native embed script.
          </p>
          
          <div className="grid gap-8">
            {/* Example 1: Basic Tweet */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h2 className="text-xl font-semibold mb-4 font-lato text-[#203663]">First Tweet Ever</h2>
              <TweetEmbed tweetUrl="https://x.com/IQGroupMumbai/status/1932872422589399092" />
            </div>
            
            {/* Example 2: IQ Group Tweet */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h2 className="text-xl font-semibold mb-4 font-lato text-[#203663]">IQ Group Conference</h2>
              <TweetEmbed tweetUrl="https://twitter.com/IQGroupMumbai/status/1591689282762469376" />
            </div>
            
            {/* Example 3: Elon Musk Tweet */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h2 className="text-xl font-semibold mb-4 font-lato text-[#203663]">Elon Musk</h2>
              <TweetEmbed tweetUrl="https://x.com/IQGroupMumbai/status/1926183337166577775" />
            </div>
            
            {/* Example 4: Nat Friedman Tweet */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h2 className="text-xl font-semibold mb-4 font-lato text-[#203663]">Nat Friedman</h2>
              <TweetEmbed tweetUrl="https://x.com/IQGroupMumbai/status/1925185100653760894" />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/twitter-feed" 
              className="inline-block bg-[#203663] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#152648] transition-colors"
            >
              View Tweet Marquee Example
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 