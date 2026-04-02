
const OwnerChatMessageSkeleton = () => {
  return (
    <div className="md:w-[72%] w-full flex flex-col animate-pulse ">

      {/* HEADER */}
      <div className="border-b border-gray-300 dark:border-dark-border p-2 flex">

        {/* User */}
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-gray-200 dark:bg-surface rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-surface rounded w-24" />
            <div className="h-3 bg-gray-200 dark:bg-surface rounded w-16" />
          </div>
        </div>

      </div>

      {/* CHAT BODY */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="h-10 bg-gray-200 dark:bg-surface rounded-xl w-2/3" />
        <div className="h-10 bg-gray-300 dark:bg-card-bg rounded-xl w-2/3 ml-auto" />
        <div className="h-10 bg-gray-200 dark:bg-surface rounded-xl w-1/2" />
        <div className="h-10 bg-gray-300 dark:bg-card-bg rounded-xl w-3/5 ml-auto" />
        <div className="h-10 bg-gray-200 dark:bg-surface rounded-xl w-2/3" />
        <div className="h-10 bg-gray-300 dark:bg-card-bg rounded-xl w-3/5 ml-auto" />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-gray-300 dark:border-dark-border flex gap-2">
        <div className="flex-1 h-11 bg-gray-200 dark:bg-surface rounded-md" />
        <div className="w-14 h-12 bg-gray-300 dark:bg-card-bg rounded-md" />
      </div>

    </div>
  )
}

export default OwnerChatMessageSkeleton;