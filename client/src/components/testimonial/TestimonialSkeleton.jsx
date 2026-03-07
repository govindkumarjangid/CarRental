const TestimonialSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-light w-full h-full animate-pulse">
      {/* Header: Image and Name info */}
      <div className="flex items-center gap-3">
        {/* Profile Image Skeleton */}
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>

        <div className="flex-1">
          {/* Name Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          {/* Location Skeleton */}
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Stars Skeleton */}
      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4.5 h-4.5 bg-gray-200 rounded-sm"></div>
        ))}
      </div>

      {/* Review Text Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
