import React from 'react';

const TestimonialSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-3xl border-2 border-light w-full h-full">
      {/* Header: Image and Name info */}
      <div className="flex items-center gap-3">
        {/* Profile Image Skeleton */}
        <div className="w-10 h-10 shimmer rounded-full shrink-0" />

        <div className="space-y-1">
          {/* Name Skeleton */}
          <div className="h-4.5 shimmer rounded-md w-24" />
          {/* Location Skeleton */}
          <div className="h-3.5 shimmer rounded-md w-16 opacity-60" />
        </div>
      </div>

      {/* Stars Skeleton */}
      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-[18px] h-[18px] shimmer rounded-sm opacity-50" />
        ))}
      </div>

      {/* Review Text Skeleton */}
      <div className="mt-4 space-y-2 max-w-90">
        <div className="h-3.5 shimmer rounded-md w-full" />
        <div className="h-3.5 shimmer rounded-md w-11/12 opacity-80" />
        <div className="h-3.5 shimmer rounded-md w-4/5 opacity-60" />
      </div>
    </div>
  );
};

export default TestimonialSkeleton;