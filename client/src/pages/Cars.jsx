import { useState, useEffect, useRef } from "react";

import { useCarStore } from "../store/useCarStore.js";
import CarCard from "../components/car/CarCard.jsx";
import { CarCardSkeleton } from "../components/skeletons";
import { Title } from "../components/UI/Title.jsx";
import { iconList } from "../assets/assets.jsx";

const Cars = () => {
	const { cars, carsLoading: loading, loadingMore, pagination, fetchCars, loadMoreCars } = useCarStore();

	const [modelFilter, setModelFilter] = useState("");
	const [fuelFilter, setFuelFilter] = useState("");
	const [transmissionFilter, setTransmissionFilter] = useState("");

	const [input, setInput] = useState("");
	const [openModel, setOpenModel] = useState(false);
	const [openFuel, setOpenFuel] = useState(false);
	const [openTransmission, setOpenTransmission] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState("All");
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
		fetchCars(1, 6, false);
	}, []);

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

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center pb-20 relative">
				{/* Search bar and title */}
				<div className="bg-light w-full py-20 px-4 flex flex-col justify-center items-center">
					{/* Title */}
					<Title
						title="Available Cars"
						subTitle="Browse our selection of premium vehicles available for your next adventure"
					/>

					{/* Search */}
					<div className="mt-8 flex items-center justify-between gap-2 border-2 border-gray-300 md:px-4 px-3 py-1 rounded-xl shadow-sm max-w-96 md:max-w-3xl bg-white w-full focus-within:border-primary transition-all">
						<label htmlFor="car-search" className="sr-only md:text-base text-xs">Search cars by brand, model, or features</label>
						<iconList.Search size={18} className="text-gray-600" />
						<input
							id="car-search"
							type="text"
							onChange={(e) => setInput(e.target.value)}
							placeholder="Search by make, model, or features"
							className="outline-none py-2 flex-1 text-gray-800 font-medium"
						/>
						<iconList.Funnel size={18} className="text-gray-600" />
					</div>
				</div>

				{/* Sort and filter */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 w-full px-6 md:px-16 max-w-7xl">
					<p className="text-gray-700 font-medium w-full md:w-auto text-center md:text-left">
						Showing <span className="text-primary font-bold">{filteredCars.length}</span> results
					</p>
					<div className="relative flex items-center w-full md:flex-1 min-w-0 overflow-hidden group px-2">
						{/* Gradient Overlays for Blur Effect */}
						{showLeftArrow && (
							<div className="absolute left-0 top-0 bottom-0 w-14 z-10 pointer-events-none bg-linear-to-r from-white via-white/80 to-transparent" />
						)}
						{showRightArrow && (
							<div className="absolute right-0 top-0 bottom-0 w-14 z-10 pointer-events-none bg-linear-to-l from-white via-white/80 to-transparent" />
						)}

						{showLeftArrow && (
							<button
								onClick={() => scroll("left")}
								aria-label="Scroll filter brands left"
								className="absolute left-0 z-20 bg-white/90 p-1.5 rounded-xl cursor-pointer hover:bg-primary hover:text-white transition-all border border-gray-200 text-primary active:scale-90">
								<iconList.ChevronLeft size={18} />
							</button>
						)}
						<nav
							ref={scrollRef}
							onScroll={checkScroll}
							aria-label="Car brand filters"
							className="flex items-center mt-2 gap-2 overflow-x-auto no-scrollbar pb-2 w-full scroll-smooth">
							{companies.map((company) => (
								<button
									key={company}
									onClick={() => setSelectedCompany(company)}
									aria-pressed={selectedCompany === company}
									className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border-2 cursor-pointer active:scale-90 ${selectedCompany === company
										? "bg-primary text-white border-primary"
										: "bg-white text-gray-700 border-gray-200 hover:border-primary/50"
										}`}>
									{company}
								</button>
							))}
						</nav>
						{showRightArrow && (
							<button
								onClick={() => scroll("right")}
								aria-label="Scroll filter brands right"
								className="absolute right-0 z-20 bg-white/90 p-1.5 rounded-xl cursor-pointer hover:bg-primary hover:text-white transition-all border border-gray-200 text-primary active:scale-90">
								<iconList.ChevronRight size={18} />
							</button>
						)}
					</div>

					{/* Separate Dropdowns and Sort Buttons */}
					<div className="flex flex-wrap items-center justify-center gap-3">
						{/* Model Dropdown */}
						<div className="relative">
							<button
								aria-label={`Filter by category: ${modelFilter || 'All'}`}
								aria-haspopup="listbox"
								aria-expanded={openModel}
								onClick={() => {
									setOpenModel(!openModel);
									setOpenFuel(false);
									setOpenTransmission(false);
								}}
								className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl text-sm font-semibold transition-all cursor-pointer ${modelFilter ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300"
									}`}>
								{modelFilter || "Category"}
								<iconList.ChevronRight size={16} className={`transition-transform duration-200 ${openModel ? "rotate-90" : ""}`} />
							</button>

							{openModel && (
								<div
									role="listbox"
									className="absolute z-50 left-0 w-40 bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl p-1">
									{["All", "SUV", "MUV", "EV", "Wagon", "Sedan", "Van", "Jeep", "Hatchback"].map((opt) => (
										<div
											key={opt}
											role="option"
											aria-selected={modelFilter === (opt === "All" ? "" : opt)}
											onClick={() => {
												setModelFilter(opt === "All" ? "" : opt);
												setOpenModel(false);
											}}
											className={`cursor-pointer mb-1 px-3 py-1.5 rounded-xl text-sm transition-colors font-medium ${modelFilter === (opt === "All" ? "" : opt) ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"}`}>
											{opt}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Fuel Dropdown */}
						<div className="relative">
							<button
								aria-label={`Filter by fuel type: ${fuelFilter || 'All'}`}
								aria-haspopup="listbox"
								aria-expanded={openFuel}
								onClick={() => {
									setOpenFuel(!openFuel);
									setOpenModel(false);
									setOpenTransmission(false);
								}}
								className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl text-sm font-semibold transition-all cursor-pointer ${fuelFilter ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300"
									}`}>
								{fuelFilter || "Fuel Type"}
								<iconList.ChevronRight size={16} className={`transition-transform duration-200 ${openFuel ? "rotate-90" : ""}`} />
							</button>

							{openFuel && (
								<div
									role="listbox"
									className="absolute z-50 left-0 w-40 bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl p-1">
									{["All", "Petrol", "Diesel", "Hybrid", "Electric", "Gas"].map((opt) => (
										<div
											key={opt}
											role="option"
											aria-selected={fuelFilter === (opt === "All" ? "" : opt)}
											onClick={() => {
												setFuelFilter(opt === "All" ? "" : opt);
												setOpenFuel(false);
											}}
											className={`cursor-pointer px-3 py-1.5 rounded-xl text-sm transition-colors font-medium mb-1 ${fuelFilter === (opt === "All" ? "" : opt) ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"}`}>
											{opt}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Transmission Dropdown */}
						<div className="relative">
							<button
								aria-label={`Filter by transmission: ${transmissionFilter || 'All'}`}
								aria-haspopup="listbox"
								aria-expanded={openTransmission}
								onClick={() => {
									setOpenTransmission(!openTransmission);
									setOpenModel(false);
									setOpenFuel(false);
								}}
								className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl text-sm font-semibold transition-all cursor-pointer ${transmissionFilter ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300"
									}`}>
								{transmissionFilter || "Transmission"}
								<iconList.ChevronRight size={16} className={`transition-transform duration-200 ${openTransmission ? "rotate-90" : ""}`} />
							</button>

							{openTransmission && (
								<div
									role="listbox"
									className="absolute z-50 right-0 w-40 bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl p-1">
									{["All", "Manual", "Automatic", "Semi-Automatic"].map((opt) => (
										<div
											key={opt}
											role="option"
											aria-selected={transmissionFilter === (opt === "All" ? "" : opt)}
											onClick={() => {
												setTransmissionFilter(opt === "All" ? "" : opt);
												setOpenTransmission(false);
											}}
											className={`cursor-pointer px-3 py-1.5 rounded-xl text-sm transition-colors font-medium mb-1 ${transmissionFilter === (opt === "All" ? "" : opt) ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"}`}>
											{opt}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Cards grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 px-6 md:px-16 w-full max-w-7xl">
					{loading && cars.length === 0 ? [1, 2, 3, 4, 5, 6].map((_, index) =>
						<CarCardSkeleton index={index} key={index} />
					) : filteredCars.map((car, index) => (
						<div key={car._id}>
							<CarCard car={car} index={index} />
						</div>
					))}
				</div>

				{/* Backend Paginated Load More Button */}
				{pagination.hasMore && (
					<div className="flex justify-center mt-12 mb-5">
						<button
							onClick={loadMoreCars}
							disabled={loadingMore}
							className={`flex group items-center justify-center gap-2 px-8 py-3 border-2 rounded-xl transition-all font-extrabold text-sm shadow-xs
								${loadingMore
									? 'border-gray-300 text-gray-400 cursor-wait bg-gray-50'
									: 'border-primary text-primary hover:bg-primary cursor-pointer hover:text-white active:scale-95 hover:shadow-md'
								}`}>
							{loadingMore ? (
								<>
									<span>Loading More Cars...</span>
									<iconList.Loader size={18} className="animate-spin" />
								</>
							) : (
								<>
									<span>Load More Cars</span>
									<iconList.ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
								</>
							)}
						</button>
					</div>
				)}

			</div>
		</>
	);
};

export default Cars;