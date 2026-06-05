import React from 'react';

const BannerSkeleton = () => {
  return (
    <div className="max-w-8xl m-auto w-full py-20 px-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-8 md:pl-14 pt-10 pb-10 bg-white border border-gray-100 max-w-6xl rounded-3xl overflow-hidden md:mx-auto">
        {/* left content */}
        <div className="md:max-w-lg text-left pb-8 w-full flex-1">
          <div className="h-10 rounded-md mb-4 w-3/4 shimmer" />
          <div className="h-4 w-full rounded-md mb-2 shimmer" />
          <div className="h-4 w-5/6 rounded-md mb-6 shimmer" />
          <div className="h-10 w-32 rounded-xl mt-8 shimmer" />
        </div>

        {/* right image */}
        <div className="mt-6 md:mt-14 flex justify-center items-center md:ml-5 shrink-0">
          <div className="w-80 h-40 rounded-2xl shimmer" />
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;