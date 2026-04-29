import React from 'react';

const CarDetailsPageSkeleton = () => {
  return (
    <div className="h-auto w-full max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 dark:bg-main-bg animate-pulse">
      {/* Back Button Skeleton */}
      <div className="w-32 h-5 bg-gray-200 dark:bg-dark-border rounded-md mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* Main Image Skeleton */}
          <div className="w-full aspect-video md:h-100 bg-gray-200 dark:bg-dark-border rounded-xl mb-6"></div>

          <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="mt-3 space-y-3">
              <div className="w-2/3 h-8 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              <div className="w-1/3 h-5 bg-gray-200 dark:bg-dark-border rounded-md"></div>
            </div>

            <hr className="border-gray-200 dark:border-dark-border my-6" />

            {/* Features icons grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center bg-gray-50 dark:bg-card-bg p-4 rounded-lg">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-dark-border rounded-md mb-2"></div>
                  <div className="w-16 h-3 bg-gray-200 dark:bg-dark-border rounded-md"></div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6 space-y-3">
              <div className="w-32 h-6 bg-gray-200 dark:bg-dark-border rounded-md mb-3"></div>
              <div className="w-full h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              <div className="w-full h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              <div className="w-4/5 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
            </div>

            {/* Features list */}
            <div className="mt-6">
              <div className="w-32 h-6 bg-gray-200 dark:bg-dark-border rounded-md mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-dark-border rounded-full mr-3 shrink-0"></div>
                    <div className="w-24 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / BOOKING FORM */}
        <div>
          <div className="h-96 sticky top-18 rounded-xl p-6 bg-gray-50 dark:bg-card-bg border border-gray-100 dark:border-dark-border">
            {/* Price skeleton */}
            <div className="w-32 h-8 bg-gray-200 dark:bg-dark-border rounded-md mb-4"></div>
            <hr className="border-gray-200 dark:border-dark-border my-4" />
            
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
                <div className="w-full h-10 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              </div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
                <div className="w-full h-10 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              </div>
            </div>
            
            <div className="w-full h-12 bg-gray-200 dark:bg-dark-border rounded-md mb-3"></div>
            <div className="w-48 h-3 bg-gray-200 dark:bg-dark-border rounded-md mx-auto"></div>
          </div>
          
          {/* Chat with owner card skeleton */}
          <div className="w-80 bg-gray-50 dark:bg-card-bg rounded-xl p-4 mt-10 ml-auto border border-gray-100 dark:border-dark-border">
            <div className="w-full h-44 bg-gray-200 dark:bg-dark-border rounded-xl mb-3"></div>
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-dark-border rounded-md mb-3"></div>
            <div className="flex justify-between mt-3 mb-4">
              <div className="w-16 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-dark-border rounded-md"></div>
            </div>
            <div className="w-full h-10 bg-gray-200 dark:bg-dark-border rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPageSkeleton;
