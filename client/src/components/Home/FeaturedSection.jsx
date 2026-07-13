import { useCarStore } from "../../store/useCarStore.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Title, CarCardSkeleton } from "../../index.js";
import CarCard from '../car/CarCard.jsx';

const FeaturedSection = () => {

	const { carsLoading: loading, cars, fetchCars } = useCarStore();
	const navigate = useNavigate();

	useEffect(() => {
		fetchCars();
	}, []);

	return (
		<>
			<div className="max-w-7xl m-auto flex flex-col items-center py-24 px-6 md:px-16">
				<div>
					<Title
						title="Featured Vehicles"
						subTitle="Explore our selection of premium veficles avaiable for your best adventure"
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-18 w-full">
					{
						loading && cars.length == 0 ? (
							[1, 2, 3].map(i => <CarCardSkeleton key={i} />)
						) : (
							cars.slice(0, 3).map((car, index) => (
								<CarCard key={car._id} car={car} index={index} />
							))
						)

					}
				</div>
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					onClick={() => {
						navigate("/cars");
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
					className="flex group items-center justify-center gap-2 px-6 py-2 border-2 border-gray-500 text-gray-600 hover:bg-primary rounded-2xl mt-18 cursor-pointer hover:text-light hover:border-light active:scale-98 transition-all duration-300">
					Explore all cars{" "}
					<ArrowRight className="w-4 h-4 stroke-2 group-hover:translate-x-2 transition-transform duration-400" />
				</motion.button>
			</div>
		</>
	);
};

export default FeaturedSection;

