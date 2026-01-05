import { useAppContext } from "../../context/AppContext";
import TestimonialCard from "./TestimonialCard";
import TestimonialSkeleton from "./TestimonialSkeleton";
import { useAnimation } from 'motion/react'

const MarqueeRow = ({ items, reverse }) => {
  const { motion, reviewLoading, useEffect } = useAppContext();
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
          [...items, ...items, ...items].map((review, i) => (
            <div
              key={i}
              className="pointer-events-auto shrink-0 w-70 sm:w-80 md:w-90"
            >
              <TestimonialCard review={review} />
            </div>
          ))
        )
      }
    </motion.div>

  );
};

export default MarqueeRow;
