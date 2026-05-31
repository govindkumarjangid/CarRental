import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ card, index, colorMap }) => {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
      className="flex gap-4 items-center justify-between p-4 rounded-3xl border border-gray-200 shadow-sm transition-all duration-300 group"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider ">
          {card.title}
        </h2>
        <p className="text-lg md:text-xl font-bold ">
          {card.value}
        </p>
      </div>
      <div className={`${colorMap[card.title] || "text-gray-700 bg-gray-700/10"} rounded-full p-2 inline-flex shadow-sm`}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
    </motion.div>
  );
};

export default StatCard;

