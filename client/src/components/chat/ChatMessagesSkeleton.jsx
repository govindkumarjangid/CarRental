const ChatMessagesSkeleton = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col animate-pulse bg-white dark:bg-main-bg">
      {/* HEADER */}
      <div className="shrink-0 border-b border-gray-300 dark:border-dark-border p-3 md:p-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
        {/* User Details Skeleton */}
        <div className="flex gap-3 items-center">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-200 dark:bg-dark-border rounded-full shrink-0" />
          <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-24" />
        </div>
        
        {/* Owner Details Skeleton */}
        <div className="flex gap-3 items-center border-t sm:border-t-0 border-gray-300 dark:border-dark-border pt-4 sm:pt-0">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-200 dark:bg-dark-border rounded-full shrink-0" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-32" />
            <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-48" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar flex flex-col justify-end">
        <div className="h-12 bg-gray-100 dark:bg-card-bg rounded-2xl rounded-tl-sm w-[60%] sm:w-[40%] self-start" />
        <div className="h-16 bg-blue-100 dark:bg-surface rounded-2xl rounded-tr-sm w-[70%] sm:w-[50%] self-end" />
        <div className="h-12 bg-gray-100 dark:bg-card-bg rounded-2xl rounded-tl-sm w-[50%] sm:w-[35%] self-start" />
        <div className="h-20 bg-blue-100 dark:bg-surface rounded-2xl rounded-tr-sm w-[80%] sm:w-[60%] self-end" />
        <div className="h-12 bg-gray-100 dark:bg-card-bg rounded-2xl rounded-tl-sm w-[60%] sm:w-[45%] self-start" />
      </div>

      {/* INPUT */}
      <div className="shrink-0 p-3 md:p-4 border-t border-gray-300 dark:border-dark-border flex gap-2">
        <div className="flex-1 h-11 bg-gray-100 dark:bg-card-bg rounded-md" />
        <div className="w-16 h-11 bg-gray-200 dark:bg-surface rounded-md" />
      </div>
    </div>
  );
};

export default ChatMessagesSkeleton;
