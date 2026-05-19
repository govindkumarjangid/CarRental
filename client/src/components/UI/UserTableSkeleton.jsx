import React from 'react';

const UserTableSkeleton = () => {
  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
      {/* Title Area Skeleton */}
      <div className="mb-6">
        <div className="w-48 h-8 shimmer rounded-lg mb-2"></div>
        <div className="w-full max-w-md h-4 shimmer rounded-md opacity-70"></div>
      </div>

      {/* Table Container Skeleton */}
      <div className="w-full mt-6">
        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 shimmer rounded-full shrink-0"></div>
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-5 shimmer rounded-md w-3/4"></div>
                  <div className="h-4 shimmer rounded-md w-1/2 opacity-60"></div>
                  <div className="h-4 shimmer rounded-md w-1/3 mt-2"></div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="h-9 shimmer rounded-lg w-24"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-white rounded-xl overflow-hidden border border-gray-200">
          <div className="w-full">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 flex p-4">
              <div className="h-4 shimmer rounded-md w-12 mr-4"></div>
              <div className="h-4 shimmer rounded-md flex-1"></div>
              <div className="h-4 shimmer rounded-md w-1/4 mx-4"></div>
              <div className="h-4 shimmer rounded-md w-24"></div>
            </div>
            {/* Rows */}
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="flex border-b last:border-b-0 border-gray-100 p-4 items-center">
                {/* Image Column */}
                <div className="w-11 h-11 shimmer rounded-full shrink-0 mr-4"></div>

                {/* User Info Column */}
                <div className="flex-1 space-y-2">
                  <div className="h-5 shimmer rounded-md w-1/2"></div>
                  <div className="h-3 shimmer rounded-md w-1/3 opacity-60"></div>
                </div>

                {/* Status Column */}
                <div className="w-1/4 flex items-center gap-2 px-4">
                  <div className="h-2.5 w-2.5 rounded-full shimmer"></div>
                  <div className="h-4 shimmer rounded-md w-16"></div>
                </div>

                {/* Actions Column */}
                <div className="w-1/4 flex justify-end">
                  <div className="h-8 shimmer rounded-lg w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTableSkeleton;

