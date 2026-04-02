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
                initial={{ y: "100%", opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: "100%", opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-5xl h-full md:h-[80vh] max-h-200 bg-white rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
                {/* Close Button  */}
                <button
                    onClick={() => setSelectedBooking(null)}
                    className="absolute top-4 right-4 md:right-6 text-gray-500 hover:text-gray-800 bg-white/80 md:bg-gray-100 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-colors z-20 cursor-pointer active:scale-90"
                >
                    <iconList.X size={18} strokeWidth={2.5} />
                </button>

                {/* Left Side: Image Section */}
                <div className="h-[35vh] md:h-full w-full md:w-1/2 shrink-0 bg-gray-50 flex items-center justify-center p-2 md:p-4">
                    <img
                        src={car?.image}
                        alt={car?.model}
                        className="w-full h-full object-cover md:object-contain rounded-xl md:rounded-xl drop-shadow-lg"
                    />
                </div>

                {/* Right Side: Content & Details */}
                <div className="w-full md:w-1/2 h-[calc(90vh-15rem)] md:h-full p-5 md:p-8 overflow-y-auto space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 ">

                    {/* Title & Basic Info */}
                    <div className="pr-8">
                        <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                            {car?.brand} {car?.model}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-medium">
                            {car?.year} • {car?.fuel_type} • {car?.transmission}
                        </p>
                    </div>

                    {/* Car Info Highlights */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 text-sm">
                        <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                            <p className="text-gray-400 text-xs mb-0.5">Seats</p>
                            <p className="font-bold text-gray-800">{car?.seating_capacity}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                            <p className="text-gray-400 text-xs mb-0.5">Location</p>
                            <p className="font-bold text-gray-800">{car?.location}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                            <p className="text-gray-400 text-xs mb-0.5">Price/Day</p>
                            <p className="font-bold text-gray-800">₹{car?.pricePerDay}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {car?.description || "Experience the perfect blend of performance, style, and comfort. This vehicle is well-maintained and ready for your next adventure."}
                    </p>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 bg-gray-50/80 border border-gray-100 p-4 rounded-2xl">
                        {user?.image ? (
                            <img
                                src={user?.image}
                                alt={user?.name}
                                className="w-12 h-12 rounded-full object-cover shadow-sm"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <iconList.CircleUser size={24} />
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-gray-800">{user?.name ? user?.name : "Owner"}</p>
                            <p className="text-sm text-gray-500">{user?.email ? user?.email : "owner@gmail.com"}</p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="pt-2">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Booking Details
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <p className="text-blue-500/80 text-xs mb-0.5">Pickup</p>
                                <p className="font-bold text-blue-900">
                                    {new Date(selectedBooking.pickupDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-xl">
                                <p className="text-blue-500/80 text-xs mb-0.5">Return</p>
                                <p className="font-bold text-blue-900">
                                    {new Date(selectedBooking.returnDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-indigo-50 p-3 rounded-xl">
                                <p className="text-indigo-500/80 text-xs mb-0.5">Total Price</p>
                                <p className="font-bold text-indigo-900">₹{selectedBooking.price}</p>
                            </div>

                            <div className="bg-emerald-50 p-3 rounded-xl">
                                <p className="text-emerald-500/80 text-xs mb-0.5">Status</p>
                                <p className="font-bold text-emerald-900 capitalize">
                                    {selectedBooking.status}
                                </p>
                            </div>

                            <div className="bg-purple-50 p-3 rounded-xl">
                                <p className="text-purple-500/80 text-xs mb-0.5">Payment</p>
                                <p className="font-bold text-purple-900 capitalize">
                                    {selectedBooking.paymentStatus}
                                </p>
                            </div>

                            <div className="bg-amber-50 p-3 rounded-xl">
                                <p className="text-amber-500/80 text-xs mb-0.5">Method</p>
                                <p className="font-bold text-amber-900 capitalize">
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