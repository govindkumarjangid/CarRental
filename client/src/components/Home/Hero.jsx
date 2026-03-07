import { cityList,assets } from "../../assets/assets.jsx";
import { useCarStore } from "../../store/useCarStore.js";
import {
	useState,
	motion,
	iconList,
	AnimatePresence, useNavigate
} from "../../index.js"


const Hero = () => {

	const navigate = useNavigate();
	const currency = import.meta.env.VITE_CURRENCY;

	const { checkAvailability, availableCars, loading } = useCarStore();

	const [pickupDate, setPickupDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [pickupLocation, setPickupLocation] = useState("");
	const [open, setOpen] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await checkAvailability(pickupLocation, pickupDate, returnDate);
		setOpen(true);
	};

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col justify-center items-center gap-8 bg-light text-center dark:bg-main-bg px-2">

				{/* heading  */}
				<motion.h1
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
					className="text-4xl md:text-5xl font-semibold text-gray-800 dark:text-white mt-15 mb-2"
				>
					Luxury cars on Rent
				</motion.h1>

				{/* check car availability form  */}
				<motion.form
					onSubmit={handleSubmit}
					initial={{ opacity: 0, scale: 0.9, y: 50 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
					className="flex flex-col md:flex-row items-center md:items-center justify-between px-4 py-5 rounded-lg w-full max-w-120 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] dark:bg-second-bg dark:shadow-[0px_8px_20px_rgba(56,189,248,0.08)] dark:border dark:border-dark-border "
				>
					<div className="flex flex-col md:flex-row items-center md:items-center md:justify-center gap-10 md:ml-8">
						<div className="flex flex-row items-center gap-2 md:flex-col">
							<p className="px-1 text-sm text-gray-500  text-center dark:text-white">
								{pickupLocation
									? pickupLocation
									: "Please select location"}
							</p>
							<select
								onChange={(e) =>
									setPickupLocation(e.target.value)
								}
								className="outline-none border border-gray-300 bg-gray-100 p-2 px-4 rounded-md max-w-47 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:bg-card-bg dark:text-dark-text dark:border-dark-border"
							>
								<option value="" >Pickup Location</option>
								{cityList.map((city, index) => (
									<option key={index} value={city}>
										{city}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-row items-center gap-2  md:flex-col">
							<label
								htmlFor="pickup-date"
								className="dark:text-white"
							>
								Pick-up Date
							</label>
							<input
								type="date"
								name="pickup-date"
								id="pickup-date"
								min={new Date().toISOString().split("T")[0]}
								onChange={(e) => setPickupDate(e.target.value)}
								className="text-sm text-gray-500 bg-gray-100 p-2 px-4 rounded-md outline-none border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:bg-card-bg dark:text-dark-text dark:border-dark-border"
							/>
						</div>
						<div className="flex flex-row items-center gap-2  md:flex-col">
							<label
								htmlFor="return-date"
								className="dark:text-white"
							>
								Return Date
							</label>
							<input
								type="date"
								name="return-date"
								id="return-date"
								onChange={(e) => setReturnDate(e.target.value)}
								className="text-sm text-gray-500 bg-gray-100 p-2 px-4 rounded-md outline-none border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:bg-card-bg dark:text-dark-text dark:border-dark-border"
							/>
						</div>
						<button
							type="submit"
							className={`cursor-pointer flex items-center justify-center gap-1 px-5 py-2  transition-all text-white rounded-lg shadow-[0px_3px_20px_rgba(0,0,0,0.2)]  dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg dark:border-0 active:scale-95 ${loading
								? "bg-primary cursor-not-allowed opacity-90"
								: "bg-primary hover:bg-primary-dull"
								}`}
						>
							{loading ? (<div className="flex items-center gap-2 justify-center">
								<iconList.Loader
									size={16}
									className="h-5 w-5 animate-spin text-white"
								/>
								<span>Search...</span>
							</div>) : (
								<div className="flex items-center gap-2 justify-center">
									<iconList.Search size={18} />
									<span>Search</span>
								</div>
							)}
						</button>
					</div>
				</motion.form>

				{/* main car image  */}
				<motion.img
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
					src={assets.main_car}
					alt="car"
					loading="lazy"
					className="max-h-74 mb-18"
				/>

				{/* available cars modal  */}
				<AnimatePresence>
					{availableCars.length > 0 && open && (
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 100 }}
							transition={{
								type: "spring",
								stiffness: 120,
								damping: 20,
							}}
							className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 bg-white shadow-2xl rounded-t-md sm:rounded-md
							w-full sm:w-105 md:w-130 md:max-h-[80vh] overflow-y-auto blue-thumb-scrollbar dark:bg-second-bg dark:text-dark-text"
						>
							<div className="sticky top-0 bg-white flex justify-between items-center px-2 py-2 border-b border-gray-400 dark:bg-second-bg dark:border-dark-border">
								<h3 className="font-semibold">
									Available Cars
								</h3>

								<motion.button
									whileTap={{ scale: 0.8, rotate: 90 }}
									whileHover={{ scale: 1.1 }}
									onClick={() => setOpen(false)}
									className="text-primary text-xl font-bold cursor-pointer"
								>
									<iconList.X />
								</motion.button>
							</div>

							<div className="max-h-72 overflow-y-auto overflow-x-auto">
								<table className="w-full text-sm">
									<thead className="py-2 bg-gray-100 z-20 dark:bg-card-bg">
										<tr className="bg-gray-100">
											<th className="p-2 text-left">
												Image
											</th>
											<th className="py-2 text-left">
												Car
											</th>
											<th className="py-2 text-left">
												Price
											</th>
										</tr>
									</thead>

									<motion.tbody
										initial="hidden"
										animate="show"
										transition={{ staggerChildren: 0.08 }}
									>
										{availableCars.map((car) => (
											<motion.tr
												key={car._id}
												className="cursor-pointer hover:bg-gray-100 dark:hover:bg-surface"
												onClick={() =>
													navigate(
														`/car-details/${car._id}`
													)
												}
											>
												<td className="p-2">
													<img
														src={car.image}
														className="w-16 h-10 rounded object-cover"
														alt={car.model}
													/>
												</td>

												<td className="py-2 font-medium text-left">
													{car.brand} {car.model}
													<div className="text-xs text-gray-500">
														{car.category}
													</div>
												</td>

												<td className="py-2 font-semibold text-left">
													{currency}
													{car.pricePerDay}/day
												</td>
											</motion.tr>
										))}
									</motion.tbody>
								</table>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

			</div>
		</>
	);
};

export default Hero;
