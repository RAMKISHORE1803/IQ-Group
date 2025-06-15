'use client';
import HeroSection from './HeroSection';

/**
 * Company page template component
 * 
 * @param {Object} props
 * @param {string} props.title - Company title
 * @param {string} props.subtitle - Company subtitle or description
 * @param {string} props.backgroundImage - Hero section background image
 * @param {string} props.sideText - Vertical side text
 * @param {string} props.navTitle - Navigation title (for the vertical side text)
 * @param {React.ReactNode} props.children - Additional content to be rendered below the hero section
 */
const CompanyTemplate = ({
  title,
  subtitle,
  backgroundImage,
  sideText,
  navTitle = "COMPANIES",
  children
}) => {
  return (
    <div className="company-page">
      {/* Hero Section */}
      <HeroSection
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        sideText={sideText}
        navTitle={navTitle}
      />
      
      {/* Company Content - positioned to overlap with hero section */}
      <div className="company-content relative z-20 bg-white ">
        {children}
      </div>
    </div>
  );
};

export default CompanyTemplate; 