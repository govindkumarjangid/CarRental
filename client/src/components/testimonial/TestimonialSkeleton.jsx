const TestimonialSkeleton = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 w-full h-full">
      {/* Header: Image and Name info */}
      <div className="flex items-center gap-4">
        {/* Profile Image Skeleton */}
        <div className="w-12 h-12 shimmer rounded-full shrink-0" />

        <div className="flex-1 space-y-2">
          {/* Name Skeleton */}
          <div className="h-4 shimmer rounded w-24" />
          {/* Location Skeleton */}
          <div className="h-3 shimmer rounded w-16 opacity-60" />
        </div>
      </div>

      {/* Stars Skeleton */}
      <div className="flex items-center gap-1.5 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 shimmer rounded-sm opacity-50" />
        ))}
      </div>

      {/* Review Text Skeleton */}
      <div className="mt-5 space-y-2.5">
        <div className="h-3 shimmer rounded w-full" />
        <div className="h-3 shimmer rounded w-full opacity-80" />
        <div className="h-3 shimmer rounded w-full opacity-60" />
        <div className="h-3 shimmer rounded w-3/4 opacity-40" />
      </div>
    </div>
  );
};

export default TestimonialSkeleton;