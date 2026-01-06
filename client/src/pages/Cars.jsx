import CarCardSkeleton from '../components/car/CarCardSkeleton.jsx';
import { useAppContext } from "../context/AppContext.jsx";
const Cars = () => {
	const {
		motion,
		useState,
		useEffect,
		UserTitle,
		fetchCars,
		cars,
		CarCard,
		loading,
		iconList,
	} = useAppContext();

	const [filter, setFilter] = useState("");
	const [input, setInput] = useState("");
	const [sortOrder, setSortOrder] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchCars();
	}, []);

	const filteredCars = cars.filter((car) => {
		const matchesBrand = car.brand
			.toLowerCase()
			.includes(input.trim().toLowerCase());
		const matchesFilter = filter
			? car.category === filter || car.fuel_type === filter
			: true;
		return matchesBrand && matchesFilter;
	});

	let sortedCars = [...filteredCars];
	if (sortOrder) {
		sortedCars.sort((a, b) => a.brand.localeCompare(b.brand));
		if (sortOrder === "desc") sortedCars.reverse();
	}

	// Animation variants
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
			<div className="max-w-8xl m-auto flex flex-col items-center dark:bg-linear-to-r pb-20 dark:to-main-bg dark:from-second-bg relative">
				{/* search bar and title  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className=" bg-light dark:bg-main-bg w-full py-20 px-4 flex flex-col justify-center items-center"
				>
					{/* title  */}
					<UserTitle
						title="Avaiable Cars"
						subTitle="Browser our selection of premium veficles available for your nest adventure"
					/>

					{/* search  */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className="mt-8 flex items-center justify-between gap-4 border border-gray-300 dark:border-white px-4 py-1 rounded-lg shadow-xl max-w-96 md:max-w-3xl bg-white w-full"
					>
						<iconList.Search size={18} className="text-gray-500" />
						<input
							type="text"
							onChange={(e) => setInput(e.target.value)}
							placeholder="Search by make, model, or features"
							className="outline-none py-2 flex-9"
						/>
						<iconList.Funnel size={18} className="text-gray-500" />
					</motion.div>

				</motion.div>

				{/* sort and filter  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="flex items-center justify-between flex-wrap gap-4 mt-4 w-full px-5 md:px-19 max-w-7xl"
				>
					<p className="dark:text-white dark:border-gray-300 text-gray-500 float-left">
						Showing {sortedCars.length} results
					</p>


					{/* cars sorted and filtered  */}
					<div className="relative">

						<button
							onClick={() => setOpen(!open)}
							className="w-40 border group border-gray-300 px-3 py-1.5 rounded-md shadow-sm flex justify-between items-center cursor-pointer active:scale-95 transition-transform duration-300 bg-primary hover:bg-primary-dull text-light"
						>
							Sort & Filter

							<span>
								<iconList.ChevronRight
									size={24}
									className={`transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"
										}`}
								/>
							</span>
						</button>

						{open && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								transition={{ duration: 0.5 }}
								className="absolute z-50 w-40 bg-white border border-gray-300 rounded-md mt-1 shadow-lg text-gray-500 overflow-hidden"
							>
								{/* parent animation controller */}
								<motion.div
									variants={container}
									initial="hidden"
									animate="show"
								>
									{/* filter by model  */}
									<motion.p
										initial={{ opacity: 0, x: -50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5 }}
										className="text-sm text-primary-dull mb-1 font-extrabold border-b-2 border-gray-300 p-2">Filter By Model</motion.p>
									{/* each animated item */}
									{[
										{ label: "All", value: "" },
										{ label: "SUV", value: "SUV" },
										{ label: "EV", value: "EV" },
										{ label: "Wagon", value: "Wagon" },
										{ label: "Sedan", value: "Sedan" },
									].map((opt) => (
										<motion.div
											key={opt.label}
											variants={item}
											onClick={() => {
												setFilter(opt.value);
												setOpen(false);
											}}
											className="cursor-pointer hover:bg-primary px-2 py-1 rounded hover:text-light mx-2"
										>
											{opt.label}
										</motion.div>
									))}

									{/* filter by fuel type  */}
									<motion.p
										initial={{ opacity: 0, x: -50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, delay: 0.3 }}
										className="text-sm text-primary-dull my-1 font-extrabold border-b-2 border-gray-300 p-2">Filter By Fuel Type
									</motion.p>
									{[
										{ label: "Petrol", value: "Petrol" },
										{ label: "Diesel", value: "Diesel" },
										{ label: "Hybrid", value: "Hybrid" },
										{ label: "Electric", value: "Electric" },
									].map((opt) => (
										<motion.div
											key={opt.label}
											variants={item}
											onClick={() => {
												setFilter(opt.value);
												setOpen(false);
											}}
											className="cursor-pointer hover:bg-primary px-2 py-1 rounded hover:text-light mx-2"
										>
											{opt.label}
										</motion.div>
									))}


									{/* sorting buttons too animated */}
									<motion.p
										initial={{ opacity: 0, x: -50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, delay: 0.6 }}
										className="text-sm text-primary-dull my-1 font-extrabold border-b-2 border-gray-300 p-2">Sort By</motion.p>
									<motion.div
										variants={item}
										onClick={() => {
											setSortOrder("asc");
											setOpen(false);
										}}
										className="cursor-pointer hover:bg-primary px-2 py-1 rounded hover:text-light mx-2"
									>
										Ascending
									</motion.div>

									<motion.div
										variants={item}
										onClick={() => {
											setSortOrder("desc");
											setOpen(false);
										}}
										className="cursor-pointer hover:bg-primary px-2 py-1 rounded hover:text-light mx-2"
									>
										Descending
									</motion.div>

								</motion.div>
							</motion.div>
						)}
					</div>

				</motion.div >

				{/* cards grid  */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 px-5 md:px-30">
					{loading ? [1, 2, 3, 4, 5].map((_, index) =>
						<CarCardSkeleton index={index} key={index} />
					) : sortedCars.map((car, index) => (
						<div key={car._id}>
							<CarCard car={car} index={index} />
						</div>
					))}
				</div>
			</div >
		</>
	);
};

export default Cars;