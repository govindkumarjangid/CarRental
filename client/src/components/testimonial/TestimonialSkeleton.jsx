const TestimonialSkeleton = () => {
  return (
    <div className="w-full max-w-xl rounded-2xl bg-white shadow-md p-6 animate-pulse">
      {/* Top row – avatar + name */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col gap-2">
          {/* Name */}
          <div className="w-40 h-4 bg-gray-200 rounded"></div>
          {/* Location */}
          <div className="w-28 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
      {/* Stars */}
      <div className="flex gap-2 mt-5">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      {/* Description text */}
      <div className="space-y-3 mt-5">
        <div className="w-full h-3 bg-gray-200 rounded"></div>
        <div className="w-11/12 h-3 bg-gray-200 rounded"></div>
        <div className="w-10/12 h-3 bg-gray-200 rounded"></div>
        <div className="w-9/12 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
