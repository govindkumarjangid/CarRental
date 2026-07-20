import React from 'react';
import { motion } from 'motion/react';
import { iconList } from '../../assets/assets.jsx';

const RecentBookings = ({ bookings, currency }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ willChange: "opacity" }}
      className="p-6 border border-gray-200  rounded-xl w-full shadow-sm">
      <h2 className="text-lg font-bold mb-1">Recent Bookings</h2>
      <p className="text-gray-500 text-sm mb-6 ">Latest customer transactions</p>

      <div className="space-y-1">
        {bookings.map((booking, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                booking.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                booking.status === "confirmed" ? "bg-green-100 text-green-600" :
                booking.status === "completed" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
              }`}>
                <iconList.ClipboardList size={18} />
              </div>
              <div>
                <p className="font-medium text-sm">{booking.car.brand} {booking.car.model}</p>
                <p className="text-[10px] text-gray-500 font-medium">
                  {(() => {
                    const date = new Date(booking.createdAt);
                    const now = new Date();
                    const isToday = date.toDateString() === now.toDateString();
                    const yesterday = new Date();
                    yesterday.setDate(now.getDate() - 1);
                    const isYesterday = date.toDateString() === yesterday.toDateString();

                    const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

                    if (isToday) return `Today at ${timeStr}`;
                    if (isYesterday) return `Yesterday • ${timeStr}`;
                    return `${date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} • ${timeStr}`;
                  })()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs md:text-sm font-semibold">{currency}{booking.price.toLocaleString("en-IN")}</p>
              <span className={`px-2 py-0.5 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
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

