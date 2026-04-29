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
	const [pickupDate, setPickupDate] = useState("");
	const [returnDate, setReturnDate] = useState("");

	const handleOfflineBooking = async (e) => {
		e.preventDefault();
		setOpenPopup(false);
		await createUserBooking({ car, pickupDate, returnDate }, navigate);
		setPickupDate("");
		setReturnDate("");
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

		const orderData = await createOnlineBooking({ car, pickupDate, returnDate });
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
		if (!pickupDate || !returnDate) {
			toast.error("Please select pickup and return dates");
			return;
		} else {
			setOpenPopup(true);
		}
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
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: "easeOut" }}
					className="h-auto max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 dark:bg-main-bg"
				>
					<button
						onClick={() => {
							navigate("/cars");
							window.scrollTo(0, 0);
						}}
						className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer dark:text-gray-200"
					>
						<iconList.ArrowLeft size={20} />
						<span>Back to Cars</span>
					</button>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						{/* LEFT */}
						<div className="lg:col-span-2">
							{/* IMAGE WITH SMOOTH HOVER */}
							<div>
								<motion.img
									src={car.image}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: "spring",
										stiffness: 50,
										duration: 0.5,
									}}
									alt="main-car-image"
									loading="lazy"
									className="w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md"
								/>
							</div>

							{/* Car details wrapper */}
							<motion.div className="space-y-6">
								{/* Title */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="mt-3"
								>
									<h1 className="text-3xl font-bold dark:text-dark-text">
										{car.brand} {car.model}
									</h1>
									<p className="text-gray-500 text-lg dark:text-dark-muted">
										{car.category} ◉ {car.year}
									</p>
								</motion.div>

								<hr className="border-borderColor my-6 dark:border-gray-300" />

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
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
									<h1 className="text-xl font-medium mb-3 dark:text-dark-text">
										Description
									</h1>
									<p className="text-gray-500 dark:text-dark-muted">
										{car.description}
									</p>
								</motion.div>

								{/* Features list */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
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
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 dark:bg-card-bg dark:text-dark-text dark:border dark:border-dark-border"
						>
							{/* price per day  */}
							<p className="flex items-center justify-between text-2xl text-gray-800 font-semibold dark:text-dark-text">
								{currency}
								{car.pricePerDay}
								<span className="text-base text-gray-400 font-normal">
									per day
								</span>
							</p>

							<hr className="border-borderColor my-4" />

							{/* pickup date input  */}
							<div className="flex flex-col gap-2">
								<label>Pickup Date</label>
								<input
									type="date"
									name="pickupDate"
									onChange={(e) =>
										setPickupDate(e.target.value)
									}
									className="outline-none focus:ring-2 focus:border-primary focus:ring-primary/50 border border-borderColor px-3 py-2 rounded-md w-full dark:bg-surface dark:text-dark-text dark:border-dark-border"
								/>
							</div>

							{/* return date input  */}
							<div className="flex flex-col gap-2">
								<label>Return Date</label>
								<input
									type="date"
									name="returnDate"
									onChange={(e) =>
										setReturnDate(e.target.value)
									}
									className="outline-none focus:ring-2 focus:border-primary focus:ring-primary/50 border border-borderColor px-3 py-2 rounded-md w-full dark:bg-surface dark:text-dark-text dark:border-dark-border"
								/>
							</div>

							{/* booking button  */}
							<motion.button
								type="button"
								onClick={() => handleBookNow()}
								className={`w-full transition-all py-3 font-medium text-white rounded-md hover:scale-102 active:scale-95 bg-primary hover:bg-primary-dull cursor-pointer dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg`}
							>
								Book Now
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

					{/* chat with owner card  */}
					<div className="flex items-center justify-end py-5 mt-10">
						<div className="w-80 bg-white dark:bg-card-bg rounded-xl shadow-md p-4 dark:text-dark-text dark:border dark:border-dark-border">
							{/* Image */}
							<img
								src={car.image}
								alt={car.name}
								className="rounded-xl w-full h-44 object-cover"
							/>

							{/* Title */}
							<h2 className="text-xl font-semibold mt-3">
								{car.brand} {car.model} <span className="font-normal"> {car.year}</span>
							</h2>

							{/* Specs */}
							<div className="flex justify-between text-sm text-gray-600 mt-3">
								<span className="flex items-center gap-1">
									<iconList.Car className=" text-primary" size={16} />
									{car.transmission}
								</span>
								<span className="flex items-center gap-1">
									<iconList.Fuel className=" text-primary" size={16} />
									{car.fuel_type}
								</span>
								<span className="flex items-center gap-1">
									<span className="text-primary text-base">{currency}</span>
									<span>{car.pricePerDay}/day</span>
								</span>
							</div>

							{/* Button */}
							<button
								onClick={() => {
									token ? navigate(`/chatpage/${car._id}`) : toast.error("Not Authorized")
								}}
								className="mt-4 w-full bg-primary hover:bg-primary-dull dark:bg-accent dark:hover:bg-accent-dull text-white dark:text-main-bg py-2 rounded-md cursor-pointer"
							>
								Chat with Owner
							</button>
						</div>
					</div>

				</motion.div>
			</>
		)
	);
};

export default Cardetails;