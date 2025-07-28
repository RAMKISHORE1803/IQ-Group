'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Bookmark, 
  Eye, ThumbsUp, MessageCircle, Twitter, Facebook, 
  Linkedin, Link2, ChevronRight, Tag
} from 'lucide-react';

const BlogPostPage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(847);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sample blog post data - this would typically come from props or API
  const blogPost = {
    id: 1,
    title: "Revolutionizing Steel Manufacturing: Latest Industry Innovations",
    subtitle: "How cutting-edge technologies are transforming the steel industry, improving efficiency and sustainability in manufacturing processes worldwide",
    image: "https://images.pexels.com/photos/220237/pexels-photo-220237.jpeg",
    author: {
      name: "Dr. Sarah Mitchell",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      title: "Senior Industrial Engineer",
      bio: "Dr. Mitchell has over 15 years of experience in steel manufacturing and industrial innovation. She holds a PhD in Materials Science from MIT."
    },
    publishedDate: "2024-07-25",
    lastUpdated: "2024-07-26",
    readTime: "8 min",
    category: "Steel Industry",
    tags: ["Innovation", "Manufacturing", "Technology", "Sustainability", "Industry 4.0"],
    views: 1250,
    comments: 23,
    content: `
The steel manufacturing industry stands at the precipice of a technological revolution that promises to reshape how we produce one of the world's most essential materials. As global demand for sustainable and efficient production methods intensifies, innovative technologies are emerging as game-changers in this traditionally conservative sector.

## The Current State of Steel Manufacturing

Steel production has remained largely unchanged for decades, relying on energy-intensive processes that contribute significantly to global carbon emissions. However, recent developments in automation, artificial intelligence, and sustainable production methods are creating unprecedented opportunities for transformation.

The integration of smart technologies into steel plants is not just improving efficiency—it's fundamentally changing how we approach manufacturing at every level, from raw material processing to final product delivery.

## Revolutionary Technologies Reshaping the Industry

### Artificial Intelligence and Machine Learning

Modern steel plants are increasingly adopting AI-driven systems that can predict equipment failures before they occur, optimize production schedules, and maintain consistent quality standards. These systems analyze vast amounts of data from sensors throughout the production line, identifying patterns that human operators might miss.

*Machine learning algorithms can now predict maintenance needs with 95% accuracy, reducing unplanned downtime by up to 40%.*

### Advanced Robotics and Automation

The latest generation of industrial robots is more sophisticated than ever, capable of handling complex tasks that require precision and adaptability. These systems work alongside human operators, enhancing safety while improving productivity.

### Sustainable Production Methods

Perhaps the most significant innovation is the development of hydrogen-based steel production, which could reduce carbon emissions by up to 90% compared to traditional methods. Several major steel producers are already investing billions in pilot projects.

## Impact on Global Manufacturing

The ripple effects of these innovations extend far beyond the steel industry itself. As steel becomes more sustainable and cost-effective to produce, it enables advancements in:

- **Automotive Industry**: Lighter, stronger steel alloys for electric vehicles
- **Construction**: More durable and sustainable building materials
- **Renewable Energy**: Better materials for wind turbines and solar installations
- **Infrastructure**: Improved materials for bridges, railways, and urban development

## Challenges and Opportunities

While these innovations present enormous opportunities, they also come with challenges:

**Investment Requirements**: Upgrading existing facilities requires significant capital investment, which can be challenging for smaller producers.

**Skills Gap**: The workforce needs retraining to operate and maintain new technologies effectively.

**Regulatory Compliance**: New technologies must meet stringent environmental and safety regulations.

**Supply Chain Integration**: Innovations must be compatible with existing supply chain infrastructure.

## The Road Ahead

The steel industry's transformation is not just about adopting new technologies—it's about reimagining the entire production ecosystem. Companies that embrace these changes early will likely gain significant competitive advantages.

*Industry experts predict that by 2030, smart steel plants could reduce production costs by 15-25% while cutting emissions by half.*

## Key Takeaways

As we look toward the future of steel manufacturing, several trends are becoming clear:

1. **Digital Integration**: The successful integration of digital technologies will separate industry leaders from followers
2. **Sustainability Focus**: Environmental considerations are no longer optional but essential for long-term viability
3. **Collaborative Innovation**: Partnerships between technology companies and steel producers are driving the most significant breakthroughs
4. **Global Impact**: Changes in steel production will have far-reaching effects across multiple industries

The steel industry's evolution represents more than technological advancement—it symbolizes our collective commitment to building a more sustainable and efficient industrial future. As these innovations continue to mature, we can expect to see even more dramatic changes in how we produce and use this fundamental material.

The companies and nations that invest in these technologies today will be the ones shaping the industrial landscape of tomorrow. The question is not whether these changes will happen, but how quickly the industry can adapt to embrace them.
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Global Supply Chain Optimization in Chemical Industries",
      image: "https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg",
      category: "Chemical",
      readTime: "12 min"
    },
    {
      id: 3,
      title: "Aerospace Materials: The Future of Lightweight Engineering",
      image: "https://images.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg",
      category: "Aerospace",
      readTime: "10 min"
    },
    {
      id: 4,
      title: "Digital Transformation in Manufacturing: IoT and Industry 4.0",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      category: "Technology",
      readTime: "11 min"
    }
  ];

  // Handle reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
    
    setShowShareMenu(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: readingProgress / 100 }}
      />

      {/* Navigation Breadcrumb */}
      <motion.div 
        className="bg-white border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <motion.button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              whileHover={{ x: -2 }}
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </motion.button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span>{blogPost.category}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">
              {blogPost.title.length > 50 ? blogPost.title.substring(0, 50) + '...' : blogPost.title}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="relative h-96 overflow-hidden">
          <motion.img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-6 pb-8">
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blogPost.category}
                  </span>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(blogPost.publishedDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blogPost.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                  {blogPost.title}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
                  {blogPost.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <motion.aside 
            className="lg:col-span-1 order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="sticky top-8 space-y-8">
              {/* Author Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={blogPost.author.image}
                    alt={blogPost.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{blogPost.author.name}</h3>
                    <p className="text-sm text-gray-600">{blogPost.author.title}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{blogPost.author.bio}</p>
                <motion.button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Follow Author
                </motion.button>
              </div>

              {/* Article Actions */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Article Actions</h3>
                <div className="space-y-3">
                  <motion.button
                    onClick={() => {setIsLiked(!isLiked); setLikeCount(prev => isLiked ? prev - 1 : prev + 1)}}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{likeCount} Likes</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isBookmarked ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="font-medium">
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </span>
                  </motion.button>

                  <div className="relative">
                    <motion.button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Share Article</span>
                    </motion.button>

                    {showShareMenu && (
                      <motion.div
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="space-y-2">
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <Twitter className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <Facebook className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <Linkedin className="w-4 h-4 text-blue-700" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <Link2 className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Copy Link</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <motion.button
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{blogPost.comments} Comments</span>
                  </motion.button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Article Content */}
          <motion.main 
            className="lg:col-span-3 order-1 lg:order-2"
            variants={itemVariants}
          >
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Article Meta */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                  <div className="text-sm text-gray-600">
                    Published on {formatDate(blogPost.publishedDate)}
                    {blogPost.lastUpdated !== blogPost.publishedDate && (
                      <span className="ml-4">
                        Last updated: {formatDate(blogPost.lastUpdated)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blogPost.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {likeCount}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  {blogPost.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <motion.h2
                          key={index}
                          className="text-2xl font-bold text-gray-900 mt-12 mb-6 first:mt-0"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    
                    <motion.span
                      className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Read More
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </motion.span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Subscription */}
      <motion.section 
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Industry Insights</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get the latest manufacturing trends, innovations, and market analysis delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Comments Section */}
      <motion.section 
        className="bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Comments ({blogPost.comments})
            </motion.h2>

            {/* Comment Form */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Comment</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="Share your thoughts..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
                <motion.button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Post Comment
                </motion.button>
              </div>
            </motion.div>

            {/* Sample Comments */}
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  author: "John Smith",
                  authorImage: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
                  date: "2024-07-26",
                  content: "This is an excellent analysis of the current state of steel manufacturing. The insights about AI-driven quality control are particularly interesting. We've been implementing similar systems in our facility with great results.",
                  likes: 12,
                  replies: 3
                },
                {
                  id: 2,
                  author: "Maria Rodriguez",
                  authorImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
                  date: "2024-07-25",
                  content: "The section on hydrogen-based steel production caught my attention. Do you have any data on the timeline for widespread adoption of these technologies?",
                  likes: 8,
                  replies: 1
                },
                {
                  id: 3,
                  author: "David Chen",
                  authorImage: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
                  date: "2024-07-25",
                  content: "Great article! As someone working in the automotive industry, I'm excited about the potential for lighter, stronger steel alloys mentioned here. This could revolutionize vehicle design.",
                  likes: 15,
                  replies: 2
                }
              ].map((comment, index) => (
                <motion.div
                  key={comment.id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={comment.authorImage}
                      alt={comment.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{comment.author}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-6">
                        <motion.button
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{comment.likes}</span>
                        </motion.button>
                        <motion.button
                          className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Reply ({comment.replies})
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Comments */}
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Load More Comments
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: readingProgress > 20 ? 1 : 0,
          scale: readingProgress > 20 ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-5 h-5 rotate-90" />
      </motion.button>
    </div>
  );
};

export default BlogPostPage;
                