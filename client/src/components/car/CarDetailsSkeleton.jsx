const CarDetailsSkeleton = () => {
  return (
    <div className="w-[30%] border-r border-gray-300 p-4 space-y-4 animate-pulse">
      {/* Car Image */}
      <div className="w-full h-44 bg-gray-200 rounded-xl" />
      {/* Car Name */}
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      {/* Car Info */}
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  );
};

export default CarDetailsSkeleton;
