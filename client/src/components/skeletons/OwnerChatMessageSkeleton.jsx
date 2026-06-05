import React from 'react';

const OwnerChatMessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#efe7de] h-full">
      {/* HEADER */}
      <div className="h-16 flex items-center gap-3 px-4 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10 shrink-0">
        <div className="md:hidden p-2 -ml-2 rounded-full w-9 h-9 bg-gray-100 shimmer shrink-0" />
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 border-2 border-gray-200 bg-gray-100 rounded-full aspect-square shimmer" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-gray-300 shimmer" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="h-4.5 shimmer rounded-md w-32" />
            <div className="h-3.5 shimmer rounded-md w-16 opacity-60" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 min-h-0 relative">
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px]">
          <div className="flex flex-col min-h-full">
            <div className="flex-1" />
            <div className="p-4 md:p-6 space-y-4 flex flex-col">
              <div className="h-12 shimmer rounded-xl rounded-tl-sm w-[85%] md:w-[40%] self-start" />
              <div className="h-16 shimmer bg-[#d9fdd3]! rounded-xl rounded-br-sm w-[70%] md:w-[50%] self-end" />
              <div className="h-12 shimmer rounded-xl rounded-tl-sm w-[50%] md:w-[35%] self-start" />
              <div className="h-20 shimmer bg-[#d9fdd3]! rounded-xl rounded-br-sm w-[85%] md:w-[60%] self-end" />
              <div className="h-12 shimmer rounded-xl rounded-tl-sm w-[60%] md:w-[45%] self-start" />
            </div>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="p-3 md:p-4 bg-[#f0f2f5] border-t border-gray-200 shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
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

export default OwnerChatMessageSkeleton;
