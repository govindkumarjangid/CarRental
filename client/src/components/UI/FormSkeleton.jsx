import React from 'react';

const FormSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-pulse">
      <div className="max-w-4xl mx-auto bg-white  px-8 py-8 shadow-2xl rounded-md w-full max-h-[90vh]">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-48 h-8 bg-gray-200  rounded-md"></div>
          <div className="w-10 h-10 bg-gray-200  rounded-md"></div>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-24 h-16 bg-gray-200  rounded-md"></div>
          <div className="w-48 h-4 bg-gray-200  rounded-md"></div>
        </div>

        {/* Grid Inputs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="space-y-2">
              <div className="w-20 h-4 bg-gray-200  rounded-md"></div>
              <div className="w-full h-10 bg-gray-200  rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="mt-6 space-y-2">
          <div className="w-24 h-4 bg-gray-200  rounded-md"></div>
          <div className="w-full h-24 bg-gray-200  rounded-md"></div>
        </div>

        {/* Button */}
        <div className="w-32 h-10 bg-gray-200  rounded-md mt-6"></div>
      </div>
    </div>
  );
};

export default FormSkeleton;
