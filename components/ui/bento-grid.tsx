import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
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