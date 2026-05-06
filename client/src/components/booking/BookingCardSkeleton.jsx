const BookingCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-xl mt-5 first:mt-12 backdrop-blur-sm border border-gray-200 dark:border-dark-border bg-white/50 dark:bg-second-bg/50">

      {/* Column 1: Image and Car details */}
      <div className="md:col-span-1">
        <div className="w-full h-auto aspect-video rounded-lg shimmer mb-2" />
        <div className="h-6 w-3/4 shimmer rounded-md mt-4 mb-2" />
        <div className="h-4 w-full shimmer rounded-md opacity-70" />
      </div>

      {/* Column 2: Status, Rental Period, Locations */}
      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-28 shimmer rounded-md" />
          <div className="h-7 w-24 shimmer rounded-md" />
        </div>

        {/* Rental Period Skeleton */}
        <div className="flex items-start gap-3 mt-6">
          <div className="w-4 h-4 rounded-full shimmer mt-1 shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-24 shimmer rounded opacity-60" />
            <div className="h-5 w-3/4 shimmer rounded-md" />
            <div className="h-4 w-1/2 shimmer rounded opacity-60" />
          </div>
        </div>

        {/* Pickup Location Skeleton */}
        <div className="flex items-start gap-3 mt-4">
          <div className="w-4 h-4 rounded-full shimmer mt-1 shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-28 shimmer rounded opacity-60" />
            <div className="h-4 w-1/2 shimmer rounded-md" />
          </div>
        </div>

        {/* Return Location Skeleton */}
        <div className="flex items-start gap-3 mt-4">
          <div className="w-4 h-4 rounded-full shimmer mt-1 shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-28 shimmer rounded opacity-60" />
            <div className="h-4 w-1/2 shimmer rounded-md" />
          </div>
        </div>
      </div>

      {/* Column 3: Total Price and Time */}
      <div className="md:col-span-1 flex flex-col justify-between items-end gap-6">
        <div className="flex flex-col items-end gap-2 w-full">
          <div className="h-3 w-16 shimmer rounded opacity-60" />
          <div className="h-8 w-32 shimmer rounded-md" />
          <div className="h-4 w-full shimmer rounded-md mt-2 opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
