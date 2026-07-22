import { cityList } from "../../assets/assets.jsx";
import { useCarStore } from "../../store/useCarStore.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader, Star, CheckCircle, ArrowRight, Shield, Car, MapPin, Sparkles, Calendar, ChevronRight, Zap, Award, KeyRound, ShieldCheck } from "lucide-react";
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
		"w-full text-xs sm:text-sm text-gray-800 bg-white/90 p-3 px-3.5 rounded-xl outline-none border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold transition-all cursor-pointer shadow-xs hover:border-gray-300";

	return (
		<div
			className="relative w-full min-h-[90vh] bg-cover bg-center bg-no-repeat flex flex-col justify-between overflow-hidden"
			style={{ backgroundImage: "url('/images/main_hero_car.png')" }}>

			<div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/40 to-transparent pointer-events-none z-0" />

			{/* Hero */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 flex flex-col justify-between relative z-10 min-h-[82vh]">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-auto">

					{/* Left Column */}
					<div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">

						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-primary/20 backdrop-blur-md shadow-xs mb-5">
							<Sparkles size={15} className="text-amber-500 animate-pulse" />
							<span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
								Premium Luxury Car Rentals
							</span>
						</div>

						{/* Headline */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
							Luxury Cars <br className="hidden sm:inline" /> on{" "}
							<span className="bg-linear-to-r from-primary via-blue-600 to-blue-700 bg-clip-text text-transparent">
								Rent
							</span>
						</h1>

						{/* Subtitle */}
						<p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 font-bold max-w-xl">
							Book your dream car in under 2 minutes. Experience top-tier performance with zero hassle.
						</p>

						{/* Buttons */}
						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
							<button
								onClick={() => {
									document.getElementById("search-box-card")?.scrollIntoView({ behavior: "smooth" });
								}}
								className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-sm sm:text-base hover:bg-primary-dull transition-all shadow-md hover:shadow-lg hover:shadow-primary/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2">
								Book Now
								<ArrowRight size={18} />
							</button>
							<button
								onClick={() => {
									navigate("/cars");
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/95 text-gray-800 font-bold text-sm sm:text-base border border-gray-200 hover:bg-white hover:border-primary/40 transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5">
								Explore Cars
								<ChevronRight size={18} />
							</button>
						</div>
					</div>

					{/* Right Column */}
					<div className="lg:col-span-6 flex flex-col gap-4 items-center lg:items-end justify-center">


						<div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 backdrop-blur-sm border border-white/20 p-2 sm:p-2.5 rounded-2xl shadow-lg">
							<span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
								Featured Fleet
							</span>
							{["🏎️ BMW M Series", "⚡ Tesla Plaid", "👑 Mercedes Maybach", "🏁 Audi RS"].map((brand, i) => (
								<span
									key={i}
									onClick={() => navigate("/cars")}
									className="px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/30 hover:border-primary text-xs font-bold text-gray-800 hover:text-primary transition-all shadow-2xs cursor-pointer">
									{brand}
								</span>
							))}
						</div>

						<div className="w-full max-w-sm p-4 sm:p-5 rounded-2xl backdrop-blur-sm	 border border-white/20 shadow-xl flex flex-col gap-3 hover:-translate-y-1 transition-transform">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
										<ShieldCheck size={20} />
									</div>
									<div>
										<h4 className="text-xs font-extrabold text-gray-900">Zero Deductible Insurance</h4>
										<p className="text-[10px] font-bold text-emerald-600">100% Comprehensive Damage Cover</p>
									</div>
								</div>
								<span className="px-2 py-0.5 rounded-md backdrop-blur-sm text-emerald-700 text-[10px] font-extrabold border border-emerald-700/20 bg-emerald-500/10">
									FREE
								</span>
							</div>

							<div className="h-px bg-white/20 w-full" />

							<div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-800">
								<div className="flex items-center gap-1.5">
									<KeyRound size={14} className="text-primary" />
									<span>Doorstep Delivery</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Zap size={14} className="text-amber-500" />
									<span>Instant Keyless Lock</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-sm text-white p-3 px-5 rounded-2xl border border-white/10 shadow-xl">
							<div className="flex items-center gap-1 text-amber-400">
								<Star size={16} className="fill-amber-400" />
								<span className="font-black text-sm text-white">4.9 / 5.0</span>
							</div>
							<div className="h-4 w-px bg-white/20" />
							<div className="flex items-center -space-x-2">
								{["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
									"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
									"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"].map((img, idx) => (
										<img key={idx} src={img} alt="Happy customer" className="w-7 h-7 rounded-full border-2 border-gray-900 object-cover" />
									))}
							</div>
							<span className="text-xs font-bold text-gray-300">
								Verified by <strong className="text-white font-extrabold">500+</strong> Renters
							</span>
						</div>
					</div>
				</div>

				{/* Search Box Card */}
				<div
					id="search-box-card"
					className="w-full max-w-6xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white/10  backdrop-blur-sm border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

					<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">

						{/* Pickup Location */}
						<div className="flex flex-col gap-1 text-left">
							<label htmlFor="pickup-location" className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
								<MapPin size={13} className="text-primary" /> Pickup Location
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
						<div className="flex flex-col gap-1 text-left">
							<label htmlFor="pickup-date" className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
								<Calendar size={13} className="text-primary" /> Pick-up Date
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
						<div className="flex flex-col gap-1 text-left">
							<label htmlFor="return-date" className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
								<Calendar size={13} className="text-primary" /> Return Date
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

						{/* Search Button */}
						<div>
							<button
								type="submit"
								disabled={loading}
								style={{
									background: "linear-gradient(90deg, #2563EB, #1D4ED8)",
								}}
								className="w-full py-3.5 px-6 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2">
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
					<div className="flex flex-wrap items-center justify-around gap-3 sm:gap-6 pt-5 mt-4 border-t border-white/20 text-xs font-bold text-gray-700">
						<div className="flex items-center gap-1.5">
							<Star size={15} className="text-amber-400 fill-amber-400" />
							<span>4.9 Rating</span>
						</div>
						<div className="flex items-center gap-1.5">
							<CheckCircle size={15} className="text-emerald-500" />
							<span>5000+ Happy Customers</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Car size={15} className="text-primary" />
							<span>100+ Premium Cars</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Shield size={15} className="text-blue-600" />
							<span>24/7 Support</span>
						</div>
					</div>
				</div>
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