import React from 'react';
import CarCardSkeleton from './CarCardSkeleton.jsx';

const CarsPageSkeleton = () => {
  return (
    <div className="max-w-8xl m-auto flex flex-col items-center pb-20 relative w-full">
      {/* Search bar and title skeleton */}
      <div className="bg-light w-full py-20 px-4 flex flex-col justify-center items-center">
        <div className="h-10 w-64 shimmer rounded-lg mb-4" />
        <div className="h-5 w-96 shimmer rounded-md opacity-70 mb-8" />

        {/* Search bar skeleton */}
        <div className="mt-8 flex items-center justify-between gap-4 border border-gray-200 px-4 py-3 rounded-2xl max-w-96 md:max-w-3xl bg-white w-full">
          <div className="w-5 h-5 shimmer rounded-full shrink-0 opacity-70" />
          <div className="flex-1 h-5 shimmer rounded-md opacity-45" />
          <div className="w-5 h-5 shimmer rounded-md shrink-0 opacity-70" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 w-full px-5 md:px-19 max-w-7xl">
        <div className="h-5.5 w-28 shimmer rounded-md" />
        {/* Companies row placeholder */}
        <div className="flex items-center gap-2 overflow-hidden w-full md:flex-1 px-2 py-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8.5 w-16 shimmer rounded-full shrink-0 opacity-80" />
          ))}
        </div>

        {/* Dropdowns placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="h-8.5 w-24 shimmer rounded-xl" />
          <div className="h-8.5 w-24 shimmer rounded-xl" />
          <div className="h-8.5 w-28 shimmer rounded-xl" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 px-5 md:px-30 w-full max-w-7xl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default CarsPageSkeleton;
