
const ChatSkeletonList = () => {
    return (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50  w-full animate-pulse bg-white  border-l-4 border-l-transparent">
            {/* Avatar Skeleton */}
            <div className="relative shrink-0">
                <div className="h-[46px] w-[46px] bg-gray-200  rounded-full" />
            </div>

            {/* Text Container */}
            <div className="flex-1 min-w-0 py-1">
                {/* Title & Time */}
                <div className="flex justify-between items-baseline mb-2">
                    <div className="h-4 bg-gray-200  rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200  rounded w-8"></div>
                </div>

                {/* Subtitle */}
                <div className="h-3 bg-gray-200  rounded w-3/4"></div>
            </div>
        </div>
    )
}

export default ChatSkeletonList