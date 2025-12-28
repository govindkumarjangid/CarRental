import { useAppContext } from "../../context/AppContext.jsx";
const Dashboard = () => {
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
		assets,
	} = useAppContext();

	const [data, setData] = useState({
		totalCars: 0,
		totalBookings: 0,
		pendingBookings: 0,
		completedBookings: 0,
		cancelledBookings: 0,
		recentBookings: [],
		monthlyRevenue: 0,
	});

	const dashboardCards = [
		{
			title: "Total Cars",
			value: data.totalCars,
			icon: assets.carIconColored,
		},
		{
			title: "Total Bookings",
			value: data.totalBookings,
			icon: assets.listIconColored,
		},
		{
			title: "Pending",
			value: data.pendingBookings,
			icon: assets.cautionIconColored,
		},
		{
			title: "Completed",
			value: data.completedBookings,
			icon: assets.listIconColored,
		},
		{
			title: "Cancelled",
			value: data.cancelledBookings,
			icon: assets.cautionIconColored,
		},
	];

	const fectchDashboardData = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get("/api/owner/dashboard");
			if (data.success) {
				setData(data.dashboardData);
			}
			toast.success("Dashboard data loaded");
		} catch (error) {
			toast.error("Failed to load dashboard data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fectchDashboardData();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="px-4 pt-10 md:px-10 flex-1">
			<OwnerTitle
				title="Admin Dashboard"
				subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
			/>
			<div className="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-6 my-8 max-w-11/12">
				{dashboardCards.map((card, index) => (
					<motion.div
						animate={{ opacity: [0, 1], y: [40, 0] }}
						transition={{ duration: 0.3, delay: index * 0.2 }}
						key={index}
						className="flex gap-2 items-center justify-between p-4 rounded-md border border-gray-500"
					>
						<div>
							<h2 className="text-gray-400 text-sm">
								{card.title}
							</h2>
							<p className="text-lg font-semibold">
								{card.value}
							</p>
						</div>

						<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
							<img
								src={card.icon}
								alt={card.title}
								className="h-4 w-4"
							/>
						</div>
					</motion.div>
				))}
			</div>
			<div className="flex flex-wrap items-start gap-6 mb-8 w-full">
				<motion.div
					animate={{ opacity: [0, 1], y: [40, 0] }}
					transition={{ duration: 0.3, delay: 0.5 }}
					className="p-4 md:p-6 border border-gray-500 rounded-md max-w-lg w-full"
				>
					<h1 className="text-md sm:text-lg font-medium">
						Recent Bookings
					</h1>
					<p className="text-gray-500 text-sm sm:text-base">
						Latest Customer bookings
					</p>
					{data.recentBookings.map((booking, index) => (
						<div
							key={index}
							className="mt-4 flex items-center justify-between"
						>
							<div className="flex items-center gap-2">
								<div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
									<img
										src={assets.listIconColored}
										alt="icons"
										loading="lazy"
										className="h-5 w-5"
									/>
								</div>
								<div>
									<p className="line-clamp-1 text-sm">
										{booking.car.brand} {booking.car.model}
									</p>
									<p className="text-sm text-gray-500">
										{booking.createdAt.split("T")[0]}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2  font-medium">
								<p className="text-sm max-sm:hidden text-gray-500 md:text-base">
									{currency} {booking.price}
								</p>
								<p
									className={`px-3 py-0.5 rounded-md text-xs md:text-sm ${
										booking.status === "pending"
											? "bg-yellow-200 text-yellow-600"
											: booking.status === "confirmed"
											? "bg-green-200 text-green-600"
											: "bg-red-200 text-red-600"
									}`}
								>
									{booking.status}
								</p>
							</div>
						</div>
					))}
				</motion.div>

				{/* monthly revenue chart placeholder */}
				<motion.div
					animate={{ opacity: [0, 1], y: [40, 0] }}
					transition={{ duration: 0.3, delay: 0.9 }}
					className="p-4 md:p-6 border border-gray-500 rounded-md max-w-lg w-full"
				>
					<h1 className="text-md sm:text-lg font-medium">
						Monthly Revenue
					</h1>
					<p className="text-gray-500 text-sm sm:text-base">
						Revenue for current month
					</p>
					<p className="text-3xl mt-6 text-primary font-semibold">
						{currency} {data.monthlyRevenue}
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Dashboard;
