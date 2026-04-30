const BookingCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-lg mt-5 first:mt-12 backdrop-blur-sm border border-gray-200 dark:bg-card-bg dark:border-dark-border animate-pulse">

      {/* Column 1: Image and Car details */}
      <div className="md:col-span-1">
        <div className="w-full h-auto aspect-video rounded-lg bg-gray-200 dark:bg-surface mb-2" />
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-surface rounded mt-2 mb-2" />
        <div className="h-4 w-full bg-gray-200 dark:bg-surface rounded" />
      </div>

      {/* Column 2: Status, Rental Period, Locations */}
      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-28 bg-gray-200 dark:bg-surface rounded-md" />
          <div className="h-7 w-24 bg-gray-200 dark:bg-surface rounded-md" />
        </div>

        {/* Rental Period Skeleton */}
        <div className="flex items-start gap-2 mt-4">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-surface mt-1 shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-24 bg-gray-200 dark:bg-surface rounded" />
            <div className="h-5 w-72 bg-gray-200 dark:bg-surface rounded" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-surface rounded" />
          </div>
        </div>

        {/* Pickup Location Skeleton */}
        <div className="flex items-start gap-2 mt-4">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-surface mt-1 shrink-0" />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-3 w-28 bg-gray-200 dark:bg-surface rounded" />
            <div className="h-4 w-36 bg-gray-200 dark:bg-surface rounded" />
          </div>
        </div>

        {/* Return Location Skeleton */}
        <div className="flex items-start gap-2 mt-4">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-surface mt-1 shrink-0" />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-3 w-28 bg-gray-200 dark:bg-surface rounded" />
            <div className="h-4 w-36 bg-gray-200 dark:bg-surface rounded" />
          </div>
        </div>
      </div>

      {/* Column 3: Total Price and Time */}
      <div className="md:col-span-1 flex flex-col justify-between items-end gap-6">
        <div className="flex flex-col items-end gap-2 w-full">
          <div className="h-3 w-16 bg-gray-200 dark:bg-surface rounded" />
          <div className="h-8 w-32 bg-gray-200 dark:bg-surface rounded" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-surface rounded mt-2" />
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
