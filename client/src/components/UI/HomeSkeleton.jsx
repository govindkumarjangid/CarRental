import React from 'react';

const HomeSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Hero Skeleton - Matching Hero.jsx structure */}
      <div className="max-w-8xl m-auto flex flex-col items-center gap-6 py-20 px-4">
        {/* Heading */}
        <div className="h-12 w-3/4 max-w-lg bg-gray-200 dark:bg-dark-border rounded-lg" />
        <div className="h-4 w-1/2 max-w-sm bg-gray-200 dark:bg-dark-border rounded-md" />
        
        {/* Search Form Placeholder */}
        <div className="w-full max-w-4xl h-24 bg-white dark:bg-card-bg rounded-xl mt-8" />

        
        {/* Main Car Image Placeholder */}
        <div className="w-full max-w-3xl h-64 bg-gray-200 dark:bg-dark-border rounded-2xl mt-10" />
      </div>
      
      {/* Featured Section Skeleton */}

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="h-10 w-64 shimmer rounded-lg mb-4" />
          <div className="h-5 w-96 shimmer rounded-md opacity-70" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 shimmer rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Banner Skeleton */}
      <div className="w-full h-96 shimmer my-10" />

      {/* Testimonials Skeleton */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="h-10 w-48 shimmer rounded-lg mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 shimmer rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
