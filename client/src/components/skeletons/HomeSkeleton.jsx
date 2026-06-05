import React from 'react';
import HeroSkeleton from './HeroSkeleton.jsx';
import FeaturedSectionSkeleton from './FeaturedSectionSkeleton.jsx';
import BannerSkeleton from './BannerSkeleton.jsx';
import TestimonialSectionSkeleton from './TestimonialSectionSkeleton.jsx';
import NewsletterSkeleton from './NewsletterSkeleton.jsx';

const HomeSkeleton = () => {
  return (
    <div className="w-full">
      <HeroSkeleton />
      <FeaturedSectionSkeleton />
      <BannerSkeleton />
      <TestimonialSectionSkeleton />
      <NewsletterSkeleton />
    </div>
  );
};

export default HomeSkeleton;
