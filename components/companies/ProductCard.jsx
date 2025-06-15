/**
 * Reusable Product/Service Card component for company pages
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 * @param {React.ReactNode} props.icon - Optional icon component
 * @param {string} props.className - Additional CSS classes
 */
const ProductCard = ({
  title,
  description,
  icon = null,
  className = '',
}) => {
  return (
    <div className={`bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#203663] mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ProductCard; 