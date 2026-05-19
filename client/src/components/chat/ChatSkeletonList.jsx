const ChatSkeletonList = () => {
    return (
        <div className="w-full relative px-4 py-3 md:py-4 flex items-center gap-3 border-b border-gray-100/50 bg-white">
            {/* Avatar Skeleton */}
            <div className="relative shrink-0">
                <div className="h-11 w-11 shimmer rounded-full" />
                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white shimmer" />
            </div>

            {/* Text Container */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                {/* Title & Time */}
                <div className="flex justify-between items-baseline mb-1">
                    <div className="h-4 shimmer rounded-md w-1/2"></div>
                    <div className="h-3 shimmer rounded-md w-8 opacity-60"></div>
                </div>

                {/* Subtitle */}
                <div className="h-3 shimmer rounded-md w-3/4 opacity-70"></div>
            </div>
        </div>
    )
}

export default ChatSkeletonList
