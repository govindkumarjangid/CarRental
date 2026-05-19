const OwnerChatMessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#efe7de] h-full">
      {/* HEADER */}
      <div className="h-16 flex items-center gap-3 px-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-10 shrink-0">
        <div className="md:hidden p-2 -ml-2 rounded-full w-9 h-9 shimmer shrink-0" />
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 shimmer rounded-full shrink-0" />
          <div className="flex flex-col space-y-1.5">
            <div className="h-4 shimmer rounded-md w-32" />
            <div className="h-3 shimmer rounded-md w-16 opacity-60" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px]">
          <div className="flex flex-col min-h-full">
            <div className="flex-1" />
            <div className="p-4 md:p-6 space-y-4 flex flex-col">
              <div className="h-12 shimmer rounded-xl rounded-tl-sm w-[85%] md:w-[40%] self-start shadow-sm" />
              <div className="h-16 shimmer !bg-[#d9fdd3] rounded-xl rounded-br-sm w-[70%] md:w-[50%] self-end shadow-sm" />
              <div className="h-12 shimmer rounded-xl rounded-tl-sm w-[50%] md:w-[35%] self-start shadow-sm" />
              <div className="h-20 shimmer !bg-[#d9fdd3] rounded-xl rounded-br-sm w-[85%] md:w-[60%] self-end shadow-sm" />
              <div className="h-12 shimmer rounded-xl rounded-tl-sm w-[60%] md:w-[45%] self-start shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="p-3 md:p-4 bg-[#f0f2f5] border-t border-gray-200 shrink-0">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1 h-12 shimmer rounded-3xl" />
          <div className="w-12 h-12 shimmer rounded-full shrink-0" />
        </div>
      </div>
    </div>
  )
}

export default OwnerChatMessageSkeleton;

