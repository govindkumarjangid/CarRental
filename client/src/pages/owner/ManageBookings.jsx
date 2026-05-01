import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import { useBookingStore } from "../../store/useBookingStore.js";
import TableSkeleton from "../../components/UI/TableSkeleton.jsx";
import BookingPopup from "../../components/owner/BookingPopup.jsx";
import EmptyBookingState from "../../components/owner/EmptyBookingState.jsx";
import { iconList } from "../../assets/assets.jsx";
import { useParams, useNavigate } from "react-router-dom";

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

	const [openConfirm, setOpenConfirm] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [visibleCount, setVisibleCount] = useState(10);


	useEffect(() => {
		fetchOwnerBookings();
	}, []);

	const selectedBooking = bookings.find(b => b._id === bookingId);

	const handleDelete = (e, bId) => {
		e.stopPropagation();
		setDeleteId(bId);
		setOpenConfirm(true);
	}

	if (loading && bookings.length === 0) return <TableSkeleton />;
	if (bookings.length === 0 && !loading) return <EmptyBookingState />;

	if (bookingId && selectedBooking) {
		return (
			<div className="flex-1 h-full overflow-hidden">
				<BookingPopup
					selectedBooking={selectedBooking}
					setSelectedBooking={() => navigate("/owner/manage-bookings")}
					isFullPage={true}
				/>
			</div>
		)
	}

	const displayedBookings = bookings.slice(0, visibleCount);

	return (
		<div className="px-4 pt-10 md:px-10 flex-1 pb-10">
			<OwnerTitle
				title={"Manage Bookings"}
				subTitle={
					"Track all customer bookings, approve or cancel requests, and manage booking statuses."
				}
			/>
			<div className="max-w-250 w-full bg-white dark:bg-second-bg shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden mt-6 border border-gray-200 dark:border-dark-border mb-10">
				<div className="overflow-x-auto">
					<motion.table
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4 }}
						className="w-full border-collapse text-left text-sm text-gray-600 dark:text-dark-text"
					>
						<thead className="bg-gray-50 dark:bg-card-bg text-gray-500 dark:text-dark-muted border-b border-gray-200 dark:border-dark-border">
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
							{displayedBookings.map((booking, index) => (
								<motion.tr
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										type: "spring", stiffness: 300, damping: 30
									}}
									onClick={() => navigate(`/owner/manage-bookings/${booking._id}`)}
									className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/80 transition-colors duration-200 dark:border-dark-border dark:hover:bg-surface/50 cursor-pointer"
									key={index}
								>
									<td className="p-3 flex md:flex-row flex-col items-start gap-3 justify-start">
										<img
											src={booking.car.image}
											alt={booking.car.name}
											className="h-11 aspect-video rounded-md object-cover"
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
									</td>

									<td className="p-3 max-md:hidden">
										<div className="flex flex-col gap-0.5">
											<p className="text-[13px] font-bold text-gray-800 dark:text-dark-text whitespace-nowrap">
												{(() => {
													const diff = new Date(booking.returnDate) - new Date(booking.pickupDate);
													const totalHours = Math.floor(diff / (1000 * 60 * 60));
													const days = Math.floor(totalHours / 24);
													const hours = totalHours % 24;
													return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h` : days === 0 ? "0h" : ""}`;
												})()}
											</p>
											<p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
												{new Date(booking.pickupDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - {new Date(booking.returnDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
											</p>
										</div>
									</td>

									<td className="p-3 md:text-base text-xs font-light max-md:hidden">
										<span>{currency}</span>
										<span>{booking.price.toLocaleString("en-IN")}</span>
									</td>

									<td className="p-3 max-md:hidden">
										<div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wide ${booking.paymentMethod === "online"
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
												className={`text-[12px] font-medium px-2 py-1 rounded-md outline-none border cursor-pointer transition-all bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:bg-yellow-500/20`}
											>
												<option value="pending">Pending</option>
												<option value="confirmed">Confirmed</option>
												<option value="failed">Failed</option>
											</select>
										) : (
											<div className={`inline-flex px-2 py-1 rounded-md text-[12px] font-medium border ${booking.paymentStatus === "confirmed"
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
													className={`text-[12px] font-medium px-2 py-1 rounded-md outline-none border cursor-pointer transition-all ${booking.status === "confirmed"
														? "bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20"
														: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:bg-yellow-500/20"
														}`}
												>
													<option value="pending">Pending</option>
													<option value="confirmed">Confirmed</option>
													<option value="completed">Completed</option>
													<option value="cancelled">Cancelled</option>
												</select>
											) : (
												<div className={`px-2 py-1 rounded-md text-[12px] font-medium border ${booking.status === "completed"
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
											className="cursor-pointer active:scale-90 transition-transform duration-300"
											title="Delete Booking"
										>
											<iconList.Trash2 size={18} className="text-red-600" />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</motion.table>
				</div>

				{bookings.length > visibleCount && (
					<div className="p-6 flex justify-center border-t border-gray-100 dark:border-dark-border bg-gray-50/30 dark:bg-card-bg/20">
						<button
							onClick={() => setVisibleCount(prev => prev + 10)}
							className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-md hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
						>
							<iconList.Plus size={18} />
							Load More Bookings
						</button>
					</div>
				)}
			</div>

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{openConfirm && (
					<div className="fixed inset-0 flex items-center justify-center z-999 px-4">
						{/* Semi-transparent Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setOpenConfirm(false)}
							className="absolute inset-0 backdrop-blur-sm"
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
							className="relative bg-white dark:bg-gray-900 rounded-md shadow-2xl w-full max-w-md p-6 overflow-hidden"
						>
							<h2 className="text-xl font-semibold text-center dark:text-white">
								Delete booking?
							</h2>

							<p className="text-center mt-2 text-gray-600 dark:text-gray-300">
								Are you sure you want to delete this booking record? This
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
										deleteBooking(deleteId);
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
	);
};

export default ManageBookings;


