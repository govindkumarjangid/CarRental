const ChatMessagesSkeleton = () => {
  return (
    <div className="w-full h-full flex-1 flex flex-col min-w-0 overflow-hidden bg-[#efe7de] dark:bg-[#0b141a]">
      {/* HEADER SKELETON */}
      <div className="shrink-0 bg-white/95 dark:bg-second-bg/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-border p-2 md:p-3 flex flex-row items-center justify-between shadow-sm z-10">
        <div className="flex gap-3.5 items-center">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full shimmer" />
          <div className="space-y-1.5">
            <div className="h-4 shimmer rounded w-24" />
            <div className="h-3 shimmer rounded w-16 opacity-60" />
          </div>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <div className="hidden sm:flex flex-col items-end mr-2 space-y-1">
            <div className="h-2.5 shimmer rounded w-12 opacity-60" />
            <div className="h-3.5 shimmer rounded w-20 opacity-80" />
          </div>
          <div className="w-8 h-8 rounded-full shimmer" />
        </div>
      </div>

      {/* CHAT BODY SKELETON */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px] dark:opacity-90 dark:bg-blend-overlay dark:bg-black/20">
          <div className="flex flex-col min-h-full">
            <div className="flex-1" />
            <div className="space-y-4 flex flex-col p-1">
              <div className="h-14 shimmer dark:!bg-[#202c33] rounded-2xl rounded-bl-sm w-[60%] md:w-[40%] self-start border border-transparent dark:border-none shadow-sm" />
              <div className="h-14 shimmer !bg-[#d9fdd3] dark:!bg-[#005c4b] rounded-2xl rounded-br-sm w-[70%] md:w-[50%] self-end shadow-sm" />
              <div className="h-14 shimmer dark:!bg-[#202c33] rounded-2xl rounded-bl-sm w-[50%] md:w-[35%] self-start border border-transparent dark:border-none shadow-sm" />
              <div className="h-14 shimmer !bg-[#d9fdd3] dark:!bg-[#005c4b] rounded-2xl rounded-br-sm w-[80%] md:w-[60%] self-end shadow-sm" />
              <div className="h-14 shimmer dark:!bg-[#202c33] rounded-2xl rounded-bl-sm w-[45%] md:w-[30%] self-start border border-transparent dark:border-none shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* INPUT BOX SKELETON */}
      <div className="shrink-0 p-3 md:p-4 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-dark-border flex gap-3 z-10">
        <div className="flex-1 h-12 shimmer dark:!bg-[#2a3942] rounded-full shadow-sm" />
        <div className="h-12 w-12 md:h-12 md:w-12 shimmer rounded-full shadow-md shrink-0" />
      </div>
    </div>
  );
};

export default ChatMessagesSkeleton;
