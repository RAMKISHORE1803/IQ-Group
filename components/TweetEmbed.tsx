"use client";

import { useEffect, useRef } from "react";

interface TweetEmbedProps {
  tweetUrl: string;
}

// TypeScript declaration for Twitter widgets API
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

const TweetEmbed = ({ tweetUrl }: TweetEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Convert x.com URLs to twitter.com URLs if needed
  const normalizedTweetUrl = tweetUrl.replace('x.com', 'twitter.com');

  useEffect(() => {
    // Load the Twitter embed script only once
    if (!window?.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      
      // When script loads, parse the container
      script.onload = () => {
        window?.twttr?.widgets?.load(containerRef.current);
      };
    } else {
      // If already loaded, parse the container again
      window?.twttr?.widgets?.load(containerRef.current);
    }
  }, [normalizedTweetUrl]);

  return (
    <div
      ref={containerRef}
      className="my-4"
      dangerouslySetInnerHTML={{
        __html: `
          <blockquote class="twitter-tweet">
            <a href="${normalizedTweetUrl}"></a>
          </blockquote>
        `,
      }}
    />
  );
};

export default TweetEmbed; 