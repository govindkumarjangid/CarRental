import React from 'react';

const TestimonialFormSkeleton = () => {
  return (
    <div className="fixed inset-0 z-100 backdrop-blur-xs flex items-center justify-center bg-blue-700/5 p-4">
      <div className="bg-white rounded-3xl w-full h-full md:h-fit max-w-2xl md:max-h-[90vh] overflow-hidden relative p-4 md:p-6 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {/* Add Your Review title */}
          <div className="h-7 w-40 shimmer rounded-lg" />
          {/* Close button icon */}
          <div className="w-9 h-9 shimmer rounded-full shrink-0" />
        </div>

        {/* Upload Image Section */}
        <div className="flex gap-4 items-center w-full mb-3">
          {/* Image Upload Box */}
          <div className="h-14 w-26 rounded-2xl shimmer border border-gray-200 border-dashed shrink-0" />
          {/* Upload your image text */}
          <div className="h-4.5 w-36 shimmer rounded-md opacity-60" />
        </div>

        {/* Name & Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
        </div>

        {/* Location & Rating Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
        </div>

        {/* Review Area */}
        <div className="space-y-2 mb-2">
          <div className="w-full h-24 shimmer rounded-xl" />
        </div>

        {/* Submit Button */}
        <div className="w-36 h-11 shimmer rounded-2xl my-1" />
      </div>
    </div>
  );
};

export default TestimonialFormSkeleton;
