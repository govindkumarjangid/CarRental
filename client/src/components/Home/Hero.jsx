import { cityList } from "../../assets/assets.jsx";
import { useCarStore } from "../../store/useCarStore.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader, Star, CheckCircle, ArrowRight, Shield, Car, MapPin, Sparkles, Calendar, ChevronRight, Zap, KeyRound, ShieldCheck } from "lucide-react";
import { CarAvailablityModal } from "../../index.js";
import toast from "react-hot-toast";

const Hero = () => {
	const navigate = useNavigate();
	const { checkAvailability, availableCars, availableCarsLoading: loading } = useCarStore();

	const [pickupDate, setPickupDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [pickupLocation, setPickupLocation] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!pickupLocation || !pickupDate || !returnDate) {
			toast.error("Please select Pickup Location, Pick-up Date and Return Date first!");
			return;
		}

		const success = await checkAvailability(pickupLocation, pickupDate, returnDate);
		if (success) {
			setOpen(true);
		}
	};

	const inputClasses =
		"w-full text-xs sm:text-sm text-gray-900 bg-white/25 backdrop-blur-md p-3 px-3.5 rounded-xl outline-none border border-white/40 focus:border-primary focus:ring-2 focus:ring-primary/40 font-bold transition-all cursor-pointer shadow-xs hover:bg-white/40 hover:border-white/60 placeholder:text-gray-600";

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

						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/40 backdrop-blur-xl shadow-md mb-5 hover:scale-105 transition-transform duration-300">
							<Sparkles size={15} className="text-amber-500 animate-pulse" />
							<span className="text-xs sm:text-sm font-bold text-gray-900 tracking-wide">
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
						<p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-800 font-bold max-w-xl">
							Book your dream car in under 2 minutes. Experience top-tier performance with zero hassle.
						</p>

						{/* Buttons */}
						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
							<button
								onClick={() => {
									document.getElementById("search-box-card")?.scrollIntoView({ behavior: "smooth" });
								}}
								className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-sm sm:text-base hover:bg-primary-dull transition-all shadow-md hover:shadow-lg hover:shadow-primary/25 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
								Book Now
								<ArrowRight size={18} />
							</button>
							<button
								onClick={() => {
									navigate("/cars");
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/20 text-gray-900 font-bold text-sm sm:text-base border border-white/40 hover:bg-white/40 hover:border-primary/40 backdrop-blur-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5">
								Explore Cars
								<ChevronRight size={18} />
							</button>
						</div>
					</div>

					{/* Right Column */}
					<div className="lg:col-span-6 flex flex-col gap-4 items-center lg:items-end justify-center">

						{/* Featured Fleet Glass Container */}
						<div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 bg-white/10 backdrop-blur-xl border border-white/40 p-2 sm:p-2.5 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-white/20 hover:scale-[1.02] transition-all duration-300">
							<span className="px-3 py-1 rounded-xl bg-primary/20 text-primary text-xs font-black uppercase tracking-wider">
								Featured Fleet
							</span>
							{["🏎️ BMW M Series", "⚡ Tesla Plaid", "👑 Mercedes Maybach", "🏁 Audi RS"].map((brand, i) => (
								<span
									key={i}
									onClick={() => navigate("/cars")}
									className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/40 hover:border-primary hover:bg-white/30 text-xs font-bold text-gray-900 hover:text-primary transition-all shadow-xs cursor-pointer active:scale-95">
									{brand}
								</span>
							))}
						</div>

						{/* Insurance Glass Container */}
						<div className="w-full max-w-sm p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/40 shadow-[0_12px_40px_0_rgba(31,38,135,0.15)] flex flex-col gap-3 hover:bg-white/20 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center font-bold border border-emerald-500/30">
										<ShieldCheck size={20} />
									</div>
									<div>
										<h4 className="text-xs font-extrabold text-gray-900">Zero Deductible Insurance</h4>
										<p className="text-[10px] font-bold text-emerald-700">100% Comprehensive Damage Cover</p>
									</div>
								</div>
								<span className="px-2 py-0.5 rounded-md backdrop-blur-md text-emerald-800 text-[10px] font-extrabold border border-emerald-600/30 bg-emerald-500/20">
									FREE
								</span>
							</div>

							<div className="h-px bg-white/30 w-full" />

							<div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-900">
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

						{/* Ratings Glass Container */}
						<div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl text-gray-900 p-3 px-5 rounded-2xl border border-white/40 shadow-[0_12px_40px_0_rgba(31,38,135,0.15)] hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
							<div className="flex items-center gap-1 text-amber-500">
								<Star size={16} className="fill-amber-400" />
								<span className="font-black text-sm text-gray-900">4.9 / 5.0</span>
							</div>
							<div className="h-4 w-px bg-white/40" />
							<div className="flex items-center -space-x-2">
								{["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
									"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
									"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"].map((img, idx) => (
										<img key={idx} src={img} alt="Happy customer" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
									))}
							</div>
							<span className="text-xs font-bold text-gray-800">
								Verified by <strong className="text-gray-900 font-extrabold">500+</strong> Renters
							</span>
						</div>
					</div>
				</div>

				{/* Search Box Card - Full Transparent Glassmorphism with Liquid Jelly Feel */}
				<div
					id="search-box-card"
					className="w-full max-w-6xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white/10 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(31,38,135,0.15)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.25)] hover:bg-white/15 transition-all duration-300 ease-out">

					<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">

						{/* Pickup Location */}
						<div className="flex flex-col gap-1 text-left">
							<label htmlFor="pickup-location" className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
								<MapPin size={13} className="text-primary" /> Pickup Location *
							</label>
							<select
								id="pickup-location"
								value={pickupLocation}
								onChange={(e) => setPickupLocation(e.target.value)}
								className={inputClasses}>
								<option value="" className="bg-white text-gray-900">Select Location</option>
								{cityList.map((city, index) => (
									<option key={index} value={city} className="bg-white text-gray-900">
										{city}
									</option>
								))}
							</select>
						</div>

						{/* Pickup Date */}
						<div className="flex flex-col gap-1 text-left">
							<label htmlFor="pickup-date" className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
								<Calendar size={13} className="text-primary" /> Pick-up Date *
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
							<label htmlFor="return-date" className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
								<Calendar size={13} className="text-primary" /> Return Date *
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
								className="w-full py-3.5 px-6 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
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
					<div className="flex flex-wrap items-center justify-around gap-3 sm:gap-6 pt-5 mt-4 border-t border-white/30 text-xs font-bold text-gray-800">
						<div className="flex items-center gap-1.5">
							<Star size={15} className="text-amber-500 fill-amber-400" />
							<span>4.9 Rating</span>
						</div>
						<div className="flex items-center gap-1.5">
							<CheckCircle size={15} className="text-emerald-600" />
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