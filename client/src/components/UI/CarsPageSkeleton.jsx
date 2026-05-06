import React from 'react';
import CarCardSkeleton from '../car/CarCardSkeleton.jsx';

const CarsPageSkeleton = () => {
  return (
    <div className="max-w-8xl m-auto flex flex-col items-center pb-20 relative">
      {/* Search bar and title skeleton */}
      <div className="bg-light w-full py-20 px-4 flex flex-col justify-center items-center">
        <div className="h-10 w-64 shimmer rounded-lg mb-4" />
        <div className="h-5 w-96 shimmer rounded-md opacity-70 mb-8" />

        {/* Search bar skeleton */}
        <div className="mt-8 h-14 w-full max-w-3xl shimmer rounded-lg" />

      </div>

      {/* Filter bar skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 w-full px-5 md:px-19 max-w-7xl">
        <div className="h-5 w-40 shimmer rounded-md" />
        <div className="flex-1 h-10 shimmer rounded-full mx-4" />
        <div className="flex gap-3">
          <div className="h-10 w-24 shimmer rounded-lg" />
          <div className="h-10 w-24 shimmer rounded-lg" />
          <div className="h-10 w-24 shimmer rounded-lg" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 px-5 md:px-30 w-full max-w-7xl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default CarsPageSkeleton;

