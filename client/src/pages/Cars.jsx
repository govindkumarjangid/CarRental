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

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center dark:bg-linear-to-r pb-20 dark:to-main-bg dark:from-second-bg relative">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className=" bg-light dark:bg-main-bg w-full py-20 px-4 flex flex-col justify-center items-center"
				>
					<UserTitle
						title="Avaiable Cars"
						subTitle="Browser our selection of premium veficles available for your nest adventure"
					/>

					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, ease: "easeOut" }}
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

				<motion.div
					initial={{ opacity: 0, scaleX: 0 }}
					animate={{ opacity: 1, scaleX: 1 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
					className="flex items-center justify-between flex-wrap gap-4 mt-4 w-full px-5 md:px-30"
				>
					<p className="dark:text-white dark:border-gray-300 text-gray-500 float-left">
						Showing {sortedCars.length} results
					</p>
					<div className="flex gap-2 max-md:hidden items-center">
						<button
							onClick={() => setSortOrder("asc")}
							className={`px-3 py-1 rounded-md border border-gray-400 cursor-pointer ${sortOrder === "asc"
								? "bg-primary text-gray-100"
								: "bg-white text-gray-500"
								}`}
						>
							Model A → Z
						</button>
						<button
							onClick={() => setSortOrder("desc")}
							className={`px-3 py-1 rounded-md border border-gray-400 cursor-pointer ${sortOrder === "desc"
								? "bg-primary text-gray-100"
								: "bg-white text-gray-500"
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
					</div>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 px-5 md:px-30">
					{loading ? [1, 2, 3, 4, 5].map((_, index) =>
						<CarCardSkeleton index={index} key={index} />
					) : sortedCars.map((car, index) => (
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
