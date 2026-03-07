const CarCardSkeleton = () => {
  return (
    <div className="h-full w-90 group rounded-xl overflow-hidden shadow-lg transition-all duration-500 animate-pulse dark:bg-card-bg">
      {/* Image skeleton */}
      <div className="w-full h-56 bg-gray-200 dark:bg-surface"></div>
      <div className="px-4 py-6">
        {/* Title */}
        <div className="w-3/4 h-5 bg-gray-200 dark:bg-surface rounded mt-4"></div>
        {/* Subtitle */}
        <div className="w-1/2 h-4 bg-gray-200 dark:bg-surface rounded mt-2"></div>
        {/* Feature row */}
        <div className="flex items-center justify-start mt-4 gap-16">
          <div className="w-26 h-6 bg-gray-200 dark:bg-surface rounded"></div>
          <div className="w-26 h-6 bg-gray-200 dark:bg-surface rounded"></div>
        </div>
        {/* Bottom row */}
        <div className="flex items-center justify-start mt-4 gap-16">
          <div className="w-26 h-6 bg-gray-200 dark:bg-surface rounded"></div>
          <div className="w-26 h-6 bg-gray-200 dark:bg-surface rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
