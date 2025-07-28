'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, Clock, Calendar, User, Share2, Linkedin, Twitter, Link2, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { getBlogPostBySlug, getRelatedPosts } from '../blogData';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Progress indicator component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = (scrolled / scrollHeight) * 100;
      setProgress(percentage);
    };
    
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <motion.div 
        className="h-full bg-gradient-to-r from-blue-600 to-green-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

// Social share component with floating animation
const SocialShare = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-400 transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopyLink}
        className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors relative"
      >
        <LinkIcon className="w-5 h-5" />
        {copied && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: -60 }}
            exit={{ opacity: 0 }}
            className="absolute right-full mr-2 text-sm text-green-600 whitespace-nowrap"
          >
            Copied!
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
};

// Related article card with enhanced hover effects
const RelatedCard = ({ article, index }) => {
  const cardRef = useRef(null);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer"
      style={{ backgroundImage: `url(${article.image})` }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-black opacity-20" />
      
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {article.type}
        </span>
        <span className="ml-2 text-white text-xs font-medium px-2 py-1 rounded-full bg-opacity-60 bg-gray-700">
          {article.date}
        </span>
      </div>
      
      <motion.div
        className="absolute bg-white/70 backdrop-blur-md rounded-lg overflow-hidden"
        initial={{ 
          bottom: "16px",
          left: "16px",
          right: "16px",
          top: "auto",
          height: "120px"
        }}
        whileHover={{ 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative z-10 p-4">
          <p className="text-xs text-gray-600 font-medium mb-1">{article.type}</p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-black leading-tight transition-all duration-300">
            {article.title}
          </h3>
        </div>
        
        <div className="px-4 pb-4 opacity-0 group-hover:opacity-100">
          <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            {article.description}
          </p>
          <Link href={article.link} className="inline-flex items-center text-[16px] font-medium text-green-600 hover:text-green-700 transition-colors">
            → Read More
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main blog component
export default function BlogPost({ params }) {
  const { slug } = params;
  const blogData = getBlogPostBySlug(slug);
  const relatedArticles = getRelatedPosts(slug);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  
  // Handle case where blog post doesn't exist
  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/resources/insights" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Back to All Insights
          </Link>
        </div>
      </div>
    );
  }
  
  useEffect(() => {
    // Animate hero section on load
    const tl = gsap.timeline();
    tl.fromTo('.hero-overlay', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    )
    .fromTo('.hero-content > *', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out' }, 
      '-=1'
    );
    
    // Animate content sections on scroll
    gsap.utils.toArray('.content-section').forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-transparent">
      <ReadingProgress />
      <SocialShare />
      
      {/* Back navigation */}
      <motion.div 
        className="fixed top-24 left-4 lg:left-8 z-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/resources/insights">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Insights</span>
          </motion.button>
        </Link>
      </motion.div>
      
      {/* Hero section with parallax */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-end lg:mt-[-7vh] overflow-hidden"
        style={{ opacity }}
      >
        <motion.div 
          className="absolute inset-[-100px] z-0"
          style={{ scale }}
        >
          <img 
            src={blogData.heroImage}
            alt={blogData.title}
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </motion.div>
        
        <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
          <div className="flex items-center gap-4 text-white/80 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              {blogData.type}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {blogData.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {blogData.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold font-lato text-white mb-6 leading-tight">
            {blogData.title}
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 font-light mb-8 max-w-3xl">
            {blogData.subtitle}
          </p>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">By {blogData.author}</p>
              <p className="text-white/70 text-sm">CEO, IQ Group</p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Main content */}
      <article ref={contentRef} className="relative max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="prose prose-lg lg:prose-xl max-w-none">
          {blogData.content.map((section, index) => {
            if (section.type === 'paragraph') {
              return (
                <p key={index} className="content-section text-gray-700 leading-relaxed mb-6 font-onest">
                  {section.text}
                </p>
              );
            }
            
            if (section.type === 'heading') {
              return (
                <h2 key={index} className="content-section text-3xl lg:text-4xl font-bold font-lato text-[#1a365d] mt-12 mb-6">
                  {section.text}
                </h2>
              );
            }
            
            if (section.type === 'quote') {
              return (
                <motion.blockquote 
                  key={index}
                  className="content-section relative my-12 pl-8 border-l-4 border-green-600"
                  whileInView={{ x: [30, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="text-2xl italic text-gray-700 font-light mb-4">
                    "{section.text}"
                  </p>
                  {section.author && (
                    <cite className="text-gray-600 not-italic">— {section.author}</cite>
                  )}
                </motion.blockquote>
              );
            }
            
            if (section.type === 'list') {
              return (
                <ul key={index} className="content-section space-y-4 my-8">
                  {section.items.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 font-onest">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              );
            }
            
            return null;
          })}
        </div>
      </article>
      
      {/* Related articles section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">CONTINUE READING</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">Related Articles</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.map((article, index) => (
              <RelatedCard key={index} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 