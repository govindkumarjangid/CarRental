import React from 'react';

const ChatMessagesSkeleton = () => {
  return (
    <div className="w-full h-full flex-1 flex flex-col min-w-0 overflow-hidden bg-[#efe7de]">
      {/* HEADER SKELETON */}
      <div className="shrink-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-2 md:p-3 flex flex-row items-center justify-between z-10">
        <div className="flex gap-3.5 items-center">
          <div className="relative">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-gray-200 shimmer shrink-0" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-gray-300 shimmer" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="h-4.5 shimmer rounded-md w-28" />
            <div className="h-3.5 shimmer rounded-md w-16 opacity-60" />
          </div>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <div className="hidden sm:flex flex-col items-end mr-2 space-y-1">
            <div className="h-3 shimmer rounded-md w-14 opacity-50" />
            <div className="h-4 shimmer rounded-md w-20 opacity-80" />
          </div>
          <div className="w-8 h-8 rounded-full border border-gray-200 shimmer shrink-0" />
        </div>
      </div>

      {/* CHAT BODY SKELETON */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px]">
          <div className="flex flex-col min-h-full">
            <div className="flex-1" />
            <div className="space-y-3 flex flex-col p-1">
              <div className="h-14 shimmer rounded-2xl rounded-bl-sm w-[80%] md:w-[40%] self-start" />
              <div className="h-16 shimmer !bg-[#d9fdd3] rounded-2xl rounded-br-sm w-[70%] md:w-[50%] self-end" />
              <div className="h-14 shimmer rounded-2xl rounded-bl-sm w-[50%] md:w-[35%] self-start" />
              <div className="h-20 shimmer !bg-[#d9fdd3] rounded-2xl rounded-br-sm w-[85%] md:w-[60%] self-end" />
              <div className="h-14 shimmer rounded-2xl rounded-bl-sm w-[45%] md:w-[30%] self-start" />
            </div>
          </div>
        </div>
      </div>

      {/* INPUT BOX SKELETON */}
      <div className="shrink-0 p-3 md:p-4 bg-[#f0f2f5] border-t border-gray-200 flex flex-col gap-2 z-10">
        <div className="flex gap-2 items-end">
          <div className="h-12 w-12 rounded-full shimmer shrink-0" />
          <div className="flex-1 h-12 bg-white rounded-3xl border border-transparent flex items-center px-5">
            <div className="h-4.5 w-32 shimmer rounded-md opacity-45" />
          </div>
          <div className="h-12 w-12 md:h-12.5 md:w-12.5 rounded-full shimmer shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesSkeleton;
