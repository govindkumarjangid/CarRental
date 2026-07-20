import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import { useBookingStore } from "../../store/useBookingStore.js";
import { TableSkeleton } from "../../components/skeletons";
import BookingPopup from "../../components/owner/BookingPopup.jsx";
import EmptyBookingState from "../../components/owner/EmptyBookingState.jsx";
import InputBox from "../../components/owner/InputBox.jsx";
import { iconList } from "../../assets/assets.jsx";

const ManageBookings = () => {
	const {
		ownerBookings: bookings,
		ownerBookingLoading: loading,
		fetchOwnerBookings,
		changeBookingStatus,
		changePaymentStatus,
		deleteBooking,
	} = useBookingStore();
	const currency = import.meta.env.VITE_CURRENCY;
	const { bookingId } = useParams();
	const navigate = useNavigate();
	const { setTrackingCarId, setIsLiveTrackerOpen } = useOutletContext() || {};

	const [openConfirm, setOpenConfirm] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;


	useEffect(() => {
		fetchOwnerBookings();
	}, []);

	// Filter bookings based on search and dropdowns
	const filteredBookings = bookings.filter(booking => {
		const matchesSearch =
			(booking.car?.brand || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(booking.car?.model || "").toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = statusFilter === "All" || booking.status === statusFilter.toLowerCase();
		const matchesPayment = paymentStatusFilter === "All" || booking.paymentStatus === paymentStatusFilter.toLowerCase();

		return matchesSearch && matchesStatus && matchesPayment;
	});

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, statusFilter, paymentStatusFilter]);

	// Pagination logic
	const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

	const selectedBooking = bookings.find(b => b._id === bookingId);

	const handleDelete = (e, bId) => {
		e.stopPropagation();
		setDeleteId(bId);
		setOpenConfirm(true);
	}

	if (loading && bookings.length === 0) return <TableSkeleton showAddButton={false} />;
	if (bookings.length === 0 && !loading) return <EmptyBookingState />;

	if (bookingId && selectedBooking) {
		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="flex-1 h-full overflow-hidden">
					<BookingPopup
						selectedBooking={selectedBooking}
						setSelectedBooking={() => navigate("/owner/manage-bookings")}
						isFullPage={true}
					/>
				</motion.div>
			</AnimatePresence>
		)
	}

	return (
		<div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
			<OwnerTitle
				title={"Manage Bookings"}
				subTitle={
					"Track all customer bookings, approve or cancel requests, and manage booking statuses."
				}
			/>

			{/* Search and Filters */}
			<div className="flex flex-col md:flex-row gap-4 mt-8 mb-6 items-end">
				<div className="flex-1 w-full">
					<InputBox
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						label="search"
						placeholder="Search by car brand or model..."
						title="Search Bookings"
						icon={iconList.Search}
					/>
				</div>
				<div className="w-full md:w-52">
					<InputBox
						as="select"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						label="status"
						title="Booking Status"
						options={['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']}
					/>
				</div>
				<div className="w-full md:w-52">
					<InputBox
						as="select"
						value={paymentStatusFilter}
						onChange={(e) => setPaymentStatusFilter(e.target.value)}
						label="payment"
						title="Payment Status"
						options={['All', 'Pending', 'Confirmed', 'Failed']}
					/>
				</div>
			</div>

			<div className="w-full bg-white shadow-sm transition-all rounded-xl border border-gray-200 flex flex-col overflow-hidden">
				<div className="overflow-x-auto overflow-y-hidden relative">
					<motion.table
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						style={{ willChange: "opacity" }}
						className="w-full border-collapse text-left text-sm text-gray-600">
						<thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
							<tr>
								<th className="p-3 font-medium">Car</th>
								<th className="p-3 font-medium max-md:hidden">
									Duration
								</th>
								<th className="p-3 font-medium max-md:hidden">Earnings</th>
								<th className="p-3 font-medium max-md:hidden">Method</th>
								<th className="p-3 font-medium max-md:hidden">
									Payment
								</th>
								<th className="p-3 font-medium">Status</th>
								<th className="p-3 font-medium">Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentItems.length > 0 ? (
								currentItems.map((booking, index) => (
									<motion.tr
										key={booking._id || index}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.2 }}
										onClick={() => navigate(`/owner/manage-bookings/${booking._id}`)}
										className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer">
										<td className="p-3 flex md:flex-row flex-col items-start gap-3 justify-start">
											{booking.car ? (
												<>
													<img
														src={booking.car.image}
														alt={booking.car.brand}
														className="h-11 aspect-video rounded-xl object-cover"
													/>
													<div>
														<p className="font-medium md:text-base text-xs line-clamp-1">
															{booking.car.brand} {booking.car.model}
														</p>
														<p className="max-md:hidden text-[11px] text-gray-400">
															{booking.car.seating_capacity} seats ●{" "}
															{booking.car.transmission}
														</p>
													</div>
												</>
											) : (
												<div className="flex items-center gap-2">
													<div className="h-11 aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
														<iconList.TriangleAlert size={18} className="text-gray-400" />
													</div>
													<p className="text-sm text-red-500 font-medium italic">Car Deleted</p>
												</div>
											)}
										</td>

										<td className="p-3 max-md:hidden">
											<div className="flex flex-col gap-0.5">
												<p className="text-[13px] font-bold text-gray-800 whitespace-nowrap">
													{(() => {
														const diff = new Date(booking.returnDate) - new Date(booking.pickupDate);
														const totalHours = Math.floor(diff / (1000 * 60 * 60));
														const days = Math.floor(totalHours / 24);
														const hours = totalHours % 24;
														return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h` : days === 0 ? "0h" : ""}`;
													})()}
												</p>
												<p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
													{new Date(booking.pickupDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })} - {new Date(booking.returnDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
												</p>
											</div>
										</td>

										<td className="p-3 md:text-base text-xs font-light max-md:hidden">
											<span>{currency}</span>
											<span>{booking.price.toLocaleString("en-IN")}</span>
										</td>

										<td className="p-3 max-md:hidden">
											<div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xl text-[11px] font-medium uppercase tracking-wide ${booking.paymentMethod === "online"
												? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
												: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
												}`}>
												{booking.paymentMethod}
											</div>
										</td>

										<td className="p-3 max-md:hidden">
											{booking.paymentStatus === "pending" ? (
												<select
													value={booking.paymentStatus}
													onClick={(e) => e.stopPropagation()}
													onChange={(e) => changePaymentStatus(booking._id, e.target.value)}
													className={`text-[12px] font-medium px-2 py-1 rounded-xl outline-none border cursor-pointer transition-all bg-yellow-500/10 text-yellow-600 border-yellow-500/20`}>
													<option value="pending">Pending</option>
													<option value="confirmed">Confirmed</option>
													<option value="failed">Failed</option>
												</select>
											) : (
												<div className={`inline-flex px-2 py-1 rounded-xl text-[12px] font-medium border ${booking.paymentStatus === "confirmed"
													? "bg-green-500/10 text-green-600 border-green-500/20"
													: "bg-red-500/10 text-red-600 border-red-500/20"
													}`}>
													{booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
												</div>
											)}
										</td>

										<td className="p-3">
											<div className="flex items-center gap-3">
												{["pending", "confirmed"].includes(booking.status) ? (
													<select
														value={booking.status}
														onClick={(e) => e.stopPropagation()}
														onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
														className={`text-[12px] font-medium px-2 py-1 rounded-xl outline-none border cursor-pointer transition-all ${booking.status === "confirmed"
															? "bg-green-500/10 text-green-600 border-green-500/20"
															: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
															}`}>
														<option value="pending">Pending</option>
														<option value="confirmed">Confirmed</option>
														<option value="completed">Completed</option>
														<option value="cancelled">Cancelled</option>
													</select>
												) : (
													<div className={`px-2 py-1 rounded-xl text-[12px] font-medium border ${booking.status === "completed"
														? "bg-blue-500/10 text-blue-600 border-blue-500/20"
														: "bg-red-500/10 text-red-600 border-red-500/20"
														}`}>
														{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
													</div>
												)}
											</div>
										</td>
										<td className="p-3">
											<button
												onClick={(e) => handleDelete(e, booking._id)}
												className="cursor-pointer active:scale-90 transition-transform"
												title="Delete Booking">
												<iconList.Trash2 size={18} className="text-red-600" />
											</button>

											{booking.car && (
												<button
													onClick={(e) => {
														e.stopPropagation();
														navigate(`/owner/manage-bookings/location/${booking.car._id}`);
													}}
													className="cursor-pointer active:scale-90 transition-transform ml-3"
													title="Live Track">
													<iconList.MapPin size={18} className="text-blue-500" />
												</button>
											)}
										</td>
									</motion.tr>
								))
							) : (
								<tr>
									<td colSpan="7" className="p-10 text-center text-gray-400 italic font-medium">
										No bookings found matching your search.
									</td>
								</tr>
							)}
						</tbody>

					</motion.table>
				</div>

				{/* Pagination */}
				{totalPages > 0 && (
					<div className="p-4 border-t border-gray-100 flex items-center justify-center gap-6 bg-gray-50/50">
						<button
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(prev => prev - 1)}
							className="p-2 rounded-xl bg-primary hover:bg-primary-dull border border-gray-200 shadow-sm disabled:opacity-90 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer text-white">
							<iconList.ChevronLeft size={20} />
						</button>
						<span className="text-sm font-semibold text-gray-600">
							{
								Array.from({ length: totalPages }).map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentPage(index + 1)}
										className={`px-3 py-1 rounded-xl transition-colors m-1 ${currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>
										{index + 1}
									</button>
								))
							}
						</span>
						<button
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage(prev => prev + 1)}
							className="p-2 rounded-xl bg-primary hover:bg-primary-dull border border-gray-200 shadow-sm disabled:opacity-90 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer text-white">
							<iconList.ChevronRight size={20} />
						</button>
					</div>
				)}
			</div>

			{/* Delete Confirmation Modal */}

			{openConfirm && (
				<AnimatePresence>
					<div className="fixed inset-0 flex items-center justify-center z-999 px-4">
						{/* Semi-transparent Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setOpenConfirm(false)}
							className="absolute inset-0 backdrop-blur-xs bg-blue-700/5"
						/>

						{/* Modal Content */}
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="relative bg-white rounded-xl shadow-sm w-full max-w-md p-6 overflow-hidden">
							<h2 className="text-xl font-semibold text-center">
								Delete booking?
							</h2>

							<p className="text-center mt-2 text-gray-600">
								Are you sure you want to delete this booking record? This
								action cannot be undone.
							</p>

							<div className="flex justify-between gap-6 mt-6 md:px-10 px-4">
								<button
									className="w-1/2 py-2 rounded-xl border bg-primary hover:bg-primary-dull text-white cursor-pointer active:scale-98 transition-all flex justify-center items-center gap-4 mx-2"
									onClick={() => setOpenConfirm(false)}>
									Cancel
								</button>

								<button
									className="w-1/2 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white cursor-pointer active:scale-98 transition-all flex justify-center items-center gap-4 mx-2"
									onClick={() => {
										deleteBooking(deleteId);
										setOpenConfirm(false);
									}}>
									Delete
								</button>
							</div>
						</motion.div>
					</div>
				</AnimatePresence>
			)}

		</div>
	);
};

export default ManageBookings;