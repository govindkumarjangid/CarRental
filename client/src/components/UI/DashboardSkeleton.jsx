import React from 'react';

const SkeletonPulse = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl w-full h-full" />
);

const DashboardSkeleton = () => {
  return (
    <div className="px-4 pt-10 md:px-10 flex-1 max-w-7xl pb-10">
      {/* Title Skeleton */}
      <div className="mb-10">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      </div>

      {/* Section 1: Fleet */}
      <div className="mt-8">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 w-full max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>

      {/* Section 2: Booking */}
      <div className="mt-12">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>

      {/* Section 3: Financial */}
      <div className="mt-12">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
