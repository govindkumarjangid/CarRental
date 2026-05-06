import { cityList, assets } from "../../assets/assets.jsx";
import { optimizeImage } from "../../lib/imageOptimization.js";

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

	const { checkAvailability, availableCars, availableCarsLoading: loading } = useCarStore();

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
			<div className="max-w-8xl m-auto flex flex-col justify-center items-center gap-6 bg-light text-center  px-2">

				{/* heading  */}
				<motion.h1
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="text-4xl md:text-5xl font-bold text-gray-900 mt-15"
				>
					Luxury cars on Rent
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
					className='text-md text-gray-800 font-medium'>Experience the pinnacle of automotive excellence, curated for your journey.</motion.p>

				{/* check car availability form  */}
				<motion.form
					onSubmit={handleSubmit}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
					className="flex flex-col md:flex-row items-center md:items-center justify-between px-4 py-5 rounded-lg w-full max-w-120 md:max-w-200 bg-white shadow-[0px_8px_30px_rgba(0,0,0,0.15)] border border-gray-100"
				>
					<div className="flex flex-col md:flex-row items-center md:items-center md:justify-center gap-10 md:ml-8">
						<div className="flex flex-row items-center gap-2 md:flex-col">
							<label htmlFor="pickup-location" className="sr-only">Pickup Location</label>
							<p id="location-label" className="px-1 text-sm text-gray-700 font-medium text-center ">
								{pickupLocation || "Please select location"}
							</p>
							<select
								id="pickup-location"
								aria-labelledby="location-label"
								onChange={(e) => setPickupLocation(e.target.value)}
								className="outline-none border-2 border-gray-200 bg-gray-50 p-2 px-4 rounded-md max-w-47 focus:border-primary focus:ring-3 focus:ring-primary/50 text-gray-900 font-medium transition-all duration-200"
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
								className="text-sm font-medium text-gray-800"
							>
								Pick-up Date
							</label>
							<input
								type="date"
								name="pickup-date"
								id="pickup-date"
								min={new Date().toISOString().split("T")[0]}
								onChange={(e) => setPickupDate(e.target.value)}
								className="text-sm text-gray-800 bg-gray-50 p-2 px-4 rounded-md outline-none border-2 border-gray-200 focus:border-primary focus:ring-3 focus:ring-primary/50 font-medium transition-all duration-200"
							/>
						</div>
						<div className="flex flex-row items-center gap-2  md:flex-col">
							<label
								htmlFor="return-date"
								className="text-sm font-medium text-gray-800"
							>
								Return Date
							</label>
							<input
								type="date"
								name="return-date"
								id="return-date"
								onChange={(e) => setReturnDate(e.target.value)}
								className="text-sm text-gray-800 bg-gray-50 p-2 px-4 rounded-md outline-none border-2 border-gray-200 focus:border-primary focus:ring-3 focus:ring-primary/50 font-medium transition-all duration-200"
							/>
						</div>
						<button
							type="submit"
							aria-label="Search available cars"
							className={`cursor-pointer flex items-center justify-center gap-1 px-5 py-2.5 transition-all text-white rounded-lg shadow-lg active:scale-95 font-semibold ${loading
								? "bg-primary cursor-not-allowed opacity-90"
								: "bg-primary hover:bg-primary-dull"
								}`}
						>
							{loading ? (
								<div className="flex items-center gap-2 justify-center">
									<iconList.Loader
										size={16}
										className="h-5 w-5 animate-spin text-white"
									/>
									<span>Search...</span>
								</div>
							) : (
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
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
					src={optimizeImage(assets.main_car, { width: 800 })}
					alt="Premium luxury rental car"
					fetchPriority="high"
					loading="eager"
					width="800"
					height="400"
					className="max-h-74 w-auto object-contain mb-18"
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
							className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 bg-white shadow-2xl rounded-t-md sm:rounded-md w-full sm:w-105 md:w-130 md:max-h-[80vh] overflow-y-auto blue-thumb-scrollbar  "
						>
							<div className="sticky top-0 bg-white flex justify-between items-center px-2 py-2 border-b border-gray-400  ">
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
									<thead className="py-2 bg-gray-100 z-20 ">
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
												className="cursor-pointer hover:bg-gray-100 "
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
														width="64"
														height="40"
														loading="lazy"
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
													{car.pricePerHour}/hr.
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

