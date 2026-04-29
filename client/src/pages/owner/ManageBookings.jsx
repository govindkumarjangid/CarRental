import { motion, OwnerTitle, useEffect, useState, AnimatePresence } from "../../index.js";
import { useBookingStore } from "../../store/useBookingStore.js";
import TableSkeleton from "../../components/UI/TableSkeleton.jsx";
import BookingPopup from "../../components/owner/BookingPopup.jsx";

const ManageBookings = () => {
	const {
		ownerBookings: bookings,
		ownerBookingLoading: loading,
		fetchOwnerBookings,
		changeBookingStatus,
		changePaymentStatus,
	} = useBookingStore();
	const currency = import.meta.env.VITE_CURRENCY;

	const [selectedBooking, setSelectedBooking] = useState(null);


	useEffect(() => {
		fetchOwnerBookings();
	}, []);

	if (loading) return <TableSkeleton />;

	return (
		<div className="px-4 pt-10 pb-15 md:px-10 flex-1">
			<OwnerTitle
				title={"Manage Bookings"}
				subTitle={
					"Track all customer bookings, approve or cancel requests, and manage booking statuses."
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
								Date Range
							</th>
							<th className="p-3 font-medium max-md:hidden">
								Total
							</th>
							<th className="p-3 font-medium max-md:hidden">Payment Method</th>
							<th className="py-3 font-medium">Payment Status</th>
							<th className="p-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking, index) => (
							<motion.tr
								onClick={() => setSelectedBooking(booking)}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									type: "spring", stiffness: 300, damping: 30
								}}
								className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/80 transition-colors duration-200 dark:border-dark-border dark:hover:bg-surface/50 cursor-pointer"
								key={index}
							>

								{/* car details  */}
								<td className="p-3 flex md:flex-row flex-col items-start gap-3 justify-start">
									<img
										src={booking.car.image}
										alt={booking.car.name}
										className="h-11 aspect-video rounded-md  object-cover"
									/>
									<div>
										<p className="font-medium md:text-base text-xs line-clamp-1">
											{booking.car.brand}{" "}
											{booking.car.model}
										</p>
									</div>
								</td>

								{/* date range  */}
								<td className="p-3 max-md:hidden text-xs">
									{booking.pickupDate.split("T")[0]} To{" "}
									{booking.returnDate.split("T")[0]}
								</td>


								{/* total price  */}
								<td className="p-3 max-md:hidden">
									{currency}{" "}
									{booking.price.toLocaleString("en-IN")}
								</td>

								{/* payment method  */}
								<td className="max-md:hidden md:p-3">
									<p className={`px-2 py-1 text-xs text-gray-100 rounded-md text-center capitalize ${booking.paymentMethod === "online"
										? "bg-blue-500"
										: "bg-green-500"
										}`}>
										{booking.paymentMethod}
									</p>
								</td>

								{/* payment status  */}
								<td className="py-3">
									{
										booking.paymentStatus === "pending" ? (<select
											name="paymentStatus"
											id="paymentStatus"
											value={booking.paymentStatus}
											onClick={(e) => e.stopPropagation()}
											onChange={(e) =>
												changePaymentStatus(
													booking._id,
													e.target.value
												)
											}
											className="outline-none bg-yellow-300/30 text-yellow-500 px-1 py-1 text-xs rounded-md cursor-pointer"
										>
											<option
												value="pending"
												className="cursor-pointer"
											>
												Pending
											</option>
											<option
												value="confirmed"
												className="cursor-pointer"
											>
												Confirmed
											</option>
											<option
												value="failed"
												className="cursor-pointer"
											>
												Failed
											</option>
										</select>
										) : (
											<span
												className={`px-3 py-1 rounded-md text-xs font-semibold ${booking.paymentStatus === "confirmed"
													? "bg-green-100 text-green-500"
													: "bg-red-100 text-red-500"
													}`}
											>
												{booking.paymentStatus}
											</span>

										)}

								</td>

								{/* booking status  */}
								<td className="py-3 pr-1.5">
									{["pending", "confirmed"].includes(booking.status) ? (
										<select
											name="bookingStatus"
											id="bookingStatus"
											value={booking.status}
											onClick={(e) => e.stopPropagation()}
											onChange={(e) =>
												changeBookingStatus(booking._id, e.target.value)
											}

											className={`outline-none px-2 py-1 text-xs font-semibold rounded-md cursor-pointer capitalize ${booking.status === "completed"
												? "bg-blue-100 text-blue-600"
												: booking.status === "confirmed"
													? "bg-green-100 text-green-500"
													: booking.status === "pending"
														? "bg-yellow-100 text-yellow-500"
														: "bg-red-100 text-red-600"
												}`}
										>
											<option value="pending" className="cursor-pointer">
												Pending
											</option>
											<option value="confirmed" className="cursor-pointer">
												Confirmed
											</option>
											<option value="completed" className="cursor-pointer">
												Completed
											</option>
											<option value="cancelled" className="cursor-pointer">
												Cancelled
											</option>
										</select>
									) : (
										<span
											className={`px-3 py-1 rounded-md text-xs font-semibold capitalize
												 ${booking.status === "completed"
													? "bg-blue-100 text-blue-600"
													: booking.status === "confirmed"
														? "bg-green-100 text-green-500"
														: booking.status === "pending"
															? "bg-yellow-100 text-yellow-500"
															: "bg-red-100 text-red-600"
												}`}
										>
											{booking.status}
										</span>
									)}
								</td>
							</motion.tr>
						))}
					</tbody>
				</motion.table>

				{/* booking details popup  */}
				<AnimatePresence>
					{selectedBooking && (
						<BookingPopup
							selectedBooking={selectedBooking}
							setSelectedBooking={setSelectedBooking}
						/>
					)}
				</AnimatePresence>
			</div>
		</div >
	);
};

export default ManageBookings;
