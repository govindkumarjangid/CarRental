const OwnerChatMessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#efe7de] h-full">
      {/* HEADER */}
      <div className="h-16 flex items-center gap-3 px-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 shimmer rounded-full shrink-0" />
          <div className="flex flex-col space-y-1.5">
            <div className="h-4 shimmer rounded w-32" />
            <div className="h-3 shimmer rounded w-16 opacity-60" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 min-h-0 relative p-4 md:p-6 space-y-5 overflow-y-auto custom-scrollbar flex flex-col justify-end bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px]">
        <div className="h-12 shimmer border border-transparent rounded-xl rounded-tl-sm w-[60%] md:w-[40%] self-start" />
        <div className="h-16 shimmer !bg-[#d9fdd3] rounded-xl rounded-tr-sm w-[70%] md:w-[50%] self-end" />
        <div className="h-12 shimmer border border-transparent rounded-xl rounded-tl-sm w-[50%] md:w-[35%] self-start" />
        <div className="h-20 shimmer !bg-[#d9fdd3] rounded-xl rounded-tr-sm w-[80%] md:w-[60%] self-end" />
        <div className="h-12 shimmer border border-transparent rounded-xl rounded-tl-sm w-[60%] md:w-[45%] self-start" />
      </div>

      {/* INPUT */}
      <div className="p-3 md:p-4 bg-[#f0f2f5] border-t border-gray-200 shrink-0">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1 h-12 shimmer rounded-3xl border border-transparent" />
          <div className="w-12 h-12 shimmer rounded-full shrink-0" />
        </div>
      </div>
    </div>
  )
}

export default OwnerChatMessageSkeleton;
