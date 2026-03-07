import {motion,useRef, useInView, iconList} from "../../index.js"

const BookingCard = ({ booking, index }) => {
	const currency = import.meta.env.VITE_CURRENCY;
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ y: 50, scale: 0.8, opacity: 0 }}
			animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
			transition={{
				duration: 0.4,
				ease: "easeInOut",
				delay: index * 0.05,
			}}
			className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-lg mt-5 first:mt-12 backdrop-blur-sm border border-gray-400 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
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
				<p className="text-gray-500 dark:text-dark-muted">
					{booking?.car?.year} ◉ {booking?.car?.category} ◉{" "}
					{booking?.car?.location}
				</p>
			</div>

			<div className="md:col-span-2">
				<div className="flex items-center gap-2">
					<p className="px-3 py-1 bg-light rounded dark:text-dark-text">
						Booking # {index + 1}
					</p>
					<p
						className={`px-3 py-1 text-sm rounded ${booking?.status === "confirmed"
							? "bg-green-400/15 text-gray-600 dark:bg-green-400/70 dark:text-dark-text"
							: booking?.status === "cancelled"
								? " bg-red-400/15 dark:bg-red-400/70 text-red-900"
								: "bg-yellow-400/15 dark:bg-yellow-400/70 text-yellow-900"
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
						<p className="text-gray-500 dark:text-dark-muted">
							Rental Period
						</p>
						<div className="flex gap-2">
							<p>
								{booking.pickupDate.split("T")[0]} - {" "}
								{booking.returnDate.split("T")[0]} -
							</p>
							<p> {Math.ceil(
								(new Date(booking.returnDate) - new Date(booking.pickupDate)) /
								(1000 * 60 * 60 * 24))
							}{" "}
								days</p>
						</div>
					</div>
				</div>

				<div className="flex items-start gap-2 mt-3">
					<iconList.MapPin size={17} className="mt-2 text-primary" />
					<div>
						<p className="text-gray-500 dark:text-dark-muted">
							Pickup Location
						</p>
						<p>{booking?.car?.location}</p>
					</div>
				</div>
				<div className="flex items-start gap-2 mt-3">
					<iconList.MapPin size={17} className="mt-2 text-primary" />
					<div>
						<p className="text-gray-500 dark:text-dark-muted">
							Return Location
						</p>
						<p>Downtown Office</p>
					</div>
				</div>
			</div>

			<div className="md:col-span-1 flex flex-col justify-between gap-6">
				<div className="text-sm text-gray-500 text-right">
					<p className="text-gray-500 dark:text-dark-muted">
						Total Price
					</p>
					<h1 className="text-2xl font-bold text-primary dark:text-accent">
						{currency} {booking?.price.toLocaleString("en-US")}
					</h1>
					<p className="text-gray-500 dark:text-dark-muted">
						Booked on {booking?.createdAt.split("T")[0]}
					</p>
					<p className="text-gray-500 dark:text-dark-muted">
						Time at {booking?.createdAt.split("T")[1].split(".")[0]}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default BookingCard;
