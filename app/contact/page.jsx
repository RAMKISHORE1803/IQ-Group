import HeroSection from "@/components/contact/herosection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactOptionsSection from "@/components/about/ContactOptionsSection";
import OfficesCarousel from "@/components/contact/OfficesCarousel";

export default function ContactPage() {
  return (
    <div>
      <div className="relative">
        <HeroSection
          title="Contact Us"
          subtitle="How can we help you? Get in touch with one of our global offices below"
          backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          sideText="Contact Us"
          navTitle="CONTACT"
          showContactOptions={true}
        />
      </div>
      <div className="relative bg-white min-h-[60vh]">
        <ContactOptionsSection />
        
        {/* Our Offices Section */}
          <OfficesCarousel />
        
        <div id="form">
          <ContactFormSection />
        </div>
      </div>
      
      {/* Contact Form Section */}
      
    </div>
  );
}