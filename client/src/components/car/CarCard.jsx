import { useAppContext } from "../../context/AppContext";

const CarCard = ({ car, index }) => {
	const { currency, navigate, motion, useRef, useInView, iconList } =
		useAppContext();
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	const handleClick = () => {
		navigate(`/car-details/${car._id}`);
		scrollTo(0, 0);
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, filter: "blur(10px)" }}
			animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
			transition={{
				ease: "easeOut",
				delay: index * 0.1,
			}}
			className="h-full w-full group rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_4px_24px_rgba(255,255,255,0.15)] active:scale-95"
			onClick={handleClick}
		>
			{/* image & availability & price  */}
			<div className="relative h-60 overflow-hidden">
				<img
					src={car.image}
					alt="car-image"
					loading="lazy"
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{car.isAvaliable && (
					<p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full dark:bg-second-bg/90">
						Available Now
					</p>
				)}

				<div className="absolute bottom-4 right-4 border border-borderColor backdrop-blur-sm text-white px-3 py-2 rounded-full">
					<span className="font-semibold">
						{currency} {car.pricePerDay}
					</span>
					<span className="text-sm text-white/80"> / day</span>
				</div>
			</div>

			<div className="p-4 sm:p-5 dark:bg-second-bg dark:text-white">
				{/* brand & model & catrgory  */}
				<div className="flex justify-between items-start mb-2">
					<div>
						<h3 className="text-lg font-medium">
							{car.brand} {car.model}
						</h3>
						<p className="text-muted-foreground text-sm">
							{car.category} ◉ {car.year}
						</p>
					</div>
				</div>

				{/* feactures  */}
				<div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600 dark:text-white dark:brightness-500">
					<div className="flex items-center text-sm text-muted-foreground">
						<iconList.Users size={15} className="mr-1" />
						<span>{car.seating_capacity} Seats</span>
					</div>
					<div className="flex items-center text-sm text-muted-foreground">
						<iconList.Fuel size={15} className="mr-1" />
						<span>{car.fuel_type}</span>
					</div>
					<div className="flex items-center text-sm text-muted-foreground">
						<iconList.Car size={15} className="mr-1" />
						<span>{car.transmission}</span>
					</div>
					<div className="flex items-center text-sm text-muted-foreground">
						<iconList.MapPin size={15} className="mr-1" />
						<span>{car.location}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CarCard;
