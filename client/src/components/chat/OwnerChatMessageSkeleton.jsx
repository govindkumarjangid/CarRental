
const OwnerChatMessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50/50  animate-pulse h-full">
      {/* HEADER */}
      <div className="h-16 flex items-center gap-3 px-4 bg-white/80  border-b border-gray-200  shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200  rounded-full shrink-0" />
          <div className="flex flex-col space-y-2">
            <div className="h-4 bg-gray-200  rounded w-24" />
            <div className="h-3 bg-gray-200  rounded w-12" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 min-h-0 relative p-4 space-y-6 overflow-y-auto custom-scrollbar flex flex-col justify-end">
        <div className="h-12 bg-gray-100  border border-gray-100  rounded-xl rounded-tl-sm w-[60%] sm:w-[40%] self-start" />
        <div className="h-16 bg-blue-100  rounded-xl rounded-tr-sm w-[70%] sm:w-[50%] self-end" />
        <div className="h-12 bg-gray-100  border border-gray-100  rounded-xl rounded-tl-sm w-[50%] sm:w-[35%] self-start" />
        <div className="h-20 bg-blue-100  rounded-xl rounded-tr-sm w-[80%] sm:w-[60%] self-end" />
        <div className="h-12 bg-gray-100  border border-gray-100  rounded-xl rounded-tl-sm w-[60%] sm:w-[45%] self-start" />
      </div>

      {/* INPUT */}
      <div className="p-3 md:p-4 bg-white  border-t border-gray-200  shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <div className="flex-1 h-12 bg-gray-100  rounded-3xl border border-transparent shadow-inner " />
          <div className="w-[50px] h-[50px] bg-gray-200  rounded-full shrink-0" />
        </div>
      </div>
    </div>
  )
}

export default OwnerChatMessageSkeleton;