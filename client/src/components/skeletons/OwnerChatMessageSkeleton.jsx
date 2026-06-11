import React from 'react';

const OwnerChatMessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full">
      {/* HEADER SKELETON */}
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

      {/* CHAT BODY SKELETON */}
      <div className="flex-1 min-h-0 relative">
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] background-size:{16px_16px]">
          <div className="flex flex-col min-h-full">
            <div className="flex-1" />
            <div className="p-4 md:p-6 space-y-4 flex flex-col">
              {/* Received Message */}
              <div className="h-12 bg-white/80 border border-slate-200 shimmer rounded-3xl rounded-tl-none w-[85%] md:w-[40%] self-start" />
              {/* Sent Message */}
              <div className="h-12 bg-primary/40 border border-primary/15 shimmer rounded-3xl rounded-tr-none w-[70%] md:w-[50%] self-end" />
              {/* Received Message */}
              <div className="h-12 bg-white/80 border border-slate-200 shimmer rounded-3xl rounded-tl-none w-[50%] md:w-[35%] self-start" />
              {/* Sent Message */}
              <div className="h-12 bg-primary/40 border border-primary/15 shimmer rounded-3xl rounded-tr-none w-[85%] md:w-[60%] self-end" />
            </div>
          </div>
        </div>
      </div>

      {/* INPUT SKELETON */}
      <div className="p-3 md:p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 shrink-0 shadow-lg">
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
          {/* Attachment Button */}
          <div className="h-12 w-12 rounded-2xl bg-slate-100 shimmer shrink-0" />
          {/* Text input area */}
          <div className="flex-1 h-12 bg-slate-50 rounded-2xl border border-slate-200 flex items-center px-4">
            <div className="h-4.5 w-32 shimmer rounded-md opacity-45" />
          </div>
          {/* Send Button */}
          <div className="h-12 w-12 rounded-2xl bg-slate-100 shimmer shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default OwnerChatMessageSkeleton;
