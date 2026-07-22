import { useCarStore } from "../../store/useCarStore.js";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Title, CarCardSkeleton } from "../../index.js";
import CarCard from "../car/CarCard.jsx";

const sampleCars = [
	{
		_id: "sample-1",
		brand: "Tesla",
		model: "Model S Plaid",
		category: "Electric Luxury",
		year: 2024,
		pricePerHour: 250,
		pricePerDay: 5500,
		seating_capacity: 5,
		fuel_type: "Electric",
		transmission: "Automatic",
		location: "Jaipur",
		status: "available",
		image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
	},
	{
		_id: "sample-2",
		brand: "BMW",
		model: "5 Series M Sport",
		category: "Executive Sedan",
		year: 2024,
		pricePerHour: 300,
		pricePerDay: 6800,
		seating_capacity: 5,
		fuel_type: "Petrol",
		transmission: "Automatic",
		location: "Mumbai",
		status: "available",
		image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
	},
	{
		_id: "sample-3",
		brand: "Audi",
		model: "R8 V10 Performance",
		category: "Supercar",
		year: 2024,
		pricePerHour: 600,
		pricePerDay: 12500,
		seating_capacity: 2,
		fuel_type: "Petrol",
		transmission: "Automatic",
		location: "Delhi",
		status: "available",
		image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
	},
	{
		_id: "sample-4",
		brand: "Mercedes-Benz",
		model: "S-Class Maybach",
		category: "Ultra Luxury",
		year: 2024,
		pricePerHour: 450,
		pricePerDay: 9800,
		seating_capacity: 4,
		fuel_type: "Hybrid",
		transmission: "Automatic",
		location: "Gurugram",
		status: "available",
		image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
	},
	{
		_id: "sample-5",
		brand: "Porsche",
		model: "911 GT3 RS",
		category: "Sports Luxury",
		year: 2024,
		pricePerHour: 550,
		pricePerDay: 11000,
		seating_capacity: 2,
		fuel_type: "Petrol",
		transmission: "Automatic",
		location: "Mumbai",
		status: "available",
		image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
	},
	{
		_id: "sample-6",
		brand: "Range Rover",
		model: "Autobiography",
		category: "Luxury SUV",
		year: 2024,
		pricePerHour: 400,
		pricePerDay: 8500,
		seating_capacity: 7,
		fuel_type: "Diesel",
		transmission: "Automatic",
		location: "Udaipur",
		status: "available",
		image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
	}
];

const FeaturedSection = () => {
	const { carsLoading: loading, cars, fetchCars } = useCarStore();
	const navigate = useNavigate();

	useEffect(() => {
		fetchCars();
	}, []);

	const displayCars = cars && cars.length > 0 ? cars.slice(0, 6) : sampleCars;

	return (
		<div className="w-full py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
				<Title
					title="Featured Luxury Cars"
					subTitle="Handpicked premium vehicles available for immediate booking at unbeatable daily rates."
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 w-full">
					{loading && cars.length === 0 ? (
						[1, 2, 3, 4, 5, 6].map((i) => <CarCardSkeleton key={i} />)
					) : (
						displayCars.map((car, index) => (
							<CarCard key={car._id} car={car} index={index} />
						))
					)}
				</div>

				<motion.button
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.3 }}
					onClick={() => {
						navigate("/cars");
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
					className="flex group items-center justify-center gap-2.5 px-8 py-3 bg-primary hover:bg-primary-dull text-white rounded-xl font-bold text-sm sm:text-base mt-14 cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-98">
					<span>Explore All Vehicles</span>
					<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
				</motion.button>
			</div>
		</div>
	);
};

export default FeaturedSection;
