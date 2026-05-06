import { useCarStore } from "../../store/useCarStore.js";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import TableSkeleton from "../../components/UI/TableSkeleton.jsx";
import { useParams, useNavigate } from "react-router-dom";
import EditCarForm from "../../components/owner/EditCarForm.jsx";
import EmptyCarState from "../../components/owner/EmptyCarState.jsx";
import InputBox from "../../components/owner/InputBox.jsx";

const ManageCars = () => {
	const currency = import.meta.env.VITE_CURRENCY;
	const {
		ownerCars: cars,
		ownerCarsLoading: loading,
		fetchOwnerCars,
		updateCarStatus,
		deleteCar,
		setShowEditCar,
		setEditCar
	} = useCarStore();

	const { carId } = useParams();
	const navigate = useNavigate();

	const [openConfirm, setOpenConfirm] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		fetchOwnerCars();
	}, []);

	const filteredCars = cars.filter(car => {
		const matchesSearch =
			car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.category.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesCategory = categoryFilter === "All" || car.category === categoryFilter;
		const matchesStatus = statusFilter === "All" || car.status === statusFilter.toLowerCase();

		return matchesSearch && matchesCategory && matchesStatus;
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, categoryFilter, statusFilter]);

	const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

	const selectedCar = cars.find(c => c._id === carId);

	if (loading && cars.length === 0) return <TableSkeleton />;
	if (cars.length === 0 && !loading) return <EmptyCarState />;

	if (carId && selectedCar) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="flex-1 h-full overflow-hidden"
			>
				<EditCarForm
					car={selectedCar}
					onClose={() => navigate("/owner/manage-cars")}
					isFullPage={true}
				/>
			</motion.div>
		)
	}

	return (
		<div className="px-4 pt-10 md:px-10 flex-1 pb-10 max-w-6xl w-full">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<OwnerTitle
						title={"Manage Cars"}
						subTitle={
							"View all listed cars, update their details, or remove them from the platform."
						}
					/>
				</div>
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					onClick={() => navigate("/owner/add-car")}
					className="flex items-center gap-2 bg-primary hover:bg-primary-dull text-white px-3 py-2 rounded-md font-medium transition-all shadow-lg active:scale-95 w-fit h-fit cursor-pointer"
				>
					<iconList.Plus size={20} />
					Add New Car
				</motion.button>
			</div>

			{/* Search and Filters */}
			<div className="flex flex-col md:flex-row gap-4 mt-8 mb-6 items-end">
				<div className="flex-1 w-full">
					<InputBox
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						label="search"
						placeholder="Search by name, model, or features..."
						title="Search Cars"
						icon={iconList.Search}
					/>
				</div>
				<div className="w-full md:w-52">
					<InputBox
						as="select"
						value={categoryFilter}
						onChange={(e) => setCategoryFilter(e.target.value)}
						label="category"
						title="Category"
						options={['All', 'Sedan', 'SUV', 'MUV', 'EV', 'Wagon', 'Van', 'Jeep', 'Hatchback']}
					/>
				</div>
				<div className="w-full md:w-52">
					<InputBox
						as="select"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						label="status"
						title="Status"
						options={['All', 'Available', 'Cleaning', 'Maintenance', 'Unavailable']}
					/>
				</div>
			</div>

			<div className="max-w-250 w-full bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-gray-200">
				<div className="overflow-x-auto">
					<motion.table
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="w-full border-collapse text-left text-sm text-gray-600"
					>
						<thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
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
							{currentItems.length > 0 ? (
								currentItems.map((car, index) => (
									<motion.tr
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											type: "spring", stiffness: 300, damping: 30
										}}
										className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/80 transition-colors duration-200"
										key={car._id || index}
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
											<span>{car.pricePerHour?.toLocaleString("en-IN")}/hr</span>
										</td>

										<td className="p-3 max-md:hidden">
											<select
												value={car.status}
												onChange={(e) => updateCarStatus(car._id, e.target.value)}
												className={`text-[13px] font-medium px-2 py-1 rounded-md outline-none border cursor-pointer transition-all ${car.status === "available"
														? "bg-green-500/10 text-green-600 border-green-500/20"
														: car.status === "cleaning"
															? "bg-blue-500/10 text-blue-600 border-blue-500/20"
															: car.status === "maintenance"
																? "bg-red-500/10 text-red-600 border-red-500/20"
																: "bg-gray-500/10 text-gray-600 border-gray-500/20"
													}`}
											>
												<option value="available">Available</option>
												<option value="cleaning">Cleaning</option>
												<option value="maintenance">Maintenance</option>
												<option value="unavailable">Unavailable</option>
											</select>
										</td>

										<td className="py-3 px-2">
											<div className="flex items-center gap-4">
												<button
													onClick={() =>
														updateCarStatus(car._id, car.status === "available" ? "unavailable" : "available")
													}
													title="Quick Toggle Availability"
													className="cursor-pointer active:scale-90 transition-transform duration-300"
												>
													{car.status === "available" ? (
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

												<button
													onClick={() => navigate(`/owner/manage-cars/${car._id}`)}
													className="cursor-pointer active:scale-90 transition-transform duration-300"
													title="Edit Car"
												>
													<iconList.EditIcon
														size={18}
														className="text-yellow-500"
													/>
												</button>
											</div>
										</td>
									</motion.tr>
								))
							) : (
								<tr>
									<td colSpan="5" className="p-10 text-center text-gray-400 italic">
										No cars found matching your search.
									</td>
								</tr>
							)}
						</tbody>
					</motion.table>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="p-4 border-t border-gray-100 flex items-center justify-center gap-6 bg-gray-50/50">
						<button
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(prev => prev - 1)}
							className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
						>
							<iconList.ChevronLeft size={20} />
						</button>
						<span className="text-sm font-semibold text-gray-600">
							Page <span className="text-primary">{currentPage}</span> of {totalPages}
						</span>
						<button
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage(prev => prev + 1)}
							className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
						>
							<iconList.ChevronRight size={20} />
						</button>
					</div>
				)}


				<AnimatePresence>
					{openConfirm && (
						<div className="fixed inset-0 flex items-center justify-center z-999 px-4">
							{/* Semi-transparent Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setOpenConfirm(false)}
								className="absolute inset-0 backdrop-blur-sm bg-black/20"
							/>

							{/* Modal Content */}
							<motion.div
								initial={{ opacity: 0, scale: 0.9, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.9, y: 20 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 25
								}}
								className="relative bg-white rounded-md shadow-2xl w-full max-w-md p-6 overflow-hidden border border-gray-100"
							>
								<h2 className="text-xl font-semibold text-center">
									Delete car?
								</h2>

								<p className="text-center mt-2 text-gray-600">
									Are you sure you want to delete this car? This
									action cannot be undone.
								</p>

								<div className="flex justify-between gap-6 mt-6 md:px-10 px-4">
									<button
										className="w-1/2 py-2 rounded-md border bg-primary hover:bg-primary-dull text-white cursor-pointer active:scale-90 hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-4"
										onClick={() => setOpenConfirm(false)}
									>
										Cancel <iconList.X size={20} />
									</button>

									<button
										className="w-1/2 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer active:scale-90 hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-4"
										onClick={() => {
											deleteCar(deleteId);
											setOpenConfirm(false);
										}}
									>
										Delete <iconList.Trash2 size={18} />
									</button>
								</div>
							</motion.div>
						</div>
					)}
				</AnimatePresence>

			</div>
		</div>
	);
};

export default ManageCars;

