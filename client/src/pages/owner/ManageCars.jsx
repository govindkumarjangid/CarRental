import { useCarStore } from "../../store/useCarStore.js";
import { useEffect, useState, motion, iconList, OwnerTitle } from "../../index.js"
import TableSkeleton from "../../components/UI/TableSkeleton.jsx";

const ManageCars = () => {
	const currency = import.meta.env.VITE_CURRENCY;
	const {
		ownerCars: cars,
		loading,
		fetchOwnerCars,
		toggleCarAvailability,
		deleteCar,
		setShowEditCar,
		setEditCar
	} = useCarStore();

	const [openConfirm, setOpenConfirm] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		fetchOwnerCars();
	}, []);

	if (loading) return <TableSkeleton />;

	return (
		<div className="px-4 pt-10 md:px-10 flex-1 pb-10">
			<OwnerTitle
				title={"Manage Cars"}
				subTitle={
					"View all listed cars, update their details, or remove them from the booking platform."
				}
			/>
			<div className="max-w-[1000px] w-full bg-white dark:bg-second-bg shadow-sm rounded-xl overflow-hidden mt-6 border border-gray-200 dark:border-dark-border">
				<motion.table
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="w-full border-collapse text-left text-sm text-gray-600 dark:text-dark-text"
				>
					<thead className="bg-gray-50 dark:bg-card-bg text-gray-500 dark:text-dark-muted border-b border-gray-200 dark:border-dark-border">
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
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									type: "spring", stiffness: 300, damping: 30
								}}
								className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/80 transition-colors duration-200 dark:border-dark-border dark:hover:bg-surface/50"
								key={index}
							>
								<td className="p-3 flex  md:flex-row flex-col items-start gap-3 justify-start">
									<img
										src={car.image}
										alt={car.name}
										className="h-11 aspect-video rounded-md object-cover"
									/>
									<div>
										<p className="font-medium md:text-base text-xs line-clamp-1">
											{car.brand} {car.model}
										</p>
										<p className="max-md:hidden">
											{car.seating_capacity} seats ●{" "}
											{car.transmission}
										</p>
									</div>
								</td>

								<td className="py-3 max-md:hidden">
									{car.category}
								</td>

								<td className="md:p-3 md:text-base text-xs font-light">
									<span>{currency}</span>
									<span>{car.pricePerDay.toLocaleString("en-IN")}/day</span>
								</td>

								<td className="p-3 max-md:hidden">
									{car.isAvaliable ? (
										<span className="text-green-600 dark:text-green-400 font-medium bg-green-500/10 dark:bg-green-500/20 px-2.5 py-1 rounded-md text-[13px]">
											Available
										</span>
									) : (
										<span className="text-red-500 font-medium bg-red-500/10 dark:bg-red-500/20 px-2.5 py-1 rounded-md text-[13px]">
											Unavailable
										</span>
									)}
								</td>

								<td className="py-3 px-2">
									<div className="flex items-center gap-3">
										<button
											onClick={() =>
												toggleCarAvailability(car._id)
											}
											className="cursor-pointer active:scale-90 transition-transform duration-300"
										>
											{car.isAvaliable ? (
												<iconList.Eye
													size={18}
													className="text-green-600"
												/>
											) : (
												<iconList.EyeOff
													size={18}
													className="text-red-600"
												/>
											)}
										</button>

										<button
											onClick={() => {
												setOpenConfirm(true);
												setDeleteId(car._id);
											}}
											className="cursor-pointer active:scale-90 transition-transform duration-300"
										>
											<iconList.Trash2
												size={18}
												className="text-red-600"
											/>
										</button>

										<button className="cursor-pointer">
											<iconList.EditIcon
												onClick={() => {
													setShowEditCar(true);
													setEditCar(car);
												}}
												size={18}
												className="text-yellow-500 active:scale-90 transition-transform duration-300"
											/>
										</button>
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</motion.table>

				{openConfirm && (
					<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{
								type: "spring", stiffness: 300, damping: 30
							}}
							className="bg-white dark:bg-gray-900 rounded-md shadow-2xl w-[90%] max-w-md p-6"
						>
							<h2 className="text-xl font-semibold text-center dark:text-white">
								Delete car?
							</h2>

							<p className="text-center mt-2 text-gray-600 dark:text-gray-300">
								Are you sure you want to delete this car? This
								action cannot be undone.
							</p>

							<div className="flex justify-between gap-6 mt-6 md:px-10 px-4">
								<button
									className="w-1/2 py-2 rounded-md border bg-primary hover:bg-primary-dull text-white cursor-pointer active:scale-90 hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-4"
									onClick={() => setOpenConfirm(false)}
								>
									Cancel <iconList.X size={20}/>
								</button>

								<button
									className="w-1/2 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer active:scale-90 hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-4"
									onClick={() => {
										deleteCar(deleteId);
										setOpenConfirm(false);
									}}
								>
									Delete <iconList.Trash2 size={18}/>
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
