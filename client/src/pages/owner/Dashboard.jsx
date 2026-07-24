import { useAuthStore } from "../../store/useAuthStore.js";
import { useEffect } from "react";
import { iconList } from "../../assets/assets.jsx";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import { DashboardSkeleton } from "../../components/skeletons";
import StatCard from "../../components/owner/StatCard.jsx";
import RecentBookings from "../../components/owner/RecentBookings.jsx";
import RevenueCard from "../../components/owner/RevenueCard.jsx";
import { FleetChart, BookingChart, PaymentChart, RevenueHistoryChart } from "../../components/owner/DashboardCharts.jsx";

const Dashboard = () => {
	const { dashboardData: data, dashboardLoading: loading, fetchDashboardData } = useAuthStore();
	const currency = import.meta.env.VITE_CURRENCY;

	const fleetCards = [
		{ title: "Total Cars", value: data?.totalCars, icon: iconList.Car },
		{ title: "Available", value: data?.availableCars, icon: iconList.CheckCircle2 },
		{ title: "Cleaning", value: data?.cleaningCars, icon: iconList.Sparkles },
		{ title: "Maintenance", value: data?.maintenanceCars, icon: iconList.Wrench },
		{ title: "Unavailable", value: data?.unavailableCars, icon: iconList.EyeOff },
	];

	const bookingCards = [
		{ title: "Total Bookings", value: data?.totalBookings, icon: iconList.ClipboardList },
		{ title: "Pending Bookings", value: data?.bookingStatusCounts?.pending || 0, icon: iconList.Clock },
		{ title: "Confirmed Bookings", value: data?.bookingStatusCounts?.confirmed || 0, icon: iconList.CircleCheckBig },
		{ title: "Completed Bookings", value: data?.bookingStatusCounts?.completed || 0, icon: iconList.CircleCheckBig },
		{ title: "Cancelled Bookings", value: data?.bookingStatusCounts?.cancelled || 0, icon: iconList.CircleX },
	];

	const financialCards = [
		{ title: "Payment Pending", value: data?.paymentStatusCounts?.pending || 0, icon: iconList.Clock },
		{ title: "Payment Confirmed", value: data?.paymentStatusCounts?.confirmed || 0, icon: iconList.CircleCheckBig },
		{ title: "Payment Failed", value: data?.paymentStatusCounts?.failed || 0, icon: iconList.CircleX },
		{ title: "Monthly Revenue", value: `${currency}${data?.monthlyRevenue?.toLocaleString("en-IN")}`, icon: iconList.IndianRupee },
	];

	const colorMap = {
		"Total Cars": "text-blue-700 bg-blue-700/10",
		Available: "text-green-700 bg-green-700/10",
		Cleaning: "text-blue-500 bg-blue-500/10",
		Maintenance: "text-red-600 bg-red-600/10",
		Unavailable: "text-gray-600 bg-gray-600/10",
		"Total Bookings": "text-indigo-700 bg-indigo-700/10",
		"Pending Bookings": "text-yellow-700 bg-yellow-700/10",
		"Confirmed Bookings": "text-blue-700 bg-blue-700/10",
		"Completed Bookings": "text-teal-700 bg-teal-700/10",
		"Cancelled Bookings": "text-red-700 bg-red-700/10",
		"Payment Pending": "text-orange-700 bg-orange-700/10",
		"Payment Confirmed": "text-emerald-700 bg-emerald-700/10",
		"Payment Failed": "text-rose-700 bg-rose-700/10",
		"Monthly Revenue": "text-purple-700 bg-purple-700/10",
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);

	return (
		<div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
			<OwnerTitle
				title="Admin Dashboard"
				subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
			/>

			{/* Fleet Overview Section */}
			<section className="mt-8">
				<h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
					<iconList.Car className="text-primary" size={22} /> Fleet Overview
				</h2>
				{loading ? (
					<div className="space-y-6">
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full">
							{[1, 2, 3, 4, 5].map((i) => (
								<div key={i} className="flex gap-4 items-center justify-between p-4 rounded-3xl border border-gray-200 bg-white shadow-xs">
									<div className="flex flex-col gap-2 flex-1">
										<div className="h-3 w-16 shimmer rounded-md opacity-60" />
										<div className="h-6 w-10 shimmer rounded-md" />
									</div>
									<div className="w-9 h-9 rounded-full shimmer shrink-0" />
								</div>
							))}
						</div>
						<div className="p-6 border border-gray-200 rounded-3xl max-w-xl bg-white w-full">
							<div className="h-4 w-44 shimmer rounded-md mb-4" />
							<div className="h-48 flex justify-center items-center">
								<div className="w-36 h-36 rounded-full shimmer" />
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full mb-6">
							{fleetCards.map((card, index) => (
								<StatCard key={index} card={card} index={index} colorMap={colorMap} />
							))}
						</div>
						<FleetChart data={data} />
					</>
				)}
			</section>

			{/* Booking Analytics Section */}
			<section className="mt-12">
				<h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
					<iconList.ClipboardList className="text-indigo-600" size={22} /> Booking Analytics
				</h2>
				{loading ? (
					<div className="space-y-6">
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full">
							{[1, 2, 3, 4, 5].map((i) => (
								<div key={i} className="flex gap-4 items-center justify-between p-4 rounded-3xl border border-gray-200 bg-white shadow-xs">
									<div className="flex flex-col gap-2 flex-1">
										<div className="h-3 w-16 shimmer rounded-md opacity-60" />
										<div className="h-6 w-10 shimmer rounded-md" />
									</div>
									<div className="w-9 h-9 rounded-full shimmer shrink-0" />
								</div>
							))}
						</div>
						<div className="p-6 border border-gray-200 rounded-3xl bg-white w-full">
							<div className="h-4 w-48 shimmer rounded-md mb-4" />
							<div className="h-64 flex items-end justify-between px-8 gap-4 pt-10">
								<div className="w-12 h-2/3 shimmer rounded-t-xl" />
								<div className="w-12 h-4/5 shimmer rounded-t-xl" />
								<div className="w-12 h-1/2 shimmer rounded-t-xl" />
								<div className="w-12 h-1/3 shimmer rounded-t-xl" />
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full mb-6">
							{bookingCards.map((card, index) => (
								<StatCard key={index} card={card} index={index} colorMap={colorMap} />
							))}
						</div>
						<BookingChart data={data} />
					</>
				)}
			</section>

			{/* Financial Performance Section */}
			<section className="mt-12">
				<h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
					<iconList.Wallet className="text-emerald-600" size={22} /> Financial Performance
				</h2>
				{loading ? (
					<div className="space-y-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className="flex gap-4 items-center justify-between p-4 rounded-3xl border border-gray-200 bg-white shadow-xs">
									<div className="flex flex-col gap-2 flex-1">
										<div className="h-3 w-16 shimmer rounded-md opacity-60" />
										<div className="h-6 w-10 shimmer rounded-md" />
									</div>
									<div className="w-9 h-9 rounded-full shimmer shrink-0" />
								</div>
							))}
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="p-6 border border-gray-200 rounded-3xl bg-white w-full">
								<div className="h-4 w-44 shimmer rounded-md mb-4" />
								<div className="h-64 flex items-end justify-between px-8 gap-4 pt-10">
									<div className="w-12 h-1/2 shimmer rounded-t-xl" />
									<div className="w-12 h-3/4 shimmer rounded-t-xl" />
									<div className="w-12 h-1/4 shimmer rounded-t-xl" />
								</div>
							</div>
							<div className="p-6 border border-gray-200 rounded-3xl lg:col-span-2 bg-white w-full">
								<div className="h-4 w-48 shimmer rounded-md mb-4" />
								<div className="h-64 w-full shimmer rounded-2xl mt-4" />
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full mb-6">
							{financialCards.map((card, index) => (
								<StatCard key={index} card={card} index={index} colorMap={colorMap} />
							))}
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<PaymentChart data={data} />
							<RevenueHistoryChart history={data?.revenueHistory} currency={currency} />
						</div>
					</>
				)}
			</section>

			{/* Recent Activity Section */}
			<section className="mt-12 flex items-stretch md:flex-row flex-col gap-6 mb-8 w-full">
				{loading ? (
					<>
						<div className="p-6 border border-gray-200 rounded-3xl w-full bg-white">
							<div className="h-5.5 w-36 shimmer rounded-md mb-1.5" />
							<div className="h-4 w-48 shimmer rounded-md opacity-60 mb-6" />
							<div className="space-y-4">
								{[1, 2, 3].map((i) => (
									<div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-gray-100">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full shimmer shrink-0" />
											<div className="space-y-1.5">
												<div className="h-4 w-32 shimmer rounded-md" />
												<div className="h-3 w-20 shimmer rounded-md opacity-50" />
											</div>
										</div>
										<div className="flex flex-col items-end gap-1.5">
											<div className="h-4 w-12 shimmer rounded-md" />
											<div className="h-3 w-16 shimmer rounded-full opacity-60" />
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="p-6 border border-gray-200 rounded-3xl max-w-sm w-full flex flex-col justify-center items-center text-center bg-white shrink-0">
							<div className="w-16 h-16 rounded-full shimmer mb-4" />
							<div className="h-4 w-28 shimmer rounded-md mb-2" />
							<div className="h-8 w-36 shimmer rounded-md mb-3" />
							<div className="h-3.5 w-44 shimmer rounded-md opacity-55" />
						</div>
					</>
				) : (
					<>
						<RecentBookings bookings={data.recentBookings} currency={currency} />
						<RevenueCard revenue={data.monthlyRevenue} currency={currency} />
					</>
				)}
			</section>
		</div>
	);
};

export default Dashboard;
