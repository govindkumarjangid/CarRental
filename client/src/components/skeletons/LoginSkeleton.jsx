import React from 'react';

const LoginSkeleton = () => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-xs bg-blue-700/5">
      <div className="flex flex-col gap-4 m-auto items-start p-8 w-80 sm:w-88  rounded-3xl shadow-sm border border-gray-200 bg-white">
        {/* Title */}
        <div className="h-9 w-40 shimmer rounded-lg mx-auto mb-2" />

        {/* Input Field 1 (Email) */}
        <div className="w-full space-y-2">
          {/* <div className="h-4 w-14 shimmer rounded-md opacity-60" /> */}
          <div className="w-full h-11 shimmer rounded-xl" />
        </div>

        {/* Input Field 2 (Password) */}
        <div className="w-full space-y-2 mt-2">
          {/* <div className="h-4 w-16 shimmer rounded-md opacity-60" /> */}
          <div className="w-full h-11 shimmer rounded-xl" />
        </div>

        {/* Link toggle */}
        <div className="w-full flex justify-center mt-2">
          <div className="h-4 w-44 shimmer rounded-md opacity-70" />
        </div>

        {/* Submit Button */}
        <div className="w-full h-10.5 shimmer rounded-2xl mt-4" />
      </div>
    </div>
  );
};

export default LoginSkeleton;
