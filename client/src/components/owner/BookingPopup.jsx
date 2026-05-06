import { motion } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../../store/useChatStore.js";
import { useAuthStore } from "../../store/useAuthStore.js";

const BookingPopup = ({ setSelectedBooking, selectedBooking, isFullPage = false }) => {
    const navigate = useNavigate();
    const { createChat } = useChatStore();
    const { user: currentUser } = useAuthStore();

    if (!selectedBooking) return null;
    const { car, user } = selectedBooking;

    const handleChat = async () => {
        if (!user?._id || !currentUser?._id || !car?._id) return;
        const chatId = await createChat(user._id, currentUser._id, car._id);
        if (chatId) {
            setSelectedBooking(null);
            navigate(`/owner/chats/${user._id}`);
        }
    };

    const detailItems = [
        {
            label: "Pickup Date & Time",
            value: new Date(selectedBooking.pickupDate).toLocaleString("en-IN", {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: true
            }),
            icon: iconList.Calendar,
            color: "text-blue-600 bg-blue-50 "
        },
        {
            label: "Return Date & Time",
            value: new Date(selectedBooking.returnDate).toLocaleString("en-IN", {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: true
            }),
            icon: iconList.CalendarCheck,
            color: "text-indigo-600 bg-indigo-50 "
        },
        { label: "Total Amount", value: `₹${selectedBooking.price.toLocaleString("en-IN")}`, icon: iconList.IndianRupee, color: "text-emerald-600 bg-emerald-50 " },
        { label: "Booking Status", value: selectedBooking.status, icon: iconList.ClipboardCheck, color: "text-amber-600 bg-amber-50 " },
        { label: "Payment Status", value: selectedBooking.paymentStatus, icon: iconList.Wallet, color: "text-purple-600 bg-purple-50 " },
        { label: "Payment Method", value: selectedBooking.paymentMethod, icon: iconList.CreditCard, color: "text-rose-600 bg-rose-50 " },
    ];

    const content = (
        <motion.div
            initial={isFullPage ? { opacity: 0 } : { y: "100%" }}
            animate={isFullPage ? { opacity: 1 } : { y: 0 }}
            exit={isFullPage ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`${isFullPage ? "w-full h-full" : "w-full md:max-w-6xl h-screen md:h-[85vh] rounded-none md:rounded-[3rem] shadow-2xl border border-gray-100 "} bg-white  overflow-hidden flex flex-col md:flex-row relative`}
        >
            {/* Close/Back Button */}
            <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-5 left-5 text-gray-500 hover:text-gray-800   bg-white/80  backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center transition-all z-50 cursor-pointer active:scale-90 border border-black/5 "
                title={isFullPage ? "Go Back" : "Close"}
            >
                {isFullPage ? <iconList.ArrowLeft size={22} strokeWidth={2.5} /> : <iconList.X size={22} strokeWidth={2.5} />}
            </button>

            {/* Left Side: Car Showcase */}
            <div className={`w-full md:w-5/12 lg:w-1/2 ${isFullPage ? "h-[40vh] md:h-full" : "h-[45vh] md:h-full"} bg-white  flex items-center justify-center relative overflow-hidden shrink-0`}>
                <div className="absolute top-0 left-0 w-full h-full" />
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src={car?.image}
                    alt={car?.model}
                    className="w-full h-full object-cover md:object-contain z-10"
                />

                <div className="absolute bottom-10 left-8 right-8 z-30 hidden md:block">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className=" backdrop-blur-xl border border-white/20  p-5 rounded-xl shadow-2xl"
                    >
                        <p className="text-gray-800  text-xs uppercase tracking-widest font-medium mb-1">Elite Collection</p>
                        <h3 className="text-gray-900  text-3xl font-bold tracking-tight">{car?.brand} <span className="text-primary">{car?.model}</span></h3>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Detailed Info */}
            <div className="flex-1 h-[60vh] md:h-full overflow-y-auto overflow-x-hidden px-6 md:px-10 lg:px-12 py-10 space-y-8  bg-white  custom-scrollbar relative">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary/20">
                            {car?.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100  text-gray-500  text-[10px] font-bold uppercase tracking-wider rounded-full border border-gray-200 ">
                            {car?.transmission}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900  leading-tight">
                        {car?.brand} <span className="text-primary">{car?.model}</span>
                    </h2>
                    <p className="text-gray-500  text-sm leading-relaxed max-w-2xl line-clamp-2">
                        {car?.description || "High-performance luxury rental with premium amenities and exceptional driving dynamics."}
                    </p>
                </div>

                {/* Customer Profile Card */}
                <div className="bg-gray-50  border border-gray-100  p-4 md:p-6 rounded-xl flex flex-col sm:flex-row items-center sm:justify-between gap-4 group">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative shrink-0 mx-auto sm:mx-0">
                            {user?.image ? (
                                <img src={user?.image} className="w-14 h-14 rounded-full object-cover ring-4 ring-white  shadow-lg" alt="" />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-4 ring-white  shadow-lg">
                                    <iconList.User size={24} />
                                </div>
                            )}
                        </div>
                        <div className="text-center sm:text-left flex-1 min-w-0">
                            <p className="text-xs text-gray-400  font-medium mb-0.5">Renter Details</p>
                            <h4 className="font-bold text-gray-900  text-lg truncate">{user?.name || "Premium User"}</h4>
                            <p className="text-sm text-gray-500  flex items-center justify-center sm:justify-start gap-1.5 truncate">
                             {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleChat}
                        className="bg-white  w-12 h-12 rounded-full flex items-center justify-center shadow-sm border border-gray-100  text-primary hover:bg-primary hover:text-white transition-all shrink-0"
                    >
                        <iconList.MessageCircle size={20} />
                    </button>
                </div>

                {/* Rental Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50  p-5 rounded-xl border border-gray-100 ">
                        <p className="text-gray-400  text-xs font-medium mb-2">Pickup Date & Time</p>
                        <p className="text-gray-900  font-semibold text-base">
                            {new Date(selectedBooking.pickupDate).toLocaleString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </p>
                    </div>
                    <div className="bg-gray-50  p-5 rounded-xl border border-gray-100 ">
                        <p className="text-gray-400  text-xs font-medium mb-2">Return Date & Time</p>
                        <p className="text-gray-900  font-semibold text-base">
                            {new Date(selectedBooking.returnDate).toLocaleString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </p>
                    </div>
                    <div className="bg-primary/5  p-5 rounded-xl border border-primary/20">
                        <p className="text-primary/60  text-xs font-bold uppercase tracking-wider mb-2">Total Duration</p>
                        <p className="text-primary font-bold text-xl">
                            {(() => {
                                const diff = new Date(selectedBooking.returnDate) - new Date(selectedBooking.pickupDate);
                                const totalHours = Math.floor(diff / (1000 * 60 * 60));
                                const days = Math.floor(totalHours / 24);
                                const hours = totalHours % 24;
                                return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h` : days === 0 ? "0h" : ""}`;
                            })()}
                        </p>
                    </div>
                </div>

                {/* Booking Placed Info */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50  rounded-lg border border-gray-100  w-fit">
                    <iconList.Clock size={14} className="text-gray-400" />
                    <span className="text-[11px] text-gray-500  font-medium">
                        Booking placed on: {new Date(selectedBooking.createdAt).toLocaleString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit', hour12: true
                        })}
                    </span>
                </div>

                {/* Booking Stats Grid */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900  mb-4">Booking Overview</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {detailItems.map((item, idx) => (
                            <div key={idx} className="bg-white  border border-gray-100  p-4 rounded-xl hover:border-primary/30 transition-all group overflow-hidden">
                                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                                    <item.icon size={16} strokeWidth={2.5} />
                                </div>
                                <p className="text-xs font-medium text-gray-400  mb-1">{item.label}</p>
                                <p className="font-bold text-gray-900  truncate text-base capitalize">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specifications Grid */}
                <div className="pt-2">
                    <div className="flex items-center gap-4 py-4 px-6 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="flex-1 flex flex-col items-center border-r border-primary/10 px-2 min-w-0">
                            <p className="text-xs text-primary/60 font-medium mb-1 text-center truncate">Hourly Rate</p>
                            <p className="text-lg font-bold text-primary truncate">₹{car?.pricePerHour}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center border-r border-primary/10 px-2 min-w-0">
                            <p className="text-xs text-primary/60 font-medium mb-1 text-center truncate">Capacity</p>
                            <p className="text-lg font-bold text-primary truncate">{car?.seating_capacity} Seats</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center px-2 min-w-0">
                            <p className="text-xs text-primary/60 font-medium mb-1 text-center truncate">Transmission</p>
                            <p className="text-lg font-bold text-primary truncate capitalize">{car?.transmission}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (isFullPage) return content;

    return (
        <motion.div
            className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-end md:items-center justify-center z-50 p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBooking(null)}
        >
            {content}
        </motion.div>
    );
};

export default BookingPopup;

