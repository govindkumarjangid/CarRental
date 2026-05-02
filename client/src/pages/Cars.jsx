import { useCarStore } from "../store/useCarStore.js";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CarCard from "../components/car/CarCard.jsx";
import CarCardSkeleton from "../components/car/CarCardSkeleton.jsx";
import { Title } from "../components/UI/Title.jsx";
import { iconList } from "../assets/assets.jsx";

const Cars = () => {
	const { cars, carsLoading: loading, fetchCars } = useCarStore();

	const [modelFilter, setModelFilter] = useState("");
	const [fuelFilter, setFuelFilter] = useState("");
	const [transmissionFilter, setTransmissionFilter] = useState("");

	const [input, setInput] = useState("");
	const [openModel, setOpenModel] = useState(false);
	const [openFuel, setOpenFuel] = useState(false);
	const [openTransmission, setOpenTransmission] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState("All");
	const [visibleCount, setVisibleCount] = useState(6);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);

	const companies = ["All", ...new Set(cars.map((car) => car.brand))];
	const scrollRef = useRef(null);

	const checkScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowLeftArrow(scrollLeft > 5);
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
		}
	};

	useEffect(() => {
		checkScroll();
		window.addEventListener("resize", checkScroll);
		return () => window.removeEventListener("resize", checkScroll);
	}, [cars]);

	const scroll = (direction) => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: direction === "left" ? -200 : 200,
				behavior: "smooth",
			});
		}
	};


	useEffect(() => {
		fetchCars();
	}, []);

	const handleLoadMore = () => {
		setIsLoadingMore(true);
		setTimeout(() => {
			setVisibleCount(prev => prev + 6);
			setIsLoadingMore(false);
		}, 800);
	};

	const filteredCars = cars.filter((car) => {
		const matchesBrand = car.brand
			.toLowerCase()
			.includes(input.trim().toLowerCase());
		const matchesModel = modelFilter ? car.category === modelFilter : true;
		const matchesFuel = fuelFilter ? car.fuel_type === fuelFilter : true;
		const matchesTransmission = transmissionFilter ? car.transmission === transmissionFilter : true;
		const matchesCompany =
			selectedCompany === "All" || car.brand === selectedCompany;
		return matchesBrand && matchesModel && matchesFuel && matchesTransmission && matchesCompany;
	});

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};
	const item = {
		hidden: { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0 },
	};


	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center pb-20 dark:bg-main-bg relative">
				{/* search bar and title  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className=" bg-light dark:bg-second-bg w-full py-20 px-4 flex flex-col justify-center items-center"
				>
					{/* title  */}
					<Title
						title="Avaiable Cars"
						subTitle="Browser our selection of premium veficles available for your nest adventure"
					/>

					{/* search  */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className="mt-8 flex items-center justify-between gap-4 border border-gray-300 dark:border-dark-border px-4 py-1 rounded-lg shadow-xl max-w-96 md:max-w-3xl bg-white dark:bg-card-bg w-full"
					>
						<iconList.Search size={18} className="text-gray-500 dark:text-dark-muted" />
						<input
							type="text"
							onChange={(e) => setInput(e.target.value)}
							placeholder="Search by make, model, or features"
							className="outline-none py-2 flex-9 dark:bg-card-bg dark:text-dark-text dark:placeholder:text-dark-muted"
						/>
						<iconList.Funnel size={18} className="text-gray-500 dark:text-dark-muted" />
					</motion.div>

				</motion.div>

				{/* sort and filter  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 w-full px-5 md:px-19 max-w-7xl"
				>
					<p className="text-gray-500 w-full md:w-auto text-center md:text-left">
						Showing {filteredCars.length} results
					</p>
					<div className="relative flex items-center w-full md:flex-1 min-w-0 overflow-hidden group px-2">
						{/* Gradient Overlays for Blur Effect */}
						{showLeftArrow && (
							<div className="absolute left-0 top-0 bottom-0 w-14 z-10 pointer-events-none bg-linear-to-r from-white via-white/80 to-transparent dark:from-main-bg dark:via-main-bg/80" />
						)}
						{showRightArrow && (
							<div className="absolute right-0 top-0 bottom-0 w-14 z-10 pointer-events-none bg-linear-to-l from-white via-white/80 to-transparent dark:from-main-bg dark:via-main-bg/80" />
						)}

						{showLeftArrow && (
							<button
								onClick={() => scroll("left")}
								className="absolute left-0 z-20 bg-white/90 dark:bg-card-bg/90 p-1.5 rounded-full  cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200 dark:border-dark-border text-primary active:scale-90"
							>
								<iconList.ChevronLeft size={18} />
							</button>
						)}
						<div
							ref={scrollRef}
							onScroll={checkScroll}
							className="flex items-center mt-2 gap-2 overflow-x-auto no-scrollbar pb-2 w-full scroll-smooth"
						>
							{companies.map((company) => (
								<button
									key={company}
									onClick={() => setSelectedCompany(company)}
									className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border-2 cursor-pointer active:scale-90 ${selectedCompany === company
										? "bg-primary text-white border-primary"
										: "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
										}`}
								>
									{company}
								</button>
							))}
						</div>
						{showRightArrow && (
							<button
								onClick={() => scroll("right")}
								className="absolute right-0 z-20 bg-white/90 dark:bg-card-bg/90 p-1.5 rounded-full  cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200 dark:border-dark-border text-primary active:scale-90"
							>
								<iconList.ChevronRight size={18} />
							</button>
						)}
					</div>

					{/* Separate Dropdowns and Sort Buttons */}
					<div className="flex flex-wrap items-center justify-center gap-3">
						{/* Model Dropdown */}
						<div className="relative">
							<button
								onClick={() => {
									setOpenModel(!openModel);
									setOpenFuel(false);
									setOpenTransmission(false);
								}}
								className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${modelFilter ? "bg-primary text-white border-primary" : "bg-white dark:bg-card-bg text-gray-600 dark:text-dark-text border-gray-300 dark:border-dark-border"
									}`}
							>
								{modelFilter || "Category"}
								<iconList.ChevronRight size={16} className={`transition-transform duration-300 ${openModel ? "rotate-90" : ""}`} />
							</button>

							{openModel && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95, y: -10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									className="absolute z-50 left-0 w-40 bg-white dark:bg-card-bg border border-gray-200 dark:border-dark-border rounded-xl mt-2 shadow-2xl p-1"
								>
									{["All", "SUV", "MUV", "EV", "Wagon", "Sedan", "Van", "Jeep", "Hatchback"].map((opt) => (
										<div
											key={opt}
											onClick={() => {
												setModelFilter(opt === "All" ? "" : opt);
												setOpenModel(false);
											}}
											className={`cursor-pointer px-3 py-1.5 rounded-md text-sm transition-colors ${modelFilter === (opt === "All" ? "" : opt) ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-dark-muted/20 text-gray-600 dark:text-dark-text"}`}
										>
											{opt}
										</div>
									))}
								</motion.div>
							)}
						</div>

						{/* Fuel Dropdown */}
						<div className="relative">
							<button
								onClick={() => {
									setOpenFuel(!openFuel);
									setOpenModel(false);
									setOpenTransmission(false);
								}}
								className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${fuelFilter ? "bg-primary text-white border-primary" : "bg-white dark:bg-card-bg text-gray-600 dark:text-dark-text border-gray-300 dark:border-dark-border"
									}`}
							>
								{fuelFilter || "Fuel Type"}
								<iconList.ChevronRight size={16} className={`transition-transform duration-300 ${openFuel ? "rotate-90" : ""}`} />
							</button>

							{openFuel && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95, y: -10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									className="absolute z-50 left-0 w-40 bg-white dark:bg-card-bg border border-gray-200 dark:border-dark-border rounded-xl mt-2 shadow-2xl p-1"
								>
									{["All", "Petrol", "Diesel", "Hybrid", "Electric", "Gas"].map((opt) => (
										<div
											key={opt}
											onClick={() => {
												setFuelFilter(opt === "All" ? "" : opt);
												setOpenFuel(false);
											}}
											className={`cursor-pointer px-3 py-1.5 rounded-md text-sm transition-colors ${fuelFilter === (opt === "All" ? "" : opt) ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-dark-muted/20 text-gray-600 dark:text-dark-text"}`}
										>
											{opt}
										</div>
									))}
								</motion.div>
							)}
						</div>

						{/* Transmission Dropdown */}
						<div className="relative">
							<button
								onClick={() => {
									setOpenTransmission(!openTransmission);
									setOpenModel(false);
									setOpenFuel(false);
								}}
								className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${transmissionFilter ? "bg-primary text-white border-primary" : "bg-white dark:bg-card-bg text-gray-600 dark:text-dark-text border-gray-300 dark:border-dark-border"
									}`}
							>
								{transmissionFilter || "Transmission"}
								<iconList.ChevronRight size={16} className={`transition-transform duration-300 ${openTransmission ? "rotate-90" : ""}`} />
							</button>

							{openTransmission && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95, y: -10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									className="absolute z-50 right-0 w-40 bg-white dark:bg-card-bg border border-gray-200 dark:border-dark-border rounded-xl mt-2 shadow-2xl p-1"
								>
									{["All", "Manual", "Automatic", "Semi-Automatic", ].map((opt) => (
										<div
											key={opt}
											onClick={() => {
												setTransmissionFilter(opt === "All" ? "" : opt);
												setOpenTransmission(false);
											}}
											className={`cursor-pointer px-3 py-1.5 rounded-md text-sm transition-colors ${transmissionFilter === (opt === "All" ? "" : opt) ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-dark-muted/20 text-gray-600 dark:text-dark-text"}`}
										>
											{opt}
										</div>
									))}
								</motion.div>
							)}
						</div>
					</div>

				</motion.div >

				{/* cards grid  */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 px-5 md:px-30">
					{loading ? [1, 2, 3, 4, 5, 6].map((_, index) =>
						<CarCardSkeleton index={index} key={index} />
					) : filteredCars.slice(0, visibleCount).map((car, index) => (
						<div key={car._id}>
							<CarCard car={car} index={index} />
						</div>
					))}
				</div>

				{/* Load More Button Container */}
				{!loading && visibleCount < filteredCars.length && (
					<div className="flex justify-center mt-10 mb-5">
						<motion.button
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: "easeIn" }}
							onClick={handleLoadMore}
							disabled={isLoadingMore}
							className={`flex group items-center justify-center gap-2 px-6 py-2 border-2  rounded-md mt-18 transition-all duration-300
								${isLoadingMore
									? 'border-gray-300 text-gray-400 cursor-wait'
									: 'border-gray-500 text-gray-600 hover:bg-primary cursor-pointer hover:text-light hover:border-light active:scale-95'
								}`}
						>
							{isLoadingMore ? (
								<>
									Loading...
									<iconList.Loader size={22} className="animate-spin" />
								</>
							) : (
								<>
									Load More
									<iconList.ArrowDown size={25} className="animate-bounce pt-2" />
								</>
							)}
						</motion.button>
					</div>
				)}

			</div >
		</>
	);
};

export default Cars;