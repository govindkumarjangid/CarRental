
const ChatSkeletonList = () => {
    return (
        <div className="animate-pulse bg-white shadow-lg px-4 md:px-6 py-3 cursor-pointer border-b border-gray-400 w-full flex items-center gap-4 rounded-xl">

            {/* Image */}
            <div className="h-10 w-10 bg-gray-300 rounded-full shrink-0"></div>

            {/* Text Container */}
            <div className="flex flex-col gap-2 w-full">

                {/* Title */}
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>

                {/* Subtitle */}
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

            </div>

        </div>
    )
}

export default ChatSkeletonList