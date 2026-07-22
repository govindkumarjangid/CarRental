import { cityList } from "../../assets/assets.jsx";
import { useCarStore } from "../../store/useCarStore.js";
import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Search, Loader, Star, CheckCircle, ArrowRight, Shield, Car, MapPin, Sparkles } from "lucide-react";
import { CarAvailablityModal } from "../../index.js";
const Hero = () => {
	const navigate = useNavigate();
	const { checkAvailability, availableCars, availableCarsLoading: loading } = useCarStore();

	const [pickupDate, setPickupDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [pickupLocation, setPickupLocation] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await checkAvailability(pickupLocation, pickupDate, returnDate);
		setOpen(true);
	};

	const inputClasses =
		"w-full text-sm text-gray-800 bg-white/90 p-3 px-4 rounded-xl outline-none border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 font-semibold transition-all cursor-pointer shadow-xs hover:border-gray-300";

	return (
		<div className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-linear-to-b from-[#EEF6FF]/90 via-[#F4F9FF]/80 to-white flex flex-col justify-between overflow-hidden"
			style={{
				backgroundImage: "url('/images/main_hero_car.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>

			{/* Top Hero Container */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 w-full flex flex-col items-center relative z-10">

				{/* Top Pill Tag */}
				<motion.div
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-primary/20 backdrop-blur-md shadow-xs mb-6">
					<Sparkles size={14} className="text-primary animate-pulse" />
					<span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
						BMW • Mercedes • Audi • Tesla
					</span>
				</motion.div>

				{/* Main Headline & Left CTA */}
				<div className="max-w-4xl text-center mb-8">
					<motion.h1
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
						Luxury Cars on <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">Rent</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
						className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 font-semibold max-w-2xl mx-auto">
						Book your dream car in under 2 minutes. Experience top-tier performance with zero hassle.
					</motion.p>

					{/* Dual CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.15 }}
						className="flex flex-wrap items-center justify-center gap-4 mt-6">
						<button
							onClick={() => {
								document.getElementById("search-box-card")?.scrollIntoView({ behavior: "smooth" });
							}}
							className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm sm:text-base hover:bg-primary-dull transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center gap-2">
							Book Now
							<ArrowRight size={18} />
						</button>
						<button
							onClick={() => {
								navigate("/cars");
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							className="px-6 py-3 rounded-xl bg-white text-gray-800 font-bold text-sm sm:text-base border border-gray-300 hover:bg-gray-50 hover:border-primary/40 transition-all shadow-xs active:scale-98 cursor-pointer">
							Explore Cars
						</button>
					</motion.div>
				</div>

				{/* Floating Glassmorphic Search Card */}
				<motion.div
					id="search-box-card"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="w-full max-w-4xl p-5 sm:p-7 border border-gray-500/20 my-4 z-20 rounded-xl backdrop-blur-sm">
					<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

						{/* Location Field */}
						<div className="flex flex-col gap-1.5 text-left">
							<label htmlFor="pickup-location" className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
								<MapPin size={14} className="text-primary" /> Pickup Location
							</label>
							<select
								id="pickup-location"
								value={pickupLocation}
								onChange={(e) => setPickupLocation(e.target.value)}
								className={inputClasses}>
								<option value="">Select Location</option>
								{cityList.map((city, index) => (
									<option key={index} value={city}>
										{city}
									</option>
								))}
							</select>
						</div>

						{/* Pickup Date */}
						<div className="flex flex-col gap-1.5 text-left">
							<label htmlFor="pickup-date" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
								Pick-up Date
							</label>
							<input
								type="date"
								id="pickup-date"
								min={new Date().toISOString().split("T")[0]}
								value={pickupDate}
								onChange={(e) => setPickupDate(e.target.value)}
								className={inputClasses}
							/>
						</div>

						{/* Return Date */}
						<div className="flex flex-col gap-1.5 text-left">
							<label htmlFor="return-date" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
								Return Date
							</label>
							<input
								type="date"
								id="return-date"
								min={pickupDate || new Date().toISOString().split("T")[0]}
								value={returnDate}
								onChange={(e) => setReturnDate(e.target.value)}
								className={inputClasses}
							/>
						</div>

						{/* Gradient Search Button */}
						<div>
							<button
								type="submit"
								disabled={loading}
								style={{
									background: "linear-gradient(90deg, #2563EB, #1D4ED8)",
								}}
								className="w-full py-3.5 px-6 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0 active:scale-98 cursor-pointer flex items-center justify-center gap-2">
								{loading ? (
									<>
										<Loader size={18} className="animate-spin text-white" />
										<span>Searching...</span>
									</>
								) : (
									<>
										<Search size={18} />
										<span>Search Cars</span>
									</>
								)}
							</button>
						</div>
					</form>
				</motion.div>

				{/* Trust Badges Bar */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.25 }}
					className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-4 py-2 px-5 bg-white/80 rounded-full border border-white/90 backdrop-blur-md text-xs sm:text-sm font-bold text-gray-800 shadow-xs">
					<div className="flex items-center gap-1.5">
						<div className="flex text-amber-400">
							<Star size={14} className="fill-amber-400" />
						</div>
						<span className="font-bold text-gray-900">4.9 Rating</span>
					</div>
					<span className="text-gray-300 hidden sm:inline">•</span>
					<div className="flex items-center gap-1.5">
						<CheckCircle size={15} className="text-emerald-500" />
						<span>5000+ Happy Customers</span>
					</div>
					<span className="text-gray-300 hidden sm:inline">•</span>
					<div className="flex items-center gap-1.5">
						<Car size={15} className="text-primary" />
						<span>100+ Premium Cars</span>
					</div>
					<span className="text-gray-300 hidden sm:inline">•</span>
					<div className="flex items-center gap-1.5">
						<Shield size={15} className="text-blue-600" />
						<span>24/7 Support</span>
					</div>
				</motion.div>
			</div>

			{/* Availability Modal */}
			<CarAvailablityModal
				open={open}
				setOpen={setOpen}
				availableCars={availableCars}
			/>
		</div>
	);
};

export default Hero;
