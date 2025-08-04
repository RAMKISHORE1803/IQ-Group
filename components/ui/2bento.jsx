import { cn } from "@/lib/utils";

export const BentoGrid2 = ({
  className,
  children,

}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-4 gap-4 md:auto-rows-[10rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem2 = ({
  className,
  title,
  description,
  header,
  icon,
  variant = "default",
}) => {
  // Define variants for different card sizes
  const variants = {
    default: "col-span-2 row-span-2", // 2x2 cards as default
    small: "col-span-1 row-span-1",   // 1x1 cards
    wide: "col-span-3 row-span-1",    // Wide cards
    tall: "col-span-1 row-span-3",    // Tall cards
    large: "col-span-3 row-span-2",   // Large cards
  };

  return (
    <div
      className={cn(
        "group/bento flex flex-col justify-between rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        variants[variant],
        className,
      )}
    >
      <div className="relative w-full h-full overflow-hidden">
        {header}
        {(title || description || icon) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            {icon && <div className="mb-2">{icon}</div>}
            {title && (
              <div className="font-sans font-bold text-white">
                {title}
              </div>
            )}
            {description && (
              <div className="font-sans text-xs font-normal text-white/80 mt-1">
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Usage Examples:
// <BentoGridItem2 title="Default Card" /> // 2x2 card
// <BentoGridItem2 variant="small" title="Small Card" /> // 1x1 card
// <BentoGridItem2 variant="wide" title="Wide Card" /> // 3x1 card
// <BentoGridItem2 variant="tall" title="Tall Card" /> // 1x3 card
// <BentoGridItem2 variant="large" title="Large Card" /> // 3x2 card