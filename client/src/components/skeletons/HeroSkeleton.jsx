import React from 'react';

const HeroSkeleton = () => {
  return (
    <div className="max-w-8xl m-auto flex flex-col justify-center items-center gap-6 text-center px-2 py-16 w-full">
      {/* Heading */}
      <div className="h-12 w-3/4 max-w-lg shimmer rounded-lg bg-white" />
      <div className="h-4.5 w-1/2 max-w-sm shimmer rounded-md bg-white" />

      {/* Search Form Placeholder */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 rounded-3xl w-full max-w-120 md:max-w-200 bg-white/80 border border-gray-100 mt-8 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-10 flex-1 w-full md:ml-8">
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="h-4 w-28 shimmer rounded-md opacity-60" />
            <div className="h-9 w-full max-w-32 shimmer rounded-xl" />
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="h-4 w-24 shimmer rounded-md opacity-60" />
            <div className="h-9 w-full max-w-32 shimmer rounded-xl" />
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="h-4 w-24 shimmer rounded-md opacity-60" />
            <div className="h-9 w-full max-w-32 shimmer rounded-xl" />
          </div>
        </div>
        <div className="w-full md:w-28 h-10 shimmer rounded-2xl shrink-0" />
      </div>

      {/* Main Car Image Placeholder */}
      <div className="h-54 aspect-3/1 shimmer rounded-3xl mx-auto" />
    </div>
  );
};

export default HeroSkeleton;
