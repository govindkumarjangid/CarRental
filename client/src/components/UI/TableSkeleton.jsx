import React from 'react';

const TableSkeleton = ({ showAddButton = true }) => {
  return (
    <div className="px-4 pt-10 pb-10 md:px-10 flex-1 w-full max-w-6xl">
      {/* Title Area Skeleton */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-3">
          <div className="w-48 h-8 shimmer rounded-lg"></div>
          <div className="w-full max-w-md h-4 shimmer rounded-md opacity-70"></div>
        </div>
        {showAddButton && <div className="w-32 h-10 shimmer rounded-lg shrink-0"></div>}
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 h-12 shimmer rounded-lg"></div>
        <div className="w-full md:w-52 h-12 shimmer rounded-lg"></div>
        <div className="w-full md:w-52 h-12 shimmer rounded-lg"></div>
      </div>

      {/* Table Container Skeleton */}
      <div className="w-full bg-white dark:bg-second-bg rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border">
        <div className="w-full">
          {/* Header */}
          <div className="bg-gray-50 dark:bg-card-bg border-b border-gray-200 dark:border-dark-border flex p-4">
            <div className="h-4 shimmer rounded-md w-1/4 mr-4"></div>
            <div className="h-4 shimmer rounded-md w-1/4 mr-4 hidden md:block"></div>
            <div className="h-4 shimmer rounded-md w-1/6 mr-4 hidden md:block"></div>
            <div className="h-4 shimmer rounded-md w-1/6 mr-4 hidden md:block"></div>
            <div className="h-4 shimmer rounded-md w-12 ml-auto"></div>
          </div>
          {/* Rows */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex border-b last:border-b-0 border-gray-100 dark:border-dark-border p-4 items-center gap-4">
              {/* Car Info Column */}
              <div className="flex items-center gap-3 flex-1 md:flex-none md:w-1/4">
                <div className="h-11 aspect-video shimmer rounded-md shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 shimmer rounded-md w-3/4"></div>
                  <div className="h-3 shimmer rounded-md w-1/2 opacity-60"></div>
                </div>
              </div>
              
              {/* Other Columns */}
              <div className="h-5 shimmer rounded-md w-1/4 hidden md:block"></div>
              <div className="h-5 shimmer rounded-md w-1/6 hidden md:block"></div>
              <div className="h-5 shimmer rounded-md w-1/6 hidden md:block"></div>
              
              {/* Actions */}
              <div className="flex gap-3 ml-auto">
                <div className="h-8 w-8 shimmer rounded-full"></div>
                <div className="h-8 w-8 shimmer rounded-full"></div>
                <div className="h-8 w-8 shimmer rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
