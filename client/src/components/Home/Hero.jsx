import { cityList, assets } from "../../assets/assets.jsx";
import { useCarStore } from "../../store/useCarStore.js";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Loader, X } from "lucide-react";
import { ResponsiveImage, IconButton } from "../../index.js";


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
									<Loader
										size={16}
										className="h-5 w-5 animate-spin text-white"
									/>
									<span>Search...</span>
								</div>
							) : (
								<div className="flex items-center gap-2 justify-center">
									<Search size={18} />
									<span>Search</span>
								</div>
							)}
						</button>
					</div>
				</motion.form>

				{/* main car image  */}
				<div className="max-h-74 mb-18">
					<picture>
						{/* AVIF Sources */}
						<source
							type="image/avif"
							srcSet="/main_car-400.avif 400w, /main_car-800.avif 800w, /main_car-1200.avif 1200w"
							sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
						/>
						{/* WebP Sources */}
						<source
							type="image/webp"
							srcSet="/main_car-400.webp 400w, /main_car-800.webp 800w, /main_car-1200.webp 1200w"
							sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
						/>
						{/* Fallback PNG Sources */}
						<source
							type="image/png"
							srcSet="/main_car-400.png 400w, /main_car-800.png 800w, /main_car-1200.png 1200w"
							sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
						/>
						{/* Default Fallback Image */}
						<img
							src="/main_car.png"
							alt="Premium luxury rental car"
							width="1200"
							height="600"
							loading="eager"
							fetchpriority="high"
							decoding="async"
							className="max-h-74 w-auto object-contain mx-auto"
						/>
					</picture>
				</div>




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
								<h2 className="font-semibold">
									Available Cars
								</h2>

								<IconButton
									label="Close"
									icon={X}
									onClick={() => setOpen(false)}
									className="text-primary hover:bg-primary/10 cursor-pointer"
								/>
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

