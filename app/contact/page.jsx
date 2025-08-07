"use client"
import HeroSection from "./herosection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactOptionsSection from "@/components/about/ContactOptionsSection";
import OfficesCarousel from "@/components/contact/OfficesCarousel";
import WarehousesCarousel from "@/components/contact/WarehousesCarousel";
import Script from "next/script";
import { useEffect } from "react";

export default function ContactPage() {
  // Initialize EmailJS when the component mounts
  useEffect(() => {
    // Check if the EmailJS script is already loaded
    if (typeof window !== 'undefined') {
      try {
        if (window.emailjs) {
          window.emailjs.init("s6GdekZ52XdeNxl47");
          console.log("EmailJS initialized from contact page");
          
          // Log available services and templates for debugging
          console.log("EmailJS service ID: iq_groups_forms");
          console.log("EmailJS template ID: template_77hi5zv");
        } else {
          console.error("EmailJS not available in window object");
        }
      } catch (error) {
        console.error("Failed to initialize EmailJS from contact page:", error);
      }
    }
  }, []);

  return (
    <>
      {/* EmailJS Script */}
      <Script
        id="emailjs-sdk-page"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (window.emailjs) {
            try {
              window.emailjs.init("s6GdekZ52XdeNxl47");
              console.log("EmailJS initialized successfully from page component");
            } catch (err) {
              console.error("Error initializing EmailJS from page:", err);
            }
          }
        }}
      />
      
      <div>
        <div className="relative">
          <HeroSection
            title=""
            subtitle="How can we help you? Get in touch with one of our global offices below"
            backgroundImage="https://www.multiplex.global/media/y2ggchbo/bm_office_37_final_a3.jpg?rxy=0.5196706312900274,0.35134681114340327&width=3840&height=1640&v=1dad1e2563cf320"
            sideText="Contact"
            navTitle="CONTACT"
            showContactOptions={true}
          />
        </div>
        <div className="relative bg-white min-h-[60vh]">
          <ContactOptionsSection />
          
          {/* Our Offices Section */}
            <OfficesCarousel />
          
          {/* Our Warehouses Section */}
            <WarehousesCarousel />
          
          <div id="form">
            <ContactFormSection />
          </div>
        </div>
        
        {/* Contact Form Section */}
        
      </div>
    </>
  );
}