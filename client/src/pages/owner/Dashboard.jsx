import { useAuthStore } from "../../store/useAuthStore.js";
import { motion, OwnerTitle, useEffect, iconList } from "../../index.js"
import DashboardSkeleton from "../../components/UI/DashboardSkeleton.jsx";

const Dashboard = () => {

	const { dashboardData: data, dashboardLoading: loading, fetchDashboardData } = useAuthStore();
	const currency = import.meta.env.VITE_CURRENCY;

	const dashboardCards = [
		{
			title: "Total Cars",
			value: data.totalCars,
			icon: iconList.Car,
		},
		{
			title: "Total Bookings",
			value: data.totalBookings,
			icon: iconList.ClipboardList,
		},
		{
			title: "Pending",
			value: data.pendingBookings,
			icon: iconList.TriangleAlert,
		},
		{
			title: "Completed",
			value: data.completedBookings,
			icon: iconList.List,
		},
		{
			title: "Cancelled",
			value: data.cancelledBookings,
			icon: iconList.TriangleAlert,
		},
	];

	const colorMap = {
		"Total Cars": "text-blue-700 bg-blue-700/10",
		"Total Bookings": "text-green-700 bg-green-700/10",
		Pending: "text-yellow-700 bg-yellow-700/10",
		Completed: "text-teal-700 bg-teal-700/10",
		Cancelled: "text-red-700 bg-red-700/10",
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);

	if (loading) return <DashboardSkeleton />;

	return (
		<div className="px-4 pt-10 md:px-10 flex-1 max-w-7xl pb-10 dark:text-dark-text">
			<OwnerTitle
				title="Admin Dashboard"
				subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
			/>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 max-w-12/12">
				{dashboardCards.map((card, index) => {
					const Icon = card.icon;
					return (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
							key={index}
							className="flex gap-2 items-center justify-between p-4 rounded-md border border-gray-500 dark:border-dark-border dark:bg-card-bg"
						>
							<div>
								<h2 className="text-gray-400 text-sm dark:text-dark-muted">
									{card.title}
								</h2>
								<p className="text-lg font-semibold dark:text-dark-text">
									{card.value}
								</p>
							</div>

							<div
								className={`${colorMap[card.title]
									} rounded-full p-2 inline-flex`}
							>
								<Icon size={25} strokeWidth={1.8} />
							</div>
						</motion.div>
					);
				})}
			</div>

			<div className="flex items-start md:flex-row flex-col gap-6 mb-8 w-full max-w-12/12">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{
						duration: 0.2,
						ease: "easeOut"
					}}
					className="p-4 md:p-6 border border-gray-500 rounded-md w-full dark:border-dark-border dark:bg-card-bg"
				>
					<h1 className="text-md sm:text-lg font-medium dark:text-dark-text">
						Recent Bookings
					</h1>
					<p className="text-gray-500 text-sm sm:text-base dark:text-dark-muted">
						Latest Customer bookings
					</p>
					{data.recentBookings.map((booking, index) => (
						<div
							key={index}
							className="mt-4 flex items-center justify-between"
						>
							<div className="flex items-center gap-2">
								<div
									className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full	${booking.status === "pending"
										? "bg-yellow-100 text-yellow-500"
										: booking.status === "confirmed"
											? "bg-green-100 text-green-500"
											: booking.status === "completed" ?
												"bg-blue-100 text-blue-500"
												: "bg-red-100 text-red-500"
										} `}
								>
									<iconList.ClipboardList size={20} />
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
								<p className="text-sm max-sm:hidden text-primary md:text-base">
									{currency}{" "}
									{booking.price.toLocaleString("en-IN")}
								</p>
								<p
									className={`px-3 py-0.5 rounded-md text-xs md:text-sm ${booking.status === "confirmed"
										? "bg-green-100 text-green-500"
										: booking.status === "completed"
											? "bg-blue-100 text-blue-500"
											: booking.status === "cancelled" ?
												"bg-red-100 text-red-500"
												: "bg-yellow-100 text-yellow-500"
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
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{
						duration: 0.2,
						ease: "easeOut"
					}}
					className="p-4 md:p-6 border border-gray-500 rounded-md max-w-lg w-full dark:border-dark-border dark:bg-card-bg"
				>
					<h1 className="text-md sm:text-lg font-medium dark:text-dark-text">
						Monthly Revenue
					</h1>
					<p className="text-gray-500 text-sm sm:text-base dark:text-dark-muted">
						Revenue for current month
					</p>
					<p className="text-3xl mt-6 text-primary font-semibold">
						{currency} {data.monthlyRevenue.toLocaleString("en-IN")}
					</p>
				</motion.div>
			</div>

		</div>
	);
};

export default Dashboard;
