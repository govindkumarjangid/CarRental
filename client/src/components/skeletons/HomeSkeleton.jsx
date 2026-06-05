import React from 'react';
import CarCardSkeleton from './CarCardSkeleton.jsx';
import BannerSkeleton from './BannerSkeleton.jsx';
import TestimonialSkeleton from './TestimonialSkeleton.jsx';

const HomeSkeleton = () => {
  return (
    <div className="w-full">
      {/* Hero Skeleton - Matching Hero.jsx structure */}
      <div className="max-w-8xl m-auto flex flex-col justify-center items-center gap-6 bg-light text-center px-2 py-20">
        {/* Heading */}
        <div className="h-12 w-3/4 max-w-lg shimmer rounded-lg mt-15" />
        <div className="h-4.5 w-1/2 max-w-sm shimmer rounded-md" />

        {/* Search Form Placeholder */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 rounded-3xl w-full max-w-120 md:max-w-200 bg-white border border-gray-100 mt-8 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-10 flex-1 w-full md:ml-8">
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="h-4 w-28 shimmer rounded-md opacity-60" />
              <div className="h-9 w-full max-w-32 shimmer rounded-xl" />
            </div>
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="h-4 w-24 shimmer rounded-md opacity-60" />
              <div className="h-9 w-full max-w-32 shimmer rounded-xl" />
            </div>
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="h-4 w-24 shimmer rounded-md opacity-60" />
              <div className="h-9 w-full max-w-32 shimmer rounded-xl" />
            </div>
          </div>
          <div className="w-full md:w-28 h-10 shimmer rounded-2xl shrink-0" />
        </div>

        {/* Main Car Image Placeholder */}
        <div className="h-64 aspect-[2/1] shimmer rounded-3xl mx-auto mt-10" />
      </div>

      {/* Featured Section Skeleton */}
      <div className="max-w-8xl m-auto flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
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

      {/* Banner Skeleton */}
      <BannerSkeleton />

      {/* Testimonials Skeleton */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="h-10 w-48 shimmer rounded-lg mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
