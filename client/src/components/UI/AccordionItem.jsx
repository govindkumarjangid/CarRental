import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`border border-gray-200 overflow-hidden shadow-sm ${className || 'rounded-xl'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left cursor-pointer active:scale-101!"
            >
                <span className="font-semibold text-lg text-gray-800">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="text-gray-500 w-5 h-5" />
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
                        <div className="px-6 py-4 bg-gray-50 text-gray-600 border-t border-gray-100">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccordionItem;
