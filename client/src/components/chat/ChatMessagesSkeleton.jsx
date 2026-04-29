const ChatMessagesSkeleton = () => {
  return (
    <div className="w-full flex-1 flex flex-col min-w-0 overflow-hidden bg-[#efe7de] dark:bg-[#0b141a] animate-pulse">
      {/* HEADER SKELETON */}
      <div className="shrink-0 bg-white/95 dark:bg-second-bg/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-border p-2 md:p-3 flex flex-row items-center justify-between shadow-sm z-10">
        <div className="flex gap-3.5 items-center">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gray-200 dark:bg-dark-border" />
          <div className="space-y-1.5">
            <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-24" />
            <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <div className="hidden sm:flex flex-col items-end mr-2 space-y-1">
            <div className="h-2.5 bg-gray-200 dark:bg-dark-border rounded w-12" />
            <div className="h-3.5 bg-gray-200 dark:bg-dark-border rounded w-20" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-border" />
        </div>
      </div>

      {/* CHAT BODY SKELETON */}
      <div className="flex-1 p-4 md:p-6 space-y-4 overflow-hidden bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px] opacity-20">
        <div className="h-10 bg-white dark:bg-[#202c33] rounded-2xl rounded-bl-sm w-[60%] md:w-[40%] self-start" />
        <div className="h-12 bg-[#d9fdd3] dark:bg-[#005c4b] rounded-2xl rounded-br-sm w-[70%] md:w-[50%] ml-auto" />
        <div className="h-10 bg-white dark:bg-[#202c33] rounded-2xl rounded-bl-sm w-[50%] md:w-[35%] self-start" />
        <div className="h-14 bg-[#d9fdd3] dark:bg-[#005c4b] rounded-2xl rounded-br-sm w-[80%] md:w-[60%] ml-auto" />
      </div>

      {/* INPUT BOX SKELETON */}
      <div className="shrink-0 p-3 md:p-4 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-dark-border flex gap-2">
        <div className="flex-1 h-12 bg-white dark:bg-[#2a3942] rounded-full" />
        <div className="w-12 h-12 md:w-[50px] md:h-[50px] bg-gray-200 dark:bg-[#2a3942] rounded-full" />
      </div>
    </div>
  );
};

export default ChatMessagesSkeleton;
