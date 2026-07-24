import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import { UserTableSkeleton } from "../../components/skeletons";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";
import {
	Mail,
	Search,
	Trash2,
	ChevronLeft,
	ChevronRight,
	Calendar,
	CheckCircle2,
	RefreshCw,
} from "lucide-react";

const Subscribers = () => {
	const [subscribers, setSubscribers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [total, setTotal] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [deletingId, setDeletingId] = useState(null);

	const fetchSubscribers = async () => {
		setLoading(true);
		try {
			const { data } = await axiosInstance.get(
				`/api/v1/owner/subscribers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
			);
			if (data.success) {
				setSubscribers(data.subscribers || []);
				setTotal(data.total || 0);
				setTotalPages(data.totalPages || 1);
			} else {
				toast.error(data.message || "Failed to fetch subscribers");
			}
		} catch (error) {
			console.error("Error fetching subscribers:", error);
			toast.error(error.response?.data?.message || "Failed to fetch subscribers");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSubscribers();
	}, [page, limit]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setPage(1);
		fetchSubscribers();
	};

	const handleDeleteSubscriber = async (id, email) => {
		if (!window.confirm(`Are you sure you want to remove ${email} from subscribers?`)) return;

		setDeletingId(id);
		try {
			const { data } = await axiosInstance.delete(`/api/v1/owner/subscribers/${id}`);
			if (data.success) {
				toast.success(data.message || "Subscriber deleted");
				if (subscribers.length === 1 && page > 1) {
					setPage(page - 1);
				} else {
					fetchSubscribers();
				}
			} else {
				toast.error(data.message || "Failed to delete");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to delete subscriber");
		} finally {
			setDeletingId(null);
		}
	};

	const formatDate = (dateStr) => {
		if (!dateStr) return "N/A";
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
			<OwnerTitle
				title="Newsletter Subscribers"
				subTitle="Manage all email newsletter subscribers. View subscription history, search, and manage list items with pagination."
			/>

			{/* Search and Filter Toolbar */}
			<div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
				<form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="text"
							placeholder="Search subscriber by email..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:bg-white transition-all font-medium text-gray-800"
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dull transition-colors cursor-pointer shrink-0">
						Search
					</button>
				</form>

				<div className="flex items-center justify-between sm:justify-end gap-3 text-sm font-semibold text-gray-600">
					<button
						onClick={() => {
							setSearch("");
							setPage(1);
							fetchSubscribers();
						}}
						title="Refresh"
						className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
						<RefreshCw size={16} className={loading ? "animate-spin text-primary" : "text-gray-600"} />
					</button>

					<div className="flex items-center gap-2">
						<label htmlFor="limit-select">Show:</label>
						<select
							id="limit-select"
							value={limit}
							onChange={(e) => {
								setLimit(Number(e.target.value));
								setPage(1);
							}}
							className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-1.5 text-sm font-bold outline-none focus:border-primary cursor-pointer">
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="w-full mt-6">
				{loading ? (
					<UserTableSkeleton />
				) : subscribers.length === 0 ? (
					<div className="p-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-3">
						<div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center">
							<Mail size={28} />
						</div>
						<h3 className="text-lg font-bold text-gray-800">No Subscribers Found</h3>
						<p className="text-sm text-gray-500 max-w-sm">
							{search ? "No subscribers match your search criteria." : "There are currently no subscribers registered in the database."}
						</p>
					</div>
				) : (
					<>
						{/* Mobile Cards */}
						<div className="md:hidden space-y-3">
							{subscribers.map((sub, index) => (
								<motion.div
									layout
									key={sub._id || index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
									className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col gap-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3 min-w-0">
											<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
												<Mail size={20} />
											</div>
											<span className="text-sm font-bold text-gray-900 truncate">{sub.email}</span>
										</div>
										<button
											onClick={() => handleDeleteSubscriber(sub._id, sub.email)}
											disabled={deletingId === sub._id}
											className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0">
											<Trash2 size={18} />
										</button>
									</div>

									<div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3 text-gray-500">
										<span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
											<CheckCircle2 size={13} /> Active
										</span>
										<span className="flex items-center gap-1 text-gray-500 font-semibold">
											<Calendar size={13} /> {formatDate(sub.subscribedAt || sub.createdAt)}
										</span>
									</div>
								</motion.div>
							))}
						</div>

						{/* Desktop Table */}
						<div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
							<table className="w-full border-collapse text-left">
								<thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
									<tr>
										<th className="py-4 px-6">Subscriber Email</th>
										<th className="py-4 px-6">Status</th>
										<th className="py-4 px-6">Subscribed Date</th>
										<th className="py-4 px-6 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="text-sm text-gray-700 divide-y divide-gray-100 font-medium">
									{subscribers.map((sub, index) => (
										<motion.tr
											key={sub._id || index}
											initial={{ opacity: 0, y: 6 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.15 }}
											className="hover:bg-gray-50/80 transition-colors">
											<td className="py-4 px-6">
												<div className="flex items-center gap-3">
													<div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
														<Mail size={18} />
													</div>
													<span className="font-bold text-gray-900">{sub.email}</span>
												</div>
											</td>
											<td className="py-4 px-6">
												<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
													<CheckCircle2 size={13} /> Active
												</span>
											</td>
											<td className="py-4 px-6 text-gray-600 font-semibold text-xs">
												{formatDate(sub.subscribedAt || sub.createdAt)}
											</td>
											<td className="py-4 px-6 text-right">
												<button
													onClick={() => handleDeleteSubscriber(sub._id, sub.email)}
													disabled={deletingId === sub._id}
													title="Delete Subscriber"
													className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center">
													<Trash2 size={18} />
												</button>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Pagination Controls */}
						<div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-600 font-semibold">
							<div>
								Showing <span className="font-bold text-gray-900">{subscribers.length > 0 ? (page - 1) * limit + 1 : 0}</span> to{" "}
								<span className="font-bold text-gray-900">{Math.min(page * limit, total)}</span> of{" "}
								<span className="font-bold text-gray-900">{total}</span> subscribers
							</div>

							<div className="flex items-center gap-2">
								<button
									onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
									disabled={page <= 1}
									className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer">
									<ChevronLeft size={18} />
								</button>

								{Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
									<button
										key={pNum}
										onClick={() => setPage(pNum)}
										className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
											page === pNum
												? "bg-primary text-white shadow-sm"
												: "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
										}`}>
										{pNum}
									</button>
								))}

								<button
									onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
									disabled={page >= totalPages}
									className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer">
									<ChevronRight size={18} />
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Subscribers;
