const ChatSkeletonList = () => {
    return (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 dark:border-dark-border/30 w-full bg-white dark:bg-second-bg">
            {/* Avatar Skeleton */}
            <div className="relative shrink-0">
                <div className="h-[46px] w-[46px] shimmer rounded-full" />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-second-bg shimmer" />
            </div>

            {/* Text Container */}
            <div className="flex-1 min-w-0 py-1 space-y-2.5">
                {/* Title & Time */}
                <div className="flex justify-between items-baseline">
                    <div className="h-4 shimmer rounded w-1/2"></div>
                    <div className="h-3 shimmer rounded w-8 opacity-60"></div>
                </div>

                {/* Subtitle */}
                <div className="h-3 shimmer rounded w-3/4 opacity-70"></div>
            </div>
        </div>
    )
}

export default ChatSkeletonList