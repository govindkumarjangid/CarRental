
const ChatSkeletonList = () => {
    return (
        <div className="animate-pulse bg-white rounded-xl shadow p-4 space-y-4">

            {/* Image */}
            <div className="h-40 w-full bg-gray-300 rounded-lg"></div>

            {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>

            {/* Subtitle */}
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>

            {/* Info Row */}
            <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Button */}
            <div className="h-8 bg-gray-300 rounded w-full"></div>
        </div>
    )
}

export default ChatSkeletonList