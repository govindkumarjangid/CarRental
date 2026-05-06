const CarDetailsSkeleton = () => {
  return (
    <div className="w-full shrink-0 border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-6 flex flex-row md:flex-col items-center md:items-start gap-4 md:bg-gray-50/30">
      <div className="hidden md:block h-6 shimmer rounded w-32 mb-2" />

      {/* Car Image Skeleton */}
      <div className="rounded-lg md:rounded-xl w-20 h-16 md:w-full md:h-48 shimmer shrink-0" />


      {/* Details Skeleton */}
      <div className="flex flex-col flex-1 min-w-0 space-y-3 mt-2">
        <div className="h-5 md:h-6 shimmer rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-4 shimmer rounded w-16 opacity-60" />
          <div className="h-4 shimmer rounded w-16 opacity-60" />
          <div className="h-4 shimmer rounded w-16 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsSkeleton;

