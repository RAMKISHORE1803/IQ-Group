// components/TweetServerCached.jsx
import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { getTweet as _getTweet } from 'react-tweet/api'

// Cached tweet fetching function - similar to your sample
const getCachedTweet = unstable_cache(
  async (id) => _getTweet(id),
  ['tweet'], // Cache key prefix
  { 
    revalidate: 3600, // Revalidate every hour (instead of 24 hours for more frequent updates)
    tags: ['tweets'] // For potential cache invalidation
  }
)

// Individual Tweet Server Component
const TweetCard = async ({ tweetId }) => {
  try {
    const tweet = await getCachedTweet(tweetId)
    
    if (!tweet) {
      return <TweetNotFound />
    }

    return (
      <div className="tweet-no-images lg:max-h-[600px] light max-h-[330px] ">
        <EmbeddedTweet tweet={tweet} />
        <style jsx>{`
          .tweet-no-images :global([data-testid="tweetPhoto"]),
          .tweet-no-images :global(.r-1p0dtai),
          .tweet-no-images :global([aria-label*="Image"]),
          .tweet-no-images :global(img[alt*="Image"]) {
            display: none !important;
          }
        `}</style>
      </div>
    )
  } catch (error) {
    console.error('Error fetching tweet:', error)
    return <TweetNotFound error={error} />
  }
}

// Tweet with Suspense wrapper
const TweetWithSuspense = ({ tweetId }) => (
  <Suspense fallback={<TweetSkeleton className="light" />}>
    <TweetCard tweetId={tweetId} />
  </Suspense>
)

// Server Component that renders all tweets
const TweetServerList = ({ tweetIds }) => {
  return (
    <>
      {tweetIds.map((tweetId, idx) => (
        <div
          className="relative w-[500px] rounded-b-lg max-w-full flex-shrink-0"
          key={`tweet-${idx}`}
        >
          <TweetWithSuspense tweetId={tweetId} />
        </div>
      ))}
    </>
  )
}

export default TweetServerList