import React from 'react';

const FormSkeleton = ({ isFullPage = false }) => {
  const formContent = (
    <div className={`px-5 md:px-10 py-8 w-full bg-white cursor-default`}>
      {/* Title Area Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 w-1/2">
          {isFullPage && <div className="p-2 w-9 h-9 shimmer rounded-full shrink-0" />}
          <div className="h-8 w-44 shimmer rounded-lg" />
        </div>
        {!isFullPage && <div className="p-2 w-9 h-9 shimmer rounded-md shrink-0" />}
      </div>

      <div className="flex flex-col gap-5 w-full">
        {/* Image Upload Skeleton */}
        <div className="flex gap-4 items-center w-full mb-2">
          <div className="h-14 w-26 border border-gray-200 border-dashed rounded-2xl shrink-0 shimmer" />
          <div className="h-4 w-40 shimmer rounded-md opacity-60" />
        </div>

        {/* Row 1: Brand & Model (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-16 h-4 shimmer rounded-md opacity-50" />
              <div className="w-full h-11 shimmer rounded-xl" />
            </div>
          ))}
        </div>

        {/* Row 2: Year, Price, Late Fee, Category (4 items, grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-20 h-4 shimmer rounded-md opacity-50" />
              <div className="w-full h-11 shimmer rounded-xl" />
            </div>
          ))}
        </div>

        {/* Row 3: Transmission, Fuel Type, Capacity (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-20 h-4 shimmer rounded-md opacity-50" />
              <div className="w-full h-11 shimmer rounded-xl" />
            </div>
          ))}
        </div>

        {/* Row 4: Cleaning, Maintenance (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-24 h-4 shimmer rounded-md opacity-50" />
              <div className="w-full h-11 shimmer rounded-xl" />
            </div>
          ))}
        </div>

        {/* Row 5: Description (1 col, textarea) */}
        <div className="space-y-2 w-full">
          <div className="w-20 h-4 shimmer rounded-md opacity-50" />
          <div className="w-full h-24 shimmer rounded-xl" />
        </div>

        {/* Submit Button Skeleton */}
        <div className="mt-4">
          <div className="w-32 h-11 shimmer rounded-2xl" />
        </div>
      </div>
    </div>
  );

  if (isFullPage) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        {formContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-6 backdrop-blur-md bg-black/40 cursor-pointer overflow-hidden">
      <div className="relative max-w-2xl mx-auto bg-white md:max-h-[90vh] w-full rounded-3xl overflow-hidden">
        {formContent}
      </div>
    </div>
  );
};

export default FormSkeleton;
