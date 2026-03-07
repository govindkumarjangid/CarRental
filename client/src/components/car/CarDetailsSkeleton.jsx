const CarDetailsSkeleton = () => {
  return (
    <div
      className="w-full md:w-[30%] border-b md:border-b-0  md:border-r 
        border-gray-300 p-4 space-y-4 animate-pulse dark:border-dark-border"
    >

      <div className="h-7 bg-gray-200 dark:bg-surface rounded w-20" />
      {/* Car Image */}
      <div className="w-full h-40 sm:h-44 bg-gray-200 dark:bg-surface rounded-xl" />

      {/* Car Name */}
      <div className="h-5 bg-gray-200 dark:bg-surface rounded w-3/4" />

      {/* Car Info */}
      <div className="h-4 bg-gray-200 dark:bg-surface rounded w-full" />
    </div>
  );
};

export default CarDetailsSkeleton;
