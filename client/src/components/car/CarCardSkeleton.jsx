const CarCardSkeleton = () => {
  return (
    <div className="h-full w-90 group rounded-xl overflow-hidden border border-gray-100 transition-all duration-500 bg-white">
      {/* Image skeleton */}
      <div className="w-full h-56 shimmer"></div>
      <div className="px-4 py-6">
        {/* Title */}
        <div className="w-3/4 h-5 shimmer rounded-md mt-4"></div>
        {/* Subtitle */}
        <div className="w-1/2 h-4 shimmer rounded-md mt-2 opacity-70"></div>
        {/* Feature row */}
        <div className="flex items-center justify-start mt-6 gap-8">
          <div className="w-24 h-6 shimmer rounded-md opacity-60"></div>
          <div className="w-24 h-6 shimmer rounded-md opacity-60"></div>
        </div>
        {/* Bottom row */}
        <div className="flex items-center justify-start mt-4 gap-8">
          <div className="w-24 h-6 shimmer rounded-md opacity-60"></div>
          <div className="w-24 h-6 shimmer rounded-md opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
