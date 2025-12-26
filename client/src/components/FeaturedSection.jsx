import CarCard from "./CarCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const FeaturedSection = () => {
	const { motion, navigate, assets, UserTitle, cars } = useAppContext();

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32  dark:bg-linear-to-r dark:from-[#081c24] dark:to-[#334b57]">
				<div>
					<UserTitle
						title="Featured Vehicles"
						subTitle="Explore our selection of premium veficles avaiable for your best adventure"
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-18">
					{cars.slice(0, 3).map((car, index) => (
						<motion.div key={car._id}>
							<CarCard car={car} index={index} />
						</motion.div>
					))}
				</div>
				<motion.button
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
					onClick={() => {
						navigate("/cars");
						window.scrollTo({
							top: 0,
							left: 0,
							behavior: "smooth",
						});
					}}
					className="flex items-center justify-center gap-2 px-6 py-2 border  border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer dark:border-white dark:text-white dark:hover:bg-second-bg active:scale-95 transition"
				>
					Explore all cars{" "}
					<img
						src={assets.arrow_icon}
						alt="arrow"
						className="dark:brightness-500"
					/>
				</motion.button>
			</div>
		</>
	);
};

export default FeaturedSection;
