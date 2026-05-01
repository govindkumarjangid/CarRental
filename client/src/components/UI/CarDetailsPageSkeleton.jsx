import React from 'react';

const CarDetailsPageSkeleton = () => {
  return (
    <div className="h-auto w-full max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-4 w-28 bg-gray-200 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* Main Image Skeleton */}
          <div className="w-full h-64 md:h-105 bg-gray-200 rounded-2xl mb-6" />

          <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2/3 h-8 bg-gray-200 rounded-md" />
                <div className="w-20 h-5 bg-gray-200 rounded-full" />
              </div>
              <div className="w-1/3 h-5 bg-gray-200 rounded-md" />
              <div className="flex gap-2">
                <div className="w-24 h-5 bg-gray-200 rounded-md" />
                <div className="w-24 h-5 bg-gray-200 rounded-md" />
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* Features icons grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mb-2" />
                  <div className="w-16 h-3 bg-gray-200 rounded-md" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6 space-y-3">
              <div className="w-28 h-6 bg-gray-200 rounded-md mb-3" />
              <div className="w-full h-4 bg-gray-200 rounded-md" />
              <div className="w-full h-4 bg-gray-200 rounded-md" />
              <div className="w-5/6 h-4 bg-gray-200 rounded-md" />
              <div className="w-4/5 h-4 bg-gray-200 rounded-md" />
              <div className="w-2/3 h-4 bg-gray-200 rounded-md" />
            </div>

            {/* Features list */}
            <div className="mt-6">
              <div className="w-28 h-6 bg-gray-200 rounded-md mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full mr-3 shrink-0" />
                    <div className="w-24 h-4 bg-gray-200 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / BOOKING FORM */}
          <div className="h-fit sticky top-18 rounded-xl p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-24 h-8 bg-gray-200 rounded-md" />
              <div className="w-12 h-5 bg-gray-200 rounded-md" />
            </div>
            <hr className="border-gray-200 my-4" />

            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded-md" />
                <div className="w-full h-10 bg-gray-200 rounded-md" />
              </div>
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded-md" />
                <div className="w-full h-10 bg-gray-200 rounded-md" />
              </div>
            </div>

            <div className="gap-3 mb-2 flex">
              <div className="w-full h-10 bg-gray-200 rounded-md mb-3" />
              <div className="w-full h-10 bg-gray-200 rounded-md mx-auto" />
            </div>

            <div className="w-full h-12 bg-gray-200 rounded-md mb-3" />
            <div className="w-48 h-3 bg-gray-200 rounded-md mx-auto" />
          </div>
      </div>
    </div>
  );
};

export default CarDetailsPageSkeleton;
