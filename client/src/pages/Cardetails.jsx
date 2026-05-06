import CarDetailsPageSkeleton from "../components/UI/CarDetailsPageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { useCarStore } from "../store/useCarStore.js";
import { useBookingStore } from "../store/useBookingStore.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { iconList } from "../assets/assets.jsx";
import InputBox from "../components/owner/InputBox.jsx";
import { optimizeImage } from "../lib/imageOptimization.js";

const Cardetails = () => {
	const [car, setCar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [paymentMode, setPaymentMode] = useState("offline");
	const currency = import.meta.env.VITE_CURRENCY;

	const { id } = useParams();
	const navigate = useNavigate();

	const { setShowLogin, token, user, loadRazorpay } = useAuthStore();
	const { cars, fetchCars, carsLoading } = useCarStore();
	const { createUserBooking, createOnlineBooking, verifyPayment, bookingLoading } = useBookingStore();

	const isSubmitting = loading || bookingLoading;
	const isBookDisabled = car?.status !== "available" || isSubmitting;

	const handleOfflineBooking = async () => {
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

	const handleBookNow = async () => {
		if (!startTime || !endTime) {
			toast.error("Please select pickup and return dates");
			return;
		}
		if (paymentMode === "online") {
			await handleOnlinePayment();
			return;
		}
		await handleOfflineBooking();
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
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="h-auto max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16"
				>
					<motion.button
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
						onClick={() => {
							navigate("/cars");
							window.scrollTo(0, 0);
						}}
						className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
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
									src={optimizeImage(car.image, { width: 1000 })}
									initial={{ opacity: 0, y: 24, scale: 1.02 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
									alt="main-car-image"
									loading="lazy"
									className="w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md"
								/>
							</div>

							{/* Car details wrapper */}
							<motion.div
								className="space-y-6"
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
							>
								{/* Title */}
								<motion.div
									className="mt-3"
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
								>
									<div className="flex items-center gap-3">
										<h1 className="text-3xl font-bold">
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
									<p className="text-gray-500 text-lg mb-2">
										{car.category} ◉ {car.year}
									</p>
									<div className="flex flex-wrap gap-3 mt-1">
										{car.status === "cleaning" && (
											<div className="flex items-center gap-1.5 text-blue-600 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
												<iconList.Sparkles size={14} />
												<span className="text-[11px] font-bold uppercase tracking-wider">Cleaning : {car.cleaningTime || 30} Mins</span>
											</div>
										)}
										{car.status === "maintenance" && (
											<div className="flex items-center gap-1.5 text-red-600 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">
												<iconList.Wrench size={14} />
												<span className="text-[11px] font-bold uppercase tracking-wider">Maintenance : {car.maintenanceTime || 60} Mins</span>
											</div>
										)}
									</div>
								</motion.div>

								<hr className="border border-gray-300 my-6" />

								{/* Features icons grid */}
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
									{[
										{
											icon: (<iconList.Users className="mb-1 text-primary " />),
											text: `${car.seating_capacity} Seats`,
										},
										{
											icon: (<iconList.Fuel className="mb-1 text-primary " />),
											text: `${car.fuel_type}`,
										},
										{
											icon: (<iconList.Car className="mb-1 text-primary " />),
											text: `${car.transmission}`,
										},
										{
											icon: (<iconList.MapPin className="mb-1 text-primary " />),
											text: `${car.location}`,
										}
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
											className="flex flex-col items-center bg-light p-4 rounded-lg"
										>
											{icon}
											<p className="">
												{text}
											</p>
										</motion.div>
									))}
								</div>

								{/* Description */}
								<motion.div
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
								>
									<h1 className="text-xl font-medium mb-3">
										Description
									</h1>
									<p className="text-gray-500">
										{car.description}
									</p>
								</motion.div>

								{/* Features list */}
								<motion.div
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
								>
									<h1 className="text-xl font-medium mb-3">
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
												<p className="">
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
							initial={{ opacity: 0, x: 18 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
							className="shadow-lg h-max sticky top-10 rounded-xl p-6 space-y-6 text-gray-500"
						>
							{/* price per day  */}
							<p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
								{currency}
								{car.pricePerHour}
								<span className="text-base text-gray-400 font-normal">
									/hour
								</span>
							</p>

							<hr className="border-borderColor my-4" />

							{/* pickup date input  */}
							<InputBox
								type="datetime-local"
								label="startTime"
								title="Pickup Date & Time"
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
							/>

							{/* return date input  */}
							<InputBox
								type="datetime-local"
								label="endTime"
								title="Return Date & Time"
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
							/>

							{/* payment mode */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-gray-400">Payment Mode</label>
								<div className="grid grid-cols-2 gap-3">
									<button
										type="button"
										onClick={() => setPaymentMode("offline")}
										className={`cursor-pointer active:scale-98 px-3 py-2 rounded-md border text-sm font-semibold transition-all ${paymentMode === "offline"
											? "bg-primary text-white border-primary"
											: "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}
									>
										Pay Offline
									</button>
									<button
										type="button"
										onClick={() => setPaymentMode("online")}
										className={`cursor-pointer active:scale-98 px-3 py-2 rounded-md border text-sm font-semibold transition-all ${paymentMode === "online"
											? "bg-primary text-white border-primary"
											: "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}
									>
										Pay Online
									</button>
								</div>
							</div>

							{/* booking button  */}
							<motion.button
								type="button"
								disabled={isBookDisabled}
								onClick={handleBookNow}
								className={`w-full transition-all py-3 font-medium text-white rounded-md ${isSubmitting
									? "bg-primary cursor-wait opacity-90"
									: isBookDisabled
										? "bg-gray-400 cursor-not-allowed opacity-70"
										: "bg-primary hover:bg-primary-dull cursor-pointer hover:scale-102 active:scale-95"
									}`}
							>
								{isSubmitting ? (
									<span className="inline-flex items-center gap-2">
										<iconList.Loader size={16} className="animate-spin" />
										Processing...
									</span>
								) : (
									car.status === "available" ? "Book Now" : `Currently ${car.status.toUpperCase()}`
								)}
							</motion.button>
							<p className="text-center text-sm text-gray-400">
								No credit card required to reserve
							</p>
						</motion.form>
					</div>
				</motion.div>
			</>
		)
	);
};

export default Cardetails;
