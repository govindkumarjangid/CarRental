import { useCarStore } from "../../store/useCarStore.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Title, CarCardSkeleton } from "../../index.js";
import CarCard from "../car/CarCard.jsx";

const FeaturedSection = () => {
	const { carsLoading: loading, cars, fetchCars } = useCarStore();
	const navigate = useNavigate();

	useEffect(() => {
		fetchCars();
	}, []);

	const displayCars = cars && cars.length > 0 ? cars.slice(0, 6) : [];

	return (
		<div className="w-full py-16 sm:py-24 bg-white">
			<div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
				<Title
					title="Featured Luxury Cars"
					subTitle="Handpicked premium vehicles available for immediate booking at unbeatable daily rates."
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 sm:mt-14 w-full">
					{loading && cars.length === 0 ? (
						[1, 2, 3, 4, 5, 6].map((i) => <CarCardSkeleton key={i} />)
					) : (
						displayCars.map((car, index) => (
							<CarCard key={car._id} car={car} index={index} />
						))
					)}
				</div>

				<button
					onClick={() => {
						navigate("/cars");
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
					className="flex group items-center justify-center gap-2.5 px-8 py-3.5 bg-primary hover:bg-primary-dull text-white rounded-xl font-bold text-sm sm:text-base mt-10 sm:mt-14 cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-98">
					<span>Explore All Vehicles</span>
					<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
				</button>
			</div>
		</div>
	);
};

export default FeaturedSection;
