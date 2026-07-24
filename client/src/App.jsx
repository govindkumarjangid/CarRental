import { useAuthStore } from "./store/useAuthStore.js";
import { useCarStore } from "./store/useCarStore.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { Loader } from "lucide-react";
import { Navbar, Footer, ProtectRoute, CarsPageSkeleton, DashboardSkeleton, TableSkeleton, FormSkeleton, CarDetailsPageSkeleton, UserTableSkeleton, LoginSkeleton, TestimonialFormSkeleton } from "./index.js";

import ScrollToTop from "./components/UI/ScrollToTop.jsx";
import Lenis from "lenis";

import Home from "./pages/Home.jsx";
const Cars = lazy(() => import("./pages/Cars.jsx"));
const Cardetails = lazy(() => import("./pages/Cardetails.jsx"));
const ChatPage = lazy(() => import("./pages/ChatPage.jsx"));
const Mybookings = lazy(() => import("./pages/Mybookings.jsx"));
const Login = lazy(() => import("./components/UI/Login.jsx"));

// Informative Pages
const About = lazy(() => import("./pages/About.jsx"));
const HelpCenter = lazy(() => import("./pages/HelpCenter.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Insurance = lazy(() => import("./pages/Insurance.jsx"));

// Owner pages
const Layout = lazy(() => import("./pages/Layout.jsx"));
const Dashboard = lazy(() => import("./pages/owner/Dashboard.jsx"));
const AddCar = lazy(() => import("./pages/owner/AddCar.jsx"));
const ManageCars = lazy(() => import("./pages/owner/ManageCars.jsx"));
const ManageBookings = lazy(() => import("./pages/owner/ManageBookings.jsx"));
const LiveTrackerPage = lazy(() => import("./pages/owner/LiveTrackerPage.jsx"));
const AllUsers = lazy(() => import("./pages/owner/AllUsers.jsx"));
const Subscribers = lazy(() => import("./pages/owner/Subscribers.jsx"));
const Settings = lazy(() => import("./pages/owner/Settings.jsx"));
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

	useEffect(() => {
		if (isOwnerPath || isChatPath) return;

		const mainWrapper = document.querySelector('main');
		const scrollContent = document.getElementById('scroll-content');

		const lenis = new Lenis({
			wrapper: mainWrapper || window,
			content: scrollContent || document.documentElement,
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			touchMultiplier: 2,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => {
			lenis.destroy();
		};
	}, [isOwnerPath, isChatPath]);

	return (
		<div className="h-screen-dynamic flex flex-col overflow-hidden bg-slate-50">
			<ScrollToTop />
			<Toaster
				position="right-bottom"
				reverseOrder={true}
				toastOptions={{
					duration: 2000,
					style: {
						borderRadius: "12px",
						fontSize: "14px",
						padding: "4px 8px"
					},
				}}
			/>

			<main className={`flex flex-col flex-1 min-h-0 overflow-x-hidden ${!isChatPath && !isOwnerPath ? "overflow-y-auto custom-scrollbar scroll-smooth" : "overflow-hidden"}`}>
				{!isOwnerPath && <Navbar />}

				{showLogin && (
					<Suspense fallback={<LoginSkeleton key="login-skeleton" />}>
						<Login key="login-modal" />
					</Suspense>
				)}
				{showReview && (
					<Suspense fallback={<TestimonialFormSkeleton key="testimonial-form-skeleton" />}>
						<TestimonialForm key="review-modal" />
					</Suspense>
				)}
				{showEditCar && (
					<Suspense fallback={<FormSkeleton isFullPage={false} />}>
						<EditCarForm key="edit-car-modal" />
					</Suspense>
				)}

				<div id="scroll-content" className={`flex flex-col ${isChatPath ? "flex-1 min-h-0" : "min-h-full"}`}>
					<div className={`flex-1 ${isChatPath ? "min-h-0 flex flex-col" : "shrink-0"}`}>
						<Routes location={location}>
							<Route path="/" element={<Home />} />
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
								<Suspense fallback={null}>
									<Mybookings />
								</Suspense>
							} />
							<Route path="/about" element={
								<Suspense fallback={null}>
									<About />
								</Suspense>
							} />
							<Route path="/help" element={
								<Suspense fallback={null}>
									<HelpCenter />
								</Suspense>
							} />
							<Route path="/terms" element={
								<Suspense fallback={null}>
									<Terms />
								</Suspense>
							} />
							<Route path="/privacy" element={
								<Suspense fallback={null}>
									<Privacy />
								</Suspense>
							} />
							<Route path="/insurance" element={
								<Suspense fallback={null}>
									<Insurance />
								</Suspense>
							} />
							<Route path="/chats/:userId?" element={
								<ProtectRoute>
									<Suspense fallback={<div className="h-screen w-full shimmer" />}>
										<Chats />
									</Suspense>
								</ProtectRoute>
							} />

							{/* Owner Routes */}
							<Route path="/owner" element={
								<ProtectRoute>
									<Suspense fallback={<div className="h-screen w-full flex flex-col gap-4 items-center justify-center text-gray-500">
										<Loader className="animate-spin" size={40} />
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
								<Route path="manage-cars/location/:carId" element={
									<ProtectRoute>
										<Suspense fallback={<TableSkeleton />}>
											<LiveTrackerPage />
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
								<Route path="manage-bookings/location/:carId" element={
									<ProtectRoute>
										<Suspense fallback={<TableSkeleton />}>
											<LiveTrackerPage />
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
								<Route path="subscribers" element={
									<ProtectRoute>
										<Suspense fallback={<UserTableSkeleton />}>
											<Subscribers />
										</Suspense>
									</ProtectRoute>
								} />
								<Route path="settings" element={
									<ProtectRoute>
										<Suspense fallback={<FormSkeleton />}>
											<Settings />
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
					</div>
					{!isOwnerPath && !isChatPath && <Footer />}
				</div>
			</main>
		</div>
	);
};

export default App;