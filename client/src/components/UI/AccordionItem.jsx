import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`border border-slate-200/80 overflow-hidden shadow-2xs rounded-2xl transition-all ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer gap-3"
            >
                <span className="font-bold text-sm sm:text-base text-slate-800 leading-snug">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ChevronDown className="text-slate-400 w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <div className="px-4 sm:px-6 py-4 bg-slate-50/80 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccordionItem;
