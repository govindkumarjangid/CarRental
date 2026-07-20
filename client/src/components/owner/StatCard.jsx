import React from 'react';
import { motion } from 'motion/react';

const StatCard = ({ card, index = 0, colorMap }) => {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ willChange: "opacity" }}
      className="flex gap-4 items-center justify-between p-4 rounded-xl border border-gray-200 shadow-sm transition-all group">
      <div className="flex flex-col gap-1">
        <h2 className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider ">
          {card.title}
        </h2>
        <p className="text-lg md:text-xl font-bold ">
          {card.value}
        </p>
      </div>
      <div className={`${colorMap[card.title] || "text-gray-700 bg-gray-700/10"} rounded-xl p-2 inline-flex shadow-sm`}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
    </motion.div>
  );
};

export default StatCard;

