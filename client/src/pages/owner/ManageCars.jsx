import { useAppContext } from "../../context/AppContext.jsx";

const ManageCars = () => {
	const {
		axios,
		loading,
		setLoading,
		currency,
		useEffect,
		useState,
		assets,
		motion,
		OwnerTitle,
		Loader,
		toast,
	} = useAppContext();
	const [cars, setCars] = useState([]);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const fetchOwnerCars = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get("/api/owner/cars");
			if (data.success) {
				setCars(data.cars);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOwnerCars();
	}, []);

	const toggleCarAvailability = async (carId) => {
		try {
			const { data } = await axios.post("/api/owner/toggle-car", {
				carId,
			});
			if (data.success) {
				toast.success("Car availability toggled");
				fetchOwnerCars();
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const deleteCar = async (carId) => {
		try {
			const { data } = await axios.post("/api/owner/delete-car", {
				carId,
			});
			if (data.success) {
				toast.success("Car deleted successfully");
				fetchOwnerCars();
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	if (loading) return <Loader />;

	return (
		<div className="px-4 pt-10 md:px-10 flex-1 pb-10">
			<OwnerTitle
				title={"Manage Cars"}
				subTitle={
					"View all listed cars, update their details, or remove them from the booking platform."
				}
			/>
			<div className="max-w-3xl w-full rounded-md overflow-hidden mt-6 border border-gray-400">
				<motion.table
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full border-collapse text-left text-sm text-gray-600"
				>
					<thead className="text-gray-500">
						<tr>
							<th className="p-3 font-medium">Car</th>
							<th className="p-3 font-medium max-md:hidden">
								Category
							</th>
							<th className="p-3 font-medium">Price</th>
							<th className="p-3 font-medium max-md:hidden">
								Status
							</th>
							<th className="p-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{cars.map((car, index) => (
							<motion.tr
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="border-t border-gray-400 hover:bg-gray-100 hover:scale-101 transition-all duration-300"
								key={index}
							>
								<td className="p-3 flex items-center gap-3">
									<img
										src={car.image}
										alt={car.name}
										className="h-11 aspect-video rounded-md  object-cover"
									/>
									<div className="max-md:hidden">
										<p className="font-medium">
											{car.brand} {car.model}
										</p>
										<p>
											{car.seating_capacity} seats ●{" "}
											{car.transmission}
										</p>
									</div>
								</td>

								<td className="p-3 max-md:hidden">
									{car.category}
								</td>

								<td className="p-3">
									{currency}
									{car.pricePerDay}/day
								</td>

								<td className="p-3 max-md:hidden">
									{car.isAvaliable ? (
										<span className="text-green-600 font-medium bg-green-400/20 px-2 py-1 rounded-md">
											Available
										</span>
									) : (
										<span className="text-red-600 font-medium  bg-red-400/20 px-2 py-1 rounded-md">
											Unavailable
										</span>
									)}
								</td>

								<td className="flex items-center justify-start">
									<button
										onClick={() =>
											toggleCarAvailability(car._id)
										}
									>
										<img
											src={
												car.isAvaliable
													? assets.eye_close_icon
													: assets.eye_icon
											}
											alt="Toggle Availability"
											className="cursor-pointer"
											loading="lazy"
										/>
									</button>
									<button
										onClick={() => {
											setOpenConfirm(true);
											setDeleteId(car._id);
										}}
									>
										<img
											src={assets.delete_icon}
											alt="Delete"
											className="cursor-pointer"
											loading="lazy"
										/>
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</motion.table>

				{openConfirm && (
					<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
						<motion.div
							initial={{
								scale: 0.8,
								opacity: 0,
								y: 40,
							}}
							animate={{
								scale: 1,
								opacity: 1,
								y: 0,
							}}
							exit={{
								scale: 0.8,
								opacity: 0,
							}}
							transition={{ duration: 0.25 }}
							className="bg-white dark:bg-gray-900 rounded-md shadow-2xl w-[90%] max-w-md p-6"
						>
							<h2 className="text-xl font-semibold text-center dark:text-white">
								Delete car?
							</h2>

							<p className="text-center mt-2 text-gray-600 dark:text-gray-300">
								Are you sure you want to delete this car? This
								action cannot be undone.
							</p>

							<div className="flex justify-between gap-4 mt-6">
								<button
									className="w-1/2 py-2 rounded-md border bg-primarytext-white cursor-pointer active:scale-95 transition-transform duration-300"
									onClick={() => setOpenConfirm(false)}
								>
									Cancel
								</button>

								<button
									className="w-1/2 py-2 rounded-md bg-red-600 text-white cursor-pointer active:scale-95 transition-transform duration-300"
									onClick={() => {
										deleteCar(deleteId);
										setOpenConfirm(false);
									}}
								>
									Delete
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageCars;
