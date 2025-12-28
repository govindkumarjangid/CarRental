import { useAppContext } from "../context/AppContext";

const Cardetails = () => {
	const {
		motion,
		Loader,
		assets,
		navigate,
		currency,
		cars,
		useRef,
		useEffect,
		useState,
		useParams,
		axios,
		pickupDate,
		setPickupDate,
		returnDate,
		setReturnDate,
		toast,
		loading,
		setLoading,
	} = useAppContext();

	const { id } = useParams();
	const [car, setCar] = useState(null);
	const ref = useRef(null);
	const createUserBooking = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (pickupDate === "" || returnDate === "") {
				toast.error("Please choose pickup and return dates");
				setLoading(false);
				return;
			}
			// console.log(car, pickupDate, returnDate);
			const { data } = await axios.post("/api/bookings/create", {
				car,
				pickupDate,
				returnDate,
			});
			// console.log(data);
			if (data.success) {
				setPickupDate("");
				setReturnDate("");
				toast.success("Booking Created");
				navigate("/my-bookings");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setCar(cars.find((car) => car._id === id));
	}, [id]);

	if (loading && !car) return <Loader />;

	return (
		car && (
			<>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: "easeOut" }}
					className="h-auto max-w-8xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 dark:bg-linear-to-r dark:to-[#081c24] dark:from-[#334b57]"
				>
					<button
						onClick={() => {
							navigate("/cars");
							window.scrollTo(0, 0);
						}}
						className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer dark:text-gray-200"
					>
						<img
							src={assets.arrow_icon}
							alt=""
							className="rotate-180 opacity-65 dark:brightness-500"
						/>
						Back to all cars
					</button>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						{/* LEFT */}
						<div className="lg:col-span-2">
							{/* IMAGE WITH SMOOTH HOVER */}
							<div>
								<motion.img
									ref={ref}
									src={car.image}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										duration: 0.8,
										ease: "easeOut",
									}}
									whileHover={{ scale: 1.03 }}
									alt=""
									className="w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md"
								/>
							</div>

							{/* Car details wrapper */}
							<motion.div
								initial="hidden"
								animate="visible"
								variants={{
									visible: {
										transition: { staggerChildren: 0.15 },
									},
								}}
								className="space-y-6"
							>
								{/* Title */}
								<motion.div
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
									className="mt-3"
								>
									<h1 className="text-3xl font-bold dark:text-gray-200">
										{car.brand} {car.model}
									</h1>
									<p className="text-gray-500 text-lg dark:text-gray-300">
										{car.category} ◉ {car.year}
									</p>
								</motion.div>

								<hr className="border-borderColor my-6 dark:border-gray-300" />

								{/* Features icons grid */}
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
									{[
										{
											icon: assets.users_icon,
											text: `${car.seating_capacity} Seats`,
										},
										{
											icon: assets.fuel_icon,
											text: `${car.fuel_type}`,
										},
										{
											icon: assets.car_icon,
											text: `${car.transmission}`,
										},
										{
											icon: assets.location_icon,
											text: `${car.location}`,
										},
									].map(({ icon, text }) => (
										<motion.div
											key={text}
											whileHover={{ scale: 1.05 }}
											transition={{
												type: "spring",
												stiffness: 200,
											}}
											className="flex flex-col items-center bg-light dark:bg-main-bg p-4 rounded-lg"
										>
											<img
												src={icon}
												alt=""
												className="h-5 mb-2 dark:brightness-200"
											/>
											<p className="dark:text-gray-300">
												{text}
											</p>
										</motion.div>
									))}
								</div>

								{/* Description */}
								<motion.div
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
								>
									<h1 className="text-xl font-medium mb-3 dark:text-gray-200">
										Description
									</h1>
									<p className="text-gray-500 dark:text-gray-300">
										{car.description}
									</p>
								</motion.div>

								{/* Features list */}
								<motion.div
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
								>
									<h1 className="text-xl font-medium mb-3 dark:text-gray-200">
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
												<img
													src={assets.check_icon}
													className="h-4 mr-2 dark:brightness-200"
													alt=""
												/>
												<p className="dark:text-gray-300">
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
							onSubmit={(e) => createUserBooking(e)}
							initial={{ opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 dark:bg-[#334b57] dark:text-gray-300"
						>
							<p className="flex items-center justify-between text-2xl text-gray-800 font-semibold dark:text-gray-200">
								{currency}
								{car.pricePerDay}
								<span className="text-base text-gray-400 font-normal">
									per day
								</span>
							</p>

							<hr className="border-borderColor my-4" />

							<div className="flex flex-col gap-2">
								<label>Pickup Date</label>
								<input
									type="date"
									name="pickupDate"
									onChange={(e) =>
										setPickupDate(e.target.value)
									}
									className="border border-borderColor px-3 py-2 rounded-lg"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Return Date</label>
								<input
									type="date"
									name="returnDate"
									onChange={(e) =>
										setReturnDate(e.target.value)
									}
									className="border border-borderColor px-3 py-2 rounded-lg"
								/>
							</div>

							<motion.button
								type="submit"
								disabled={loading || !car?.isAvaliable}
								whileTap={
									car?.isAvaliable && !loading
										? { scale: 0.9 }
										: {}
								}
								whileHover={
									car?.isAvaliable && !loading
										? { scale: 1.02 }
										: {}
								}
								className={`w-full transition-all py-3 font-medium text-white rounded-xl ${
									loading
										? "bg-gray-400 cursor-not-allowed"
										: car?.isAvaliable
										? "bg-primary hover:bg-primary-dull cursor-pointer"
										: "bg-red-500 cursor-not-allowed"
								}`}
							>
								{loading
									? "Processing..."
									: car?.isAvaliable
									? "Book Now"
									: "Not Available"}
							</motion.button>

							<p className="text-center text-sm text-gray-400 dark:text-300">
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
