import { useAppContext } from "../../context/AppContext.jsx";

const ManageBookings = () => {
	const {
		axios,
		loading,
		setLoading,
		currency,
		Loader,
		toast,
		motion,
		OwnerTitle,
		useEffect,
		useState,
	} = useAppContext();

	const [bookings, setBookings] = useState([]);

	const fetchOwnerBookings = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get("/api/bookings/owner");
			if (data.success) {
				setBookings(data.bookings);
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOwnerBookings();
	}, []);

	const changeBookingStatus = async (bookingId, status) => {
		setLoading(true);
		try {
			const { data } = await axios.post("/api/bookings/change-status", {
				bookingId,
				status,
			});
			if (data.success) {
				toast.success(data.message);
				fetchOwnerBookings();
			}
			// console.log(bookingId, status, data);
		} catch (error) {
			toast.error(error.message);
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	const changePaymentStatus = async (bookingId, status) => {
		setLoading(true);
		try {
			const { data } = await axios.post("/api/bookings/change-payment-status", {
				bookingId,
				status,
			});
			if (data.success) {
				toast.success(data.message);
				fetchOwnerBookings();
			}
		} catch (error) {
			toast.error(error.message);
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	}

	if (loading) return <Loader />;

	return (
		<div className="px-4 pt-10 pb-15 md:px-10 flex-1">
			<OwnerTitle
				title={"Manage Bookings"}
				subTitle={
					"Track all customer bookings, approve or cancel requests, and manage booking statuses."
				}
			/>
			<div className="max-w-4xl w-full rounded-md overflow-hidden mt-6 border border-gray-400">
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
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="border-t border-gray-400 hover:bg-gray-100 hover:scale-101 transition-all duration-300"
								key={index}
							>
								{/* car details  */}
								<td className="p-3 flex items-center gap-3">
									<img
										src={booking.car.image}
										alt={booking.car.name}
										className="h-11 aspect-video rounded-md  object-cover"
									/>
									<div className="max-md:hidden">
										<p className="font-medium">
											{booking.car.brand}{" "}
											{booking.car.model}
										</p>
									</div>
								</td>

								{/* date range  */}
								<td className="p-3 max-md:hidden">
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
											onChange={(e) =>
												changePaymentStatus(
													booking._id,
													e.target.value
												)
											}
											className="outline-none bg-amber-300/30 text-amber-500 px-1 py-1 text-xs rounded-md cursor-pointer"
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
									{booking.status === "pending" ? (
										<select
											name="bookingStatus"
											id="bookingStatus"
											value={booking.status}
											onChange={(e) =>
												changeBookingStatus(
													booking._id,
													e.target.value
												)
											}
											className="outline-none bg-amber-300/30 text-amber-500 px-1 py-1 text-xs rounded-md cursor-pointer"
										>
											<option
												value="pending"
												className="cursor-pointer"
											>
												Pending
											</option>
											<option
												value="cancelled"
												className="cursor-pointer"
											>
												Cancelled
											</option>
											<option
												value="confirmed"
												className="cursor-pointer"
											>
												Confirm
											</option>
										</select>
									) : (
										<span
											className={`px-3 py-1 rounded-md text-xs font-semibold ${booking.status === "confirmed"
												? "bg-green-100 text-green-500"
												: "bg-red-100 text-red-500"
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
			</div>
		</div>
	);
};

export default ManageBookings;
