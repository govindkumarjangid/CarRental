import React from 'react';

const CarDetailsPageSkeleton = () => {
  return (
    <div className="h-auto max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16">
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-2 mb-6 text-gray-400">
        <div className="w-5 h-5 shimmer rounded-full shrink-0" />
        <div className="h-4.5 w-24 shimmer rounded-md opacity-70" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* Main Image Skeleton */}
          <div className="w-full h-64 md:h-100 shimmer rounded-3xl mb-6" />

          <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="mt-3">
              <div className="flex items-center gap-3">
                <div className="w-2/3 h-8.5 shimmer rounded-md" />
                <div className="w-20 h-5.5 shimmer rounded-3xl opacity-75" />
              </div>
              <div className="w-1/3 h-5.5 shimmer rounded-md opacity-60 mt-2 mb-2" />
            </div>

            <hr className="border border-gray-300 my-6" />

            {/* Features icons grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center bg-light p-4 rounded-3xl">
                  <div className="w-6 h-6 shimmer rounded-full mb-2 opacity-70" />
                  <div className="w-16 h-3.5 shimmer rounded-md opacity-60" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">
                Description
              </h1>
              <div className="space-y-2">
                <div className="w-full h-4 shimmer rounded-md opacity-75" />
                <div className="w-full h-4 shimmer rounded-md opacity-75" />
                <div className="w-5/6 h-4 shimmer rounded-md opacity-60" />
              </div>
            </div>

            {/* Features list */}
            <div>
              <h1 className="text-xl font-medium mb-3">
                Features
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-4 h-4 shimmer rounded-full mr-2 shrink-0 opacity-70" />
                    <div className="w-24 h-4 shimmer rounded-md opacity-65" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / BOOKING FORM */}
        <div className="h-max sticky top-10 rounded-3xl p-6 space-y-6 text-gray-500 bg-white border border-gray-100">
          <div className="flex items-center justify-between gap-2">
            <div className="w-28 h-8 shimmer rounded-md" />
            <div className="w-12 h-5.5 shimmer rounded-md opacity-65" />
          </div>
          <hr className="border-gray-200 my-4" />

          {/* Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="w-32 h-4.5 shimmer rounded-md opacity-65" />
              <div className="w-full h-11 shimmer rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="w-32 h-4.5 shimmer rounded-md opacity-65" />
              <div className="w-full h-11 shimmer rounded-xl" />
            </div>
          </div>

          {/* Payment buttons */}
          <div className="space-y-2">
            <div className="w-24 h-4.5 shimmer rounded-md opacity-65" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10.5 shimmer rounded-xl" />
              <div className="h-10.5 shimmer rounded-xl" />
            </div>
          </div>

          {/* Book button */}
          <div className="w-full h-12.5 shimmer rounded-2xl" />
          <div className="w-44 h-4.5 shimmer rounded-md mx-auto opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPageSkeleton;
