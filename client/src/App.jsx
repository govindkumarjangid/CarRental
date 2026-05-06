import { useAuthStore } from "./store/useAuthStore.js";
import { useCarStore } from "./store/useCarStore.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
import { Navbar, Footer, ProtectRoute, HomeSkeleton, CarsPageSkeleton, DashboardSkeleton, TableSkeleton, FormSkeleton, CarDetailsPageSkeleton, UserTableSkeleton, iconList } from "./index.js";

import ScrollToTop from "./components/UI/ScrollToTop.jsx";

// Lazy loading all pages/modals
const Home = lazy(() => import("./pages/Home.jsx"));
const Cars = lazy(() => import("./pages/Cars.jsx"));
const Cardetails = lazy(() => import("./pages/Cardetails.jsx"));
const ChatPage = lazy(() => import("./pages/ChatPage.jsx"));
const Mybookings = lazy(() => import("./pages/Mybookings.jsx"));
const Login = lazy(() => import("./components/UI/Login.jsx"));

// Owner pages
const Layout = lazy(() => import("./pages/Layout.jsx"));
const Dashboard = lazy(() => import("./pages/owner/Dashboard.jsx"));
const AddCar = lazy(() => import("./pages/owner/AddCar.jsx"));
const ManageCars = lazy(() => import("./pages/owner/ManageCars.jsx"));
const ManageBookings = lazy(() => import("./pages/owner/ManageBookings.jsx"));
const AllUsers = lazy(() => import("./pages/owner/AllUsers.jsx"));
const Chats = lazy(() => import("./pages/owner/Chats.jsx"));

// Modals and UI
const NotFound404 = lazy(() => import("./components/UI/NotFound404.jsx"));
const TestimonialForm = lazy(() => import("./components/testimonial/TestimonialForm.jsx"));
const EditCarForm = lazy(() => import("./components/owner/EditCarForm.jsx"));

const App = () => {

	const { showLogin, showReview, token, fetchUser } = useAuthStore();
	const { fetchCars, showEditCar } = useCarStore();
	const location = useLocation();
	const isOwnerPath = location.pathname.startsWith("/owner");
	const isChatPath = location.pathname.startsWith("/chatpage") || location.pathname.startsWith("/chats") || location.pathname.startsWith("/owner/chats");

	useEffect(() => {
		fetchCars();
	}, []);

	useEffect(() => {
		if (token) fetchUser();
	}, [token]);

	// Prevent double scrollbar when modals are open
	useEffect(() => {
		const isModalOpen = showLogin || showReview || showEditCar;
		const mainElement = document.querySelector('main');
		if (mainElement) {
			if (isModalOpen) {
				mainElement.classList.add('overflow-hidden');
				mainElement.classList.remove('overflow-y-auto');
			} else {
				if (!isChatPath && !isOwnerPath) {
					mainElement.classList.add('overflow-y-auto');
					mainElement.classList.remove('overflow-hidden');
				} else {
					mainElement.classList.add('overflow-hidden');
					mainElement.classList.remove('overflow-y-auto');
				}
			}
		}
	}, [showLogin, showReview, showEditCar, isChatPath, isOwnerPath]);

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<ScrollToTop />
			<Toaster position="right-bottom" reverseOrder={true} />
			{!isOwnerPath && <Navbar />}

			<main className={`flex-1 min-h-0 overflow-x-hidden ${!isChatPath && !isOwnerPath ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"}`}>
				<Suspense fallback={<div className="h-screen w-full shimmer" />}>
					<AnimatePresence mode="wait">
						{showLogin && <Login key="login-modal" />}
						{showReview && <TestimonialForm key="review-modal" />}
						{showEditCar && <EditCarForm key="edit-car-modal" />}
					</AnimatePresence>
				</Suspense>

				<Routes>
					<Route path="/" element={
						<Suspense fallback={<HomeSkeleton />}>
							<Home />
						</Suspense>
					} />
					<Route path="/cars" element={
						<Suspense fallback={<CarsPageSkeleton />}>
							<Cars />
						</Suspense>
					} />
					<Route path="/car-details/:id" element={
						<Suspense fallback={<CarDetailsPageSkeleton />}>
							<Cardetails />
						</Suspense>
					} />
					<Route path="/chatpage/:id?" element={
						<Suspense fallback={<div className="h-screen w-full shimmer" />}>
							<ChatPage />
						</Suspense>
					} />
					<Route path="/my-bookings" element={
						<Suspense fallback={<div className="p-10 max-w-7xl mx-auto"><TableSkeleton /></div>}>
							<Mybookings />
						</Suspense>
					} />
					<Route path="/chats/:userId?" element={
						<ProtectRoute>
							<Suspense fallback={<div className="h-screen w-full shimmer" />}>
								<Chats />
							</Suspense>
						</ProtectRoute>
					} />

					<Route path="/owner" element={
						<ProtectRoute>
							<Suspense fallback={<div className="h-screen w-full flex flex-col gap-4 items-center justify-center text-gray-500">
								<iconList.Loader className="animate-spin" size={40} />
								<span>Loading Dashboard...</span>
							</div>}>
								<Layout />
							</Suspense>
						</ProtectRoute>
					}>
						<Route index element={
							<ProtectRoute>
								<Suspense fallback={<DashboardSkeleton />}>
									<Dashboard />
								</Suspense>
							</ProtectRoute>
						} />
						<Route path="add-car" element={
							<ProtectRoute>
								<Suspense fallback={<FormSkeleton />}>
									<AddCar />
								</Suspense>
							</ProtectRoute>
						} />
						<Route path="manage-cars/:carId?" element={
							<ProtectRoute>
								<Suspense fallback={<TableSkeleton />}>
									<ManageCars />
								</Suspense>
							</ProtectRoute>
						} />
						<Route path="manage-bookings/:bookingId?" element={
							<ProtectRoute>
								<Suspense fallback={<TableSkeleton />}>
									<ManageBookings />
								</Suspense>
							</ProtectRoute>
						} />
						<Route path="users" element={
							<ProtectRoute>
								<Suspense fallback={<UserTableSkeleton />}>
									<AllUsers />
								</Suspense>
							</ProtectRoute>
						} />
						<Route path="chats/:userId?" element={
							<ProtectRoute>
								<Suspense fallback={<div className="h-screen w-full shimmer" />}>
									<Chats />
								</Suspense>
							</ProtectRoute>
						} />
					</Route>

					<Route path="*" element={
						<Suspense fallback={null}>
							<NotFound404 />
						</Suspense>
					} />
				</Routes>
				{!isOwnerPath && !isChatPath && <Footer />}
			</main>
		</div>
	);
};

export default App;


