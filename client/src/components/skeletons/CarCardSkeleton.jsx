import React from 'react';

const CarCardSkeleton = () => {
  return (
    <div className="h-full w-full rounded-3xl overflow-hidden bg-white border border-gray-100">
      {/* Image, status, and price skeleton */}
      <div className="relative h-60 overflow-hidden">
        <div className="w-full h-full shimmer" />

        {/* Status Badge overlay skeleton */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="w-16 h-5.5 shimmer rounded-lg opacity-85" />
        </div>

        {/* Price tag overlay skeleton */}
        <div className="absolute bottom-4 right-4 border border-white/40 backdrop-blur-xs w-20 h-9.5 shimmer rounded-2xl opacity-85" />
      </div>

      <div className="p-4 sm:p-5">
        {/* Brand & Model & Category */}
        <div className="flex justify-between items-start mb-2">
          <div className="w-full">
            <div className="w-2/3 h-5.5 shimmer rounded-md mb-2" />
            <div className="w-1/2 h-4.5 shimmer rounded-md opacity-60" />
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-4 grid grid-cols-2 gap-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-3.75 h-3.75 rounded-full shimmer mr-1.5 shrink-0 opacity-70" />
              <div className="w-16 h-4 shimmer rounded-md opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
