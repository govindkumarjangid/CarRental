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

	const inputClasses = "text-sm text-gray-800 bg-gray-50 p-2 px-4 rounded-xl outline-none border-2 border-gray-200 focus:border-primary focus:ring-3 focus:ring-primary/50 font-medium transition-all duration-200 cursor-pointer";

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col justify-center items-center gap-6 bg-light text-center px-2">

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
					className="flex flex-col md:flex-row items-center md:items-center justify-between px-4 py-5 rounded-3xl w-full max-w-120 md:max-w-200 bg-white shadow-sm border border-gray-200"
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
								className={inputClasses}
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
								className={inputClasses}
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
								className={inputClasses}
							/>
						</div>
						<button
							type="submit"
							aria-label="Search available cars"
							className={`cursor-pointer flex items-center justify-center gap-1 px-4 py-2 transition-all text-white rounded-2xl shadow-lg active:scale-98 font-medium ${loading
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
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 flex items-center justify-center bg-primary/5 backdrop-blur-sm p-4"
							onClick={() => setOpen(false)}
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								onClick={(e) => e.stopPropagation()}
								className="bg-white shadow-sm rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
							>
								<div className="sticky top-0 bg-white flex justify-between items-center px-4 py-3 border-b border-gray-200 z-10">
									<h2 className="font-semibold text-lg text-gray-800">
										Available Cars
									</h2>

									<IconButton
										label="Close"
										icon={X}
										onClick={() => setOpen(false)}
										className="text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition-colors"
									/>
								</div>

								<div className="overflow-y-auto overflow-x-auto p-4 blue-thumb-scrollbar">
									<table className="w-full text-sm border-separate" style={{ borderSpacing: "0 8px" }}>
										<thead className="sticky top-0 bg-white z-20">
											<tr className="bg-gray-100 text-gray-600">
												<th className="p-3 text-left rounded-l-xl">Image</th>
												<th className="py-3 text-left">Car</th>
												<th className="py-3 text-left rounded-r-xl">Price</th>
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
													className="cursor-pointer bg-white hover:bg-gray-50 transition-colors group shadow-sm rounded-xl"
													onClick={() => navigate(`/car-details/${car._id}`)}
												>
													<td className="p-3 rounded-l-xl border-y border-l border-gray-100 border-x-0 border-r-0!">
														<img
															src={car.image}
															className="w-16 h-10 rounded-lg object-cover"
															alt={car.model}
															width="64"
															height="40"
															loading="lazy"
														/>
													</td>

													<td className="py-3 font-medium text-left border-y border-x-0 border-gray-100 border-l-0! border-r-0!">
														{car.brand} {car.model}
														<div className="text-xs text-gray-500">
															{car.category}
														</div>
													</td>

													<td className="py-3 pr-3 font-semibold text-left text-primary rounded-r-xl border-y border-r border-gray-100 border-x-0 border-l-0!">
														{currency}
														{car.pricePerHour}/hr.
													</td>
												</motion.tr>
											))}
										</motion.tbody>
									</table>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

			</div>
		</>
	);
};

export default Hero;

