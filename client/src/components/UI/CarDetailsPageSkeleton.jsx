import React from 'react';

const CarDetailsPageSkeleton = () => {
  return (
    <div className="h-auto w-full max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16">
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 shimmer rounded-full" />
        <div className="h-4 w-28 shimmer rounded-md opacity-70" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* Main Image Skeleton */}
          <div className="w-full h-64 md:h-105 shimmer rounded-2xl mb-6" />

          <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2/3 h-8 shimmer rounded-md" />
                <div className="w-20 h-5 shimmer rounded-full" />
              </div>
              <div className="w-1/3 h-5 shimmer rounded-md opacity-70" />
              <div className="flex gap-2">
                <div className="w-24 h-5 shimmer rounded-md opacity-60" />
                <div className="w-24 h-5 shimmer rounded-md opacity-60" />
              </div>
            </div>

            <hr className="border-gray-100 dark:border-dark-border my-6" />

            {/* Features icons grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center bg-gray-50/50 dark:bg-card-bg p-4 rounded-xl border border-gray-100 dark:border-dark-border">
                  <div className="w-8 h-8 shimmer rounded-full mb-2" />
                  <div className="w-16 h-3 shimmer rounded-md opacity-60" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6 space-y-3">
              <div className="w-28 h-6 shimmer rounded-md mb-3" />
              <div className="w-full h-4 shimmer rounded-md" />
              <div className="w-full h-4 shimmer rounded-md opacity-80" />
              <div className="w-5/6 h-4 shimmer rounded-md opacity-60" />
              <div className="w-4/5 h-4 shimmer rounded-md opacity-40" />
            </div>

            {/* Features list */}
            <div className="mt-6">
              <div className="w-28 h-6 shimmer rounded-md mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-4 h-4 shimmer rounded-full mr-3 shrink-0" />
                    <div className="w-24 h-4 shimmer rounded-md opacity-70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / BOOKING FORM */}
        <div className="h-fit sticky top-18 rounded-xl p-6 bg-gray-50/50 dark:bg-card-bg border border-gray-200 dark:border-dark-border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-24 h-8 shimmer rounded-md" />
            <div className="w-12 h-5 shimmer rounded-md opacity-70" />
          </div>
          <hr className="border-gray-200 dark:border-dark-border my-4" />

          <div className="space-y-4 mb-8">
            <div className="space-y-2">
              <div className="w-32 h-4 shimmer rounded-md" />
              <div className="w-full h-10 shimmer rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="w-32 h-4 shimmer rounded-md" />
              <div className="w-full h-10 shimmer rounded-lg" />
            </div>
          </div>

          <div className="gap-3 mb-2 flex">
            <div className="w-full h-10 shimmer rounded-lg mb-3" />
            <div className="w-full h-10 shimmer rounded-lg mx-auto" />
          </div>

          <div className="w-full h-12 shimmer rounded-lg mb-3" />
          <div className="w-48 h-3 shimmer rounded-md mx-auto opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPageSkeleton;
