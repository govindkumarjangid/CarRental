import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="px-4 pt-10 md:px-10 flex-1 max-w-7xl pb-10 w-full animate-pulse">
      {/* Title Area Skeleton */}
      <div className="mb-8">
        <div className="w-48 h-8 bg-gray-200 dark:bg-dark-border rounded-md mb-2"></div>
        <div className="w-full max-w-lg h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 max-w-12/12">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex gap-2 items-center justify-between p-4 rounded-md border border-gray-200 dark:border-dark-border dark:bg-card-bg">
            <div className="space-y-3 w-full">
              <div className="w-20 h-3 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              <div className="w-12 h-6 bg-gray-200 dark:bg-dark-border rounded-md"></div>
            </div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-dark-border rounded-full shrink-0"></div>
          </div>
        ))}
      </div>

      {/* Lower Section Skeleton */}
      <div className="flex items-start md:flex-row flex-col gap-6 mb-8 w-full max-w-12/12">
        {/* Recent Bookings Skeleton */}
        <div className="p-4 md:p-6 border border-gray-200 rounded-md w-full dark:border-dark-border dark:bg-card-bg">
          <div className="w-40 h-6 bg-gray-200 dark:bg-dark-border rounded-md mb-2"></div>
          <div className="w-60 h-4 bg-gray-200 dark:bg-dark-border rounded-md mb-6"></div>
          
          {[1, 2, 3].map((item) => (
            <div key={item} className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="hidden md:block w-12 h-12 bg-gray-200 dark:bg-dark-border rounded-full"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
                  <div className="w-24 h-3 bg-gray-200 dark:bg-dark-border rounded-md"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-4 bg-gray-200 dark:bg-dark-border rounded-md hidden sm:block"></div>
                <div className="w-20 h-6 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue Skeleton */}
        <div className="p-4 md:p-6 border border-gray-200 rounded-md max-w-lg w-full dark:border-dark-border dark:bg-card-bg">
          <div className="w-40 h-6 bg-gray-200 dark:bg-dark-border rounded-md mb-2"></div>
          <div className="w-48 h-4 bg-gray-200 dark:bg-dark-border rounded-md mb-8"></div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-dark-border rounded-md mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
