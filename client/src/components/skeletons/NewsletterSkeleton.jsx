import React from 'react';

const NewsletterSkeleton = () => {
  return (
    <div className="max-w-8xl m-auto flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 py-20 pb-30 h-auto w-full">
      {/* Title */}
      <div className="h-10 w-64 shimmer rounded-lg mb-4 mx-auto" />
      {/* Subtitle */}
      <div className="h-5 w-96 max-w-full shimmer rounded-md opacity-70 mb-10 mx-auto" />

      {/* Input container */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 mt-10 border border-gray-100 rounded-3xl w-[95%] sm:w-full max-w-3xl p-3 sm:p-4 bg-white">
        <div className="flex-1 h-11 shimmer rounded-xl" />
        <div className="w-full sm:w-32 h-11 sm:h-12 shimmer rounded-2xl shrink-0" />
      </div>
    </div>
  );
};

export default NewsletterSkeleton;
