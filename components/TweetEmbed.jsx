"use client";

import { useEffect, useRef, useState } from "react";

const TweetEmbed = ({ tweetUrl }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
const observerRef = useRef(null);
  
  // Convert x.com URLs to twitter.com URLs if needed
  const normalizedTweetUrl = tweetUrl?.replace('x.com', 'twitter.com') || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  

  useEffect(() => {
    if (!isVisible) return;
    
    if (!normalizedTweetUrl) {
      setError("Invalid tweet URL");
      setLoading(false);
      return;
    }

    let scriptLoaded = false;
    let timeoutId;

    const loadTwitterScript = () => {
      // Check if Twitter script is already loaded
      if (window?.twttr?.widgets) {
        renderTweet();
        return;
      }

      // Load Twitter widget script if not already loaded
      try {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          scriptLoaded = true;
          renderTweet();
        };
        script.onerror = () => {
          setError("Failed to load Twitter widget script");
          setLoading(false);
        };
        document.body.appendChild(script);
      } catch (err) {
        console.error("Error loading Twitter script:", err);
        setError("Failed to load Twitter widget");
        setLoading(false);
      }
    };

    const renderTweet = () => {
      if (!containerRef.current) return;
      
      try {
        window?.twttr?.widgets?.load(containerRef.current)
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error rendering tweet:", err);
            setError("Failed to render tweet");
            setLoading(false);
          });
      } catch (err) {
        console.error("Error rendering tweet:", err);
        setError("Failed to render tweet");
        setLoading(false);
      }
    };

    // Set a timeout to detect if tweet doesn't load
    timeoutId = setTimeout(() => {
      if (loading && !scriptLoaded) {
        setError("Tweet took too long to load");
        setLoading(false);
      }
    }, 10000); // 10 seconds timeout

    loadTwitterScript();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [normalizedTweetUrl, isVisible]);

  if (error) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-gray-600">Unable to load tweet: {error}</p>
        <a 
          href={normalizedTweetUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          View on Twitter
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className=""
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