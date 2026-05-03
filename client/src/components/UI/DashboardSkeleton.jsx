import React from 'react';

const SkeletonPulse = () => (
  <div className="shimmer rounded-xl w-full h-full" />
);

const DashboardSkeleton = () => {
  return (
    <div className="px-4 pt-10 md:px-10 flex-1 max-w-7xl pb-10">
      {/* Title Skeleton */}
      <div className="mb-10">
        <div className="h-8 w-48 shimmer rounded-lg mb-2" />
        <div className="h-4 w-96 shimmer rounded-md opacity-70" />
      </div>

      {/* Section 1: Fleet */}
      <div className="mt-8">
        <div className="h-6 w-40 shimmer rounded-md mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 shimmer rounded-xl" />
          ))}
        </div>
        <div className="h-64 w-full max-w-xl shimmer rounded-xl" />
      </div>

      {/* Section 2: Booking */}
      <div className="mt-12">
        <div className="h-6 w-40 shimmer rounded-md mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 shimmer rounded-xl" />
          ))}
        </div>
        <div className="h-64 w-full shimmer rounded-xl" />
      </div>

      {/* Section 3: Financial */}
      <div className="mt-12">
        <div className="h-6 w-40 shimmer rounded-md mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 shimmer rounded-xl" />
          ))}
        </div>
        <div className="h-64 w-full shimmer rounded-xl" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
