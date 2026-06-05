import React from 'react';
import CarCardSkeleton from './CarCardSkeleton.jsx';

const FeaturedSectionSkeleton = () => {
  return (
    <div className="max-w-7xl m-auto flex flex-col items-center py-24 px-6 md:px-16 w-full">
      <div className="flex flex-col items-center mb-16">
        <div className="h-10 w-64 shimmer rounded-lg mb-4" />
        <div className="h-5 w-96 shimmer rounded-md opacity-70" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-18 w-full">
        {[1, 2, 3].map((i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
      <div className="w-40 h-10.5 shimmer rounded-2xl mt-18" />
    </div>
  );
};

export default FeaturedSectionSkeleton;
