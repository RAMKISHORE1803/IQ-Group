// components/HomepageTweetMarquee.jsx
import TweetServerList from '../app/landingComponent/tweetServer'
import TweetMarqueeWrapper from './TweetMarquee'

const HomepageTweetMarquee = () => {
  // Your actual tweet IDs - replace these with real ones
  const tweetIds = [
   "1591689282762469376",
   "1932872422589399092",
  //  "1926183337166577775",
   "1925185100653760894"
    // Add more tweet IDs as needed
  ];

  return (
    <TweetMarqueeWrapper
      direction="right"
      speed="slow"
      pauseOnHover={true}
      title="LATEST UPDATES FROM TWITTER"
      showTitle={true}
      className="bg-[#fbfbfb]"
    >
      <TweetServerList tweetIds={tweetIds} />
    </TweetMarqueeWrapper>
  );
};

export default HomepageTweetMarquee;