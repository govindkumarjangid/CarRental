const ChatMessagesSkeleton = () => {
  return (
    <div className="w-[70%] flex flex-col animate-pulse">

      {/* HEADER */}
      <div className="border-b border-gray-300 p-4 flex justify-between">

        {/* User */}
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>

        {/* Owner */}
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-42" />
            <div className="h-3 bg-gray-200 rounded w-42" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="h-10 bg-gray-200 rounded-xl w-2/3" />
        <div className="h-10 bg-gray-300 rounded-xl w-2/3 ml-auto" />
        <div className="h-10 bg-gray-200 rounded-xl w-1/2" />
        <div className="h-10 bg-gray-300 rounded-xl w-3/5 ml-auto" />
        <div className="h-10 bg-gray-200 rounded-xl w-2/3" />
        <div className="h-10 bg-gray-300 rounded-xl w-3/5 ml-auto" />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-gray-300 flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-full" />
        <div className="w-12 h-10 bg-gray-300 rounded-full" />
      </div>

    </div>
  );
};

export default ChatMessagesSkeleton;
