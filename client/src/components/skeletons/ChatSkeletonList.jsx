import React from 'react';

const ChatSkeletonList = () => {
  return (
    <div className="flex items-center justify-start gap-3 px-4 py-3 border-b border-gray-50 bg-white rounded-xl relative w-full">
      {/* Avatar Skeleton */}
      <div className="relative shrink-0">
        <div className="h-11 w-11 border border-gray-200 rounded-full aspect-square bg-gray-100 shimmer" />
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-gray-300 shimmer" />
      </div>

      {/* Text Container */}
      <div className="flex-1 min-w-0">
        {/* Title & Time */}
        <div className="flex justify-between items-baseline mb-0.5">
          <div className="h-4.5 shimmer rounded-md w-28" />
          <div className="h-3 shimmer rounded-md w-8 opacity-60" />
        </div>

        {/* Subtitle */}
        <div className="h-4 shimmer rounded-md w-3/4 opacity-65" />
      </div>
    </div>
  );
};

export default ChatSkeletonList;
