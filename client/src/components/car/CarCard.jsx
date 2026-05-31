import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { iconList, OptimizedImage } from "../../index.js"

const CarCard = ({ car, index }) => {
	const navigate = useNavigate();
	const currency = import.meta.env.VITE_CURRENCY;
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	const handleClick = () => {
		navigate(`/car-details/${car._id}`);
		scrollTo(0, 0);
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, filter: "blur(4px)", y: 18, scale: 0.98 }}
			animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } : {}}
			transition={{
				type: "spring",
				stiffness: 140,
				damping: 18,
				mass: 0.6,
				delay: index * 0.1,
			}}
			className="h-full w-full group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer active:scale-99 bg-white border border-gray-100"
			onClick={handleClick}
			aria-label={`View details for ${car.brand} ${car.model}`}
		>
			{/* image & availability & price  */}
			<div className="relative h-60 overflow-hidden">
				<OptimizedImage
					src={car.image}
					renderedWidth={450}
					renderedHeight={240}
					alt={`${car.brand} ${car.model} showcase`}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				<div className="absolute top-4 left-4 flex flex-col gap-2">
					<p className={`text-white text-[10px] px-2 py-1 font-bold rounded-lg shadow-lg backdrop-blur-md uppercase tracking-wider ${
						car.status === "available"
						? "bg-green-600/90"
						: car.status === "cleaning"
						? "bg-blue-600/90"
						: car.status === "maintenance"
						? "bg-red-600/90"
						: "bg-gray-600/90"
					}`}>
						{car.status}
					</p>
				</div>

				<div className="absolute bottom-4 right-4 border border-white/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl font-bold">
					<span>
						{currency} {car.pricePerHour}
					</span>
					<span className="text-sm opacity-90"> / hr</span>
				</div>
			</div>

			<div className="p-4 sm:p-5">
				{/* brand & model & catrgory  */}
				<div className="flex justify-between items-start mb-2">
					<div>
						<h3 className="text-lg font-bold text-gray-900">
							{car.brand} {car.model}
						</h3>
						<p className="text-gray-700 font-medium text-sm">
							{car.category} <span className="opacity-50">◉</span> {car.year}
						</p>
					</div>
				</div>

				{/* feactures  */}
				<div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-800 font-medium">
					<div className="flex items-center text-sm">
						<iconList.Users size={15} className="mr-1 text-primary" />
						<span>{car.seating_capacity} Seats</span>
					</div>
					<div className="flex items-center text-sm">
						<iconList.Fuel size={15} className="mr-1 text-primary" />
						<span>{car.fuel_type}</span>
					</div>
					<div className="flex items-center text-sm">
						<iconList.Car size={15} className="mr-1 text-primary" />
						<span>{car.transmission}</span>
					</div>
					<div className="flex items-center text-sm">
						<iconList.MapPin size={15} className="mr-1 text-primary" />
						<span>{car.location}</span>
					</div>
				</div>
			</div>

		</motion.div>
	);
};

export default CarCard;

