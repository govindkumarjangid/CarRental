import { useAppContext } from "../context/AppContext";

const BookingCardSkeleton = ({ index }) => {
  const { motion, useRef, useInView } =
    useAppContext();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, scale: 0.8, opacity: 0 }}
      animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 p-5 rounded-lg mt-5 first:mt-12 backdrop-blur-sm border border-gray-300 animate-pulse">
      <div className="md:col-span-1">
        <div className="w-full h-auto aspect-video object-cover rounded-lg bg-gray-200 mb-4" />
        <div className="h-6 w-34 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-54 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-col gap-6 md:col-span-2">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-28 bg-gray-200 rounded" />
            <div className="h-8 w-28 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-60 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded" />
          <div className="h-4 w-50 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-50 bg-gray-200 rounded" />
          <div className="h-4 w-56 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="md:col-span-1 flex flex-col items-end justify-start gap-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-7 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </div>
    </motion.div>
  );
};

export default BookingCardSkeleton;
