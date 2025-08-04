import { cn } from "@/lib/utils";

export const BentoGrid4 = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4 md:auto-rows-[16rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem4 = ({
  className,
  title,
  description,
  header,
  icon,
  variant = "default",
  href,
  onClick,
}) => {
  // All variants now have row-span-2 and col-span-2
  const variants = {
    default: "md:col-span-2 md:row-span-2",
    first: "md:col-span-2 md:row-span-2",
    second: "md:col-span-2 md:row-span-2",
    third: "md:col-span-2 md:row-span-2",
    fourth: "md:col-span-2 md:row-span-2",
    // Additional layout options also standardized
    tall: "md:col-span-2 md:row-span-2",
    wide: "md:col-span-2 md:row-span-2",
    large: "md:col-span-2 md:row-span-2",
    fullWidth: "md:col-span-2 md:row-span-2",
  };

  // Create the content of the card
  const content = (
    <div className="relative w-full h-full overflow-hidden">
      {header}
      {(title || description || icon) && (
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            {icon && <div className="mb-2 transform transition-transform duration-300 group-hover/bento:translate-y-[-3px]">{icon}</div>}
            {title && (
              <div className="font-sans font-bold text-white transform transition-transform duration-300 group-hover/bento:translate-y-[-3px]">
                {title}
              </div>
            )}
            {description && (
              <div className="font-sans text-xs font-normal text-white/80 mt-1 transform transition-transform duration-300 group-hover/bento:translate-y-[-3px] line-clamp-2">
                {description}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100" />
    </div>
  );

  // Wrapper element based on whether there's a link or click handler
  const Wrapper = href ? 'a' : onClick ? 'button' : 'div';
  const wrapperProps = href 
    ? { href, className: "cursor-pointer w-full h-full" } 
    : onClick 
      ? { onClick, type: "button", className: "cursor-pointer w-full h-full" } 
      : { className: "w-full h-full" };

  return (
    <div
      className={cn(
        "group/bento flex flex-col justify-between rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        variants[variant],
        className,
      )}
    >
      <Wrapper {...wrapperProps}>
        {content}
      </Wrapper>
    </div>
  );
};

// Usage example:
// <BentoGrid4>
//   {/* All cards are now col-span-2 row-span-2 */}
//   <BentoGridItem4 
//     variant="first" 
//     title="Featured" 
//     header={<img src="..." className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105" />} 
//     href="/resources/article-1"
//   />
//   <BentoGridItem4 
//     variant="second" 
//     title="Featured" 
//     header={<img src="..." className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105" />} 
//   />
//   <BentoGridItem4 
//     variant="third" 
//     title="Featured" 
//     header={<img src="..." className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105" />} 
//   />
//   <BentoGridItem4 
//     variant="fourth" 
//     title="Featured" 
//     header={<img src="..." className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105" />} 
//   />
// </BentoGrid4> 