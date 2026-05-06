import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { iconList } from "../../index.js"

const BookingCard = ({ booking, index }) => {
	const currency = import.meta.env.VITE_CURRENCY;
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ y: 10, scale: 0.95, opacity: 0 }}
			animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
			transition={{
				duration: 0.4,
				ease: "easeInOut",
				delay: index * 0.05,
			}}
			className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-lg mt-5 first:mt-12 backdrop-blur-sm border border-gray-200   "
		>
			<div className="md:col-span-1 ">
				<img
					src={booking?.car?.image}
					alt="car-image"
					loading="lazy"
					className="w-full h-auto aspect-video object-cover rounded-lg"
				/>
				<p className="text-lg font-medium mt-2">
					{booking?.car?.brand} {booking?.car?.model}
				</p>
				<p className="text-gray-500 ">
					{booking?.car?.year} ◉ {booking?.car?.category} ◉{" "}
					{booking?.car?.location}
				</p>
			</div>

			<div className="md:col-span-2">
				<div className="flex items-center gap-2">
					<p className="px-3 py-1 bg-light rounded ">
						Booking # {index + 1}
					</p>
					<p
						className={`px-3 py-1 text-sm rounded ${booking?.status === "confirmed"
							? "bg-green-400/15 text-gray-600 "
							: booking?.status === "cancelled"
								? " bg-red-400/15 text-red-900"
								: booking?.status === "completed" ? "bg-blue-400/15 text-blue-600" : "bg-yellow-400/15  text-yellow-900"
							}`}
					>
						{booking?.status}
					</p>
				</div>

				<div className="flex items-start gap-2 mt-3">
					<iconList.Calendar
						size={16}
						className="mt-2 text-primary"
					/>
					<div>
						<p className="text-gray-500 ">
							Rental Period
						</p>
						<div className="flex flex-col gap-0.5">
							<p className="text-sm font-semibold">
								{new Date(booking.pickupDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}
								<span className="mx-2 text-gray-400">→</span>
								{new Date(booking.returnDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}
							</p>
							<p className="text-xs text-primary font-bold">
								Total Duration: {(() => {
									const diff = new Date(booking.returnDate) - new Date(booking.pickupDate);
									const totalHours = Math.floor(diff / (1000 * 60 * 60));
									const days = Math.floor(totalHours / 24);
									const hours = totalHours % 24;
									return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h` : days === 0 ? "0h" : ""}`;
								})()}
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-start gap-2 mt-3">
					<iconList.MapPin size={17} className="mt-2 text-primary" />
					<div>
						<p className="text-gray-500 ">
							Pickup Location
						</p>
						<p className="text-sm font-medium">{booking?.car?.location}</p>
					</div>
				</div>
				<div className="flex items-start gap-2 mt-3">
					<iconList.MapPin size={17} className="mt-2 text-primary" />
					<div>
						<p className="text-gray-500 ">
							Return Location
						</p>
						<p className="text-sm font-medium">{booking?.car?.location || "Downtown Office"}</p>
					</div>
				</div>
			</div>

			<div className="md:col-span-1 flex flex-col justify-between gap-6">
				<div className="text-sm text-gray-500 text-right">
					<p className="text-gray-500 ">
						Total Price
					</p>
					<h1 className="text-2xl font-bold text-primary ">
						{currency} {booking?.price.toLocaleString("en-IN")}
					</h1>
					<p className="text-[11px] text-gray-400  mt-2 font-medium">
						Booked on {new Date(booking?.createdAt).toLocaleString('en-IN', {
							day: '2-digit', month: 'short', year: 'numeric',
							hour: '2-digit', minute: '2-digit', hour12: true
						})}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default BookingCard;

