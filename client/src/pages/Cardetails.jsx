import CarDetailsPageSkeleton from "../components/UI/CarDetailsPageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { useCarStore } from "../store/useCarStore.js";
import { useBookingStore } from "../store/useBookingStore.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { iconList } from "../assets/assets.jsx";

const Cardetails = () => {

	const currency = import.meta.env.VITE_CURRENCY;
	const navigate = useNavigate();

	const { setShowLogin, token, user, loadRazorpay } = useAuthStore();
	const { cars, fetchCars, loading: carsLoading } = useCarStore();
	const { createUserBooking, createOnlineBooking, verifyPayment, bookingLoading } = useBookingStore();

	const { id } = useParams();
	const [car, setCar] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const pageVariants = {
		hidden: { opacity: 0, y: 18 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1],
				when: "beforeChildren",
				staggerChildren: 0.08,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 16 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const imageVariants = {
		hidden: { opacity: 0, y: 24, scale: 1.02 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const handleOfflineBooking = async (e) => {
		e.preventDefault();
		setOpenPopup(false);
		await createUserBooking({ car: car._id, startTime, endTime }, navigate);
		setStartTime("");
		setEndTime("");
	};

	const handleOnlinePayment = async () => {
		setLoading(true);
		if (!user) {
			toast.error("Please login to continue");
			setLoading(false);
			navigate("/");
			setShowLogin(true);
			return;
		}

		if (user.isBlocked) {
			toast.error("Your account is blocked");
			setLoading(false);
			navigate("/");
			return;
		}

		const loaded = await loadRazorpay();
		if (!loaded) {
			toast.error("Failed to load Razorpay SDK");
			setLoading(false);
			return;
		}

		const orderData = await createOnlineBooking({ car: car._id, startTime, endTime });
		if (!orderData) {
			setLoading(false);
			return;
		}

		const { order, amount, key, bookingId } = orderData;

		const options = {
			key,
			amount,
			currency: "INR",
			name: "Car Rental Booking",
			description: "Car booking payment",
			order_id: order.id,

			handler: async function (response) {
				const result = await verifyPayment({
					razorpayOrderId: response.razorpay_order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpaySignature: response.razorpay_signature,
					bookingId,
				});

				if (result.success) {
					toast.success("Payment Successful");
					setOpenPopup(false);
					navigate("/my-bookings");
				} else {
					toast.error("Payment verification failed");
				}
			},
			modal: {
				ondismiss: async function () {
					await verifyPayment({
						razorpayOrderId: order.id,
						status: "failure",
						bookingId,
					});
					toast.error("Payment Failed");
				},
			},
			theme: {
				color: "#3399cc",
			},
		};

		const rzp = new window.Razorpay(options);
		rzp.open();
		setLoading(false);
	};

	const handleBookNow = () => {
		setOpenPopup(true);
	};

	useEffect(() => {
		fetchCars();
	}, []);

	useEffect(() => {
		if (cars.length > 0) {
			const found = cars.find(c => c._id === id);
			setCar(found);
		}
	}, [cars, id]);

	if (carsLoading || !car) return <CarDetailsPageSkeleton />;

	return (
		car && (
			<>
				<motion.div
					variants={pageVariants}
					initial="hidden"
					animate="visible"
					className="h-auto max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 dark:bg-main-bg"
				>
					<motion.button
						variants={itemVariants}
						onClick={() => {
							navigate("/cars");
							window.scrollTo(0, 0);
						}}
						className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer dark:text-gray-200"
					>
						<iconList.ArrowLeft size={20} />
						<span>Back to Cars</span>
					</motion.button>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						{/* LEFT */}
						<div className="lg:col-span-2">
							{/* IMAGE WITH SMOOTH HOVER */}
							<div>
								<motion.img
									src={car.image}
									variants={imageVariants}
									alt="main-car-image"
									loading="lazy"
									className="w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md"
								/>
							</div>

							{/* Car details wrapper */}
							<motion.div className="space-y-6" variants={itemVariants}>
								{/* Title */}
								<motion.div variants={itemVariants} className="mt-3">
									<div className="flex items-center gap-3">
										<h1 className="text-3xl font-bold dark:text-dark-text">
											{car.brand} {car.model}
										</h1>
										<span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${car.status === "available"
												? "bg-green-500/20 text-green-500 border border-green-500/50"
												: car.status === "cleaning"
													? "bg-blue-500/20 text-blue-500 border border-blue-500/50"
													: car.status === "maintenance"
														? "bg-red-500/20 text-red-500 border border-red-500/50"
														: "bg-gray-500/20 text-gray-500 border border-gray-500/50"
											}`}>
											{car.status}
										</span>
									</div>
									<p className="text-gray-500 text-lg dark:text-dark-muted mb-2">
										{car.category} ◉ {car.year}
									</p>
									<div className="flex flex-wrap gap-3 mt-1">
										{car.status === "cleaning" && (
											<div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
												<iconList.Sparkles size={14} />
												<span className="text-[11px] font-bold uppercase tracking-wider">Cleaning : {car.cleaningTime || 30} Mins</span>
											</div>
										)}
										{car.status === "maintenance" && (
											<div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">
												<iconList.Wrench size={14} />
												<span className="text-[11px] font-bold uppercase tracking-wider">Maintenance : {car.maintenanceTime || 60} Mins</span>
											</div>
										)}
									</div>
								</motion.div>

								<hr className="border border-gray-300 my-6 dark:border-gray-300" />

								{/* Features icons grid */}
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
									{[
										{
											icon: (
												<iconList.Users className="mb-1 text-primary " />
											),
											text: `${car.seating_capacity} Seats`,
										},
										{
											icon: (
												<iconList.Fuel className="mb-1 text-primary " />
											),
											text: `${car.fuel_type}`,
										},
										{
											icon: (
												<iconList.Car className="mb-1 text-primary " />
											),
											text: `${car.transmission}`,
										},
										{
											icon: (
												<iconList.MapPin className="mb-1 text-primary " />
											),
											text: `${car.location}`,
										},
									].map(({ icon, text, index }) => (
										<motion.div
											key={text}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											whileHover={{ scale: 1.05 }}
											transition={{
												type: "spring",
												stiffness: 200,
												delay: 0.2 * index,
											}}
											className="flex flex-col items-center bg-light dark:bg-card-bg p-4 rounded-lg"
										>
											{icon}
											<p className="dark:text-dark-muted">
												{text}
											</p>
										</motion.div>
									))}
								</div>

								{/* Description */}
								<motion.div variants={itemVariants}>
									<h1 className="text-xl font-medium mb-3 dark:text-dark-text">
										Description
									</h1>
									<p className="text-gray-500 dark:text-dark-muted">
										{car.description}
									</p>
								</motion.div>

								{/* Features list */}
								<motion.div variants={itemVariants}>
									<h1 className="text-xl font-medium mb-3 dark:text-dark-text">
										Features
									</h1>
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
										{[
											"360 Camera",
											"Bluetooth",
											"GPS",
											"Heated Seats",
											"Rear View Mirror",
										].map((item) => (
											<li
												key={item}
												className="flex items-center text-gray-500"
											>
												<iconList.CircleCheckBig
													size={16}
													className="mr-2 text-primary"
												/>
												<p className="dark:text-dark-muted">
													{item}
												</p>
											</li>
										))}
									</ul>
								</motion.div>
							</motion.div>
						</div>

						{/* RIGHT / BOOKING FORM */}
						<motion.form
							onSubmit={(e) => e.preventDefault()}
							variants={itemVariants}
							className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 dark:bg-card-bg dark:text-dark-text dark:border dark:border-dark-border"
						>
							{/* price per day  */}
							<p className="flex items-center justify-between text-2xl text-gray-800 font-semibold dark:text-dark-text">
								{currency}
								{car.pricePerHour}
								<span className="text-base text-gray-400 font-normal">
									/hour
								</span>
							</p>

							<hr className="border-borderColor my-4" />

							{/* pickup date input  */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-gray-400 dark:text-gray-300">Pickup Date & Time</label>
								<input
									type="datetime-local"
									name="startTime"
									value={startTime}
									onChange={(e) =>
										setStartTime(e.target.value)
									}
									className="outline-none focus:ring-2 focus:border-primary focus:ring-primary/50 border border-borderColor px-3 py-2 rounded-md w-full dark:bg-surface dark:text-dark-text dark:border-dark-border"
								/>
							</div>

							{/* return date input  */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-gray-400 dark:text-gray-300">Return Date & Time</label>
								<input
									type="datetime-local"
									name="endTime"
									value={endTime}
									onChange={(e) =>
										setEndTime(e.target.value)
									}
									className="outline-none focus:ring-2 focus:border-primary focus:ring-primary/50 border border-borderColor px-3 py-2 rounded-md w-full dark:bg-surface dark:text-dark-text dark:border-dark-border"
								/>
							</div>

							{/* booking button  */}
							<motion.button
								type="button"
								disabled={car.status !== "available"}
								onClick={() => handleBookNow()}
								className={`w-full transition-all py-3 font-medium text-white rounded-md hover:scale-102 active:scale-95 cursor-pointer dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg ${car.status === "available"
										? "bg-primary hover:bg-primary-dull"
										: "bg-gray-400 cursor-not-allowed opacity-70"
									}`}
							>
								{car.status === "available" ? "Book Now" : `Currently ${car.status.toUpperCase()}`}
							</motion.button>
							<p className="text-center text-sm text-gray-400 dark:text-300">
								No credit card required to reserve
							</p>
						</motion.form>
						{/* chat with owner  */}
					</div>
					{/*  POPUP */}
					<AnimatePresence>
						{openPopup && (
							<motion.div
								onClick={() => setOpenPopup(false)}
								className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									className="bg-white dark:bg-second-bg p-6 rounded-md w-80 shadow-xl dark:text-dark-text"
								>
									<h2 className="text-lg font-semibold text-center mb-4">
										Select Payment Method
									</h2>

									<div className="space-y-3">
										{/* Online Payment */}
										<button
											onClick={handleOnlinePayment}
											className="w-full py-2 rounded-md bg-blue-600 text-white cursor-pointer"
										>
											{loading ? (
												<>
													<iconList.Loader
														size={16}
														className="h-5 w-5 animate-spin text-white inline-block mr-2"
													/>
													<span>Processing...</span>
												</>
											) : 'Pay Online'}
										</button>


										<button
											onClick={handleOfflineBooking}
											className="w-full py-2 rounded-md bg-green-600 text-white cursor-pointer"
										>
											{bookingLoading ? (
												<>
													<iconList.Loader
														size={16}
														className="h-5 w-5 animate-spin text-white inline-block mr-2"
													/>
													<span>Processing...</span>
												</>
											) : 'Pay Offline'}
										</button>

										{/* Close */}
										<button
											onClick={() => setOpenPopup(false)}
											className="w-full py-2 rounded-md bg-gray-200 dark:bg-surface dark:text-dark-muted cursor-pointer"
										>
											Cancel
										</button>

									</div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>

				</motion.div>
			</>
		)
	);
};

export default Cardetails;