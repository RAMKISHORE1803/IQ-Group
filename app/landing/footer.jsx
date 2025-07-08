'use client'
import React from 'react';
import { Linkedin, Instagram, Youtube,Facebook, MapPin, Mail, Phone, ArrowRight, Twitter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const IQGroupFooter = () => {
  return (
    <footer className="bg-[#203663] text-[#203663]">
      {/* Contact Us Section - White Background */}
      <div className="bg-[#fbfbfb] text-[#203663]">
        <section className="w-full flex flex-col md:flex-row md:flex-between md:max-h-[530px]  overflow-hidden">
          {/* Left Content Section */}
          <motion.div 
            className="flex-1 bg-[#fbfbfb] md:bg-[#fbfbfb] flex items-center px-[20px] py-8 sm:px-[30px] md:px-[40px] lg:px-[60px] xl:px-[110px] md:py-16 lg:py-20 xl:py-24"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full max-w-xl mx-auto md:mx-0">
              {/* Header Label */}
              <motion.div 
                className="text-sm text-[#203663] md:text-base md:text-[#203663] font-medium tracking-wider mb-4 md:mb-5 lg:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                GET IN TOUCH
              </motion.div>
              
              {/* Main Heading */}
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-lato font-bold text-[#121212] md:text-[#203663] leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                REACH OUT TO US
              </motion.h2>
              
              {/* Description */}
              <motion.p 
                className="text-base sm:text-lg lg:text-xl font-onest font-light text-[#121212] md:text-[#203663] leading-relaxed mb-6 sm:mb-7 md:mb-8 lg:mb-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Looking to source high-quality raw materials or explore our diverse product range? Our team is ready to assist with your specific requirements and provide tailored solutions for your industry needs.
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#203663] text-white hover:bg-[#152544] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg font-onest font-medium transition-all duration-300 group">
                  CONTACT US
                  <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Image Section */}
          <motion.div 
            className="w-full md:w-5/12 lg:w-[45%] xl:w-[40%] h-[300px] sm:h-[350px] md:h-auto md:min-h-[50vh] relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img 
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Contact IQ Group" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          </motion.div>
        </section>
      </div>

      {/* Connect With Us Section - Blue Background */}
      <div className="bg-[#203663] text-[#fbfbfb] py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {/* Company Name and Social Links */}
            <div className="flex flex-col">
              <Link href="/" className="flex items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Image 
                    src="https://www.iqgroup.in/image/iql.png" 
                    alt="IQ Group" 
                    width={140} 
                    height={125}
                    priority
                  />
                </div>
              </Link>
              <p className="text-sm text-white/80 mb-6 font-onest">
                A global leader in raw materials supply chain solutions, connecting resources with industries worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://www.linkedin.com/company/iq-minerals-&-metals?trk=company_name" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                  <Linkedin size={22} strokeWidth={1.5} />
                </a>
                <a href="https://x.com/IQGroupMumbai" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                  <Twitter size={22} strokeWidth={1.5} />
                </a>
               
                <a href="https://www.facebook.com/iqgroupmumbai" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                  <Facebook size={22} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="flex items-start space-x-3 mb-4">
              <Link href="https://www.google.com/maps/search/714+Samartha+Aishwarya+Off+New+Link+Road+Opp+Highland+Park+Andheri+W+Mumbai+400053/@19.1451479,72.8279507,17z?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <p className="text-sm text-white/80 font-onest">
                  714 – Samartha Aishwarya, Off. New Link Road, Opp. Highland Park, Andheri-W, Mumbai – 400053
                </p>
                </Link>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@iqgroup.in" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  info@iqgroup.in
                </a>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Call Us</h3>
              <div className="space-y-3">
                <a href="tel:+919987998036" className="flex items-center space-x-3 group">
                  <Phone size={18} className="flex-shrink-0" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-onest">+91 9987998036</span>
                </a>
                <a href="tel:+919987998037" className="flex items-center space-x-3 group">
                  <Phone size={18} className="flex-shrink-0" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-onest">+91 9987998037</span>
                </a>
                <a href="tel:+912235112519" className="flex items-center space-x-3 group">
                  <Phone size={18} className="flex-shrink-0" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-onest">+91 2235112519</span>
                </a>
                <a href="tel:+912235112520" className="flex items-center space-x-3 group">
                  <Phone size={18} className="flex-shrink-0" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-onest">+91 2235112520</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  About us
                </Link>
                <Link href="/quality" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  Quality & Certs
                </Link>
                <Link href="/companies" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  Companies
                </Link>
                <Link href="/careers" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  Careers
                </Link>
                <Link href="/industries" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  Industries
                </Link>
                <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors font-onest">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Separator Line */}
        <div className="container mx-auto px-4 sm:px-6 mt-12">
          <hr className="border-white/10 mb-6" />
        </div>

        {/* Bottom Footer */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-white/70 font-onest">
              © {new Date().getFullYear()} IQ Group. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/privacy" className="text-xs text-white/70 hover:text-white transition-colors font-onest">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/70 hover:text-white transition-colors font-onest">
                Terms of Use
              </Link>
              <Link href="/cookies" className="text-xs text-white/70 hover:text-white transition-colors font-onest">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IQGroupFooter;