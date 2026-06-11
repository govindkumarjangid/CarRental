import React from 'react';

const ChatSkeletonList = () => {
  return (
    <div className="flex items-center h-18 px-3 border-b border-gray-100">
  <div className="relative shrink-0">
    <div className="h-12 w-12 rounded-full bg-gray-100 shimmer" />
  </div>

  <div className="flex-1 ml-3 overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="h-4 w-32 rounded bg-gray-100 shimmer" />
      <div className="h-3 w-12 rounded bg-gray-100 shimmer" />
    </div>

    <div className="mt-2 h-3.5 w-3/4 rounded bg-gray-100 shimmer" />
  </div>
</div>
  );
};

export default ChatSkeletonList;
