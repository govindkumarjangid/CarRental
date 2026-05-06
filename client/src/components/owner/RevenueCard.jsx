import React from 'react';
import { motion } from 'framer-motion';
import { iconList } from '../../assets/assets.jsx';

const RevenueCard = ({ revenue, currency }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border border-gray-200   rounded-xl max-w-sm w-full shadow-sm flex flex-col justify-center items-center text-center"
    >
      <div className="bg-purple-100  p-4 rounded-full mb-4">
        <iconList.IndianRupee className="text-purple-600" size={32} />
      </div>
      <h3 className="text-gray-500 text-sm font-medium  mb-1">Monthly Revenue</h3>
      <p className="text-3xl font-bold text-primary">{currency} {revenue.toLocaleString("en-IN")}</p>
      <p className="text-xs text-gray-400 mt-2">Revenue calculated for current month</p>
    </motion.div>
  );
};

export default RevenueCard;

