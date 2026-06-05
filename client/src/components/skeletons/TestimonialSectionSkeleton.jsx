import React from 'react';
import TestimonialSkeleton from './TestimonialSkeleton.jsx';

const TestimonialSectionSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 w-full">
      <div className="h-10 w-48 shimmer rounded-lg mb-12 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <TestimonialSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSectionSkeleton;
