import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { iconList } from "../../index.js";

const EmptyBookings = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-6 rounded-xl bg-primary">
        <iconList.CalendarX className="w-10 h-10 text-gray-200" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-2xl font-semibold mt-6 ">
        No bookings yet
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-gray-600  mt-2 text-center max-w-md">
        You haven’t booked any cars yet. Once you make a booking, it will appear here.
      </motion.p>

      <Link
        to="/cars"
        className="flex group items-center justify-center gap-2 px-6 py-2 border-2 border-gray-500 text-gray-600 hover:bg-primary rounded-xl mt-6 cursor-pointer hover:text-light hover:border-light active:scale-95 transition-all">
        Browse Cars
        <iconList.ArrowRight className="w-4 h-4 stroke-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
export default EmptyBookings;

