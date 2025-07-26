import HeroSection from "@/components/contact/herosection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactOptionsSection from "@/components/about/ContactOptionsSection";
import OfficesCarousel from "@/components/contact/OfficesCarousel";

export default function ContactPage() {
  return (
    <div>
      <div className="relative">
        <HeroSection
          title=""
          subtitle="How can we help you? Get in touch with one of our global offices below"
          backgroundImage="https://www.multiplex.global/media/y2ggchbo/bm_office_37_final_a3.jpg?rxy=0.5196706312900274,0.35134681114340327&width=3840&height=1640&v=1dad1e2563cf320"
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