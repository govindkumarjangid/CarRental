import { AnimatePresence, motion } from 'motion/react';
import { IconButton } from "../../index.js";
import { X } from "lucide-react";

const CarAvailablityModal = ({ open, setOpen, availableCars }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    return (
        <AnimatePresence>
            {availableCars.length > 0 && open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-primary/5 backdrop-blur-sm p-4"
                    onClick={() => setOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white shadow-sm rounded-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
                        <div className="sticky top-0 bg-white flex justify-between items-center px-4 py-3 border-b border-gray-200 z-10">
                            <h2 className="font-semibold text-lg text-gray-800">
                                Available Cars
                            </h2>

                            <IconButton
                                label="Close"
                                icon={X}
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition-colors"
                            />
                        </div>

                        <div className="overflow-y-auto overflow-x-auto p-4 blue-thumb-scrollbar">
                            <table className="w-full text-sm border-separate" style={{ borderSpacing: "0 8px" }}>
                                <thead className="sticky top-0 bg-white z-20">
                                    <tr className="bg-gray-100 text-gray-600">
                                        <th className="p-3 text-left rounded-l-xl">Image</th>
                                        <th className="py-3 text-left">Car</th>
                                        <th className="py-3 text-left rounded-r-xl">Price</th>
                                    </tr>
                                </thead>

                                <motion.tbody
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}>
                                    {availableCars.map((car) => (
                                        <motion.tr
                                            key={car._id}
                                            className="cursor-pointer bg-white hover:bg-gray-50 transition-colors group shadow-sm rounded-xl"
                                            onClick={() => navigate(`/car-details/${car._id}`)}>
                                            <td className="p-3 rounded-l-xl border-y border-l border-gray-100 border-x-0 border-r-0!">
                                                <img
                                                    src={car.image}
                                                    className="w-16 h-10 rounded-xl object-cover"
                                                    alt={car.model}
                                                    width="64"
                                                    height="40"
                                                    loading="lazy"
                                                />
                                            </td>

                                            <td className="py-3 font-medium text-left border-y border-x-0 border-gray-100 border-l-0! border-r-0!">
                                                {car.brand} {car.model}
                                                <div className="text-xs text-gray-500">
                                                    {car.category}
                                                </div>
                                            </td>

                                            <td className="py-3 pr-3 font-semibold text-left text-primary rounded-r-xl border-y border-r border-gray-100 border-x-0 border-l-0!">
                                                {currency}
                                                {car.pricePerHour}/hr.
                                            </td>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default CarAvailablityModal;