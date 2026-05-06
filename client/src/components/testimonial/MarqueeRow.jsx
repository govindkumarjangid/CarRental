import { lazy, Suspense, useEffect } from "react";
import { useAnimation, motion } from 'motion/react'

import { useAuthStore } from "../../store/useAuthStore.js";
import TestimonialSkeleton from "./TestimonialSkeleton";

const TestimonialCard = lazy(() => import("./TestimonialCard.jsx"));

const MarqueeRow = ({ items, reverse }) => {
  const { reviewLoading } = useAuthStore();
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 12,
      },
    })
  }, [reverse])

  return (

    <motion.div
      className="flex gap-4 sm:gap-6 md:gap-8 pointer-events-none"
      style={{ willChange: "transform" }}
      animate={controls}
    >
      {
        reviewLoading && items.length === 0 ? (
          [...Array(15)].map((_, i) => (
            <div
              key={i}
              className="pointer-events-auto shrink-0 w-70 sm:w-80 md:w-90"
            >
              <TestimonialSkeleton />
            </div>
          ))
        ) : (
          [...items, ...items, ...items].map((review, index) => (
            <div
              key={index}
              className="pointer-events-auto shrink-0 w-70 sm:w-80 md:w-90"
            >
              <Suspense fallback={<TestimonialSkeleton />}>
                <TestimonialCard review={review} />
              </Suspense>
            </div>
          ))
        )
      }
    </motion.div>

  );
};

export default MarqueeRow;

