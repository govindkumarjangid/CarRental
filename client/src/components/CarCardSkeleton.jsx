import { useAppContext } from "../context/AppContext";

const CarCardSkeleton = ({ index }) => {
  const { motion, useRef, useInView } = useAppContext();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="h-full w-90 group rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_4px_24px_rgba(255,255,255,0.15)] active:scale-95 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-56 bg-gray-200"></div>
      <div className="px-4 py-6">
        {/* Title */}
        <div className="w-3/4 h-5 bg-gray-200 rounded mt-4"></div>
        {/* Subtitle */}
        <div className="w-1/2 h-4 bg-gray-200 rounded mt-2"></div>
        {/* Feature row */}
        <div className="flex items-center justify-start mt-4 gap-16">
          <div className="w-26 h-6 bg-gray-200 rounded"></div>
          <div className="w-26 h-6 bg-gray-200 rounded"></div>
        </div>
        {/* Bottom row */}
        <div className="flex items-center justify-start mt-4 gap-16">
          <div className="w-26 h-6 bg-gray-200 rounded"></div>
          <div className="w-26 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCardSkeleton;
