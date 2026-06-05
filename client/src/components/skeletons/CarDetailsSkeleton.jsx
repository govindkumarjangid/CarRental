import React from 'react';

const CarDetailsSkeleton = () => {
  return (
    <div className="w-full shrink-0 border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-6 flex flex-row md:flex-col items-center md:items-start gap-4 md:bg-gray-50/30">
      <div className="hidden md:block h-6.5 shimmer rounded-md w-32 mb-2" />

      {/* Car Image Skeleton */}
      <div className="rounded-lg md:rounded-3xl w-20 h-16 md:w-full md:h-48 shimmer border border-gray-100 shrink-0" />

      {/* Details Skeleton */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex gap-1.5 items-center flex-wrap">
          <div className="h-5 md:h-6.5 shimmer rounded-md w-32" />
          <div className="h-5 md:h-6.5 shimmer rounded-md w-12 opacity-80" />
        </div>
        <div className="mt-1.5 flex gap-1.5 items-center flex-wrap">
          <div className="h-5.5 w-16 shimmer rounded-xl opacity-60" />
          <div className="h-5.5 w-16 shimmer rounded-xl opacity-60" />
          <div className="h-5.5 w-20 shimmer rounded-xl opacity-85 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsSkeleton;
