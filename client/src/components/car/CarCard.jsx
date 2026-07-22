import { useNavigate } from "react-router-dom";
import { iconList, OptimizedImage } from "../../index.js";
import { Star, ArrowRight } from "lucide-react";

const CarCard = ({ car }) => {
	const navigate = useNavigate();
	const currency = import.meta.env.VITE_CURRENCY;

	const handleClick = () => {
		navigate(`/car-details/${car._id}`);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const pricePerDay = car.pricePerDay || (car.pricePerHour ? car.pricePerHour * 24 : 5500);

	return (
		<div
			className="h-full w-full group rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-xl border border-white/80 hover:border-primary/40 flex flex-col justify-between"
			onClick={handleClick}
			aria-label={`View details for ${car.brand} ${car.model}`}>
			<div>
				{/* Image  */}
				<div className="relative h-56 overflow-hidden bg-slate-100/60">
					<OptimizedImage
						src={car.image}
						renderedWidth={450}
						renderedHeight={240}
						alt={`${car.brand} ${car.model} showcase`}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					{/* Status */}
					<div className="absolute top-3 left-3 flex items-center gap-2">
						<span
							className={`text-white text-[10px] px-3 py-1 font-extrabold rounded-full shadow-md backdrop-blur-md uppercase tracking-wider ${car.status === "available"
								? "bg-emerald-600/90"
								: car.status === "cleaning"
									? "bg-blue-600/90"
									: car.status === "maintenance"
										? "bg-amber-600/90"
										: "bg-gray-600/90"
								}`}>
							{car.status || "available"}
						</span>
					</div>

					{/* Rating  */}
					<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
						<Star size={13} className="text-amber-400 fill-amber-400" />
						<span>5.0</span>
					</div>

					{/* Price  */}
					<div className="absolute bottom-3 right-3 bg-gray-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-black text-sm border border-white/10 shadow-md">
						<span>
							{currency}{pricePerDay}
						</span>
						<span className="text-[11px] font-medium opacity-80"> / day</span>
					</div>
				</div>

				<div className="p-5">
					{/* Brand & Model */}
					<div className="flex justify-between items-start mb-3">
						<div>
							<h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
								{car.brand} {car.model}
							</h3>
							<p className="text-gray-500 font-medium text-xs">
								{car.category || "Luxury"} <span className="opacity-40">•</span> {car.year || "2024"}
							</p>
						</div>
					</div>

					{/* Features */}
					<div className="grid grid-cols-2 gap-2 text-gray-700 font-bold text-xs py-2.5 border-y border-gray-100/80">
						<div className="flex items-center gap-1.5">
							<iconList.Users size={14} className="text-primary" />
							<span>{car.seating_capacity || 4} Seats</span>
						</div>
						<div className="flex items-center gap-1.5">
							<iconList.Fuel size={14} className="text-primary" />
							<span>{car.fuel_type || "Electric"}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<iconList.Car size={14} className="text-primary" />
							<span>{car.transmission || "Automatic"}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<iconList.MapPin size={14} className="text-primary" />
							<span className="truncate">{car.location || "Jaipur"}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Book Now Button CTA */}
			<div className="px-5 pb-5 pt-1">
				<button className="w-full py-2.5 px-4 rounded-xl bg-white/80 border border-gray-200 text-gray-800 font-bold text-xs group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 flex items-center justify-center gap-2 shadow-xs cursor-pointer">
					<span>Book Now</span>
					<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
				</button>
			</div>
		</div>
	);
};

export default CarCard;
