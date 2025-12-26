import { useAppContext } from "../context/AppContext.jsx";
const Cars = () => {
	const {
		motion,
		assets,
		useState,
		useEffect,
		UserTitle,
		fetchCars,
		cars,
		CarCard,
		loading,
		Loader,
	} = useAppContext();

	const [filter, setFilter] = useState("");
	const [input, setInput] = useState("");
	const [sortOrder, setSortOrder] = useState(null);

	useEffect(() => {
		fetchCars();
	}, []);

	const filteredCars = cars.filter((car) => {
		const matchesBrand = car.brand
			.toLowerCase()
			.includes(input.trim().toLowerCase());
		const matchesModel = filter ? car.category === filter : true;
		return matchesBrand && matchesModel;
	});

	let sortedCars = [...filteredCars];
	if (sortOrder) {
		sortedCars.sort((a, b) => a.brand.localeCompare(b.brand));
		if (sortOrder === "desc") sortedCars.reverse();
	}

	if (loading) return <Loader />;
	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center dark:bg-linear-to-r pb-20 dark:to-[#081c24] dark:from-[#334b57] relative">
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: "easeOut" }}
					className="bg-light  dark:bg-[#081c24] w-full pb-20 pt-20 flex flex-col justify-center items-center  p-4 "
				>
					<UserTitle
						title="Avaiable Cars"
						subTitle="Browser our selection of premium veficles available for your nest adventure"
					/>
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, ease: "easeOut" }}
						className="mt-8 flex items-center justify-between gap-4 border border-gray-300 dark:border-white px-4 py-1 rounded-lg bg-white shadow-xl min-w-80 md:min-w-3xl"
					>
						<img src={assets.search_icon} alt="search icon" />
						<input
							type="text"
							onChange={(e) => setInput(e.target.value)}
							placeholder="Search by make, model, or features"
							className="outline-none py-2 flex-9"
						/>
						<img src={assets.filter_icon} alt="filter icon" />
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scaleX: 0 }}
					animate={{ opacity: 1, scaleX: 1 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
					className="flex items-center justify-evenly flex-wrap gap-4 mt-4"
				>
					<p className="dark:text-white border dark:border-borderColor backdrop-blur-sm text-gray-700 px-3 py-1 rounded-md position-sticky top-0">
						Showing {sortedCars.length} results
					</p>
					<button
						onClick={() => setSortOrder("asc")}
						className={`px-3 py-1 rounded-md border ${
							sortOrder === "asc"
								? "bg-primary text-white"
								: "bg-white"
						}`}
					>
						Model A → Z
					</button>

					<button
						onClick={() => setSortOrder("desc")}
						className={`px-3 py-1 rounded-md border ${
							sortOrder === "desc"
								? "bg-primary text-white"
								: "bg-white"
						}`}
					>
						Model Z → A
					</button>
					<p className="dark:text-white">Sort By :- </p>
					<select
						onChange={(e) => setFilter(e.target.value)}
						className="border border-gray-300 dark:border-white px-3 py-1.5 rounded-md bg-white dark:bg-main-bg text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					>
						<option value="">All</option>
						<option value="SUV">SUV</option>
						<option value="EV">EV</option>
						<option value="Wagon">Wagon</option>
						<option value="Sedan">Sedan</option>
					</select>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-18 px-7 md:px-30">
					{sortedCars.map((car, index) => (
						<div key={car._id}>
							<CarCard car={car} index={index} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Cars;
