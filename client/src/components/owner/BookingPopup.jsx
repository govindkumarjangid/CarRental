import { motion, iconList } from "../../index.js"

const BookingPopup = ({ setSelectedBooking, selectedBooking }) => {

    if (!selectedBooking) return null;
    const { car, user } = selectedBooking;

    return (
        <motion.div
            className="fixed inset-0 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBooking(null)}
        >
            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-5xl h-full md:h-[80vh] max-h-200 bg-white dark:bg-second-bg rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative border border-transparent dark:border-dark-border"
            >
                {/* Close Button  */}
                <button
                    onClick={() => setSelectedBooking(null)}
                    className="absolute top-4 right-4 md:right-6 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white bg-white/80 dark:bg-main-bg/80 md:bg-gray-100 dark:md:bg-surface backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-colors z-20 cursor-pointer active:scale-90"
                >
                    <iconList.X size={18} strokeWidth={2.5} />
                </button>

                {/* Left Side: Image Section */}
                <div className="h-[35vh] md:h-full w-full md:w-1/2 shrink-0 bg-gray-50 dark:bg-[#0f1014] flex items-center justify-center p-2 md:p-6 relative">
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent dark:from-black/40 pointer-events-none" />
                    <img
                        src={car?.image}
                        alt={car?.model}
                        className="w-full h-full object-cover md:object-contain rounded-xl md:rounded-xl drop-shadow-2xl z-10"
                    />
                </div>

                {/* Right Side: Content & Details */}
                <div className="w-full md:w-1/2 h-[calc(90vh-15rem)] md:h-full p-5 md:p-8 overflow-y-auto space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-dark-border [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">

                    {/* Title & Basic Info */}
                    <div className="pr-8">
                        <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-dark-text">
                            {car?.brand} {car?.model}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-dark-muted mt-1 uppercase tracking-wide font-medium">
                            {car?.year} • {car?.fuel_type} • {car?.transmission}
                        </p>
                    </div>

                    {/* Car Info Highlights */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 text-sm">
                        <div className="bg-gray-50 dark:bg-card-bg border border-gray-100 dark:border-dark-border p-3 rounded-xl transition-all hover:shadow-md">
                            <p className="text-gray-400 dark:text-dark-muted text-xs mb-0.5">Seats</p>
                            <p className="font-bold text-gray-800 dark:text-dark-text">{car?.seating_capacity}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-card-bg border border-gray-100 dark:border-dark-border p-3 rounded-xl transition-all hover:shadow-md">
                            <p className="text-gray-400 dark:text-dark-muted text-xs mb-0.5">Location</p>
                            <p className="font-bold text-gray-800 dark:text-dark-text">{car?.location}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-card-bg border border-gray-100 dark:border-dark-border p-3 rounded-xl transition-all hover:shadow-md">
                            <p className="text-gray-400 dark:text-dark-muted text-xs mb-0.5">Price/Day</p>
                            <p className="font-bold text-gray-800 dark:text-dark-text">₹{car?.pricePerDay}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {car?.description || "Experience the perfect blend of performance, style, and comfort. This vehicle is well-maintained and ready for your next adventure."}
                    </p>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 bg-gray-50/80 dark:bg-surface border border-gray-100 dark:border-dark-border p-4 rounded-2xl">
                        {user?.image ? (
                            <img
                                src={user?.image}
                                alt={user?.name}
                                className="w-12 h-12 rounded-full object-cover shadow-sm"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-primary/20 text-blue-600 dark:text-accent flex items-center justify-center">
                                <iconList.CircleUser size={24} />
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-gray-800 dark:text-dark-text">{user?.name ? user?.name : "Owner"}</p>
                            <p className="text-sm text-gray-500 dark:text-dark-muted">{user?.email ? user?.email : "owner@gmail.com"}</p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="pt-2">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-dark-text mb-4">
                            Booking Details
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                <p className="text-blue-500/80 dark:text-blue-400/80 text-xs mb-0.5">Pickup</p>
                                <p className="font-bold text-blue-900 dark:text-blue-300">
                                    {new Date(selectedBooking.pickupDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                <p className="text-blue-500/80 dark:text-blue-400/80 text-xs mb-0.5">Return</p>
                                <p className="font-bold text-blue-900 dark:text-blue-300">
                                    {new Date(selectedBooking.returnDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                                <p className="text-indigo-500/80 dark:text-indigo-400/80 text-xs mb-0.5">Total Price</p>
                                <p className="font-bold text-indigo-900 dark:text-indigo-300">₹{selectedBooking.price}</p>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                <p className="text-emerald-500/80 dark:text-emerald-400/80 text-xs mb-0.5">Status</p>
                                <p className="font-bold text-emerald-900 dark:text-emerald-300 capitalize">
                                    {selectedBooking.status}
                                </p>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-100 dark:border-purple-900/30">
                                <p className="text-purple-500/80 dark:text-purple-400/80 text-xs mb-0.5">Payment</p>
                                <p className="font-bold text-purple-900 dark:text-purple-300 capitalize">
                                    {selectedBooking.paymentStatus}
                                </p>
                            </div>

                            <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                <p className="text-amber-500/80 dark:text-amber-400/80 text-xs mb-0.5">Method</p>
                                <p className="font-bold text-amber-900 dark:text-amber-300 capitalize">
                                    {selectedBooking.paymentMethod}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    )
}

export default BookingPopup;