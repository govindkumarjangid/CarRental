import React from 'react';
import { motion } from 'framer-motion';
import { iconList } from '../../assets/assets.jsx';

const RecentBookings = ({ bookings, currency }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border border-gray-200 dark:border-dark-border dark:bg-card-bg rounded-xl w-full shadow-sm"
    >
      <h2 className="text-lg font-bold mb-1 dark:text-dark-text">Recent Bookings</h2>
      <p className="text-gray-500 text-sm mb-6 dark:text-dark-muted">Latest customer transactions</p>
      
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                booking.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                booking.status === "confirmed" ? "bg-green-100 text-green-600" :
                booking.status === "completed" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
              }`}>
                <iconList.ClipboardList size={18} />
              </div>
              <div>
                <p className="font-medium text-sm">{booking.car.brand} {booking.car.model}</p>
                <p className="text-xs text-gray-500">{booking.createdAt.split("T")[0]}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs md:text-sm font-semibold">{currency}{booking.price.toLocaleString("en-IN")}</p>
              <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
                booking.status === "confirmed" ? "bg-green-500/10 text-green-600" :
                booking.status === "completed" ? "bg-blue-500/10 text-blue-600" :
                booking.status === "cancelled" ? "bg-red-500/10 text-red-600" : "bg-yellow-500/10 text-yellow-600"
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentBookings;
