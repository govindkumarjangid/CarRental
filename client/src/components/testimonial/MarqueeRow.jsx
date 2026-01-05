import { useAppContext } from "../../context/AppContext";
import TestimonialCard from "./TestimonialCard";
import TestimonialSkeleton from "./TestimonialSkeleton";

const MarqueeRow = ({ items, reverse }) => {
  const { motion, reviewLoading } = useAppContext();

  return (
    <motion.div
      className="flex gap-x-6 gap-y-20 pointer-events-none"
      animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 10,
      }}
    >
      {
        reviewLoading && items.length === 0 ? (
          [...Array(5), ...Array(5), ...Array(5)].map((_, i) => (
            <div
              key={i}
              className="pointer-events-auto min-w-80 sm:min-w-90 lg:min-w-105"
            >
              <TestimonialSkeleton />
            </div>
          ))
        ) : (
          <>
            {[...items, ...items, ...items].map((review, i) => (
              <div
                key={i}
                className="pointer-events-auto min-w-80 sm:min-w-90 lg:min-w-105"
              >
                <TestimonialCard review={review} />
              </div>
            ))}
          </>
        )
      }


    </motion.div>
  );
};

export default MarqueeRow;
