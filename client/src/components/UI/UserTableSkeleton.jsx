import React from 'react';

const UserTableSkeleton = () => {
  return (
    <div className="px-4 pt-10 pb-10 md:px-10 flex-1 w-full max-w-6xl">
      {/* Title Area Skeleton */}
      <div className="mb-8">
        <div className="w-48 h-8 shimmer rounded-lg mb-2"></div>
        <div className="w-full max-w-md h-4 shimmer rounded-md opacity-70"></div>
      </div>
      
      {/* Table Container Skeleton */}
      <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-200">
        <div className="w-full">
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 flex p-4">
            <div className="h-4 shimmer rounded-md w-12 mr-4"></div>
            <div className="h-4 shimmer rounded-md flex-1"></div>
            <div className="h-4 shimmer rounded-md w-1/4 hidden md:block mx-4"></div>
            <div className="h-4 shimmer rounded-md w-24 hidden sm:block"></div>
          </div>
          {/* Rows */}
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="flex border-b last:border-b-0 border-gray-100 p-4 items-center">
              {/* Image Column */}
              <div className="w-11 h-11 shimmer rounded-full shrink-0 mr-4"></div>

              {/* User Info Column */}
              <div className="flex-1 space-y-2">
                <div className="h-5 shimmer rounded-md w-3/4 md:w-1/2"></div>
                <div className="h-3 shimmer rounded-md w-1/2 md:w-1/3 opacity-60"></div>
              </div>
              
              {/* Status Column */}
              <div className="w-1/4 hidden md:flex items-center gap-2 px-4">
                <div className="h-2.5 w-2.5 rounded-full shimmer"></div>
                <div className="h-4 shimmer rounded-md w-16"></div>
              </div>
              
              {/* Actions Column */}
              <div className="w-1/4 hidden sm:flex justify-end">
                <div className="h-8 shimmer rounded-lg w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTableSkeleton;

